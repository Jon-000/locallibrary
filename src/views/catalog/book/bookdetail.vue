<template>
  <div v-if="loadingErr">不好意思，出错了</div>

  <div v-else v-loading="loading"  class="container"
    style="text-align:center;"
    >
    <section class="book">
      <el-row :span="24" >
        <h1>{{book.title}}</h1>
      </el-row>
      <el-row :span="24" >
        <div>Author: {{book.author.name}}</div>
      </el-row>
      <el-row>
        <p><strong class="strong">Summary:</strong> {{book.summary  | capitalize}}</p>
      </el-row>
      <el-row>
        <div>ISBN: {{book.isbn}}</div>
      </el-row>

      <div>Genre:
        <el-tag v-for="genre in book.genre"
          :key="genre._id">{{genre.name}}</el-tag>
      </div>
    </section>

    <section class="book-instance-list">
      <div class="card" v-for="bookinstance in bookinstance_list" :key="bookinstance._id">
        <div class="card-left">
          <div class="cover">book cover picture url</div>
        </div>
        <div class="card-right">
          <div v-if="bookinstance.status == 'Available'" class="status available">{{bookinstance.status}}</div>
          <div v-else-if="bookinstance.status == 'Maintenance'" class="status maintenance">{{bookinstance.status}}</div>
          <div v-else-if="bookinstance.status == 'Loaned'" class="status loaned">{{bookinstance.status}}</div>
          <div v-else-if="bookinstance.status == 'Reserved'" class="status reserved">{{bookinstance.status}}</div>
          
          <div class="due-back">
            应还日期：
            {{ bookinstance.due_back | normalizeDate }}</div>
          <div class="imprint">
            出版信息：
            {{bookinstance.imprint}}</div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  name: 'book-detail',
  data() {
    return {
      loading: true,
      loadingErr: false,
      book: null,
      bookinstance_list: []
    }
  },
  mounted() {
    axios
      .get(`/api/book/${this.$route.params.id}`)
      .then((res) => {
        console.log(res);
        this.book = res.data.results.book;
        this.bookinstance_list = res.data.results.book_instance_list;
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
$success: #67C23A;
$warning:#E6A23C;
$danger: #F56C6C;
$info: #909399;

section.book {
  min-width: 500px;
  max-width: 900px;
  margin: 0 auto;
  .el-row {
    h1 {
    height: 3rem;
    line-height: 3rem;
    }
    div, p {
      margin-bottom: 1rem;
    }
    p{
      line-height: 1.5rem;
    }
  }
}
section.book-instance-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  height: 100%;

  .card {
    box-sizing: border-box;
    margin: 30px;
    width: 500px;
    min-width: 500px;
    height: 300px;
    border-radius: 4px;
    border: 1px solid #ebeef5;
    background-color: #fff;
    overflow: hidden;
    color: #303133;
    transition: 0.3s;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    .card-left {
      float: left;
      width: 40%;
      height: 100%;
      .cover {
        width: 100%;
        height: 100%;
        background: grey;
      }
    }
    .card-right {
      float: right;
      width: 60%;
      height: 100%;
      .status {
        height: 30px;
        line-height: 30px;
        color: white;
      }
      .available {
        background-color: $success;
      }
      .maintenance {
        background-color: $info;
      }
      .due-back {
        margin-top: 0.5rem;
      }
      .imprint {
        margin-top: 0.5rem;
      }
    }
  }
}

.container {
  width: 100%;
  height: 100%;
  min-width: 768px;
}


.strong {
  font-weight: 600;
}

</style>


