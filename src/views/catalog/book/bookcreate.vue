<template>
  <book-form></book-form>
</template>
<script>
import Cookie from 'js-cookie';

import BookForm from './bookform';
import apiA from '~/service/api';

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



