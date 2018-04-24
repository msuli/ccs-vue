<template>
  <div class="header">
    <div class="topbar">
      <div class="container container-center">
        <div class="clear">
          <div class="fl">
            <slot name="goHome"></slot>
          </div>
          <div class="fr">
            <ul>
              <li class="fl">
                <a href="">JOIN</a>
              </li>
              <li class="line fl">|</li>
              <li class="fl">
                <a href="">我的订单</a>
              </li>
              <li class="line fl">|</li>
              <li class="fl">
                <a href="">消息</a>
              </li>
              <li class="line fl">|</li>
              <li class="fl">
                <a href="">手机版</a>
              </li>
              <li class="line fl">|</li>
              <li class="fl">
                <a href="">帮助中心</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="container container-center">
      <div class="grid logo grid-collapse">
        <div class="width w-540">
          <h2>
            <a href="" class="logo-img">原来生活可以更美的</a>
            <slot name="title"></slot>
          </h2>
        </div>
        <div class="width w-660 clear">
          <div class="form fl" v-if="showSearch">
            <input type="text" class="text">
            <button type="button" class="search-button">搜索</button>
          </div>
          <div class="cart fl" v-if="showSearch">
            <a href="">
              <i class="iconfont icon-gouwuche5"></i>
              <span>我的购物车</span>
              <span>15</span>
              <i class="iconfont">&#xe649;</i>
            </a>
          </div>
          <ul v-if="showProgressBar" class="progressbar fr" id="progressBar">
            <li class="progress-li">
              <span class="number">1</span>
              <span class="text">我的购物车</span>
            </li>
            <li class="progress-li">
              <span class="number">2</span>
              <span class="text">填写订单</span>
            </li>
            <li class="progress-li">
              <span class="number">3</span>
              <span class="text">确认付款</span>
            </li>
          </ul>
        </div>
      </div>
      <!-- 导航栏和分类 -->
      <div class="nav" v-if="showCat">
        <!--v-on:mouseenter="showSecondCategory=true" v-on:mouseleave="showSecondCategory=false" :class="{'second-div': showSecondCategory}"-->
        <div class="cat" v-on:mouseenter="mEnter" v-on:mouseleave="mLeave">
          <div><i class="icon"></i> 商品分类</div>
          <ul class="cat-list" v-show="showSecondCategory">
            <li class="cat-item">
              <a>洗衣机</a>
              <div class="div-second-cat">
                <ul class="second-cat">
                  <li><a href="">滚筒</a></li>
                </ul>
              </div>
            </li>
            <li class="cat-item">
              <a>家用空调</a>
              <div class="div-second-cat">
                <ul class="second-cat">
                  <li><a href="">挂机</a></li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <ul class="subnav clear" v-if="roleType===1">
          <li class="active"><a href="">首页</a></li>
          <li>
            <router-link to="/specialPrice" target="_blank">特价</router-link>
          </li>
          <li class=""><a href="">套餐</a></li>
          <li class=""><a href="">出样</a></li>
          <li class=""><a href="">众筹</a></li>
        </ul>
        <ul class="subnav clear" v-else>
          <li class=""><a href="">工程</a></li>
          <li class=""><a href="">限量</a></li>
        </ul>
      </div>

    </div>
  </div>
</template>
<script>
  export default{
    props: {
      showSearch: {  //是否显示搜索
        type: Boolean,
        default: true //这样可以指定默认的值
      },
      roleType: {  //根据角色显示不同的nav
        type: Number,
        default: 1
      },
      showSecondCat: {  //是否显示二级分类
        type: Boolean,
        default: false
      },
      showCat: {   //是否显示分类
        type: Boolean,
        default: true
      },
      showProgressBar: {   //是否显示进度条
        type: Boolean,
        default: false
      }
    },
    data(){
      return {
        showSecondCategory: this.showSecondCat
      }
    },
    methods: {
      mEnter(){
        if(this.showSecondCat){
            return;
        }else{
           this.showSecondCategory = true;
        }
      },
      mLeave(){
        if(this.showSecondCat){
          return;
        }else{
          this.showSecondCategory = false;
        }
      }
    }
  }
