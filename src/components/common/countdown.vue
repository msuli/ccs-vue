<template>
  <div class="countdown clear-inline-space">
    <span class="countdown-png"></span>
    <span class="ref ref-sta" v-if="started">{{startedText}}:</span>
    <span class="ref ref-sta" v-else>{{notStartedText}}:</span>
    <span class="days time">{{ day }}</span>
    <span class="ref">天</span>
    <span class="hours time">{{ hour }}</span>
    <span class="ref">时</span>
    <span class="minutes time">{{ minute }}</span>
    <span class="ref">分</span>
    <span class="seconds time">{{ second }}</span>
    <span class="ref">秒</span>
  </div>
</template>
<script>
export default{
  props:['startTime', 'endTime', 'systemTime'],
  data(){
    return {
      a: 0,
      day: 0,
      hour: 0,
      minute: 0,
      second: 0,
      timedown: null,
      started: false,
      startedText: '还剩',
      notStartedText: '离开始还剩'
    }
  },
  computed: {
  },
  methods:{
    countdown(){
      let targetTime;
      if(this.startTime > this.systemTime){
        //not start
        targetTime = this.startTime;
      }else{
        //started
        this.started = true;
        targetTime = this.endTime;
      }
      let a = Math.floor((targetTime - this.systemTime) / 1000);
      this.timedown = setInterval(() => {
        if(a<=0){
          this.$emit('timerOver', 'over');
          clearInterval(this.timedown);
        }
        a--;
        const millisecond_second = 1;
        const millisecond_minute = millisecond_second * 60;
        const millisecond_hour = millisecond_minute * 60;
        const millisecond_day = millisecond_hour * 24;
        this.day = Math.floor(a / millisecond_day);
        this.hour = Math.floor(a % millisecond_day / millisecond_hour);
        this.minute = Math.floor(a % millisecond_hour / millisecond_minute );
        this.second = Math.floor(a % millisecond_minute/millisecond_second);
      }, 1000);
    }
  },
  mounted(){
      this.countdown();
  }

}
</script>
<style scoped lang="scss">
  @import "../../assets/style/variable";
  .countdown {
    font-size:0;
    line-height: 20px;
    height: 20px;
    span {
      font-size: $font12;
      display: inline-block;

      &.ref {
        color: #999999;
      }
      &.time {
        min-width: 26px;
        height: 16px;
        font-size: 16px;
        color: $color3;
      }
      &.countdown-png {
        width: 14px;
        height: 14px;
        background: url("/static/images/countdown.png") no-repeat center center;
         -webkit-background-size: cover;
        background-size: cover;
        vertical-align: sub;
        margin-right: 5px;
      }
    }
  }
</style>
