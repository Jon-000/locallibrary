<template>

  <el-form ref="form" :model="form" label-width="80px">
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
      <el-button type="primary" @click="onSubmit">立即创建</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import axios from 'axios';
export default {
  name: 'BookCreate',
  data() {
    return {
      author_list: [],
      genre_list: [],
      form: {
        title: '',
        author: '',
        summary: '',
        isbn:'',
        genre: [],
      }
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!');
      console.log(this)
      console.log(this.form);
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
      console.log(bodyFormData)

      axios({
        method: 'post',
        url: '/api/book',
        data: bodyFormData,
        config: { headers: {'Content-Type': 'multipart/form-data' }}
      }).then(function(resp) {
        console.log(resp)
      })
      .catch((err) => console.log(err))

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
<style scoped>

</style>


