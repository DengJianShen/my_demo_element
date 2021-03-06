<template>
  <div class="seller" ref="sellers">
    <div class="seller-content">
      <div class="overview">
        <h1 class="title">{{seller.name}}</h1>
        <div class="desc">
          <star :size="36" :score="seller.score">{{seller.score}}</star>
          <span class="text">({{seller.ratingCount}})</span>
          <span class="text">月售{{seller.sellCount}}单</span>
        </div>
        <ul class="remark">
          <li class="block">
            <h2>起送价</h2>
            <div class="content">
              <span class="stress">
                {{seller.minPrice}}
              </span>
            </div>
          </li>
          <li class="block">
            <h2>商家配送</h2>
            <div class="content">
              <span class="stress">
                {{seller.deliveryPrice}}
              </span>
            </div>
          </li>
          <li class="block">
            <h2>平均配送时间</h2>
            <div class="content">
              <span class="stress">
                {{seller.deliveryTime}}分钟
              </span>
            </div>
          </li>
        </ul>
        <div class="favorite" @click="toggleFavorite">
          <span class="icon-favorite" :class="{'active':favorite}"></span>
          <span class="text">{{favoriteText}}</span>
        </div>
      </div>
      <split></split>
      <div class="bulletin">
        <h1 class="title">公告与活动</h1>
        <div class="content-wrapper">
          <p class="content">{{seller.bulletin}}</p>
        </div>
        <ul v-if="seller.supports" class="supports">
          <li class="support-item" v-for="item in seller.supports">
            <icontype :icontype="item.type"></icontype>
            <span class="text">{{item.description}}</span>
          </li>
        </ul>
      </div>
      <split></split>
      <div class="pics">
        <h1 class="title">商家实景</h1>
        <div class="pic-wrapper" ref="picWrapper">
          <ul class="pic-list" ref="picList">
            <li class="pic-item" v-for="pic in seller.pics">
              <img :src="pic" width="120" height="90"/>
            </li>
          </ul>
        </div>
      </div>
      <split></split>
      <div class="info">
        <h1 class="title">商家信息</h1>
        <ul>
          <li class="info-item" v-for="info in seller.infos">{{info}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import star from 'components/star/star';
  import split from 'components/split/split';
  import icontype from 'components/icontype/icontype';
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        favorite: false
      };
    },
    methods: {
      toggleFavorite(event) {
        if (!event._constructed) {
          return;
        }
        this.favorite = !this.favorite;
      }
    },
    computed: {
      favoriteText() {
        return this.favorite ? '已收藏' : '未收藏';
      }
    },
    mounted: function () {
      if (this.seller.pics) {
        var picWidth = 120;
        var margin = 6;
        var width = (picWidth + margin) * this.seller.pics.length - margin;
        this.$refs.picList.style.width = width + 'px';
      }
      this.$nextTick(function () {
        this.scroll = new BScroll(this.$refs.sellers, {
          click: true
        });
        this.picscroll = new BScroll(this.$refs.picWrapper, {
          scrollX: true,
          click: true
        });
      });
    },
    components: {
      star: star,
      split: split,
      icontype: icontype
    }
  };
</script>

<style type="text/css">
  .seller {
    position: absolute;
    top: 174px;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
  }

  .seller .overview {
    padding: 18px;
    display: block;
    position: relative;
  }

  .seller .overview .title {
    margin-bottom: 8px;
    line-height: 14px;
    color: rgb(7, 17, 27);
    font-size: 14px;
  }

  .seller .overview .desc {
    padding-bottom: 18px;
    font-size: 0;
    border-bottom: 1px solid rgba(7, 17, 27, .1);
  }

  .seller .overview .desc .star {
    display: inline-block;
    margin-right: 8px;
    vertical-align: top;
  }

  .seller .overview .desc .text {
    margin-right: 12px;
    display: inline-block;
    vertical-align: top;
    font-size: 10px;
    line-height: 18px;
  }

  .seller .overview .remark {
    display: flex;
    padding-top: 18px;
  }

  .seller .overview .favorite {
    position: absolute;
    right: 18px;
    top: 18px;
    text-align: center;
  }

  .seller .overview .icon-favorite {
    display: block;
    line-height: 24px;
    font-size: 24px;
    color: #d4d6d9;
    margin-bottom: 4px;
  }

  .seller .overview .icon-favorite.active {
    color: red;
  }

  .seller .overview .text {
    line-height: 10px;
    font-size: 10px;
    color: rgb(7,17,27);
  }

  .seller .overview .remark .block {
    flex: 1;
    text-align: center;
    border-right: 1px solid rgba(7, 17, 27, .1);
  }

  .seller .overview .remark .block:last-child {
    border: none;
  }

  .seller .overview .remark .block h2 {
    margin-bottom: 4px;
    line-height: 10px;
    font-size: 10px;
    color: rgb(147, 153, 159);
  }

  .seller .overview .remark .block .content {
    line-height: 24px;
    font-size: 10px;
    color: rgb(7, 17, 27);
  }

  .seller .overview .remark .block .stress {
    font-size: 24px;
  }

  .seller .bulletin {
    padding: 18px 18px 0 18px;
  }

  .seller .bulletin .content {
    line-height: 24px;
    font-size: 12px;
    color: rgb(240, 20, 20);
  }

  .seller .bulletin .title {
    margin-bottom: 8px;
    line-height: 14px;
    color: rgb(7, 17, 27);
    font-size: 14px;
  }

  .seller .content-wrapper {
    padding: 0 12px 16px 12px;
    border-top: 1px solid rgba(7, 17, 27, .1);
  }

  .seller .pics {
    padding: 18px;
  }

  .seller .title {
    margin-bottom: 12px;
    line-height: 14px;
    color: rgb(7, 17, 27);
    font-size: 14px;
  }

  .seller .pic-wrapper {
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
  }

  .seller .pic-list {
    font-size: 0;
  }

  .seller .pic-item {
    display: inline-block;
    margin-right: 6px;
    width: 120px;
    height: 90px;
  }

  .pic-list .pic-item:last-child {
    margin: 0;
  }

  .seller .info {
    padding: 18px 18px 0 18px;
    color: rgb(7, 17, 27);
  }

  .seller .info-item {
    padding: 16px 12px;
    line-height: 16px;
    border-top: 1px solid rgba(7, 17, 27, .1);
    font-size: 12px;
  }
</style>
