<template>
  <div class="cartcontrol">
    <transition name="move">
    <div class="cart-decrease" v-show="food.count>0" @click.stop.prevent="decreaseCart">
          <span class="inner icon-remove_circle_outline"></span>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click.stop.prevent="addCart"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue';
  export default {
//  接收每一个商品的数据
    props: {
      food: {
        type: Object
      }
    },
    methods: {
//    设置该商品数据的购买数量属性
      addCart(event) {
        if (!event._constructed) {
          return;
        }
        if (!this.food.count) {
//        接收过来的数据初始无法检测
//        this.food.count = 1;
          Vue.set(this.food, 'count', 1);
        } else {
          this.food.count++;
        }
//        传递该操作的dom节点
          this.$bus.$emit('cartAdd', event.target);
      },
//    减少该商品数据的购买数量属性
      decreaseCart(event) {
        if (!event._constructed) {
          return;
        }
        if (this.food.count) {
          this.food.count--;
        }
      }
    }
  };
</script>

<style type="text/css">
  .cartcontrol {
    font-size: 0;
  }

  .cart-decrease{
    display: inline-block;
    padding:6px;
    -webkit-transition: all .4s;
    -moz-transition: all .4s;
    -ms-transition: all .4s;
    -o-transition: all .4s;
    transition: all .4s;
  }

  .cart-decrease .inner{
    display: inline-block;
    line-height: 24px;
    font-size: 24px;
    color: rgb(0, 160, 220);
    -webkit-transition: all .4s;
    -moz-transition: all .4s;
    -ms-transition: all .4s;
    -o-transition: all .4s;
    transition: all .4s;
  }
  .move-enter-active,.move-leave-active{
    opacity: 1;
    -webkit-transform: translate3d(0,0,0);
    -moz-transform: translate3d(0,0,0);
    -ms-transform: translate3d(0,0,0);
    -o-transform: translate3d(0,0,0);
    transform: translate3d(0,0,0);
  }
  .move-enter,.move-leave-active{
    opacity: 0;
    -webkit-transform: translate3d(24px,0,0);
    -moz-transform: translate3d(24px,0,0);
    -ms-transform: translate3d(24px,0,0);
    -o-transform: translate3d(24px,0,0);
    transform: translate3d(24px,0,0);
  }
  .move-enter-active .inner,.move-leave-active .inner{
    -webkit-transform: rotate(0);
    -moz-transform: rotate(0);
    -ms-transform: rotate(0);
    -o-transform: rotate(0);
    transform: rotate(0);
  }
  .move-enter .inner,.move-leave-active .inner{
    -webkit-transform: rotate(180deg);
    -moz-transform: rotate(180deg);
    -ms-transform: rotate(180deg);
    -o-transform: rotate(180deg);
    transform: rotate(180deg);
  }
  .cart-count {
    display: inline-block;
    vertical-align: top;
    width: 12px;
    padding-top: 6px;
    line-height: 24px;
    text-align: center;
    font-size: 10px;
    color: rgb(147, 153, 159);
  }

  .cart-add {
    display: inline-block;
    line-height: 24px;
    font-size: 24px;
    padding: 6px;
    color: rgb(0, 160, 220);
  }
</style>
