<template>
  <book-form></book-form>
</template>
<script>
import BookForm from './bookform'
import axios from 'axios';
export default {
  name: 'book-create',
  components: {
    BookForm
  },
  props: {
    // title
  },
  data() {
    return {
      isFormLoading: false,
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
      // console.log('submit!');
      // console.log(this)
      // console.log(this.form);
      this.isFormLoading = true;
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
      axios({
        method: 'post',
        url: '/api/book',
        data: bodyFormData,
        config: { headers: {'Content-Type': 'multipart/form-data' }}
      }).then(function(resp) {
        console.log(resp)
        // console.log(this)
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



