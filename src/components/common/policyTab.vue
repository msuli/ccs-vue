<template>
  <div class="policy-tab">
    <ul>
      <li class="books-name" v-for="(bookItem, index) in selectedBookList" :key="index"
          :class="{'active': index === selectedBookIndex}" @click="clickBooks(index)">
        <!---->
        <a href="javascript:void(0)">{{bookItem.booksName}}</a>
      </li>
    </ul>

    <ul class="policy-cat" v-if="selectedBookList.length">
      <li class="policy-cat-list" v-for="(catItem, i) in selectedBookList[selectedBookIndex].children"
          :class="{'active': i === selectedCatIndex}" :key="i" @click="clickCat(i)">
        <a href="javascript:void(0)">{{catItem.catName}}</a>
      </li>
    </ul>
  </div>
</template>
<script>
  import {getBookListService} from '../../service/getData';
  import {mapMutations} from 'vuex';
  export default{
    data(){
      return {
        selectedBookList: [],
        selectedBookIndex: 0,
        selectedCatIndex: 0
      }
    },
    methods: {
      ...mapMutations(['getDefaultCatId']),
      initData(){
        getBookListService(this.$http).then((res) => {
          this.selectedBookList = res;
          let catId;
          if (this.selectedBookList[0].children.length) {
            catId = this.selectedBookList[0].children[0].catId;
          } else {
            catId = this.selectedBookList[0].catId;
          }
          this.getDefaultCatId({catId: catId});
        }, error => {
          console.log(error);
        })
      },
      clickBooks(index){
        this.selectedBookIndex = index;
        let catId;
        if (this.selectedBookList[index].children.length) {
          catId = this.selectedBookList[index].children[0].catId;
        } else {
          catId = this.selectedBookList[index].catId;
        }
        this.$emit('getBooksId', catId);
      },
      clickCat(i){
        this.selectedCatIndex = i;
        let catId = this.selectedBookList[this.selectedBookIndex].children[i].catId;
        this.$emit('getCatId', catId);
      }
    },
    computed: {

    },
    mounted(){
      this.initData();
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
