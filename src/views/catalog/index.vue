<template>
  <el-container>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>
<script>
import MyBook from "./book/index";
export default {
  components: {
    MyBook
  },
  props: {
    
  },
  name: 'my-catalog',
  computed: {
    firstTabLabel: function() {
      switch (this.$route.path) {
        case '/catalog/book':
          return '所有图书'
        case '/catalog/author':
          return '所有作者'
        default:
          return '空'
      }
    }
  },
  data: function() {
    return {
      test: 'tset"',
      books: [
        {name: 'book1', author: 'b1'},
        {name: 'book2', author: 'b2'},
      ],
      editableTabs: []
    }
  },
  created: function() {
    // this.$router.push('/catalog/book');
  },
  methods: {
    handleTabsEdit(targetName, action) {
      console.log(this.tabIndex)
      if (action === 'add') {
        if (this.tabIndex === 2) return;
        let newTabName = 2;
        this.editableTabs.push({
          title: 'New Tab',
          name: 10,
          content: 'sf'
        })
        this.$router.push(this.$route.path + '/create')
      }
    }
  }
}

const fakeTabs = [
  {
        name:'this.$route.path',
        title: 'author',
        content: 'my-bookff'
      },{
        title: 'Tab1',
        name:'1',
        content:'Tab1 content'
      },{
        title: 'Tab2',
        name: '2',
        content: 'tab2content'
      }
]
</script>
<style lang="scss" scoped>
// .container {
//   // 注意catalog的子元素也会有这个
//   background: red;
//   height: 400px;
//   width: 800px;
// }
</style>


