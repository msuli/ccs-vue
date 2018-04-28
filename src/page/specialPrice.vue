<template>
  <div>
    <my-header :showSearch="true" :roleType="1" :showSecondCat="false" :showCat="true"
               :showProgressbar="false"></my-header>
    <div class="sp-wrap">
      <div class="uk-container uk-container-center">
        <policy-tab @getBooksId="getBooks"></policy-tab>
        <div class="policy-content">
          <div class="current-show" id="specialPrice">
            <div>{{currentCatId}}</div>
            <ul class="grid grid-small mt-10 grid-width-1-2 exponent-list" v-for="(list, i) in specialPriceList" :key="i" :class="{'show': currentCatId == list.catId}" :id="list.catId">
              <li class="item" v-for="(item, index) in list.spList" :key="index">
                <div class="list-bg-color panel-box">
                  <div class="grid grid-collapse">
                    <div class="uk-width checkbox">
                      <input
                        type="checkbox"
                        :id="'exponentCheck'+i+index"
                        :value="item"
                        v-model="checkedList"
                      >
                      <label :for="'exponentCheck'+index"></label>
                    </div>
                    <div class="uk-width wrap-img">
                      <a href="" class="display-block" target="_blank">
                        <img class="scrollLoading"
                             src="/static/images/lazy.png" alt="">
                      </a>
                      <countdown :startTime="item.policyStartTime" :endTime="item.policyEndTime" :systemTime="item.systemTime" @timerOver="countDownOver"></countdown>
                    </div>
                    <div class="uk-width right">
                      <a href=""
                         class="display-block" target="_blank">
                        <p class="product-name">
                          {{item.itemName}}
                        </p>
                      </a>
                      <p class="crumb">{{item.itemFeature}}</p>
                      <div class="price-group">
                        <span class="shopping-price">¥{{item.samplePrice}}</span>
                        <span class="origin-price">¥{{item.price.toFixed(2)}}</span>
                      </div>
                      <div class="repertory-group">
                        <span>库存:{{item.onhand}}台</span>
                        <span>在途:{{item.remainQty}}台</span>
                      </div>
                      <div class="mt-70">
                        <div class="change-number">
                          <input
                            type="number"
                            class="number"
                            v-model="item.count"
                          >
                          <span class="plus" @click="plus(item)">+</span>
                          <span class="minus" :class="{'not-allowed':item.count <= 1}" @click="minus(item)">-</span>
                        </div>
                        <button class="uk-button uk-button-danger uk-button-large subtn quickToBuySp"
                                type="button"
                        >立即抢购
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="page-wrap">
            <div class="paginate">
              <pagination :totalPage="10"></pagination>
            </div>
          </div>
        </div>
        <div class="pro-cart" id="selectedSp" v-if="getCartList.cartList.length">
          <div>
            <div class="total-account" id="totalNumber">
              <span class="choose">已选择<em>{{ getCartList.totalNumber }}</em>件商品
              </span>
              <span>总价：<em class="total-price">¥ {{ getCartList.totalPrice }}</em></span>
            </div>
            <div class="select-container">
              <div class="overflow-hidden">
                <ul class="grid grid-width-1-4 grid-collapse" v-if="getCartList.cartList.length > 4"
                    :style="{width: selItem.selList.length * 258 +'px'}"
                    id="selected-sp">
                  <li class="width" style="width:  258px" v-for="(item, index) in getCartList.cartList">
                    <a href="" class="display-block"  target="_blank">
                      <div class="grid grid-collapse border">
                        <div class="width" style="width: 90px">
                          <img src="/static/images/lazy.png" alt="">
                        </div>
                        <div class="width" style="width: 120px">
                          <div style="padding-right: 12px">
                            <p class="s-product-name" :title="item.itemName">
                              {{item.itemName}}
                            </p>
                            <p class="shopping-price">¥{{item.specialPrice}}</p>
                          </div>
                        </div>
                        <div class="width s-number" style="width: 47px">
                          <i>x</i>
                          <span>{{item.count}}</span>
                        </div>
                      </div>
                    </a>
                  </li>
                </ul>
                <ul class="grid grid-width-1-4 grid-collapse"
                    id="selected-sp" style="width: 100%" v-else>
                  <li v-for="(item, index) in getCartList.cartList">
                    <a href="" class="display-block"  target="_blank">
                      <div class="grid grid-collapse border">
                        <div class="width-31" style="width: 76px;">
                          <img src="/static/images/lazy.png" alt=""
                               :title="item.itemName">
                        </div>
                        <div class="width-51" style="width: 125px">
                          <div style="padding-right: 12px">
                            <p class="s-product-name">
                              {{item.itemName}}
                            </p>
                            <p class="shopping-price">¥{{item.samplePrice}}</p>
                          </div>
                        </div>
                        <div class="width-18 s-number" style="width: 44px;">
                          <i>x</i>
                          <span>{{item.count}}</span>
                        </div>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
              <a class="prev hide">
                <img src="/static/images/left-arrow.png" alt="">
              </a>
              <a class="next" v-if="getCartList.cartList.length > 4">
                <img src="/static/images/right-arrow.png" alt="">
              </a>
              <button class="uk-button uk-button-danger buyBtn">购买</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import policyTab from '../components/common/policyTab.vue';
  import myHeader from '../components/header/header.vue';
  import {getSpecialPriceService} from '../service/getData';
  import {getStore} from "../config/mUtil";
  import countdown from '../components/common/countdown.vue';
  import pagination from '../components/common/pagination.vue';
  export default {
    data(){
      return {
        postData: {  //请求接口的参数
          catId: '',
          pageSize: 4,
          pageIndex: 1
        },
        specialPriceList: [], //特价商品列表
        currentCatId: '',  //当前显示的catId
        checkedList: [],
        selectedList: [],
      }
    },
    computed: {
      getCartList(){
        let cartList = [];
        this.checkedList.forEach((item) => {
          if(item.catId == this.currentCatId){
            cartList.push(item);
          }
        });
        let total = this.calc(cartList)
        return {
          totalPrice: total.totalPrice,
          totalNumber: total.totalNumber,
          cartList: cartList
        };
      },
    },
    components: {
      policyTab,
      myHeader,
      countdown,
      pagination
    },
    methods: {
      countDownOver(){
       console.log('结束');
       this.initData();
      },
      initData(){
        let catId;
        if(!this.currentCatId){
          catId = getStore('defaultCatId');
        }else {
          catId = this.currentCatId;
        }
        this.currentCatId = catId;
        this.postData.catId = catId;
        getSpecialPriceService(this.$http, this.postData).then((res) => {
          if(!res.length){
            return;
          }
          res.forEach((item) => {
            item.count = 1; //接口拿回来的数据的默认数量设置为1
          });
          this.specialPriceList.push({catId: catId, spList: res});
        }, (error) => {
          console.log(error);
        })
      },
      getBooks(bookId){
          let f = false;
        this.currentCatId = bookId;
        this.specialPriceList.forEach((item)=> {
          if(item.catId == bookId){
           f = true;
          }
        })
        if(!f){
          this.initData();
        }
      },
      //计算加购物车的总数量和总价格
      calc(arr){
        let totalPrice = 0;
        let totalNumber = 0;
        arr.forEach(s => {
          totalNumber += s.count;
          totalPrice += s.count * s.samplePrice;
        })
        return {
          totalPrice: totalPrice,
          totalNumber: totalNumber
        }
      },
      plus(item){
        item.count++;
      },
      minus(item){
        let value = item.count;
        item.count = value > 1 ? value-1 : 1;
      }
    },
    mounted(){
      this.initData();
    }
  }
