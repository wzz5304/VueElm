<template>
  <div class="shopcart">
  	<div class="content">
  		<div class="content-left" @click="toggleList">
  			<div class="logo-wrapper">
  				<div class="logo" :class="totalCount>0?'haveGoods':''">
  					<span class="icon-shopping_cart"></span>
  				</div>
  				<div class="count" v-show="totalCount">{{totalCount}}</div>
  			</div>
  			<div class="price" :class="{'heightLight':totalPrice>0}">¥{{totalPrice}}</div>
  			<div class="desc">另需配送费¥{{seller.deliveryPrice}}元</div>
  		</div>
  		<div class="content-right" @click="pay">
  		    <div class="pay" :class="{'payMoney':totalPrice>=20}">{{payMoney}}</div>
  		</div>
  	</div>
  	<div class="shopcart-list" v-show="listShow">
  		<div class="shopcart-header">
  			<h1 class="title">购物车</h1>
  			<span class="clear" @click="removeCount" >清空</span>
  		</div>
  		<div class="shopcart-content" ref="shopcartContent">
  			<ul>
  				<li class="food" v-for="item in selectGoods">
  					<span class="name">{{item.name}}</span>
  					<span class="shopcart-price">¥{{item.price*item.count}}</span>
  					<div class="select-btn">
  						<selectnumbtn :food='item'></selectnumbtn>
  					</div>
  				</li>
  			</ul>
  		</div>
  	</div>
  	<div class="mask" v-show="listShow">
  	</div>
  </div>
</template>
<script>
import BScroll from 'better-scroll';
import selectnumbtn from '../selectnumbtn/selectnumbtn.vue';
   export default{
    props: {
     selectGoods: {
        type: Array,
        default() {
            return [];
        }
      },
      seller: {
        type: Object,
        deliveryPrice: {
            type: Number,
            default: 0
        },
        minPrice: {
            type: Number,
            default: 0
        }
      }
    },
    data() {
        return {
            fold: true,
            flag: true
       };
    },
    // created() {
    //     this.$nextTick(() => {
    //         this._initScroll();
    //         // this.currentIndex();
    //     });
    // },
    computed: {
        totalPrice() {
            let total = 0;
            this.selectGoods.forEach((food) => {
                total += food.price * food.count;
            });
            return total;
        },
        totalCount() {
            let count = 0;
            this.selectGoods.forEach((food) => {
                count += food.count;
            });
            return count;
        },
        payMoney() {
            if (this.totalPrice === 0) {
                return `¥ ${this.seller.minPrice}起送`;
            } else if (this.totalPrice < this.seller.minPrice) {
                return `还差¥${this.seller.minPrice - this.totalPrice}起送`;
            } else {
                return '去结算';
            }
        },
        listShow() {
            if (!this.totalCount) {
                this.fold = true;
                return false;
            }
            let show = !this.fold;
            if (show) {
                this.$nextTick(() => {
                    if (!this.shopcartScroll) {
                         this.shopcartScroll = new BScroll(this.$refs.shopcartContent, {
                        click: true
                    });
                } else {
                    this.shopcartScroll.refresh();
                }
                });
            }
            return show;
        }

    },
    methods: {
        toggleList() {
            if (!this.totalCount) {
                return;
            }
            this.fold = !this.fold;
        },
        removeCount() {
            this.selectGoods.forEach((item) => {
                if (item.count) {
                    // console.log(item);
                    item.count = 0;
                    this.listShow = false;
                }
            });
        },
        pay() {
            if (this.totalPrice < this.seller.minPrice) {
                return false;
            } else {
                alert(`您需要支付¥${this.totalPrice + 4}`);
            }
        }
    },
    components: {
        selectnumbtn
     }
   };
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/minxin.styl" 
@import "../../common/stylus/icon.styl"
.shopcart
	position:fixed
	width:100%
	height:48px
	z-index:50
	bottom:0
	left:0
	.content
		display:flex
		background:#141d27
		height:100%
		font-size:0
		.content-left
			z-index:50
			flex:1
			.logo-wrapper
				position:relative
				display:inline-block
				width:56px
				height:56px
				background:#141d27
				border-radius:28px
				top:-10px
				margin:0 12px
				box-sizing:border-box
				padding:6px
				vertical-align:top
				.logo
					height:44px
					width:44px
					border-radius:22px
					background:#2b343c
					text-align:center
					&.haveGoods
						background:#00a0dc
						.icon-shopping_cart
							background:#fff
					.icon-shopping_cart
						font-size:24px
						color:#80858a
						line-height:44px
				.count
					position:absolute
					width:24px
					height:16px
					background:rgb(240,20,20)
					box-shadow:0px 4px 8px 0px rgba(0,0,0,0.4)
					border-radius:16px
					font-size:9px
					font-weight:700
					color:rgb(255,255,255)
					line-height:16px
					text-align:center
					top:0
					right:0
		    .price
			    display:inline-block
			    vertical-align:top
			    font-size:16px
			    color:rgba(255,255,255,0.4)
			    font-weight:700
			    line-height:24px
			    margin-top:12px
			    box-sizing:border-box
			    padding-right:12px
			    border-right:1px solid rgba(255,255,255,0.1)
            .heightLight
			    color:rgb(255,255,255)!important
		    .desc
				display:inline-block
				vertical-align:top
				line-height:24px
				font-size:10px
				color:rgba(255,255,255,0.4)
				font-weight:700
				box-sizing:border-box
				margin:12px 0 0 12px
		.content-right
			flex:0 0 105px	
			width:105px
			background:#2b333b
			font-weight:700
			line-height:48px
			box-sizing:border-box
			text-align:center
	        &.payMoney
				background:#00b43c
		        .pay
					color:rgb(255,255,255)!important
			.pay
				font-size:12px
				color:rgba(255,255,255,0.4)
	.shopcart-list
		width:100%
		height:auto
		max-height:257px
		position:absolute
		left:0
		bottom:47px
		z-index:10
		.shopcart-header
			background:#f3f5f7
			height:40px
			border-1px(rgba(7,17,27,0.2))
			.title 
				display:inline-block
				font-size:14px
				font-weight:200
				color:rgb(7,17,27)
				line-height:40px
				margin-left:18px
			.clear
				display:inline-block
				position:absolute
				font-size:12px
				color:rgb(0,160,220)
				line-height:40px
				right:18px
		.shopcart-content
			line-height:24px
			max-height:217px
			padding:0 18px
			background:#fff
			overflow:hidden
			margin-top:-1px
			.food
				position:relative
				height:48px
				line-height:48px
				box-sizing:border-box
				border-1px(rgba(7,17,27,0.2))
	            .name
					font-size:14px
					color:rgb(7,17,27)
					font-weight:700
				.shopcart-price
					position:absolute
					font-size:12px
					font-weight:700
					color:rgb(240,20,20)
					right:90px
				.select-btn
					position:absolute
					right:0
					bottom:0
	.mask
		position:fixed
		left:0
		top:0
		height:90%
		width:100%
		background:rgba(7,17,27,0.6)
		z-index:-10
		backdrop-filter:blur(10px)

</style>
