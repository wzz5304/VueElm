<template>
 <div class="ratings-wrapper" ref="ratingHook">
 	<div class="ratings-content">
        <div class="overview">
        	<div class="overview-left">
        		<h1 class="score">{{seller.score}}</h1>
        		<p class="desc-content">综合评分</p>
 			    <p class="rankRate">高于周边商家{{seller.rankRate}}%</p>
        	</div>
        	<div class="overview-right">
        	    <div class="score-wrapper">
        			<span class="score-title">服务态度</span>
        			<star :size="36" :score="seller.serviceScore" class="star"></star>
 				    <span class="score">{{seller.serviceScore}}</span>
        		</div>
        		<div class="score-wrapper">
        			<span class="score-title">商品评分</span>
        			<star :size="36" :score="seller.foodScore" class="star"></star>
 				    <span class="score">{{seller.foodScore}}</span>
        		</div>
        		<div class="delivery-wrapper">
 				<span class="score-title">送达时间</span>
 				<span class="deliveryTime">{{seller.deliveryTime}}分钟</span>
 			</div>
        	</div>
        </div>
        <split></split>
        <ratingselect :select-type='selectType' :only-content='onlyContent' :ratings='ratings' @select-type="ratySelect" @content-toggle="conToggle"></ratingselect>
        <div class="ratings-desc-content">
        	<ul v-show="ratings && ratings.length">
        		<li v-show="show(rating.rateType,rating.text)" v-for="rating in ratings" class="rating-item">
        			<div class="avatar">
        				<img width="28" height="28" :src="rating.avatar">
        			</div>
        			<div class="content">
        				<h1 class="username">{{rating.username}}</h1>
        				<div class="star-wrapper">
        					<star :size="36" :score="rating.score" class="star"></star>
        					<span class="deliveryTime" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
        				</div>
        				<div class="rating-text">{{rating.text}}</div>
        				<div class="recommend">
        					<span :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></span>
        					<span class="rec" v-show="rating.recommend && rating.recommend.length>=1">{{rating.recommend[0]}}</span>
        					<span class="rec" v-show="rating.recommend && rating.recommend.length>=2">{{rating.recommend[1]}}</span>
        					<span class="rec" v-show="rating.recommend && rating.recommend.length>=3">{{rating.recommend[2]}}</span>
        				</div>
        				<div class="time">{{rating.rateTime | formatDate}}</div>
        			</div>
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
import split from '../split/split.vue';
import ratingselect from '../ratingselect/ratingselect.vue';
import {formatDate} from '../../common/js/date.js';
import shopcart from '../shopcart/shopcart.vue';
   const All = 2;
   export default{
    props: {
        seller: {
            type: Object
        }
    },
    data() {
        return {
            ratings: [],
            selectType: All,
            onlyContent: true
        };
    },
    created() {
        this.$http.get('/api/ratings').then((res) => {
            res = res.body;
            if (res.errno === 0) {
                this.ratings = res.data;
                this.$nextTick(() => {
                    if (!this.ratingStroll) {
                        this.ratingStroll = new BScroll(this.$refs.ratingHook, {
                        click: true
                    });
                    } else {
                       this.ratingStroll.refresh();
                    }
                });
            }
        });
    },
    filters: {
        formatDate(time) {
            let date = new Date(time);
            return formatDate(date, 'yyyy-MM-dd hh:mm');
        }
    },
    methods: {
        show(type, text) { // 控制筛选
            if (this.onlyContent && !text) {
                return false;
            }
            if (this.selectType === All) {
                return true;
            }
            if (type === this.selectType) {
                return true;
            } else {
                return false;
            }
        },
        ratySelect(type) { // 监听子组件的selectType
            this.selectType = type;
            // console.log(this.selectType);
            this.$nextTick(() => {
                this.ratingStroll.refresh();
            });
        },
        conToggle(onlyContent) { // 监听子组件的onlyContent
            this.onlyContent = onlyContent;
            // console.log(this.onlyContent);
            this.$nextTick(() => {
                this.ratingStroll.refresh();
            });
        }
    },
    components: {
        star,
        split,
        ratingselect,
        shopcart
    }
   };
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/minxin.styl";
    .ratings-wrapper
    	position:absolute
    	left:0
    	top:174px
    	width:100%
    	bottom:0
    	overflow:hidden
    	.overview
    		display:flex
    		padding:18px 0
    		.overview-left
    			flex:0 0 137px
    			width:137px
    			border-right:1px solid rgba(7,17,27,0.1)
    			text-align:center
    			@media only screen and (max-width:320px)
    			    flex:0 0 116px
    			    width:116px
    			.score
    				font-size:24px
    				color:rgb(255,153,0)
    				line-height:28px
    			.desc-content
    				font-size:12px
    				color:rgb(7,17,27)
    				line-height:12px
    				padding:6px 0 8px 0
    			.rankRate
    				font-size:10px
    				color:rgb(147,153,159)
    				line-height:10px
    				padding-bottom:6px
    		.overview-right
    			flex:1
    			padding-left:24px
    			@media only screen and (max-width:320px)
    			    padding-left:10px
    			.score-wrapper
    				font-size:0
    				line-height:18px
    				.score-title
    					display:inline-block
    					font-size:12px
    					color:rgb(7,17,27)
    					margin:0 12px 8px 0
    				.star
    					display:inline-block
    					margin-right:12px
    					vertical-align: middle;
    				.score
    					font-size:12px
    					color:rgb(255,153,0)
    					margin-right:24px
    			.delivery-wrapper
    				font-size:12px
    				line-height:18px
    				.score-title
    					color:rgb(7,17,27)
    					margin-right:12px
    				.deliveryTime
    					color:rgb(147,153,159)
    	.ratings-desc-content
    		padding:0 18px
    		.rating-item
    			display:flex
    			padding:18px 0
    			border-1px(rgba(7,17,27,0.1))
    			.avatar
    				flex:0 0 28px
    				width:28px
    				margin-right:12px
    				img
    					border-radius:50%
    			.content
    				flex:1
    				position:relative
    				.username
    					font-size:10px
    					color:rgb(7,17,27)
    					line-height:12px
    				.star-wrapper
    					padding:4px 0 6px 0
    					font-size:0
    					.star
    						display:inline-block
    					.deliveryTime
    						font-size:10px
    						font-weight:200
    						color:rgb(147,153,159)
    						line-height:12px
    						margin-left:6px
    						vertical-align: text-bottom;
    				.rating-text
    					font-size:12px
    					color:rgb(7,17,27)
    					line-height:18px
    				.recommend
    					margin-top:8px
    					font-size:0
    					.icon-thumb_up,.icon-thumb_down
    					    margin-right:8px
    					    line-height:12px
    					    font-size:12px
    				    .icon-thumb_up
    					    color:rgb(0,160,220)
    					.rec
    						display:inline-block
    						width:65px
    						box-sizing:border-box
    						font-size:9px
    						color:rgb(147,153,159)
    						line-height:16px
    						margin-right:8px
    						border:1px solid rgba(7,17,27,0.1)
    						border-radius:2px
    						padding:3px 6px
    						overflow:hidden
    						text-overflow:ellipsis
    						white-space:nowrap
    						text-align:center
    						vertical-align:middle 
    				.time 
    					position:absolute
    					top:0
    					right:0
    					font-size:10px
    					font-weight:200
    					color:rgb(147,153,159)
    					line-height:12px
    					
</style>
