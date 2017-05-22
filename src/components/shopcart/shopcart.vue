<template>
  <div>
  <div class="shopcart">
    <div class="content" @click="toggleList">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo" :class="{'active':totalCount>0}">
            <i class="icon-shopping_cart" :class="{'active':totalCount>0}"></i>
          </div>
          <div class="num" v-show="totalCount>0">{{totalCount}}</div>
        </div>
        <div class="price" :class="{'active':totalPrice>0}">￥{{totalPrice}}</div>
        <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
      </div>
      <div class="content-right" @click.stop.prevent="pay">
        <div class="pay" :class="{'active':totalPrice>=minPrice}">{{payDesc}}</div>
      </div>
    </div>
    <div class="ball-container">
      <transition name="drop"
                  v-on:before-enter="beforeEnter"
                  v-on:enter="enter"
                  v-on:after-enter="afterEnter"
                  v-for="ball in balls">
        <div v-show="ball.show" class="ball">
          <div class="inner innerHook"></div>
        </div>
      </transition>
    </div>
    <transition name="fold">
      <div class="shopcart-list" v-show="listShow">
        <div class="list-header">
          <h1 class="title">购物车</h1>
          <span class="empty" @click="empty">清空</span>
        </div>
        <div class="list-content" ref="shopcartList">
          <ul>
            <li class="food" v-for="food in selectFoods">
              <span class="name">{{food.name}}</span>
              <div class="price">
                <span>￥{{food.price*food.count}}</span>
              </div>
              <div class="cartcontrol-wrapper">
                <cartcontrol :food="food"></cartcontrol>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
    <transition name="fade">
  <div class="list-mask" v-show="listShow" @click="hideList"></div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import cartcontrol from 'components/cartcontrol/cartcontrol';
  import BScroll from 'better-scroll';
  //  props若是object或数组则定义默认的时候需要以函数的形式
  //  接收来自goods组件传来的所选商品数组数据,商家的配送费,商家的起送价
  export default {
    props: {
      selectFoods: {
        type: Array,
        default() {
          return [];
        }
      },
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      }
    },
//  定义data数据供小球抛物线动画中使用
    data() {
      return {
        balls: [
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          }
        ],
        dropBalls: [],
        fold: true
      };
    },
    computed: {
//    遍历用户所选商品计算总价
      totalPrice() {
        var total = 0;
        this.selectFoods.forEach((food) => {
          total += food.price * food.count;
        });
        return total;
      },
//    遍历用户所选商品数量
      totalCount() {
        var count = 0;
        this.selectFoods.forEach((food) => {
          count += food.count;
        });
        return count;
      },
//    商品描述的定义
      payDesc() {
        if (parseInt(this.totalPrice) === 0) {
          return '￥' + this.minPrice + '元起送';
        } else if (this.totalPrice < this.minPrice) {
          var diff = this.minPrice - this.totalPrice;
          return '还差' + diff + '元起送';
        } else {
          return '去结算';
        }
      },
//    控制面板是否显示
      listShow() {
        if (!this.totalCount) {
          this.fold = true;
          return false;
        }
        var show = !this.fold;
//      购物车列表显示时进行初始化
        if (show) {
          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new BScroll(this.$refs.shopcartList, {
                startX: 0,
                startY: 0,
                click: true
              });
            } else {
//            Bscroll提供的重新渲染方法
              this.scroll.refresh();
            }
          });
        }
        return show;
      }
    },
    created() {
//    体验优化,异步执行动画
      this.$nextTick(() => {
        this.drop();
      });
    },
    methods: {
      drop() {
        var that = this;
//      接收来自bus中枢传来的添加商品操作的dom节点
        this.$bus.$on('cartAdd', function (el) {
          for (var i = 0; i < that.balls.length; i++) {
            var ball = that.balls[i];
//          该球未被使用时改变show状态
            if (!ball.show) {
              ball.show = true;
              ball.el = el;
//            将该球添加到动画序列数组
              that.dropBalls.push(ball);
              return;
            }
          }
        });
      },
//    点击遮罩隐藏购物车列表
      hideList() {
        this.fold = true;
      },
//    清空购物车
      empty() {
        this.selectFoods.forEach((food) => {
          food.count = 0;
        });
      },
//    控制面板是否折叠
      toggleList() {
        if (!this.totalCount) {
          return;
        }
        this.fold = !this.fold;
      },
      pay() {
        if (this.totalPrice < this.minPrice) {
          return;
        }
        window.alert('支付' + this.totalPrice + '元');
      },
      beforeEnter(el) {
        var count = this.balls.length;
        while (count--) {
          var ball = this.balls[count];
          if (ball.show) {
//          获取xy偏移量
            var rect = ball.el.getBoundingClientRect();
            var x = rect.left - 32;
            var y = -(window.innerHeight - rect.top - 22);
            el.style.display = '';
            el.style.webkitTransform = 'translate3d(0,' + y + 'px,0)';
            el.style.transform = 'translate3d(0,' + y + 'px,0)';
            var inner = el.getElementsByClassName('innerHook')[0];
            inner.style.webkitTransform = 'translate3d(' + x + 'px,0,0)';
            inner.style.transform = 'translate3d(' + x + 'px,0,0)';
          }
        }
      },
      enter(el) {
        var rf = el.offsetHeight;
        this.$nextTick(() => {
          el.style.webkitTransform = 'translate3d(0,0,0)';
          el.style.transform = 'translate3d(0,0,0)';
          var inner = el.getElementsByClassName('innerHook')[0];
          inner.style.webkitTransform = 'translate3d(0,0,0)';
          inner.style.transform = 'translate3d(0,0,0)';
        });
      },
      afterEnter(el) {
//      shift() 方法用于把数组的第一个元素从其中删除，并返回第一个元素的值;回到原有状态
        var ball = this.dropBalls.shift();
        if (ball) {
          ball.show = false;
          el.style.display = 'none';
        }
      }
    },
    components: {
      cartcontrol: cartcontrol
    }
  };