</script>
<style lang="scss" scoped>
  @import '../assets/style/common';
  .sp-wrap {
    background: #f2f2f2;
    min-width: 1200px;
  }

  //specialPrice  css
  .mt-70 {
    margin-top: 65px;
  }

  #selected-sp {
    position: absolute;
    left: 0;
    top: 0;
  }

  #specialPrice {
    & > ul {
      display: none;
      &.show {
        display: block;
      }
    }
  }
  $smallFont: 12px;
  $color: rgb(134, 134, 134);
  $btnBgcolor: #FF5028;
  $containerBgColor: #f2f2f2;
  $priceColor: #FF5028;
  $goodsNameColor: #333333;
  $originPriceColor: #3F3F3F;
  $numberBgColor: rgb(252, 178, 60);
  $smallFont: 12px;
  $timeColor: #333333;

  .current-show{
    padding-bottom: 40px;
  }
  .uk-width-51 {
    width: 51%;
  }

  .uk-width-31 {
    width: 31%;
  }

  .uk-width-18 {
    width: 18%;
  }

  .display-block {
    display: block;
  }

  img {
    max-width: 100%;
  }

  .container {
    background: $containerBgColor;
    min-width: 1200px;
  }

  .clear-inline-space {
    font-size: 0;
    & > * {
      font-size: 16px;
    }
  }

  .uk-margin-top {
    margin-top: 20px !important;
  }

  .uk-display-inline-block {
    display: inline-block;
  }

  //倒计时
  .countdown {
    //position: relative;
    //padding-left: 18px;
    font-size:0;
    line-height: 20px;
    height: 20px;
    span {
      font-size: $smallFont;
      display: inline-block;

      &.ref {
        color: #999999;
      }
      &.time {
        min-width: 26px;
        height: 16px;
        // text-align: center;
        font-size: 16px;
        color: $timeColor;
      }
      &.countdown-png {
        width: 14px;
        height: 14px;
        //position: absolute;
        //top: 50%;
        //left: 0;
        //margin-top: -7px;
       // background: url("../../../static/images/countdown.png") no-repeat center center;
        -webkit-background-size: cover;
        background-size: cover;
        vertical-align: sub;
        margin-right: 5px;
      }
    }
  }
  .right{
    width: 275px;
    .officialNo{
      line-height: 22px;
      font-size: 12px;
      color: #999;
    }
  }
  .policy-content {
    .list-bg-color {
      background: $white;
      &.panel-box {
        padding:25px 25px 30px;
      }
    }
    .wrap-img{
      width: 250px;
      text-align: center;
      .display-block{
        margin-bottom: 20px;
      }
    }
    .mt-10 > li:nth-child(n+3) {
      margin-top: 10px;
    }
    img {
      height: 194px;
      margin:0 auto;
    }
    .price {
      font-size: 18px;
      color: $priceColor;
    }

    .product-name {
      height:48px;
      line-height: 24px;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 14px;
      color: $goodsNameColor;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }

    .crumb {
      font-size: 12px;
      color: #999999;
      line-height: 32px;
    }
    .price-group {
      line-height: 32px;
      height: 32px;
      .shopping-price {
        font-size: 18px;
        color: $priceColor;
      }
      .origin-price {
        font-size: 12px;
        color: #999;
        text-decoration: line-through;
        margin-left: 10px;
      }
    }
    .repertory-group {
      font-size: 12px;
      line-height: 24px;
    }
  }
  //复选框样式
  .checkbox {
    position: relative;
    width: 20px;
    line-height: 245px;
    input {
      opacity: 0;
      position: absolute;
      top: 50%;
      margin-top: -7px;
      & + label {
        background-color: white;
        border: 1px solid #d3d3d3;
        width: 12px;
        height: 12px;
        display: inline-block;
        text-align: center;
        vertical-align: middle;
        line-height: 12px;
      }
      &:checked + label {
        width: 14px;
        height: 14px;
        border: 0;
        background: url('../assets/images/radio.png') no-repeat;
        background-size: 14px 14px;
      }
      &:disabled + label {
        cursor: not-allowed;
      }
    }
  }
  .policy-content {
    //倒计时没开始的样式
    .not-start {
      .countdown > span.time {
        color: #999999;
      }
      .change-number {
        display: none;
      }
      .subtn {
        background: #CCCCCC;
        cursor: not-allowed;
      }
    }
    //倒计时已经开始
    .start {
      .change-number {
        display: block;
      }
    }
    .not-buy{
      .change-number {
        display: none;
      }
      .subtn {
        background: #CCCCCC;
        cursor: not-allowed;
      }
    }
  }
  //修改数量的样式
  .change-number {
    width: 48px;
    height: 42px;
    overflow: hidden;
    border: 1px solid #ccc;
    position: relative;
    margin-right: 10px;
    float: left;
    input {
      display: block;
      width: 34px;
      height: 42px;
      line-height: 42px;
      position: absolute;
      top: 1px;
      left: 0;
      border: 0;
      text-align: center;
    }
    span {
      display: block;
      width: 15px;
      text-align: center;
      height: 21px;
      line-height: 21px;
      overflow: hidden;
      background: #f1f1f1;
      color: #666;
      position: absolute;
      right: -1px;
      border: 1px solid #ccc;
      cursor: pointer;
      &.plus {
        top: -1px;
      }
      &.minus {
        bottom: -1px;
      }
      &.not-allowed {
        color: #ccc;
        cursor: not-allowed;
      }
    }
  }
  .uk-button {
    font-size: 16px;
    margin: 0;
    border: none;
    overflow: visible;
    font: inherit;
    text-transform: none;
    box-sizing: border-box;
    text-decoration: none;
    text-align: center;
    cursor: pointer;
    border-radius: 0;
    -webkit-border-radius: 0;
    -moz-border-radius: 0;
  }

  .uk-button-danger {
    background-color: $btnBgcolor;
    color: #fff;
  }

  .uk-button-large {
    min-height: 44px;
    padding: 0 48px;
    line-height: 44px;
  }

  //去除input type=number的上下箭头
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none !important;
    margin: 0;
  }

  input[type="number"] {
    -moz-appearance: textfield;
  }

  //selected  product css
  .pro-cart {
    .mt-40 {
      margin-top: 40px;
    }
    .total-account {
      background: #fff;
      display: inline-block;
      padding: 15px 20px;
      font-size: 0;
      span {
        display: inline-block;
        line-height: 20px;
        font-size: 16px;
        color: #333333;
      }
      .choose {
        em {
          display: inline-block;
          text-align: center;
          color: $btnBgcolor;
          font-size: 20px;
          line-height: 20px;
          font-weight: bold;
        }
        & + span {
          margin-left: 10px;
        }
      }
      .total-price {
        text-align: left;
        font-size: 16px;
        color: #151515;
        font-weight: bold;
      }
    }

    .select-container {
      background: $white;
      padding: 19px 165px 19px 50px;
      position: relative;
      & > a {
        position: absolute;
        top: 40%;
        cursor: pointer;
        &.hide {
          display: none;
        }
        img {
          width: 11px;
          height: 22px;
        }
        &.prev {
          left: 20px;
        }
        &.next {
          right: 135px;
        }
      }
      & > button {
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        width: 115px;
        padding: 0;
        font-size: 18px;
      }
      .overflow-hidden {
        width: 100%;
        overflow: hidden;
        position: relative;
        height: 77px;
        & > ul {
          .border {
            border-right: 1px solid #EEEEEE;
          }
          .display-block {
            display: block;
            width: 100%;
            height: 100%;
          }
          img {
            height: 60px;
            margin: 0 auto;
          }
          .s-product-name {
            height: 51px;
            overflow: hidden;
            font-size: 12px;
            line-height: 17px;
            color: #666666;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
          }
          .shopping-price {
            color: $btnBgcolor;
            margin-top: 10px;
            line-height: 16px;
          }

          .s-number {
            padding-top: 25px;
            font-size: 0;
            & > span, & > i {
              display: inline-block;
              color: #333333;
              letter-spacing: 0;
              font-style: normal;
            }
            & > span {
              padding-left: 3px;
              font-size: 18px;
              line-height: 16px;
            }
            & > i {
              font-size: 12px;
              line-height: 12px;
            }
          }
        }
        &:after {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          width: 2px;
          right: 0;
          background: $white;
        }
      }
    }
  }

  .pro-cart > div {
    padding-bottom: 40px;
  }



</style>
