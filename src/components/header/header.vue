<template>
<div class="header">
  <div class="content-wrapper">
    <div class="avatar">
      <img :src="seller.avatar" width="64" height="64"/>
    </div>
    <div class="content">
      <div class="title">
        <span class="brand"></span>
        <span class="name">{{seller.name}}</span>
      </div>
      <div class="description">
        {{seller.description}}/{{seller.deliveryTime}}分钟送达
      </div>
      <div v-if="seller.supports" class="support">
        <icontype :icontype="seller.supports[0].type"></icontype>
        <span class="text">{{seller.supports[0].description}}</span>
      </div>
    </div>
    <div v-if="seller.supports" class="support-count" @click="showDetail">
      <span class="count">{{seller.supports.length}}个</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
  </div>
  <div class="bulletin-wrapper" @click="showDetail">
    <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
    <i class="icon-keyboard_arrow_right"></i>
  </div>
  <div class="background">
    <img :src="seller.avatar" width="100%" height="100%" />
  </div>
  <transition name="fade">
  <div v-show="detailShow" class="detail" transition="fade">
    <div class="detail-wrapper clearfix">
      <div class="detail-main">
        <h1 class="name">{{seller.name}}</h1>
        <div class="star-wrapper">
          <star :size="48" :score="seller.score"></star>
        </div>
        <detailtitle :title="title_1"></detailtitle>
        <ul v-if="seller.supports" class="supports">
          <li class="support-item" v-for="item in seller.supports">
            <icontype :icontype="item.type"></icontype>
            <span class="text">{{item.description}}</span>
          </li>
        </ul>
        <detailtitle :title="title_2"></detailtitle>
        <div class="bulletin">
          <div class="content">{{seller.bulletin}}</div>
        </div>
      </div>
    </div>
    <div class="detail-close" @click="showDetail">
      <i class="icon-close"></i>
    </div>
  </div>
  </transition>
</div>
</template>

<script type="text/ecmascript-6">
import star from 'components/star/star';
import detailtitle from 'components/detailtitle/detailtitle';
import icontype from 'components/icontype/icontype';

export default {
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      detailShow: false,
      title_1: '优惠信息',
      title_2: '商家公告'
    };
  },
  methods: {
    showDetail() {
      if (!this.detailShow) {
        this.detailShow = true;
      } else {
        this.detailShow = false;
      }
    }
  },
  components: {
    star: star,
    detailtitle: detailtitle,
    icontype: icontype
  }
};
</script>

<style type="text/css">
  .header{
    position: relative;
    color: #fff;
    background-color: rgba(7,17,27,.5);
    overflow: hidden;
  }
  .content-wrapper{
    padding: 24px 12px 18px 24px;
    position: relative;
  }
  .avatar{
    display: inline-block;
    vertical-align: top;
  }
  .avatar img{
    border-radius: 2px;
  }
  .header .content{
    display: inline-block;
    margin-left: 16px;
    font-size: 14px;
  }
  .header .title{
    margin: 2px 0 8px 0;
  }
  .brand{
    vertical-align: top;
    display: inline-block;
    width:30px;
    height:18px;
    background-image: url('./brand@2x.png');
    background-size: 30px 18px;
    background-repeat: no-repeat;
  }
  .brand .name{
    margin-left: 6px;
    font-size: 16px;
    line-height: 18px;
    font-weight: bold;
  }
  .description{
    margin-bottom: 10px;
    line-height: 12px;
    font-size: 12px;
  }
  .support .text{
    line-height: 12px;
    font-size: 10px;
  }

  .support-count{
    position: absolute;
    right:12px;
    bottom:18px;
    padding:0 8px;
    height:24px;
    line-height: 24px;
    border-radius: 14px;
    background-color: rgba(0,0,0,.2);
    text-align: center;
  }
  .count{
    font-size: 10px;
    vertical-align: top;
  }
  .icon-keyboard_arrow_right{
    font-size: 10px;
    line-height: 24px;
    margin-left: 2px;
  }
  .bulletin-wrapper{
    position: relative;
    height:28px;
    line-height: 28px;
    padding:0 28px 0 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    background-color: rgba(7,17,27,.2);
  }
  .bulletin-title{
    display: inline-block;
    width:22px;
    height:12px;
    background-size: 22px 12px;
    background-image: url('./bulletin@2x.png');
    vertical-align: top;
    margin-top: 8px;
  }
  .bulletin-text{
    margin:0 4px;
    font-size: 10px;
    vertical-align: top;
  }
  .bulletin-wrapper .icon-keyboard_arrow_right{
    font-size: 10px;
    right: 12px;
    position: absolute;
    top: 3px;
  }
  .background{
    position: absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
    z-index: -1;
    -webkit-filter: blur(10px);
  }
  .header .detail{
    position: fixed;
    width:100%;
    height:100%;
    z-index: 100;
    overflow: auto;
    top:0;
    left:0;
    background-color: rgba(7,17,27,.8);
    -webkit-transition: all .5s;
    -moz-transition: all .5s;
    -ms-transition: all .5s;
    -o-transition: all .5s;
    transition: all .5s;
  }
  .fade-enter-active, .fade-leave-active{
    opacity:1;
    background-color: rgba(7,17,27,.8);
  }
  .fade-enter, .fade-leave-active{
    opacity:0;
    background-color: rgba(7,17,27,0);
  }
  .detail-wrapper{
    min-height:100%;
    width:100%;
  }
  .detail-main{
    padding: 64px 0;
  }
  .detail-main .name{
    font-size: 16px;
    line-height: 16px;
    font-weight: 700;
    text-align: center;
  }
  .detail-close{
    position: relative;
    width:32px;
    height:32px;
    margin:-64px auto 0 auto;
    clear: both;
    font-size: 32px;
  }
  .star-wrapper{
    margin-top: 18px;
    padding:2px 0;
    text-align: center;
  }
  .detail-main .supports{
    width:80%;
    margin:0 auto;
  }
  .detail-main .support-item{
    padding:0 12px;
    margin-bottom: 12px;
    font-size: 0;
  }
  .detail-main .support-item:last-child{
    margin-bottom: 0;
  }
  .detail-main .support-item .text{
    font-size: 12px;
    line-height: 16px;
  }
  .detail-main .bulletin{
    width:80%;
    margin:0 auto;
  }
  .detail-main .content{
    padding:0 12px;
    line-height: 24px;
    font-size: 12px;
  }

</style>