</script>

<style type="text/css">
  .shopcart {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 50;
    width: 100%;
    height: 48px;
    color: rgba(255, 255, 255, .4);
  }

  .shopcart .content {
    display: flex;
    background-color: #141d27;
    font-size: 0;
  }

  .shopcart .content-left {
    flex: 1;
  }

  .shopcart .logo-wrapper {
    display: inline-block;
    position: relative;
    top: -10px;
    margin: 0 12px;
    padding: 6px;
    width: 56px;
    height: 56px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    vertical-align: top;
    border-radius: 50%;
    background-color: #141d27;
  }

  .logo-wrapper .num {
    position: absolute;
    top: 0;
    right: 0;
    width: 24px;
    height: 16px;
    line-height: 16px;
    text-align: center;
    border-radius: 16px;
    font-size: 9px;
    font-weight: 700;
    color: #fff;
    background-color: rgb(240, 20, 20);
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, .4);
  }

  .shopcart .logo {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    text-align: center;
    background-color: #2b343c;
  }

  .shopcart .logo.active {
    background-color: rgb(0, 160, 220);
  }

  .shopcart .icon-shopping_cart.active {
    color: #fff;
  }

  .shopcart .icon-shopping_cart {
    line-height: 44px;
    font-size: 24px;
    color: #80858a;
  }

  .shopcart .price {
    display: inline-block;
    vertical-align: top;
    line-height: 24px;
    margin-top: 12px;
    padding-right: 12px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border-right: 1px solid rgba(255, 255, 255, .1);
    font-size: 16px;
    font-weight: 700;
  }

  .shopcart .price.active {
    color: #fff;
  }

  .shopcart .desc {
    display: inline-block;
    vertical-align: top;
    margin: 12px 0 0 12px;
    line-height: 24px;
    font-size: 10px;
  }

  .shopcart .content-right {
    flex: 0 0 105px;
    width: 105px;
  }

  .shopcart .pay {
    height: 48px;
    line-height: 48px;
    text-align: center;
    font-size: 12px;
    font-weight: 700;
    background-color: #2b333b;
  }

  .shopcart .pay.active {
    background-color: #00b43c;
    color: #fff;
  }

  .ball-container .ball {
    position: fixed;
    left: 32px;
    bottom: 22px;
    z-index: 200;
    -webkit-transition: all .4s cubic-bezier(0.49, -0.29, 0.75, 0.41);
    -moz-transition: all .4s cubic-bezier(0.49, -0.29, 0.75, 0.41);
    -ms-transition: all .4s cubic-bezier(0.49, -0.29, 0.75, 0.41);
    -o-transition: all .4s cubic-bezier(0.49, -0.29, 0.75, 0.41);
    transition: all .4s cubic-bezier(0.49, -0.29, 0.75, 0.41);
  }

  .ball-container .ball .inner {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: rgb(0, 160, 220);
    -webkit-transition: all .4s linear;
    -moz-transition: all .4s linear;
    -ms-transition: all .4s linear;
    -o-transition: all .4s linear;
    transition: all .4s linear;
  }

  .shopcart .shopcart-list {
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
    width: 100%;
    -webkit-transform: translate3d(0, -100%, 0);
    -moz-transform: translate3d(0, -100%, 0);
    -ms-transform: translate3d(0, -100%, 0);
    -o-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
  }

  .fold-enter-active {
    animation: bounce-in .5s;
    -webkit-animation: bounce-in .5s;;
    -o-animation: bounce-in .5s;;
  }

  .fold-leave-active {
    animation: bounce-out .5s;
    -webkit-animation: bounce-out .5s;;
    -o-animation: bounce-out .5s;;
  }

  @keyframes bounce-in {
    0% {
      transform: translate3d(0, 0, 0);
    }
    100% {
      transform: translate3d(0, -100%, 0);
    }
  }

  @keyframes bounce-out {
    0% {
      transform: translate3d(0, -100%, 0);
    }
    100% {
      transform: translate3d(0, 0, 0);
    }
  }

  @-webkit-keyframes bounce-in {
    0% {
      -webkit-transform: translate3d(0, 0, 0);
    }
    100% {
      -webkit-transform: translate3d(0, -100%, 0);
    }
  }

  @-webkit-keyframes bounce-out {
    0% {
      -webkit-transform: translate3d(0, -100%, 0);
    }
    100% {
      -webkit-transform: translate3d(0, 0, 0);
    }
  }

  @-o-keyframes bounce-in {
    0% {
      -o-transform: translate3d(0, 0, 0);
    }
    100% {
      -o-transform: translate3d(0, -100%, 0);
    }
  }

  @-webkit-keyframes bounce-out {
    0% {
      -o-transform: translate3d(0, -100%, 0);
    }
    100% {
      -o-transform: translate3d(0, 0, 0);
    }
  }

  .shopcart .list-header {
    height: 40px;
    line-height: 40px;
    padding: 0 18px;
    background-color: #f3f5f7;
    border-bottom: 1px solid rgba(7, 17, 27, .1);
  }

  .shopcart .list-header .title {
    float: left;
    font-size: 14px;
    color: rgb(7, 17, 27);
  }

  .shopcart .list-header .empty {
    float: right;
    font-size: 12px;
    color: rgb(0, 160, 220);
  }

  .shopcart .list-content {
    padding: 0 18px;
    max-height: 217px;
    overflow: hidden;
    background-color: #fff;
  }

  .shopcart .list-content .food {
    position: relative;
    padding: 12px 0;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border-bottom: 1px solid rgba(7, 17, 27, .1);
  }

  .shopcart .list-content .name {
    line-height: 24px;
    font-size: 14px;
    color: rgb(7, 17, 27);
  }

  .shopcart .list-content .price {
    position: absolute;
    right: 90px;
    bottom: 12px;
    line-height: 24px;
    font-size: 14px;
    font-weight: 700;
    color: rgb(240, 20, 20);
  }

  .shopcart .cartcontrol-wrapper {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  .list-mask{
    width:100%;
    height:100%;
    position: fixed;
    top:0;
    left:0;
    background-color: rgba(7,17,27,.6);
    opacity:1;
  }
  .fade-enter-active {
    animation: fade-in .5s;
    -webkit-animation: fade-in .5s;;
    -o-animation: fade-in .5s;;
  }

  .fade-leave-active {
    animation: fade-out .5s;
    -webkit-animation: fade-out .5s;;
    -o-animation: fade-out .5s;;
  }

  @keyframes fade-in {
    0% {
      opacity:0;
      background-color: transparent;
    }
    100% {
      opacity:1;
      background-color: rgba(7,17,27,.6);
    }
  }

  @keyframes fade-out {
    0% {
      opacity:1;
      background-color: rgba(7,17,27,.6);
    }
    100% {
      opacity:0;
      background-color: transparent;
    }
  }

  @-webkit-keyframes fade-in {
    0% {
      opacity:0;
      background-color: transparent;
    }
    100% {
      opacity:1;
      background-color: rgba(7,17,27,.6);
    }
  }

  @-webkit-keyframes fade-out {
    0% {
      opacity:1;
      background-color: rgba(7,17,27,.6);
    }
    100% {
      opacity:0;
      background-color: transparent;
    }
  }

  @-o-keyframes fade-in {
    0% {
      opacity:0;
      background-color: transparent;
    }
    100% {
      opacity:1;
      background-color: rgba(7,17,27,.6);
    }
  }

  @-webkit-keyframes fade-out {
    0% {
      opacity:1;
      background-color: rgba(7,17,27,.6);
    }
    100% {
      opacity:0;
      background-color: transparent;
    }
  }
</style>
