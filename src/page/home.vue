<template>
  <div>
    <my-header :showSearch="showSearch" :roleType="roleType" :isHomePage="isHomePage" :showCat="showCat"
               :showProgressbar="showProgressBar">
      <!--<a href="" slot="goHome">返回首页</a>-->
      <span slot="title" class="msg">首页</span>
    </my-header>
    <!--幻灯片部分-->
    <div class="slider">
      <ul class="slideshow" v-if="sliderList.length">
        <li :class="{'active': currentIndex === index}" v-for="(item, index) in sliderList" :key="index">
          <a href="" target="_blank">
            <img :src="item.url" height="400" alt="">
          </a>
        </li>
      </ul>
      <div class="uk-container uk-container-center arrow">
        <a class="slidenav-previous" @click="prevPage"></a>
        <a class="slidenav-next" @click="nextPage"></a>
      </div>
      <ul class="dotnav" v-if="sliderList">
        <li :class="{'active': currentIndex === index}" v-for="(item, index) in sliderList" :key="index"
            v-on:mouseenter="goPage(index)">
          <a></a>
        </li>
      </ul>
    </div>
    <div class="bannerContent">
      <div class="userBaseInfo">
        <!-- 用户头像与用户名 S -->
        <div id="userBaseInfo">
          <a href="" target="_blank">
            <img src="../assets/images/userImg.png" alt="">
            <div v-if="roleType == 1" class="userName">常熟市家电公司1</div>
            <div v-if="roleType == 2" class="userName">常熟市家电公司2</div>
          </a>
        </div>
        <!-- 用户头像与用户名 E -->
        <!-- 获取核订单数（待审，待发，待签） S-->
        <div id="getOrderCountsByType" class="commodityOrder">
          <a href="" target="_blank">
            <p class="toCheckCount">1</p>
            <p class="state">待审核</p>
          </a>
          <a href="" target="_blank" class="a2">
            <p class="toCheckCount">2</p>
            <p class="state">待发货</p>
          </a>
          <a href="" target="_blank">
            <p class="toCheckCount">3</p>
            <p class="state">待签收</p>
          </a>
        </div>
        <div class="mes-line"></div>
        <!-- 获取核订单数（待审，待发，待签） E-->
        <!-- 美的快报 S-->
        <div v-if="roleType == 1" id="getMessageList" class="mideaNews">
          <div class="title clearfix">
            <h3>美的快报</h3>
            <a href="" target="_blank">更多</a>
          </div>
          <ul class="newsList">
            <li>
              <a href="" target="_blank">
                新闻1111
              </a>
            </li>
          </ul>
        </div>
        <!-- 美的快报 E-->
        <!-- 服务通知 S -->
        <div v-if="roleType == 2" class="mideaNews">
          <div class="title clearfix">
            <h3>服务通知</h3>
            <a href="" target="_blank">更多</a>
          </div>
          <ul class="newsList">
            <li>
              <a href="javascript:void(0)" target="_blank">
                服务通知1111
              </a>
            </li>
          </ul>
        </div>
        <!-- 服务通知 E -->
      </div>
    </div>
    <!-- 用户信息 -->
    <div class="content">
      <div class="uk-container uk-container-center">
        <div class="new-goods">
          <div class="title">
            <h2>新品推荐</h2>
            <p class="line"></p>
            <p>NEW PRODUCTS </p>
            <a class="new-goods-more su-more">更多 > </a>
          </div>
          <div id="bookList">
            <ul class="grid grid-width-1-8 grid-collapse booklist" v-if="bookList.length">
              <li
                :class="{'c-active': currentBookIndex === index, 'active': mCurrentBookIndex === index, 'bigLi': bookList.length > 8, 'smallLi': bookList.length <= 8}"
                v-for="(item, index) in bookList" :key="index" @click="clickBook(index)"
                v-on:mouseenter="showBlue(index)">
                <img class="show" :src="'/static/images/active'+item.booksId+'.png'" alt="">
                <img :src="'/static/images/'+item.booksId+'.png'" alt="">
                <p>{{item.booksName}}</p>
              </li>
            </ul>
          </div>
          <div id="new-goods-list" class="goodslist">
            <ul class="grid grid-width-1-4 grid-small" v-if="newGoodsList.length">
              <li v-for="(item, index) in newGoodsList" :key="index">
                <a href="" target="_blank">
                  <img :src="item.itemUrl"
                       v-bind:alt="item.itemName"
                       v-bind:title="item.itemName"
                  >
                  <p class="goods-name">{{item.itemName}}</p>
                  <p class="price" v-if="item.purchasePrice">¥ {{item.purchasePrice}}</p>
                  <p class="price" v-else> 暂未定价</p>
                </a>
              </li>
              <li v-if="expected.length" v-for="i in expected" :key="i">
                <div class="waiting">
                  <div class="no-goods"></div>
                  <span>更多商品,敬请期待...</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="hot-sale" id="hotList">
          <div class="title">
            <h2>热卖推荐</h2>
            <p class="line"></p>
            <p>HOT PRODUCTS </p>
          </div>
          <div id="hotSale">
            <!--<div class="hot-height">-->
              <!--<div v-for="(item, i) in hotSaleList" v-if="item.productList.length > 0" :key="i">-->
                <!--<div class="floor clear" :id="item.booksId">-->
                  <!--<h2>{{i + 1}}F {{item.booksName}}</h2>-->
                  <!--<a href="" target="_blank" v-if="item.booksId == 2491">更多  >-->
                  <!--</a>-->
                  <!--<a href="" v-else target="_blank">更多 >-->
                  <!--</a>-->
                <!--</div>-->
                <!--<div class="hot-sale-list">-->
                  <!--<div class="grid grid-small" v-for="(goodsItem, index) in item.productList"  :key="index">-->
                    <!--<div class="width-3-10" style="width: 372px">-->
                      <!--<div class="left-product" v-if="index === 0">-->
                        <!--<a href="" target="_blank">-->
                          <!--<img :src="goodsItem.itemUrl">-->
                          <!--<div>-->
                            <!--<p class="goods-name">{{goodsItem.itemName}}</p>-->
                            <!--<p class="hot-points">{{goodsItem.slogan}}</p>-->
                            <!--<p class="price" v-if="goodsItem.purchasePrice">¥  {{goodsItem.purchasePrice}}</p>-->
                            <!--<p class="price" v-else>暂无定价</p>-->
                          <!--</div>-->
                        <!--</a>-->
                      <!--</div>-->
                    <!--</div>-->

                    <!--<div class="width-7-10" style="width: 838px">-->
                      <!--<ul class="grid grid-width-1-2 grid-small">-->
                        <!--<li class="right-goodslist" v-if="index >= 1 && index <= 4">-->
                          <!--<a href="" target="_blank">-->
                            <!--<div class="clear">-->
                              <!--<div class="fl">-->
                                <!--<img :src="goodsItem.itemUrl">-->
                              <!--</div>-->
                              <!--<div class="fr">-->
                                <!--<p class="goods-name">{{goodsItem.itemName}}</p>-->
                                <!--<p class="price" v-if="goodsItem.purchasePrice > 0">¥  {{goodsItem.purchasePrice}}</p>-->
                                <!--<p v-else class="price">暂无定价</p>-->
                              <!--</div>-->
                            <!--</div>-->
                          <!--</a>-->
                        <!--</li>-->
                        <!--<li v-for="(li, n) in item.noGoods" :key="n">-->
                          <!--<div class="waiting">-->
                            <!--<div class="no-goods"></div>-->
                            <!--<span>更多商品,敬请期待...</span>-->
                          <!--</div>-->
                        <!--</li>-->
                      <!--</ul>-->
                    <!--</div>-->
                  <!--</div>-->
                <!--</div>-->
              <!--</div>-->
            <!--</div>-->
          </div>
        </div>
      </div>
    </div>
    <div id="fixed"></div>
    <div id="footer"></div>
  </div>
