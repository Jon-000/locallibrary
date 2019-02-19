<template>
  <div>
    <section v-if="errored" >
      <p>不好意思出错了</p>
    </section>
    <section v-else>
      <div v-if="isLoading">Loading</div>

      <el-table v-else :data="bookList" style="">
        <el-table-column
          prop="title"
          label="书名"
          width=""
          >
          <template slot-scope="scope">
            <router-link :to="`/catalog/book/${scope.row._id}`" style="color: black;">
              <!-- <a>{{scope.row.title}}</a> -->
              {{scope.row.title}}
            </router-link>
          </template>
        </el-table-column>

        <el-table-column
          prop="author.first_name"
          label="作者"
          >
        </el-table-column>

        <el-table-column
          prop="isbn"
          label="isbn"
          >
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row._id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </section>
  </div>
</template>

<script>
import HelloWorld from '../../../components/HelloWorld'
import axios from "axios";
export default {
  components: {
    HelloWorld
  },
  name: 'MyBook',
  data: function() {
    return {
      ti: ";a;aa;;a;a;k",
      bookList: [],
      isLoading: true,
      errored: false,
    }
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(_id) {
      console.log(_id);
      console.log(this)
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
          axios
            .delete(`/api/book/${_id}`)
            .then(res => {
              // throw new Error('test err')
              console.log(res);
              this.bookList = this.bookList.filter((book) => book._id !== _id)
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              })
            .catch(err => {
              console.log(err);
              this.$message({
                type: 'info',
                message: '不好意思，出错了'
              })
              }) // 疑问，这里用catch吗，这里用throw error吗?可手动在前边throw err测试下
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    }
  },
  mounted() {
    axios
      .get('/api/book')
      .then(res => {
        console.log(res)
        console.log(res.data.book_list)
        this.bookList = res.data.book_list
      })
      .catch( error => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => this.isLoading = false)
  }
}
</script>

<style lang="scss" scoped>

</style>
