<template>
  <div class="ratingselect">
    <div class="rating-type">
      <span @click="select(2, $event)" class="block positive" :class="{'active':selectTypeBind==2}">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
      <span @click="select(0, $event)" class="block positive" :class="{'active':selectTypeBind==0}">{{desc.positive}}<span class="count">{{positives.length}}</span></span>
      <span @click="select(1, $event)" class="block negative" :class="{'active':selectTypeBind==1}">{{desc.negative}}<span class="count">{{negatives.length}}</span></span>
    </div>
    <div @click="toggleContent" class="switch" :class="{'on':onlyContentBind}">
      <span class="icon-check_circle"></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  const POSITIVE = 0;
  const NEGATIVE = 1;
  const ALL = 2;
  export default {
    props: {
//    评价
      ratings: {
        type: Array,
        default() {
          return [];
        }
      },
//    当前类型
      selectType: {
        type: Number,
        default: ALL
      },
//    是否只显示有的内容
      onlyContent: {
        type: Boolean,
        default: false
      },
//    选项描述
      desc: {
        type: Object,
        default() {
          return {
            all: '全部',
            positive: '满意',
            negative: '不满意'
          };
        }
      }
    },
    computed: {
      positives() {
        return this.ratings.filter((rating) => {
          return rating.rateType === POSITIVE;
        });
      },
      negatives() {
        return this.ratings.filter((rating) => {
          return rating.rateType === NEGATIVE;
        });
      }
    },
//  不能修改从父组件中传来的selectType,所以将其赋予data中(不是object所以不能使用vue.set)
    data() {
      return {
        selectTypeBind: this.selectType,
        onlyContentBind: this.onlyContent
      };
    },
//  监听复制props的data内容变化,将其传递到bus中心,实现双向数据绑定
    watch: {
      selectType(val) {
        this.selectTypeBind = val;
      },
      selectTypeBind(val) {
        this.selectTypeBind = val;
        this.$bus.$emit('ratingtypeSelect', this.selectTypeBind);
      },
      onlyContent(val) {
        this.onlyContentBind = val;
      },
      onlyContentBind(val) {
        this.onlyContentBind = val;
        this.$bus.$emit('contentToggle', this.onlyContentBind);
      }
    },
    methods: {
      select(type, event) {
        if (!event._constructed) {
          return;
        }
        this.selectTypeBind = type;
      },
      toggleContent(event) {
        if (!event._constructed) {
          return;
        }
        this.onlyContentBind = !this.onlyContentBind;
      }
    }
  };
</script>

<style type="text/css">
  .ratingselect .rating-type {
    padding: 18px 0;
    margin: 0 18px;
    border-bottom: 1px solid rgba(7, 17, 27, .1);
    font-size: 0;
  }

  .ratingselect .rating-type .block {
    display: inline-block;
    padding: 8px 12px;
    margin-right: 8px;
    border-radius: 1px;
    color: rgb(77, 85, 93);
    font-size: 12px;
    line-height: 16px;
  }

  .ratingselect .rating-type .block.active {
    color: #fff;
  }

  .ratingselect .rating-type .block .count {
    font-size: 8px;
    margin-left: 2px;
  }

  .ratingselect .rating-type .block.positive {
    background-color: rgba(0, 160, 220, .2);
  }

  .ratingselect .rating-type .block.positive.active {
    background-color: rgb(0, 160, 220);
  }

  .ratingselect .rating-type .block.negative {
    background-color: rgba(77, 85, 93, .2);
  }

  .ratingselect .rating-type .block.negative.active {
    background-color: rgb(77, 85, 93);
  }

  .ratingselect .switch {
    padding: 12px 18px;
    line-height: 24px;
    border-bottom: 1px solid rgba(7, 17, 27, .1);
    color: rgb(147, 153, 159);
    font-size: 0;
  }

  .ratingselect .switch.on .icon-check_circle {
    color: rgb(0, 160, 220);
  }

  .ratingselect .switch .icon-check_circle {
    display: inline-block;
    margin-right: 4px;
    font-size: 24px;
    position: relative;
    top: 6px;
  }

  .ratingselect .switch .text {
    font-size: 12px;
  }

</style>