</script>
<style scoped lang="scss">
  @import "../../assets/style/common.scss";

  .topbar {
    background: $containerBgColor;
    a {
      display: inline-block;
      padding: 6px 10px;
      color: $color6;
    }
    .line {
      padding: 6px 0;
      color: $borderColor;
    }
  }

  .logo {
    padding: 22px 0;
    .logo-img {
      display: inline-block;
      width: 129px;
      height: 56px;
      background: url("../../assets/images/logo.png") no-repeat;
      text-indent: -999rem;
    }
    .msg {
      font-size: 24px;
      position: absolute;
      font-weight: 400;
      color: #999;
      padding-left: 20px;
    }
    .w-540 {
      width: 540px;
    }
    .w-660 {
      width: 660px;
    }
    .form {
      position: relative;
      width: 460px;
      height: 50px;
      .text {
        width: 392px;
        height: 50px;
        border: 1px solid $borderColor;
        padding: 5px 10px;
        position: absolute;
        top: 0;
        left: 0;
        box-sizing: border-box;
      }
      .search-button {
        position: absolute;
        top: 0;
        left: 392px;
        width: 68px;
        font-size: $font14;
        background: $mainColor;
        color: $white;
        height: 50px;
        text-align: center;
        line-height: 48px;
        border: 0;
      }
    }
    .cart {
      margin-left: 15px;
      border: 1px solid $borderColor;
      a {
        display: block;
        box-sizing: border-box;
        padding: 15px 15px;
        font-size: 0;
        & > * {
          font-size: 12px;
          margin-right: 10px;
        }
        .iconfont {
          color: #666;
        }
      }
    }
  }

  .nav {

    .cat {
      position: relative;
      float: left;
      font-family: PingFangSC-Medium;
      color: $white;
      & > div {
        font-size: $font16;
        padding: 11px 53px;
        background: $mainColor * 0.9;
        border-bottom: 4px solid $mainColor * 0.9;
      }
      .icon {
        display: inline-block;
        width: 15px;
        height: 11px;
        // background: url('../../../static/images/allNaneIcom.png') no-repeat;
      }
      &.second-div .cat-list {
        display: none;
      }
      .cat-list {
        background: $mainColor;
        height: 400px;
        position: absolute;
        left: 0;
        right: 0;
        top: 44px;
        padding-left: 2px;
        z-index: 2;
        &.secondCat {
          display: none;
        }
        & > li {
          font-size: $font14;
          padding: 10px 20px;
          &:hover {
            background: $white;
            color: $mainColor;
            & > a {
              color: $mainColor;
            }
          }
          & > a {
            color: $white;
            font-size: 14px;
          }

          .div-second-cat {
            position: absolute;
            top: -2px;
            left: 189px;
            width: 280px;
            border: 2px solid $mainColor;
            border-left: 0;
            height: 402px;
            background: $white;
            padding: 15px 0;
            box-sizing: border-box;
            display: none;
            z-index: 2;
            &.sec-active {
              display: block;
              a:hover {
                color: $mainColor;
              }
            }
          }
          .second-cat {
            float: left;
            height: 100%;
            & + .second-cat {
              border-left: 1px dashed #CCCCCC;
            }
            & > li {
              padding: 10px 37px;
              a {
                font-size: 14px;
                color: $color3;
              }
            }
          }
        }
      }
    }
    .subnav {
      margin-left: 200px;
      li {
        float: left;
        list-style: none;
        margin-left: 50px;
        &.active a {
          color: $mainColor;
        }
        a {
          font-family: PingFangSC-Medium;
          font-size: $font16;
          color: #222222;
          display: block;
          height: 44px;
          line-height: 44px;
        }
      }
    }
  }

  .progressbar {
    padding: 16px 0;
    .progress-li {
      float: left;
      position: relative;
      width: 140px;
      height: 6px;
      background: #D8D8D8;
      border-radius: 4px;
      text-align: center;
      &:nth-child(1) {
        background: #ACE75C;
        .number {
          background: #ACE75C;
        }
      }
      &:nth-child(2) {
        background: #8ECD38;
        z-index: 1;
        left: -4px;
        .number {
          background: #8ECD38;
        }
      }
      &:nth-child(3) {
        left: -8px;
        .number {
          background: #D8D8D8;
        }
      }
      .number {
        position: absolute;
        top: -6px;
        left: 61px;
        width: 18px;
        height: 18px;
        background: #ace75c;
        border-radius: 50%;
        color: #fff;
      }
      .text {
        position: absolute;
        top: 18px;
        transform: translateX(-50%);
        color: $color9;
      }
    }
  }
</style>
