<template>
  <div>
    <v-header :seller="seller"></v-header>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <router-view :seller="seller"></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
import header from './components/header/header.vue';
var ERR_OK = 0;
export default {
  data() {
    return {
      seller: {}
    };
  },
  created() {
    this.$http.get('/api/seller').then((response) => {
      response = response.body;
      if (parseInt(response.errno) === ERR_OK) {
         this.seller = response.data;
      }
    }, (response) => {
      console.log(response);
    });
  },
  components: {
    'v-header': header
  }
};
</script>

<style type="text/css">
  .tab{
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1)
  }

  .tab-item{
    flex: 1;
    text-align: center;
  }

  .router-link-active{
    color: rgb(240,20,20) !important;
  }

  .tab-item a{
    display: block;
    font-size: 14px;
    color: rgb(77,85,93);
  }
</style>
