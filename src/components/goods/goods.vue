<template>
  <div>
    <div class="goods">
      <!--ref绑定元素,在js中$refs的形式获取该dom节点-->
      <div class="menu-wrapper" ref="menuWrapper">
        <ul class="menu-item">
          <!--记录遍历的数据以及索引,class作判断指定相应样式,点击事件时可用于传入索引跟事件-->
          <li v-for="(item, index) in goods" class="menu-item" :class="{'current':currentIndex==index}" @click="selectMenu(index, $event)">
          <span class="text">
            <icontype :icontype="item.type"></icontype>{{item.name}}
          </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="foodsWrapper">
        <ul>
          <li v-for="item in goods" class="food-list" ref="foodHook">
            <h1 class="title">{{item.name}}</h1>
            <ul>
              <li v-for="food in item.foods" class="food-item" @click="selectFood(food, $event)">
                <div class="icon">
                  <img :src="food.icon" />
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">{{food.sellCount}}份量</span><span>好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol :food="food"></cartcontrol>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <shopcart ref="shopcart" :selectFoods="selectFoods" :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"></shopcart>
    </div>
    <food :food="selectedFood" ref="food"></food>
  </div>
</template>

<script type="text/ecmascript-6">
    import BScroll from 'better-scroll';
    import food from 'components/food/food';
    import icontype from 'components/icontype/icontype';
    import shopcart from 'components/shopcart/shopcart';
    import cartcontrol from 'components/cartcontrol/cartcontrol';
    //  声明该模块全局函数
    var ERR_OK = 0;
    var menuScroll;
    var foodsScroll;
    //  props接受外来属性
    export default {
        props: {
            seller: {
                type: Object
            }
        },
        //  自定义数据
        //  goods是通过网络请求获得的,初始为空数组
        //  listHeight是js获取的各食品类型标题高度
        //  scrollY是当前滚动高度
        data() {
            return {
                goods: [],
                listHeight: [],
                scrollY: 0,
                selectedFood: {}
            };
        },
        computed: {
            currentIndex() {
                //      通过对比后者滚动高度以及前者滚动高度,取得当前停留在的索引
                for (var i = 0; i < this.listHeight.length; i++) {
                    var height1 = this.listHeight[i];
                    var height2 = this.listHeight[i + 1];
                    if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
                        return i;
                    }
                }
                return 0;
            },
            //    通过遍历获取当前用户加入购物车中的商品数据,包含单价购买量等
            selectFoods() {
                var foods = [];
                this.goods.forEach((good) => {
                    good.foods.forEach((food) => {
                        if (food.count) {
                            foods.push(food);
                        }
                    });
                });
                return foods;
            }
        },
        created() {
            this.$http.get('/api/goods').then((response) => {
                response = response.body;
                if (parseInt(response.errno) === ERR_OK) {
                    this.goods = response.data;
                    //  操作相关原生dom的时候运用
                    //  调用this中指定的methods方法
                    this.$nextTick(() => {
                        this._initScroll();
                        this._calculateHeight();
                    });
                }
            }, (response) => {
                console.log(response);
            });
        },
        //  methods主要是对better-scroll的运用
        methods: {
            _initScroll() {
                menuScroll = new BScroll(this.$refs.menuWrapper, {
                    click: true
                });
                foodsScroll = new BScroll(this.$refs.foodsWrapper, {
                    click: true,
                    probeType: 3
                });
                foodsScroll.on('scroll', (pos) => {
                    this.scrollY = Math.abs(Math.round(pos.y));
                });
            },
            //    获取各个商品标题滚动高度
            _calculateHeight() {
                var foodList = this.$refs.foodHook;
                var height = 0;
                this.listHeight.push(height);
                for (var i = 0; i < foodList.length; i++) {
                    var item = foodList[i];
                    height += item.clientHeight;
                    this.listHeight.push(height);
                }
            },
            //    点击选项卡滚动到指定dom节点
            selectMenu(index, event) {
                if (!event._constructed) {
                    return;
                }
                var foodList = this.$refs.foodHook;
                var el = foodList[index];
                foodsScroll.scrollToElement(el, 500);
            },
            selectFood(food, event) {
                if (!event._constructed) {
                    return;
                }
                this.selectedFood = food;
                this.$refs.food.show();
            }
        },
        components: {
            icontype: icontype,
            shopcart: shopcart,
            cartcontrol: cartcontrol,
            food: food
        }
    };
</script>

<style type="text/css">
    .goods {
        display: flex;
        position: absolute;
        top: 174px;
        bottom: 46px;
        width: 100%;
        overflow: hidden;
    }

    .menu-wrapper {
        flex: 0 0 80px;
        width: 80px;
        background: #f3f5f7;
    }

    .menu-item {
        display: table;
        height: 54px;
        width: 56px;
        line-height: 14px;
        padding: 0 12px;
    }

    .menu-item.current {
        background-color: #fff;
        font-weight: 700;
    }

    .menu-item.current .text {
        border-color: transparent;
    }

    .menu-item .text {
        display: table-cell;
        width: 56px;
        vertical-align: middle;
        font-size: 12px;
        border-bottom: 1 px solid rgba(7, 17, 27, .1);
    }

    .foods-wrapper {
        flex: 1;
    }

    .foods-wrapper .title {
        padding-left: 14px;
        height: 26px;
        line-height: 26px;
        border-left: 2px solid #d9dde1;
        font-size: 12px;
        color: rgb(147, 153, 159);
        background-color: #f3f5f7;
    }

    .food-item {
        display: flex;
        margin: 18px;
        padding-bottom: 18px;
        border-bottom: 1px solid rgba(7, 17, 27, .1);
        position: relative;
    }

    .food-item:last-child {
        border-bottom: none;
        margin-bottom: 0;
    }

    .food-item .icon {
        flex: 0 0 57px;
        margin-right: 10px;
    }

    .food-item .icon img {
        width: 100%;
    }

    .food-item .content {
        flex: 1;
    }

    .food-item .name {
        margin: 2px 0 8px 0;
        height: 14px;
        line-height: 14px;
        font-size: 14px;
        color: rgb(7, 17, 27);
    }

    .food-item .desc,
    .food-item .extra {
        line-height: 10px;
        font-size: 10px;
        color: rgb(147, 153, 159);
    }

    .food-item .desc {
        margin-bottom: 8px;
        line-height: 12px;
    }

    .food-item .extra .count {
        margin-right: 12px;
    }

    .food-item .price {
        font-weight: 700;
        line-height: 24px;
    }

    .food-item .price .now {
        margin-right: 8px;
        font-size: 14px;
        color: rgb(240, 20, 20);
    }

    .food-item .price .old {
        text-decoration: line-through;
        font-size: 10px;
        color: rgb(147, 153, 159);
    }

    .food-item .cartcontrol-wrapper {
        position: absolute;
        right: 0;
        bottom: 12px;
    }
</style>
