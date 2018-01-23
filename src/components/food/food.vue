<template>
<transition name="fade">
 <div v-show="showflag" class="food-wr" ref="foodHook">
     <div class="food-content">
     	<div class="img-header">
     		<img :src="food.image">
     		<div class="icon" @click="hide">
     			<i class="el-icon-arrow-left"></i>
     		</div>
     	</div>
     	<div class="food-desc">
     		<h1 class="name">{{food.name}}</h1>
     		<div class="extra">
				<span class="sellCount">月售{{food.sellCount}}份</span>
				<span class="rating">好评率{{food.rating}}%</span>
			</div>
			<div class="price">
				<span class="food-price">¥{{food.price}}</span>
				<span v-show="food.oldPrice" class="discount-price">¥{{food.oldPrice}}</span>
			</div>
			<div class="select-num">
	     		<selectnumbtn :food="food" v-show="food.count"></selectnumbtn>
	     		<div class="buy" v-show="!food.count" @click.stop="showAdd($event)">加入购物车</div>
     	    </div>
     	</div>
     	<split></split>
     	<div class="store-desc" v-show="food.info">
     		<h1 class="title">商品介绍</h1>
     		<p class="info">{{food.info}}</p>
     	</div>
     	<split  v-show="food.info"></split>
     	<div class="ratings">
     		<h1 class="title">商品评价</h1>
     		<ratingselect :select-type='selectType' :only-content='onlyContent' :desc='desc' :ratings='food.ratings' @select-type="ratySelect" @content-toggle="conToggle"></ratingselect>
     	</div>
     	<div class="rating-wrapper">
     		<ul v-show="food.ratings && food.ratings.length">
     			<li v-show="needShow(rating.rateType,rating.text)" v-for="rating in food.ratings" class="rating-item">
     				<div class="rating-title">
		     			<div class="rating-time">{{rating.rateTime | formatDate}}</div>
		     			<div class="user">
		     			    <span class="username">{{rating.username}}</span>
		     			    <img :src="rating.avatar" class="avatar" width="12" height="12">
		     			</div>
		     		</div>
		     		<div class="rating-content">
		     			<span :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></span>{{rating.text}}
		     		</div>
     			</li>
     		</ul>
     	</div>
     </div>
 </div>
 </transition>
</template>

<script>
import Vue from 'vue';
import BScroll from 'better-scroll';
import selectnumbtn from '../selectnumbtn/selectnumbtn.vue';
import split from '../split/split.vue';
import ratingselect from '../ratingselect/ratingselect.vue';
import {formatDate} from '../../common/js/date.js';
   const All = 2;
   // const POSITIVE = 0;
   // const NEGATIVE = 1;
   export default{
    props: {
        food: {
            type: Object
        }
    },
    data() {
        return {
            showflag: false,
            selectType: All,
            onlyContent: true,
            desc: {
                all: '全部',
                positive: '推荐',
                negative: '吐槽'
            }
        };
    },
    filters: {
        formatDate(time) {
            let date = new Date(time);
            return formatDate(date, 'yyyy-MM-dd hh:mm');
        }
    },
    methods: {
        show() {
            this.showflag = true;
            this.selectType = All;
            this.onlyContent = true;
            this.$nextTick(() => {
                if (!this.foodStroll) {
                   this.foodStroll = new BScroll(this.$refs.foodHook, {
                    click: true
                });
                } else {
                    this.foodStroll.refresh();
                }
            });
        },
        hide() {
            this.showflag = false;
        },
        showAdd(event) {
            if (!event._constructed) { // 阻止非vue事件
                return;
            }
            if (this.food.count) {
                 return false;
            } else {
                Vue.set(this.food, 'count', 1);
            }
        },
        needShow(type, text) { // 控制筛选
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
                this.foodStroll.refresh();
            });
        },
        conToggle(onlyContent) { // 监听子组件的onlyContent
            this.onlyContent = onlyContent;
            this.$nextTick(() => {
                this.foodStroll.refresh();
            });
        }
    },
    components: {
        selectnumbtn,
        split,
        ratingselect
    }
   };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .food-wr
    	position:fixed
    	left:0
    	bottom:48px
    	z-index:30
    	width:100%
    	height:100%
    	background:#fff
        &.fade-enter-active,&.fade-leave-active
    		transition:all 0.2s linear
    		transform:translate3d(0,0,0)
    	&.fade-enter ,&.fade-leave-active
    		transform:translate3d(414px,0,0)
    	.food-content
    		.img-header
    			position:relative
    			width:100%
    			height:0
    			padding-top:100%
    			img
    				position:absolute
    				top:0
    				left:0
    				width:100%
    				height:100%
    			.icon
    				position:absolute
    				top:50px
    				left:0px
    				.el-icon-arrow-left
    					display:block
    					padding:10px
    					font-size:20px
    					color:#fff
    		.food-desc
    			position:relative
    			width:100%
    			padding:18px
    			.name
    				font-size:14px
    				font-weight:700
    				color:rgb(7,17,27)
    				line-height:14px
    				margin-bottom:8px
    			.price
    				font-weight:700
    				.food-price
    					font-size:14px
    					color:rgb(240,20,20)
    					line-height:24px
    				.discount-price
    					font-size:10px
    					color:rgb(147,153,159)
    					line-height:24px
    			.extra
    				font-size:10px
    				color:rgb(147,153,155)
    				line-height:10px
    				margin-bottom:18px
    				.sellCount
    					margin-right:5px		
    		    .select-num
    			    position:absolute
    			    bottom:10px
    			    right:45px
    		        .buy
    			        position:absolute
    			        right:7px
    			        bottom:7px
    			        width:74px
    			        height:24px
    			        border-radius:12px
    			        background:rgb(0,160,220)
    			        color:rgb(255,255,255)
    			        line-height:23px
    			        font-size:10px
    			        text-align:center
    			        box-sizing:border-box
    			        z-index:20
    		.store-desc
    			padding:18px
    			.title
    				font-size:14px
    				line-height:14px
    				color:rgb(7,17,27)
    			.info
    				font-size:12px
    				font-weight:200
    				color:rgb(77,85,93)
    				line-height:24px
    				padding:6px 8px 0 8px
    				box-sizing:border-box
    		.ratings 
    			padding-top:18px
    			.title 
    				margin-left:18px
    				font-size:14px
    				line-height:14px
    				color:rgb(7,17,27)
    		.rating-item
    			padding:16px 18px 0
    			.rating-title
    				font-size:0
    				margin-bottom:6px
    				position:relative
    				.rating-time,.user
    					display:inline-block
    					font-size:12px
    					color:rgb(147,153,159)
    					line-height:12px
    				.user
    					position:absolute
    					right:18px
    					top:0
    					.username
    						margin-right:6px
    			.rating-content
    				font-size:12px
    				color:rgb(7,17,27)
    				line-height:16px
    				border-bottom:1px solid rgba(7,17,27,0.1)
    				padding-bottom:16px
    				.icon-thumb_up,.icon-thumb_down
    					margin-right:4px
    					line-height:12px
    					font-size:12px
    				.icon-thumb_up
    					color:rgb(0,160,220)
</style>
