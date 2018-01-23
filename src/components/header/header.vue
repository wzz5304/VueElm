<template>
 <div class="headers">
 	<div class="content-wrapper">
 		<div class="avatar">
 		    <img width="64" height="64" :src="seller.avatar">
 		</div>
 		<div class="content">
 			<div class="title">
 				<span class="brand"></span>
 				<span class="name">{{seller.name}}</span>
 			</div>
 			<div class="description">
 				{{seller.description}}/{{seller.deliveryTime}}分钟送达
 			</div>
 			<div class="supports" v-if="seller.supports">
 				<span class="icon" :class="classMap[seller.supports[0].type]"></span>
 				<span class="text">{{seller.supports[0].description}}</span>
 			</div>
 		</div>
    <div class="support-count" v-if="seller.supports" v-on:click="detailShow=true">
       <span class="count">{{seller.supports.length}}个</span>
       <i class="el-icon-arrow-right"></i>
    </div>
 	</div>
 	<div class="bulletin-wrapper" v-on:click="detailShow=true">
       <span class="bul-title"></span>
       <span class="bul-text">{{seller.bulletin}}</span>
       <i class="el-icon-arrow-right"></i>
 	</div>
  <div class="background">
    <img :src="seller.avatar" width="100%" height="100%">
  </div>
  <transition name="fade">
  <div class="detail" v-show="detailShow">
     <div class="detail-wrapper clearfix">
       <div class="detail-main">
        <h1 class="name">{{seller.name}}</h1>
        <div class="star-wrapper">
          <star :size="48" :score="seller.score"></star>
        </div>
        <div class="title">
          <div class="line"></div>
          <div class="text">优惠信息</div>
          <div class="line"></div>
        </div>
        <ul v-if="seller.supports" class="supports">
          <li v-for="(item,index) in seller.supports" class="supports-item">
            <span class="icon" :class="classMap[seller.supports[index].type]"></span>
            <span class="text">{{seller.supports[index].description}}</span>
          </li>
        </ul>
        <div class="title title-position">
          <div class="line"></div>
          <div class="text">商家公告</div>
          <div class="line"></div>
        </div>
        <!--<titleTel></titleTel>这是一个组件-->
        <div class="bulletin">
          <p class="text">{{seller.bulletin}}</p>
        </div>
       </div>
     </div>
     <div class="detail-close" v-on:click="detailShow=false">
         <i class="el-icon-close"></i>
     </div>
  </div>
  </transition>
 </div>
</template>

<script>
import star from '../star/star.vue';
import titleTel from '../header/title-tel.vue';
   export default{
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        detailShow: false
      };
    },
    created() {
      this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special'];
    },
    components: {
      star,
      titleTel
    }
   };
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/minxin.styl"
@import "../../common/stylus/icon.styl"
@import "../../common/stylus/base.styl"
   .headers
      position:relative
      background:rgba(7,17,27,0.5)
      color:#fff
      overflow:hidden
      .content-wrapper
        padding:24px 16px 18px 24px
        font-size:0
        position:relative
        .avatar
           width:64px
           height:64px
           display:inline-block
           vertical-align:top
           img 
             border-radius:2px
        .content
           display:inline-block
           font-size:14px
           margin-left:16px
           .title 
             margin:2px 0px 8px 0px
             .brand
               display:inline-block
               vertical-align:top
               width:30px
               height:18px
               background-image:('brand')
               background-size:30px 18px
               background-repeat:no-repeat
             .name
               font-size:16px
               font-weight:bold
               line-height:18px
               margin-left:6px
           .description
             font-size:12px
             font-weight:200
             line-height:12px
             margin-bottom:10px
           .supports
             margin-bottom:2px
             .icon
               display:inline-block
               width:12px
               height:12px
               margin-right:4px
               background-size:12px 12px
               background-repeat:no-repeat
               vertical-align:middle
             .text 
               font-size:10px
               font-weight:200
               line-height:12px
               vertical-align:top
             .decrease
               background-image:('decrease_1')
             .discount
               background-image:('discount_1')
             .guarantee
               background-image:('guarantee_1')
             .invoice
               background-image:('invoice_1')
             .special
               background-image:('special_1')
        .support-count
           position:absolute
           right:12px
           bottom:18px
           padding:0 8px
           height:24px
           line-height:24px
           border-radius:14px
           background:rgba(0,0,0,0.2)
           text-align:center
           cursor:default
           .count
             font-size:10px
           .el-icon-arrow-right
             font-size:10px
             margin-left:2px
             line-height:24px
      .bulletin-wrapper
        position:relative
        height:28px
        line-height:28px
        padding:0 22px 0 12px
        white-space: nowrap
        overflow:hidden
        text-overflow:ellipsis 
        background:rgba(7,17,27,0.2)
        color:rgb(255,255,255)
        font-weight:200
        .bul-title
          display:inline-block
          margin:9px 4px 9px 12px
          width:22px
          height:12px
          background-image:('bulletin')
          background-size:22px 12px
          background-repeat:no-repeat
          vertical-align:top
        .bul-text
          font-size:10px
        .el-icon-arrow-right
          position:absolute
          font-size:10px
          right:12px
          top:10px
      .background
        position:absolute
        left:0
        top:0
        width:100%
        height:100%
        z-index:-1
        filter:blur(10px)
      .detail
        position:fixed
        overflow:auto
        width:100%
        height:100%
        left:0
        top:0
        z-index:100
        background:rgba(7,17,27,0.8)
        overflow:hidden
        &.fade-enter-active, &.fade-leave-active
          transition: opacity .5s
        &.fade-enter, &.fade-leave-active 
          opacity: 0
        .detail-wrapper
          min-height:100%
          width:100%
          .detail-main
            margin-top:64px
            padding-bottom:64px
            .name
              font-size:16px
              font-weight:700
              line-height:16px
              text-align:center
            .star-wrapper
              margin-top:16px
              text-align:center
              padding-bottom:28px
            .title 
              display:flex
              width:80%
              margin:12px auto 24px auto
              .line
                flex:1
                position:relative
                border:1px solid rgba(255,255,255,0.2)
                height:0px
              .text
                font-size:14px
                padding:0 12px
                margin-top:-6px
            .supports 
              width:80%
              margin:0 auto
              .supports-item
                padding:0 12px
                margin-bottom:12px
                font-size:0
                &:last-child
                  margin-bottom:0
                .text
                  font-size:12px
                  font-weight:200
                  line-height:16px
                  color:rgb(255,255,255)
                .icon
                  display:inline-block
                  width:16px
                  height:16px
                  background-size:16px 16px
                  background-repeat:no-repeat
                  vertical-align:top
                  margin-right:6px
                .decrease
                  background-image:('decrease_2')
                .discount
                  background-image:('discount_2')
                .guarantee
                  background-image:('discount_2')
                .invoice
                  background-image:('special_2')
                .special
                  background-image:('special_2')
            .title-position
              margin:28px auto 24px auto
            .bulletin 
              width:80%
              margin:0 auto
              .text
                padding:0 12px
                font-size:12px
                font-weight:200
                line-height:24px
              
                  
        .detail-close
          position:relative
          width:32px
          height:32px
          margin:-64px auto 0 auto
          font-size:32px
          clear:both
        
 



</style>
