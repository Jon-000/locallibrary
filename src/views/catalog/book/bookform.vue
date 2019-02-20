<template>

  <el-form ref="form" :model="form" label-width="80px" v-loading="isFormLoading">
    <el-form-item label="书名">
      <el-input v-model="form.title"></el-input>
    </el-form-item>
    <el-form-item label="作者">
      <el-select v-model="form.author" placeholder="数据库中已收录作者">
        <el-option
          v-for="author in author_list"
          :key="author._id"
          :label="author.name" :value="author._id"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="概要">
      <el-input type="textarea" v-model="form.summary"></el-input>
    </el-form-item>
    <el-form-item label="ISBN">
      <el-input v-model="form.isbn"></el-input>
    </el-form-item>
    <el-form-item label="类别">
      <el-checkbox-group v-model="form.genre">
        <el-checkbox
          v-for="genre in genre_list"
          :key="genre._id"
          :label="genre._id">{{genre.name}}</el-checkbox>
          <!-- 这里是个坑！label的值将会传入v-model，相当与:value，而label要写在标签里，shit! -->
      </el-checkbox-group>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">{{update ? '更新' : '立即创建'}}</el-button>
      <el-button>取消</el-button>
    </el-form-item>
    <div>
      <h3>bookform component</h3>
      current selected genre: {{form.genre}}
    </div>
  </el-form>
</template>
<script>
import axios from 'axios';
export default {
  name: 'book-create',
  props: [
    'title',
    'author',
    'summary',
    'isbn',
    'genre',
    'update'
  ],
  data() {
    return {
      isFormLoading: false,
      author_list: [],
      genre_list: [],
      form: {
        title: this.title,
        author: this.author,
        summary: this.summary,
        isbn: this.isbn,
        genre: this.genre ? this.genre : [],
      }
    }
  },
  methods: {
    onSubmit() {
      // console.log('submit!');
      // console.log(this)
      // console.log(this.form);
      // 当表单开始执行异步操作时激活loading动画。有两种情况1.获取表单选项;2.发送表单数据.这里为第二种情况
      this.isFormLoading = true;
      // 将表单数据调整为设置为axios post请求的格式。
      let bodyFormData = new FormData();
      for (let formName in this.form) {
        console.log(formName)
        console.log(this.form[formName])
        if (this.form[formName] instanceof Array) {
          bodyFormData.set(formName, JSON.stringify(this.form[formName]))
        } else {
          bodyFormData.set(formName, this.form[formName]);
        }
      }
      // console.log(bodyFormData)
      let that = this
      // 根据更新还是新建，发送请求put或post
      const httpMethod = this.update ? 'put' : 'post'
      axios({
        method: httpMethod,
        url: '/api/book',
        data: bodyFormData,
        config: { headers: {'Content-Type': 'multipart/form-data' }}
      }).then(function(resp) {
        console.log(resp)
        // console.log(this)
        // 根据更新还是新建，发送提示信息
        const popMsg = that.update ? '更新成功' : '新建成功'
        that.$message({
          message: popMsg,
          type: 'success'
        })
        // 成功后重定向至详情页
        that.$router.push(`/catalog/book/${resp.data.book._id}`)
      })
      .catch((err) => console.log(err))
      .finally(() => {
        this.isFormLoading = false
      })

    }
  },
  mounted() {
    axios
      .get('/api/author')
      .then(res => {
        console.log(res.data.author_list)
        this.author_list = res.data.author_list   
      })
    axios
      .get('/api/genre')
      .then(res => {
        this.genre_list = res.data.genre_list;
      })
  }
}
</script>
<style lang="scss" scoped>

</style>



