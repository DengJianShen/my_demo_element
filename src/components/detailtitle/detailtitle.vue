<template>
  <div v-if="title" class="detailtitle">
    <div class="line"></div>
    <div class="text">{{title}}</div>
    <div class="line"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      title: {
        type: String
      }
    }
  };
</script>

<style type="text/css">
  .detailtitle{
    display: flex;
    width:80%;
    margin:28px auto 24px auto;
  }
  .detailtitle .line{
    flex:1;
    position: relative;
    top:-6px;
    border-bottom: 1px solid rgba(255,255,255,.2);
  }
  .detailtitle .text{
    padding:0 12px;
    font-size: 14px;
  }
</style>
