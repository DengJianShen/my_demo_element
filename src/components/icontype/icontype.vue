<template>
  <span v-show="icontype>=0" class="icon" :class="classMap[icontype]"></span>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      icontype: {
        type: Number
      }
    },
    data() {
      return {
        classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee']
      };
    }
  };
</script>

<style type="text/css">
  .menu-item .icon {
    display: inline-block;
    vertical-align: top;
    width: 12px;
    height: 12px;
    margin-right: 2px;
    background-size: 12px 12px;
    background-repeat: no-repeat;
  }

  .support .icon {
    width: 12px;
    height: 12px;
    margin-right: 4px;
    background-size: 12px 12px;
    background-repeat: no-repeat;
    display: inline-block;
    vertical-align: middle;
  }

  .support-item .icon {
    display: inline-block;
    width: 16px;
    height: 16px;
    vertical-align: top;
    margin-right: 6px;
    background-size: 16px 16px;
    background-repeat: no-repeat;
  }

  .seller .support-item {
    border-top:1px solid rgba(7, 17, 27, .1);
    line-height: 32px;
  }

  .seller .icon {
    vertical-align: middle;
  }
  .seller .support-item .text{
    font-size: 12px;
    font-weight: 200;
    color: rgb(7,17,27);
  }
  .support-item .decrease {
    background-image: url('decrease_2@2x.png');
  }

  .support-item .discount {
    background-image: url('discount_2@2x.png');
  }

  .support-item .guarantee {
    background-image: url("guarantee_2@2x.png");
  }

  .support-item .invoice {
    background-image: url("invoice_2@2x.png");
  }

  .support-item .special {
    background-image: url("special_2@2x.png");
  }

  .support .decrease {
    background-image: url('decrease_1@2x.png');
  }

  .support .discount {
    background-image: url('discount_1@2x.png');
  }

  .support .guarantee {
    background-image: url("guarantee_1@2x.png");
  }

  .support .invoice {
    background-image: url("invoice_1@2x.png");
  }

  .support .special {
    background-image: url("special_1@2x.png");
  }

  .menu-item .decrease {
    background-image: url('decrease_3@2x.png');
  }

  .menu-item .discount {
    background-image: url('discount_3@2x.png');
  }

  .menu-item .guarantee {
    background-image: url("guarantee_3@2x.png");
  }

  .menu-item .invoice {
    background-image: url("invoice_3@2x.png");
  }

  .menu-item .special {
    background-image: url("special_3@2x.png");
  }
</style>
