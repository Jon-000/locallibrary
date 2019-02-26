<template>
  <div>
    <section v-if="isLoading">Loading</section>

    <el-table v-else :data="authorList">
      <el-table-column prop="first_name" label="名"></el-table-column>
      <el-table-column prop="family_name" label="姓"></el-table-column>
      <el-table-column label="出生日期">
        <template slot-scope="scope">
          <p>{{scope.row.date_of_birth | normalizeTime}}</p>
        </template>
      </el-table-column>
      <el-table-column prop="date_of_death" label="死亡日期">
        <template slot-scope="scope">
          <p>{{scope.row.date_of_death | normalizeTime}}</p>
        </template>
      </el-table-column>
      
    </el-table>
  </div>
  
</template>

<script>
import apiA from '~/service/api';
import moment from 'moment';
moment.locale('zh_cn')
export default {
  data: function() {
    return {
      authorList: [],
      isLoading: true,
    }
  },
  filters: {
    normalizeTime: function(date) {
      if (!date) return '-';
      return moment(date).format('YYYY-MM-DD')
    }
  },
  mounted: function() {
    apiA({
      method: 'get',
      url: 'api/author'
    })
      .then(res => {
        // console.log(res.data)
        this.authorList = res.data.author_list
      })
      .catch(err => console.log(err))
      .finally(() => this.isLoading = false)
  }

}
</script>

<style lang="scss" scoped>

</style>