</template>
<script>
  import myHeader from '../components/header/header.vue'
  import {getSliderService, getBookListService, getNewGoodsService, getHotSaleListService} from '../service/getData'
  export default{
    data () {
      return {
        showSearch: true,
        showProgressBar: false,
        showCat: true,
        roleType: 1,
        isHomePage: true,
        newGoodsList: [], // 新品的列表
        expected: [], // 敬请期待的列表
        bookList: [], // 事业部分类列表
        sliderList: [], // 幻灯片
        automaticPlay: false,
        currentIndex: 0, // 当前第几个幻灯片
        total: 0, // 总幻灯片的个数
        currentBookIndex: 0, // 当前第几个事业部被点击
        mCurrentBookIndex: 0, // 鼠标移上第几个事业部
        hotSaleList: []
      }
    },
    components: {
      myHeader
    },
    methods: {
      async initData () {
        await this.getNewGoods();
        await this.getBookList();
        await this.getSlider();
        await this.getHotSaleList();
        this.autoPlay();
      },
      getNewGoods () {
        getNewGoodsService(this.$http).then(res => {
          this.newGoodsList = res;
          if (this.newGoodsList.length <= 4) {
            this.expected.length = 4 - this.newGoodsList.length;
          }
        }, error => {
          console.log(error);
        })
      },
      getBookList () {
        getBookListService(this.$http)
          .then(res => {
            this.bookList = res;
          }, error => {
            console.log(error);
          })
      },
      getSlider () {
        getSliderService(this.$http)
          .then(data => {
            this.sliderList = data;
            this.total = this.sliderList.length;
          }, error => {
            console.log(error);
          })
      },
      autoPlay () {
        if (this.automaticPlay) return
        this.automaticPlay = setInterval(() => {
          if (this.currentIndex === this.total - 1) {
            this.currentIndex = 0;
          } else {
            this.currentIndex += 1;
          }
        }, 3000)
      },
      nextPage () {
        if (this.currentIndex === this.total - 1) {
          this.currentIndex = 0;
        } else {
          this.currentIndex += 1;
        }
      },
      prevPage () {
        if (this.currentIndex === 0) {
          this.currentIndex = this.total - 1;
        } else {
          this.currentIndex -= 1;
        }
      },
      goPage (index) {
        this.currentIndex = index;
      },
      clickBook (index) {
        this.currentBookIndex = index;
        this.getBookList();
      },
      showBlue (index) {
        this.mCurrentBookIndex = index;
      },
      // 获取热卖的数据列表
      getHotSaleList () {
        getHotSaleListService(this.$http)
          .then((data) => {
            let hotSaleList = data;
            this.hotSaleList = this.getHotSaleData(hotSaleList, this.bookList);
            console.log('this.hotSaleList', this.hotSaleList);
          }, error => {
            console.log(error);
          })
      },
      //重组热卖推荐的数据jie构
      getHotSaleData(goodsList, bookList) {
        bookList.forEach(function (bookItem) {
          bookItem.productList = [];
          var a = bookItem.catId.split(',');
          goodsList.forEach(function (goodsItem) {
            if (a.indexOf(goodsItem.catId + '') >= 0) {
              bookItem.productList.push(goodsItem);
            }
          })
        })
        var result = [];
        var l = bookList.length;
        for (var i = 0; i < l; i++) {
          if (bookList[i].productList.length > 0) {
            result.push(bookList[i]);
          }
        }
        return result;
      }
    },
    mounted () {
      this.initData();
    },
    updated () {
      // this.autoPlay()
    }
  }
