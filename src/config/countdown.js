/*!
 * vue-countdown v0.6.0
 * https://github.com/xkeshi/vue-countdown
 *
 * Copyright (c) 2018 Xkeshi
 * Released under the MIT license
 *
 * Date: 2018-03-20T07:26:21.806Z
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
      (global.VueCountdown = factory());
}(this, (function () { 'use strict';

  var MILLISECONDS_SECOND = 1000;  //1秒=1000毫秒
  var MILLISECONDS_MINUTE = 60 * MILLISECONDS_SECOND; //1分钟转的毫秒数
  var MILLISECONDS_HOUR = 60 * MILLISECONDS_MINUTE; //1小时的毫秒数
  var MILLISECONDS_DAY = 24 * MILLISECONDS_HOUR;//1天的毫秒数

  var index = {
    data: function data() {
      return {
        /**
         * Total number of time (in milliseconds) for the countdown.
         * @type {number}
         * 倒计时的总毫秒数
         */
        count: 0,

        /**
         * Define if the time is countdowning.
         * @type {boolean}
         */
        counting: false,

        /**
         * The absolute end time.
         * @type {number}
         */
        endTime: 0
      };
    },


    props: {
      /**
       * Start to countdown automatically when initialized.
       * 初始化时开始倒计时
       */
      autoStart: {
        type: Boolean,
        default: true
      },

      /**
       * Indicate if emit the countdown events or not.
       */
      emitEvents: {
        type: Boolean,
        default: true
      },

      /**
       * Update interval time (in milliseconds) of the countdown.
       * 倒计时的间隔时间
       */
      interval: {
        type: Number,
        default: 1000
      },

      /**
       * Add a leading zero to the output numbers if they are less than 10.
       * 小于10的数值前是否加0
       */
      leadingZero: {
        type: Boolean,
        default: true
      },

      /**
       * Generate the current time of a specific time zone.
       * 生成一个当前时间
       */
      now: {
        type: Function,
        default: function _default() {
          return Date.now();
        }
      },

      /**
       * Total number of time (in milliseconds) for the countdown.
       * 倒计时的总时间
       */
      time: {
        type: Number,
        default: 0,
        required: true,
        validator: function validator(value) {
          return value >= 0;
        }
      },

      /**
       * The tag of the component root element in the countdown.
       * 倒计时组件的根元素
       */
      tag: {
        type: String,
        default: 'span'
      }
    },

    computed: {
      /**
       * Remaining days.
       * 剩下的天数
       * @returns {number}
       */
      days: function days() {
        return Math.floor(this.count / MILLISECONDS_DAY);
      },


      /**
       * Remaining hours.
       * 剩余的总小时数
       * @returns {number}
       */
      hours: function hours() {
        return Math.floor(this.count % MILLISECONDS_DAY / MILLISECONDS_HOUR);
      },


      /**
       * Remaining minutes.
       * 剩余的分钟数
       * @returns {number}
       */
      minutes: function minutes() {
        return Math.floor(this.count % MILLISECONDS_HOUR / MILLISECONDS_MINUTE);
      },


      /**
       * Remaining seconds.
       * 剩余的秒数
       * @returns {number}
       */
      seconds: function seconds() {
        var interval = this.interval;

        var seconds = this.count % MILLISECONDS_MINUTE / MILLISECONDS_SECOND;

        if (interval < 10) {
          return seconds.toFixed(3);
        } else if (interval >= 10 && interval < 100) {
          return seconds.toFixed(2);
        } else if (interval >= 100 && interval < 1000) {
          return seconds.toFixed(1);
        }

        return Math.floor(seconds);
      },


      /**
       * Total remaining days.
       * @returns {number}
       */
      totalDays: function totalDays() {
        return this.days;
      },


      /**
       * Total remaining hours.
       * @returns {number}
       */
      totalHours: function totalHours() {
        return Math.floor(this.count / MILLISECONDS_HOUR);
      },


      /**
       * Total remaining minutes.
       * @returns {number}
       */
      totalMinutes: function totalMinutes() {
        return Math.floor(this.count / MILLISECONDS_MINUTE);
      },


      /**
       * Total remaining seconds.
       * @returns {number}
       */
      totalSeconds: function totalSeconds() {
        return Math.floor(this.count / MILLISECONDS_SECOND);
      }
    },

    render: function render(createElement) {
      var _this = this;  //这里this指的是什么

      var preprocess = function preprocess(value) {
        return _this.leadingZero && value < 10 ? '0' + value : value;  //处理是否加0
      };

      return createElement(this.tag, this.$scopedSlots.default ? [this.$scopedSlots.default({
        days: preprocess(this.days),
        hours: preprocess(this.hours),
        minutes: preprocess(this.minutes),
        seconds: preprocess(this.seconds),
        totalDays: this.totalDays,
        totalHours: this.totalHours,
        totalMinutes: this.totalMinutes,
        totalSeconds: this.totalSeconds
      })] : this.$slots.default);
    },
    created: function created() {
      this.init();
    },
    mounted: function mounted() {
      window.addEventListener('focus', this.onFocus = this.update.bind(this));
    },
    beforeDestroy: function beforeDestroy() {
      window.removeEventListener('focus', this.onFocus);
      clearTimeout(this.timeout);
    },


    watch: {
      time: function time() {
        this.init();
      }
    },

    methods: {
      /**
       * Initialize count.
       */
      init: function init() {
        var _this2 = this;

        var time = this.time;


        if (time > 0) {
          this.count = time;
          this.endTime = this.now() + time;

          if (this.autoStart) {
            this.$nextTick(function () {
              _this2.start();
            });
          }
        }
      },


      /**
       * Start to countdown.
       * @public
       * @emits Countdown#countdownstart
       */
      start: function start() {
        if (this.counting) {
          return;
        }

        if (this.emitEvents) {
          /**
           * Countdown start event.
           * @event Countdown#countdownstart
           */
          this.$emit('countdownstart');
        }

        this.counting = true;
        this.step();
      },


      /**
       * Pause countdown.
       * @public
       * @emits Countdown#countdownpause
       */
      pause: function pause() {
        if (!this.counting) {
          return;
        }

        if (this.emitEvents) {
          /**
           * Countdown pause event.
           * @event Countdown#countdownpause
           */
          this.$emit('countdownpause');
        }

        this.counting = false;
      },


      /**
       * Step to countdown.
       * @private
       * @emits Countdown#countdownprogress
       */
      step: function step() {
        var _this3 = this;

        if (!this.counting) {
          return;
        }

        if (this.emitEvents) {
          /**
           * Countdown progress event.
           * @event Countdown#countdownprogress
           */
          this.$emit('countdownprogress', {
            days: this.days,
            hours: this.hours,
            minutes: this.minutes,
            seconds: this.seconds
          });
        }

        if (this.count > 0) {
          var interval = this.interval;


          this.timeout = setTimeout(function () {
            _this3.count -= interval;
            _this3.step();
          }, interval);
        } else {
          this.count = 0;
          this.stop();
        }
      },


      /**
       * Stop the countdown.
       * @public
       * @emits Countdown#countdownend
       */
      stop: function stop() {
        this.counting = false;
        this.timeout = undefined;

        if (this.emitEvents) {
          /**
           * Countdown end event.
           * @event Countdown#countdownend
           */
          this.$emit('countdownend');
        }
      },


      /**
       * Update the count.
       * @private
       */
      update: function update() {
        if (this.counting) {
          this.count = Math.max(0, this.endTime - this.now());
        }
      }
    }
  };

  return index;

})));
