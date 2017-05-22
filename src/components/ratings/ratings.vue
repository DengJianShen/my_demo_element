<template>
  <div class="ratings" ref="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <star :size="36" :score="seller.serviceScore"></star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <star :size="36" :score="seller.foodScore"></star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <ratingselect :selectType="selectType" :onlyContent="onlyContent" :ratings="ratings"></ratingselect>
      <div class="rating-wrapper">
        <ul>
          <li v-show="needShow(rating.rateType, rating.text)" v-for="rating in ratings" class="rating-item">
            <div class="avatar">
              <img width="28" height="28" :src="rating.avatar" />
            </div>
            <div class="content">
              <h1 class="name">{{rating.username}}</h1>
              <div class="star-wrapper">
                <star :size="24" :score="rating.score"></star>
                <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend" v-show="rating.recommend.length">
                <span class="icon-thumb_up"></span>
                <span v-for="item in rating.recommend" class="item">{{item}}</span>
              </div>
              <div class="time">{{rating.rateTime}}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import star from 'components/star/star';
  import split from 'components/split/split';
  import ratingselect from 'components/ratingselect/ratingselect';

  const POSITIVE = 0;
  const NEGATIVE = 1;
  const ALL = 2;

  const ERR_OK = 0;

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        ratings: [],
        selectType: ALL,
        onlyContent: true
      };
    },
    methods: {
      needShow(type, text) {
        var that = this;
//      接收来自子组件双向绑定好的数据,设置data数据
        that.$bus.$on('ratingtypeSelect', function (typeData) {
          that.selectType = typeData;
          that.$nextTick(() => {
            that.scroll.refresh();
          });
        });
        that.$bus.$on('contentToggle', function (onlyContentData) {
          that.onlyContent = onlyContentData;
          that.$nextTick(() => {
            that.scroll.refresh();
          });
        });
        if (this.onlyContent && !text) {
          return false;
        }
        if (this.selectType === ALL) {
          return true;
        } else {
          return type === this.selectType;
        }
      }
    },
    created() {
      this.$http.get('/api/ratings').then((response) => {
        response = response.body;
        if (parseInt(response.errno) === ERR_OK) {
          this.ratings = response.data;
          this.$nextTick(() => {
            this.scroll = new BScroll(this.$refs.ratings, {
              click: true
            });
          });
        }
      }, (response) => {
        console.log(response);
      });
    },
    components: {
      star: star,
      split: split,
      ratingselect: ratingselect
    }
  };
</script>

<style type="text/css">
  .ratings {
    position: absolute;
    top: 174px;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
  }

  .overview {
    display: flex;
    padding: 18px 0;
  }

  .overview-left {
    flex: 0 0 137px;
    width: 137px;
    border-right: 1px solid rgba(7, 17, 27, .1);
    text-align: center;
    padding: 6px 0;
  }

  .overview-right {
    flex: 1;
    padding: 6px 0 6px 24px;
  }

  .overview-left .score {
    margin-bottom: 6px;
    line-height: 28px;
    font-size: 24px;
    color: rgb(255, 153, 0);
  }

  .overview-left .title {
    line-height: 12px;
    font-size: 12px;
    color: rgb(7, 17, 27);
    margin-bottom: 8px;
  }

  .overview-left .rank {
    line-height: 10px;
    font-size: 10px;
    color: rgb(147, 153, 159);
  }

  .score-wrapper {
    margin-bottom: 8px;
    line-height: 18px;
    font-size: 0;
  }

  .score-wrapper .title {
    display: inline-block;
    vertical-align: top;
    line-height: 18px;
    font-size: 12px;
    color: rgb(7, 17, 27);
  }

  .score-wrapper .star {
    display: inline-block;
    margin: 0 12px;
    vertical-align: top;
  }

  .score-wrapper .score {
    display: inline-block;
    vertical-align: top;
    font-size: 12px;
    line-height: 18px;
    color: rgb(255, 153, 0);
  }

  .delivery-wrapper {
    font-size: 0;
  }

  .delivery-wrapper .title {
    line-height: 18px;
    font-size: 12px;
    color: rgb(7, 17, 27);
  }

  .delivery-wrapper .delivery {
    margin-left: 12px;
    font-size: 12px;
    color: rgb(147, 153, 159);
  }

  .ratings .rating-wrapper {
    padding: 0 18px;
  }

  .ratings .rating-wrapper .rating-item {
    display: flex;
    padding: 18px 0;
    border-bottom: 1px solid rgba(7, 17, 27, .1);
  }

  .ratings .rating-wrapper .rating-item .avatar {
    flex: 0 0 28px;
    width: 28px;
    margin-right: 12px;
  }

  .avatar img {
    border-radius: 50%;
  }

  .ratings .rating-wrapper .rating-item .content {
    position: relative;
    flex: 1;
  }

  .ratings .rating-wrapper .rating-item .content .name {
    margin-bottom: 4px;
    font-size: 10px;
    line-height: 12px;
    color: rgb(7, 17, 27);
  }

  .ratings .rating-wrapper .rating-item .content .star-wrapper {
    margin-bottom: 6px;
    font-size: 0;
    margin-top: 0;
    text-align: left;
  }

  .ratings .rating-wrapper .rating-item .content .star-wrapper .star {
    display: inline-block;
    margin-right: 6px;
    vertical-align: top;
  }

  .ratings .rating-wrapper .rating-item .content .star-wrapper .delivery {
    font-size: 10px;
    line-height: 12px;
    color: rgb(147, 153, 159);
  }

  .ratings .rating-wrapper .rating-item .content .text {
    margin-bottom: 8px;
    line-height: 18px;
    color: rgb(7, 17, 27);
    font-size: 12px;
  }

  .ratings .rating-wrapper .rating-item .content .recommend {
    line-height: 16px;
  }
  .ratings .rating-wrapper .rating-item .content .time {
    position: absolute;
    color: rgb(147,153,159);
    top: 0;
    right: 0;
    font-size: 10px;
  }
  .ratings .rating-wrapper .rating-item .content .icon-thumb_up,.ratings .rating-wrapper .rating-item .content .item{
    display: inline-block;
    margin:0 8px 4px 0;
    font-size: 9px;
  }
  .ratings .rating-wrapper .rating-item .content .icon-thumb_up{
    color: rgb(0,160,220);
  }
  .ratings .rating-wrapper .rating-item .content .item{
    padding:0 6px;
    border:1px solid rgba(7,17,27,.1);
    border-radius: 1px;
    color: rgb(147,153,159);
  }
</style>
