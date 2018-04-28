<template>
  <div class="policy-tab">
    <ul>
      <li class="books-name" v-for="(bookItem, index) in CalcBookList" :key="index"
          :class="{'active': index === selectedBookIndex}" @click="clickBooks(index, true)">
        <!---->
        <a href="javascript:void(0)">{{bookItem.booksName}}</a>
      </li>
    </ul>

    <ul class="policy-cat" v-if="CalcBookList.length">
      <li class="policy-cat-list" v-for="(catItem, i) in CalcBookList[selectedBookIndex].children"
          :class="{'active': i === selectedCatIndex}" :key="i" @click="clickBooks(i, false)">
        <a href="javascript:void(0)">{{catItem.catName}}</a>
      </li>
    </ul>
  </div>
</template>
<script>
  import {mapMutations, mapState} from 'vuex';
  import {getStore} from "../../config/mUtil";
  export default{
    data(){
      return {
        selectedBookIndex: 0,
        selectedCatIndex: 0
      }
    },
    computed: {
      ...mapState(['bookList']),
      CalcBookList(){
        return [...this.bookList];
      }
    },
    methods: {
      ...mapMutations(['DEFAULT_CAT_ID', 'GET_BOOKLIST', 'INIT_BOOKLIST']),
      clickBooks(index, f){
        let catId;
        if(f){
          this.selectedBookIndex = index;
          if (this.CalcBookList[index].children.length) {
            catId = this.CalcBookList[index].children[0].catId;
          } else {
            catId = this.CalcBookList[index].catId;
          }
        }else{
          this.selectedCatIndex = i;
          catId = this.CalcBookList[this.selectedBookIndex].children[i].catId;
        }
        this.$emit('getBooksId', catId);
      }
    },
    created(){
      this.INIT_BOOKLIST();  //组件创建时从localstorage获取数据存到state中。然后在计算属性中返回数据?
    }
  }
</script>
<style lang="scss" scoped>
  @import '../../assets/style/variable';
  //政策tabcss
  .policy-tab {
    margin-bottom: 10px;
    li {
      display: inline-block;
      &.books-name {
        margin-right: 40px;
        padding: 15px 0;
        &.active {
          background: url("../../assets/images/sanjiao.png") bottom center no-repeat;
          background-size: 7px 9px;
          a {
            color: $mainColor;
          }
        }
        a {
          color: $color3;
          font-size: 16px;
        }
      }
    }
    .policy-cat {
      background: $white;
      border-top: 2px solid $mainColor;
      padding: 0 25px;
      li {
        margin: 10px;
        &.active {
          a {
            color: $white;
            background: $mainColor;
            border-radius: 2px;
          }
        }
        a {
          display: block;
          padding: 4px 14px;
          font-size: 14px;
          color: $mainColor;
        }
      }

    }
  }
</style>
