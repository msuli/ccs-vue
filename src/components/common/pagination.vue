<template>
  <div>
    <ul class="uk-list page">
      <li class="uk-display-inline-block fpage" ：class="{'disabled':result.currentIndex==1}" @click="goto">
        <span>上一页</span>
      </li>
      <li class="uk-display-inline-block farry" v-for="x in totalPage" :class="{'active':x==currentIndex}" @click="goto(x)">
        <span ng-bind="x"></span>
      </li>
      <li class="uk-display-inline-block sep" v-if="midsep">
        <span>......</span>
      </li>
      <li class="uk-display-inline-block marry" v-for="x in totalPage" :class="{'active':x==currentIndex}" @click="goto(x)">
        <span>{{ x }}</span>
      </li>
      <li class="uk-display-inline-block sep" v-if="">
        <span>......</span>
      </li>
      <li class="uk-display-inline-block earry" v-for="x in totalPage" :class="{'active':x==currentIndex}" @click="goto(x)">
        <span>{{x}}</span>
      </li>
      <li class="uk-display-inline-block lpage" @click="goto(currentIndex + 1)" :class="{'disabled':totalPage==currentIndex}">
        <span>下一页</span>
      </li>
      <li class="uk-display-inline-block total-page">
        <span>共 <b>{{totalPage}}</b> 页</span>
      </li>
      <li class="uk-display-inline-block qianwang">
        <form @click="goto(totalPage)">
          <span>前往：</span>
          <input type="number" v-model="to">
          <span>页</span>
          <button type="submit" @click="goto(totalPage)">确定</button>
        </form>
      </li>
    </ul>
    <!--页码导航结束-->
  </div>
</template>
<script>
export default{
  props:['totalPage'],
  data(){
    return {
      currentIndex: 0,
      midsep: false,
      to:0
    }
  },
  methods:{
    goto(){

    }
  }
}
</script>
<style lang="scss" scoped></style>
