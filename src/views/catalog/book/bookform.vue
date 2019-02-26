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
import apiA from '~/service/api';
import Cookie from 'js-cookie';


export default {
  name: 'book-create',
  props: {
    // 为什么这里设置默认呢值呢?
    // 因为如果不设置的话,构造出来的formdata将会iu是title:undefined,
    // 然后在服务端JSON.stringify的时候就换变成title:'undefinded',成字符串啦!!!
    // 另外从组件构造的角度来说,不强制要求调用时输入props的话,最好还是在组建内部设置上默认值的好.个人观点.
    title: {default: ''},
    author: {default: ''},
    summary: {default: ''},
    isbn: {default: ''},
    genre: {
      default: function() {
        return []
      }
    },
    update: {default: false}
  },
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
      // console.log(Cookie.get('jwt_token'))
      let that = this
      // 根据更新还是新建，发送请求put或post
      const httpMethod = this.update ? 'put' : 'post'
      const httpUrl = this.update ? `/api/book/${that.$route.params.id}` : '/api/book'
      apiA.request({
        method: httpMethod,
        url: httpUrl,
        data: bodyFormData,
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'Bearer ' + Cookie.get('jwt_token'),
          },
        // withCredentials: true
      }).then(function(resp) {
        console.log('resp:')
        console.log(resp)
        // console.log(this)
        // 注意：status code 500时，在axios中，不进入这个then中，直接进入catch环节
        // 返回resp不一定就表示成功了
        if (resp.data.msg == "validation failed") {
          resp.data.errors.forEach(ee => {
            that.$message({message:ee.msg, type: 'error'})
          });
        } else if (resp.data.msg == "save failed") {
          Object.keys(resp.data.err.errors).forEach(errK => {
            that.$message({message: resp.data.err.errors[errK].message, type: 'error'})
          });
        } else {
          // 更新成功
          // 根据更新还是新建，发送提示信息
          const popMsg = that.update ? '更新成功' : '新建成功'
          that.$message({
            message: popMsg,
            type: 'success'
          })
          // 成功后重定向至详情页
          that.$router.push(`/catalog/book/${resp.data.book._id}`)

        }
      })
      .catch((error) => {
        console.log(error)
        // 注意，此时出错，但不一定是更新未成功，
        // 例如，更新成功，但是在push路由那一步出错，则虽然更新成功，但没跳转并且到这一步catch错误
        // 事实上，程序编写造成的错误，是没必要通知用户的，
        // 用户只需要知道他操作的有没有错，操作是否成功等。
        // 因此，如果在上述错误出现是alert用户一个错误，还有可能对用户造成误导。
        // catch这一步捕获的所有错误，包括500错误，都是面向程序员而非用户的。
        // 但是用户点了更新，服务器出错回个500,也应该通知一下用户出错了，而不是什么也不做

            if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
              if (error.response.status === 400) {
                that.$message({
                  message: '输入有误',
                  type: 'warning'
                })
              }
              this.$message({
                message: '无法创建/更新',
                type: 'error'
              })
            } else if (error.request) {
              // The request was made but no response was received
              // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
              // http.ClientRequest in node.js
              console.log(error.request);
              this.$message({
                message: '未收到响应',
                type: 'error'
              })
            } else {
              // Something happened in setting up the request that triggered an Error
              console.log('Error', error.message);
              this.$message({
                message: '发起请求失败',
                type: 'error'
              })
            }
            console.log(error.config);


        })
      .finally(() => {
        console.log('finally')
        console.log(this)
        this.isFormLoading = false

      })

    }
  },
  mounted() {
    apiA
      .get('/api/author')
      .then(res => {
        console.log(res.data.author_list)
        this.author_list = res.data.author_list   
      })
    apiA
      .get('/api/genre')
      .then(res => {
        this.genre_list = res.data.genre_list;
      })
  }
}
</script>
<style lang="scss" scoped>

</style>



