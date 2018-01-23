<template>
 <div class="seller" ref="sellerHook">
 	<div class="seller-wrapper">
 		<div class="seller-header">
 			<div class="header-top">
 				<h1 class="name">{{seller.name}}</h1>
 				<div class="star-wrapper">
 					<star :size="36" :score="seller.score" class="star"></star>
 				    <span class="sellCount">月售{{seller.sellCount}}单</span>
 				</div>
 				
 				<div class="collect">
 					<i class="el-icon-star-on"></i>
 					<span class="sellCount">已收藏</span>
 				</div>

 			</div>
 			<div class="header-bottom">
 				<div class="content-wrapper">
 					<h2 class="title">起送价</h2>
 					<p class="price">{{seller.minPrice}}元</p>
 				</div>
 				<div class="content-wrapper">
 					<h2 class="title">商家配送价</h2>
 					<p class="price">{{seller.deliveryPrice}}元</p>
 				</div>
 				<div class="content-wrapper">
 					<h2 class="title">平均配送时间</h2>
 					<p class="price">{{seller.deliveryTime}}分钟</p>
 				</div>
 			</div>
 		</div>
 		<split></split>
 		<div class="discount-wrapper">
 		    <div class="notice">
 		    	<h1 class="title">公告与活动</h1>
 			    <p class="bulletin">{{seller.bulletin}}</p>
 		    </div>
 			<ul v-show="seller.supports && seller.supports.length" class="supports">
 				<li v-for="(item,index) in seller.supports" class="supports-item">
			        <span class="icon" :class="classMap[seller.supports[index].type]"></span>
			        <span class="text">{{seller.supports[index].description}}</span>
                </li>
 			</ul>
 		</div>
 		<split></split>
 		<div class="seller-view">
 			<h1 class="title">商家实景</h1>
 			<ul class="pics-wrapper">
 				<li v-for="pic in seller.pics.slice(0,3)" class="pics-item">
 					<img :src="pic" class="pic">
 				</li>
 			</ul>
 		</div>
 		<split></split>
 		<div class="seller-information">
 		    <div class="title-wrapper">
 		    	<h1 class="title">商家信息</h1>
 		    </div>
 		    <ul class="seller-infos" v-show="seller.infos && seller.infos.length">
 		    	<li class="info-item" v-for="info in seller.infos">
 		    		<span>{{info}}</span>
 		    	</li>
 		    </ul>
 		</div>
 	</div>
 	<shopcart :seller="seller"></shopcart>
 </div>
</template>

<script>
import star from '../star/star.vue';
import BScroll from 'better-scroll';
import shopcart from '../shopcart/shopcart.vue';
import split from '../split/split.vue';
   export default{
    props: {
        seller: {
            type: Object
        }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special'];
      this.$nextTick(() => {
                    if (!this.sellerStroll) {
                        this.sellerStroll = new BScroll(this.$refs.sellerHook, {
                        click: true
                    });
                    } else {
                       this.sellerStroll.refresh();
                    }
                });
    },
    components: {
        star,
        split,
        shopcart
    }
   };
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/minxin.styl";
.seller
    overflow:hidden
    position:absolute
    left:0
    top:174px
    width:100%
    bottom:64px
    .seller-header
    	.header-top
    		position:relative
    		padding:18px 18px
    		border-1px(rgba(7,17,27,0.1))
    		.name
    			font-size:14px
    			color:rgb(7,17,27)
    			line-height:14px
    		.star-wrapper
    			margin-top:8px
    			font-size:0
    			.star
    				display:inline-block
    				margin-right:12px
    			.sellCount
    				font-size:10px
    				color:rgb(77,85,93)
    				line-height:18px
    				vertical-align: top;
    		.collect
    			position:absolute
    			width:40px
    			top:18px
    			right:18px
    			text-align:center
    			.el-icon-star-on
    				font-size:24px
    				color:rgb(240,20,20)
    				display:block
    			.sellCount
    				font-size:10px
    				color:rgb(77,85,93)
    				line-height:10px
    	.header-bottom
    		display:flex
    		padding:18px 0
    		.content-wrapper
    			flex:0 0 33.33%
    			width:33.33%
    			text-align:center
    			border-right:1px solid rgba(7,17,27,0.1)
    			&:last-child
    				border-right:none
    			.title 
    				font-size:10px
    				color:rgb(147,153,159)
    				line-height:10px
    				margin-bottom:4px
    			.price
    				font-size:24px
    				font-weight:200
    				color:rgb(7,17,27)
    				line-height:24px
    .discount-wrapper
    	padding:0 18px
    	.notice
    		padding:18px 0 16px 0
    		border-1px(rgba(7,17,27,0.1))
    		.title 
    			font-size:14px
    			color:rgb(7,17,27)
    			line-height:14px
    			margin-bottom:8px
    			font-weight:700
    		.bulletin
    			font-size:12px
    			font-weight:200
    			color:rgb(240,20,20)
    			line-height:24px
    			padding:0 12px
    	.supports
    		font-size:12px
    		font-weight:200
    		color:rgb(7,17,27)
    		line-height:16px
    		.supports-item
    			padding:16px 12px
    			font-size:0
    			border-1px(rgba(7,17,27,0.1))
    			&:last-child
    				border-none()
    			.icon
    				display:inline-block
    				width:16px
    				height:16px
    				margin-right:6px
    				background-size:16px 16px
    				background-repeat:no-repeat
    				vertical-align:top
    				&.decrease
    					background-image:('decrease_4')
    				&.discount
    					background-image:('discount_4')
    				&.guarantee
    					background-image:('guarantee_4')
    				&.invoice
    					background-image:('invoice_4')
    				&.special
    					background-image:('special_4')
    			.text
    				font-size:12px
    				font-weight:200
    				color:rgb(7,17,27)
    				line-height:15px
    .seller-view
    	padding:18px 0 18px 18px
    	.title 
    		font-size:14px
    		color:rgb(7,17,27)
    		line-height:14px
    		font-weight:700
    		margin-bottom:12px
    	.pics-wrapper
    		font-size:0
    		display:flex
    		.pics-item
    			display:inline-block
    			margin-right:6px
    			&:last-child
    				margin-right:0
    			.pic
    				width:120px
    				height:90px
    				@media only screen and (max-width:320px)
    				  width:95px
    				  height:80px
    .seller-information
    	padding:18px 18px 0 18px
    	.title-wrapper
    		padding-bottom:12px
    		border-1px(rgba(7,17,27,0.1))
    		.title
    			font-size:14px
    			font-weight:700
    			color:rgb(7,17,27)
    			line-height:14px
    	.seller-infos
    		.info-item
    			padding:16px 12px
    			font-size:12px
    			font-weight:200
    			color:rgb(7,17,27)
    			line-height:16px
    			border-1px(rgba(7,17,27,0.1))
    			&:last-child
    				border-none()
    		
    				
</style>
