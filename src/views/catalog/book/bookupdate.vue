<template>
  <div v-if="book" v-loading="!book">
    <!-- <div>
      <h3>bookupdate component</h3>
      <div>update book: {{book._id}}</div>
      <div>genre of this book:{{book.genre}}</div>
    </div> -->
    <book-form 
      :title="book ? book.title : ''"
      :author="book.author._id"
      :summary="book.summary"
      :isbn="book.isbn"
      :genre="book.genre.map((g) => g._id)"
      :update="true"
      ></book-form>
  </div>
  
</template>

<script>
import BookForm from './bookform'
import apiA from '~/service/api'
export default {
  components: {
    BookForm
  },
  data() {
    return {
      test: 'tests',
      loading: true,
      loadingErr: false,
      book: null,
      // bookinstance_list: []
    }
  },
  mounted() {
    // 获取要更新的book的详情，并预先天充值表单中
    apiA
      .get(`/api/book/${this.$route.params.id}`)
      .then((res) => {
        console.log(res);
        this.book = res.data.results.book;
        // this.bookinstance_list = res.data.results.book_instance_list;
      })
      .catch((err) => {
        console.log(err)
        this.loadingErr = true
      })
      .finally(() => this.loading = false )
  },

}
</script>

<style lang="scss" scoped>

</style>