</script>
<style scoped lang="scss">
  @import "../assets/style/common";

  $mainColor: #00A7ff;
  $fontcolor: #333;
  $greyColor: #666;
  $notAllowColot: #999;
  $borderColor: #DDD;
  $whiteColor: #fff;
  $bgColor: #f8f8f8;
  $priceColor: #ff5028;
  .uk-grid-width-1-7 > * {
    width: 14.29%;
  }

  .uk-grid-width-1-9 > * {
    width: 11.11%;
  }

  .uk-width-1-45 {
    width: 45%;
  }

  .uk-width-1-55 {
    width: 55%;
  }

  //幻灯片部分css
  .myHeader ul.productList {
    display: block !important;
  }

  #slider {
    height: 400px;
  }

  .slider {
    position: relative;
    height: 400px;
    min-width: 1200px;
    overflow: hidden;
    .slideshow {
      position: relative;
      height: 400px;
      z-index: 1;
      li {
        height: 400px;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        opacity: 0;
        transition: all .5s ease;
        &.active {
          opacity: 1;
          z-index: 2;
        }
        img {
          width: auto;
          margin: 0 auto;
        }

        & > a {
          display: block;
        }
      }
    }
    & > .arrow {
      height: 400px;
      position: relative;
      top: -400px;
    }
    & > .arrow a {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      position: absolute;
      z-index: 10;
      top: 50%;
      cursor: pointer;
      margin-top: -18px;
      background: url("../assets/images/banner-arrow.png");
      background-repeat: no-repeat;
      background-position: center;
      background-color: rgba(0, 0, 0, 0.15);
    }
    .slidenav-previous {
      left: 200px;
    }
    .slidenav-next {
      right: 200px;
      -webkit-transform: rotate(180deg);
      -moz-transform: rotate(180deg);
      -ms-transform: rotate(180deg);
      -o-transform: rotate(180deg);
      transform: rotate(180deg);
    }
    .dotnav {
      position: absolute;
      left: 50%;
      -webkit-transform: translateX(-50%);
      -moz-transform: translateX(-50%);
      -ms-transform: translateX(-50%);
      -o-transform: translateX(-50%);
      transform: translateX(-50%);
      bottom: 20px;
      font-size: 0;
      z-index: 2;
      & > li {
        display: inline-block;
        margin-left: 15px;
        &.active {
          & > a {
            background: $mainColor;
          }
        }
        & > a {
          display: inline-block;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: $whiteColor;
        }
      }
    }
  }

  .content {
    background: #f2f2f2;
    padding-bottom: 40px;
    min-width: 1200px;
    .waiting {
      height: 270px;
      text-align: center;
      background: $whiteColor;
      box-sizing: border-box;
      padding-top: 15px;
      span {
        font-size: 14px;
        display: inline-block;
        line-height: 20px;
        color: $notAllowColot;
      }
    }
    .no-goods {
      height: 207px;
      width: 192px;
      margin: 30px auto 15px;
      background-color: $whiteColor;
      background-image: url("../assets/images/waiting.png");
      background-position: center;
      background-repeat: no-repeat;
      -webkit-background-size: 80%;
      background-size: 80%;
    }
    .new-goods {
      .new-goods-more {
        position: absolute;
        //margin-right: 20px;
        font-size: 12px;
        color: $notAllowColot;
        bottom: 0;
        right: 0;
        cursor: pointer;
      }
      .title {
        margin-bottom: 20px;
      }
    }
    .title {
      position: relative;
      padding: 30px 0 0;
      text-align: center;
      h2 {
        font-size: 22px;
        line-height: 22px;
        color: $fontcolor;
      }
      p {
        font-size: 12px;
        color: #222222;
        line-height: 12px;
      }
      .line {
        width: 30px;
        height: 1px;
        background: #B1B1B1;
        margin: 10px auto;
      }
    }
    .booklist {
      .bigLi {
        width: 11.1%;
      }
      .smallLi {
        width: 12.5%;
      }
      li {
        height: 150px;
        text-align: center;
        cursor: pointer;
        text-align: center;
        background: $whiteColor;
      }
      .show {
        display: none;
      }
      img {
        display: block;
        margin: 30px auto 0;
        height: 48px;
      }
      p {
        font-size: 12px;
        line-height: 18px;
        margin-top: 20px;
      }
      a {
        display: inline-block;
        text-align: center;
        width: 100%;
        height: 100%;

      }
      .active, .c-active {
        background: $mainColor;
        p {
          color: $whiteColor;
        }
        img {
          display: none;
          &.show {
            display: block;
          }
        }
      }
    }
    .goodslist {
      margin-top: 10px;
      .waiting {
        height: 360px;
      }
      li {
        & > a {
          display: block;
          background: $whiteColor;
          padding: 0 23px;
        }
        .goods-name {
          font-size: 14px;
          color: $fontcolor;
          letter-spacing: 0;
          line-height: 24px;
          height: 48px;
          overflow: hidden;
        }
        .price {
          font-size: 18px;
          color: #FF5028;
          letter-spacing: 0;
          line-height: 18px;
          margin-top: 12px;
          padding-bottom: 40px;
        }
      }

      img {
        height: 242px;
        max-width: 100%;
        margin: 0 auto;
      }
    }
    .hot-sale-list {
      .width-3-10 {
        img {
          height: 362px;
          margin: 0 auto;
        }
      }
      .no-goods {
        margin: 0 auto;
      }
      .right-goodslist {
        //&:nth-child(n+3){
        //  margin-top: 10px;
        //}
        img {
          height: 193px;
        }
        a {
          display: block;
          padding: 44px 18px 33px;
          background: $whiteColor;
          .fr {
            width: 128px;
            margin-right: 17px;
          }
          .goods-name {
            margin-top: 52px;
            font-size: 14px;
            line-height: 24px;
            height: 48px;
            color: $fontcolor;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .price {
            font-size: 18px;
            color: #FF5028;
            margin-top: 15px;
            line-height: 18px;
          }
        }
      }
      .hide {
        display: none;
      }
    }
  }

  .left-product {
    background: $whiteColor;
    height: 550px;
    a {
      display: block;
    }
    img {
      height: 414px;
      width: 362px;
    }
    a > div {
      margin-top: 20px;
      padding: 0 33px 18px;
      .goods-name {
        line-height: 30px;
        height: 30px;
        font-size: 18px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: #000;
      }
      .hot-points {
        font-size: 14px;
        color: $notAllowColot;
        letter-spacing: 0;
        line-height: 30px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .price {
        font-size: 24px;
        color: #FF5028;
        margin-top: 18px;
        line-height: 20px;
      }
    }
  }

  .floor {
    padding: 40px 0 20px 0;
    &:first-child {
      padding: 0;
      position: relative;
      top: -20px;
      line-height: 20px;
    }
    h2 {
      font-family: PingFangSC-Medium;
      font-size: 20px;
      line-height: 20px;
      color: $fontcolor;
      font-weight: normal;
      float: left;
    }
    a {
      float: right;
      color: #999;
      font-size: 12px;
    }
  }

  //右侧电梯
  #fixed {
    .right-fixed {
      position: fixed;
      top: 50%;
      right: -100px;
      margin-top: -30px;
      z-index: 100;
      opacity: 0;
      transition: all .5s ease;
      &.show {
        opacity: 1;
        right: 0;
      }
    }
    .go-top {
      padding: 18px 0;
      text-align: center;
      a {
        display: inline-block;
        width: 26px;
        height: 28px;
        cursor: pointer;
      }
    }
    .list {
      list-style: none;
      box-shadow: 0 1px 4px rgba(0, 0, 0, .15);
      li {
        background: $whiteColor;
        text-align: center;
        line-height: 58px;
        transition: all .4s ease;
        a {
          transition: all .4s ease;
        }
        &:hover {
          background: $mainColor;
          a {
            color: $whiteColor;
          }
        }
        & + li {
          border-top: 1px solid #DDDDDD;
        }
        &.c-active {
          background: $mainColor;
          a {
            color: $whiteColor;
          }
        }
        &.long {
          a {
            width: 40px;
            line-height: 20px;
          }
        }
      }
      a {
        font-size: 14px;
        display: inline-block;
        width: 58px;
        text-align: center;
        vertical-align: middle;
        cursor: pointer;
      }
    }
  }

  /* 版心 */
  .bannerContent {
    position: relative; // 用户账套 S
    top: -400px;
    width: 1200px;
    margin: 0 auto;
    .userBaseInfo {
      width: 190px;
      height: 360px;
      background-color: $whiteColor;
      box-sizing: border-box;
      padding: 20px 15px 23px;
      position: absolute;
      right: 0;
      top: 20px;
      z-index: 2;
      box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.1);
      #userBaseInfo > a {
        display: block;
        img {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          margin: 0 auto 10px;
        }

      }
      .userName {
        margin: 0 auto;
        text-align: center;
        font-size: 12px;
        color: $fontcolor;
        line-height: 18px;
        height: 36px;
        overflow: hidden;
      }
      .commodityOrder {
        font-size: 0;
        margin-top: 10px;
        .a2 {
          margin-left: 24px;
          margin-right: 24px;
        }
        a {
          display: inline-block;
          width: 37px;
          text-align: center;
          p.toCheckCount {
            font-family: PingFangSC-Medium;
            font-size: 20px;
            color: $fontcolor;
            letter-spacing: 0;
            line-height: 20px;
          }
          p.state {
            font-family: PingFangSC-Regular;
            font-size: 12px;
            color: $greyColor;
            letter-spacing: 0;
            line-height: 12px;
            margin-top: 10px;
          }
        }

      }
      .mes-line {
        margin: 15px -15px 25px;
        height: 1px;
        background: #E3E3E3;
      }
      .mideaNews {
        .title {
          h3 {
            font-family: PingFangSC-Medium;
            font-size: 12px;
            color: $fontcolor;
            letter-spacing: 0;
            line-height: 12px;
            float: left;
          }
          a {
            font-family: PingFangSC-Light;
            font-size: 12px;
            color: $notAllowColot;
            letter-spacing: 0;
            line-height: 12px;
            float: right;
          }
          p + p {
            font-family: PingFangSC-Light;
            font-size: 12px;
            color: #222222;
            letter-spacing: 0;
            line-height: 12px;
          }
        }
        .newsList {
          margin-top: 13px;
          height: 72px;
          overflow: hidden;
          a {
            display: block;
            font-family: PingFangSC-Regular;
            font-size: 12px;
            color: $greyColor;
            letter-spacing: 0;
            line-height: 24px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
      }
    }
    // 用户账套 E
  }
</style>
