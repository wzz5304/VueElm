<template>
 <div class="goods">
  <!-- <div class="loading" v-show="loading">Loading...</div> -->
 	<div class="menu-wrapper" ref="menuWrapper">
 		<ul>
 			<li v-for="(item,index) in goods" class="menu-item" :class="{'current':currentIndex===index}" v-on:click="selectMenu(index,$event)" ref="menuList">
 				<span class="text border-1px" :class="{'border-none':currentIndex===index}">
 				<span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}</span>	
 			</li>
 		</ul>
 	</div>
 	<div class="goods-wrapper" ref="goodsWrapper">
 		<ul>
 			<li v-for="item in goods" class="foods-list food-list-hook">
 				<h1 class="title">{{item.name}}</h1>
 				<ul>
 					<li @click="selectfoods(food,$event)" v-for="food in item.foods" class="food-item border-1px">
 						<div class="icon">
 							<img width="57" height="57" :src="food.icon" alt="">
 						</div>
 						<div class="content">
 							<h2 class="name">{{food.name}}</h2>
 							<p class="description">{{food.description}}</p>
 							<div class="extra">
 								<span class="sellCount">月售{{food.sellCount}}份</span>
 								<span class="rating">好评率{{food.rating}}%</span>
 							</div>
 							<div class="price">
	 							<span class="food-price">¥{{food.price}}</span>
	 							<span v-show="food.oldPrice" class="discount-price">¥{{food.oldPrice}}</span>
 							</div>
              <div class="selectnumbtn-wrapper">
                <selectnumbtn :food='food'></selectnumbtn>
              </div>
 						</div>
 					</li>
 				</ul>
 			</li>
 		</ul>
 	</div>
  <shopcart :seller="seller" :selectGoods="selectGoods"></shopcart>
  <food :food="selectedGoods" ref="food"></food>
 </div>
</template>

<script>
import BScroll from 'better-scroll';
import shopcart from '../shopcart/shopcart.vue';
import selectnumbtn from '../selectnumbtn/selectnumbtn.vue';
import food from '../food/food.vue';
   export default{
    props: {
      seller: {
        type: Object
      }
    },
    data() {
        return {
            goods: [],
            listHeight: [],
            scrollY: 0,
            selectedGoods: {}
       };
    },
    computed: {
        currentIndex() {
            for (let i = 0; i < this.listHeight.length; i++) {
                let height1 = this.listHeight[i];
                let height2 = this.listHeight[i + 1];
                if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
                    // console.log(11111);
                    this._followScroll(i);
                     return i;
                }
            }
             return 0;
        },
        selectGoods() {
            let foods = [];
            this.goods.forEach((good) => {
                 good.foods.forEach((food) => {
                     if (food.count) {
                        foods.push(food);
                     }
            });
            });
            return foods;
        }
    },
    created() {
        this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special'];
        this.quantity = '1';
        this.$http.get('/api/goods').then((response) => {
            response = response.body;
            if (response.errno === 0) {
               this.goods = response.data;
               // console.log(this.goods);
               this.$nextTick(() => {
                    this._initScroll();
                    this._calculateHeight();
                    // this.currentIndex();
                });
        }
        });
    },
    methods: {
        _initScroll() {
            this.menuScroll = new BScroll(this.$refs.menuWrapper, {
                click: true
            });
            this.goodsScroll = new BScroll(this.$refs.goodsWrapper, {
                probeType: 3,
                click: true
            });
            this.goodsScroll.on('scroll', (pos) => {
                this.scrollY = Math.abs(Math.round(pos.y));
                // console.log(this.scrollY);
            });
        },
        _calculateHeight() {
            let foodList = this.$refs.goodsWrapper.getElementsByClassName('food-list-hook');
            let height = 0;
            this.listHeight.push(height);
            for (let i = 0; i < foodList.length; i++) {
                let item = foodList[i];
                height += item.clientHeight;
                this.listHeight.push(height);
            }
            // console.log(...this.listHeight);
        },
        selectMenu(index, event) {
            if (!event._constructed) { // 阻止非vue事件
                return false;
            }
            let foodList = this.$refs.goodsWrapper.getElementsByClassName('food-list-hook');
            let el = foodList[index];
            this.goodsScroll.scrollToElement(el, 300);
            // console.log(index);
        },
        selectfoods(food, event) {
            if (!event._constructed) { // 阻止非vue事件
                return;
            }
            this.selectedGoods = food;
            this.$refs.food.show();
            // console.log(this.selectedGoods);
        },
        _followScroll(index) {
            let menuList = this.$refs.menuList;
            let el = menuList[index];
            this.menuScroll.scrollToElement(el, 300, 0, -100);
      }
    },
    components: {
      shopcart,
      selectnumbtn,
      food
    }
   };
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/minxin.styl"
.goods 
    display:flex
    position:absolute
    top:174px
    bottom:48px
    width:100%
    overflow:hidden
    .menu-wrapper
        flex:0 0 80px
   	    width:80px
   	    background:#f3f5f7
   	    .menu-item
   	        display:table
   	        height:54px
   	        width:56px
   	        line-height:14px
   	        padding-left:12px
   	        padding-right:12px
   	        &.current
   	        	position:relative
   	        	z-index:50
   	        	margin-top:-1px
   	        	background:#fff
   	        	.text
   	        		font-weight:700
   	        		border-none()
   	        .icon
   	            display:inline-block
                width:12px
                height:12px
                margin-right:2px
                background-size:12px 12px
                background-repeat:no-repeat
                vertical-align:middle
                .decrease
	                background-image:('decrease_3')
	            .discount
	                background-image:('discount_3')
	            .guarantee
	                background-image:('guarantee_3')
	            .invoice
	                background-image:('invoice_3')
	            .special
	                background-image:('special_3')
	        .text
	            display:table-cell
	            width:56px
	            vertical-align:middle
	            font-size:12px
	            font-weight:200
	            line-height:24px
	            color:rgb(7,17,27)
	            border-1px(rgba(7,17,27,0.1))
  	.goods-wrapper
  		flex:1
  		// overflow:auto
  		.title
  			height:26px;
  			background: #f3f5f7
  			font-size:12px
  			color:rgb(147,153,159)
  			line-height:26px
  			border-left:2px solid #d9dde1
  			padding-left:14px
  		.food-item
  			display:flex
  			margin:18px
  			padding-bottom:18px
  			position:relative
  			border-1px(rgba(7,17,27,0.1))
  			&:last-child
  				border-none()
  				margin-bottom:0
  			.icon
  				flex:0 0 57px
  				padding-right:10px
  			.content
  				flex:1
  				.name
  					font-size:14px
  					color:rgb(7,17,27)
  					line-height:14px
  					font-weight:bold
  					margin-top:2px
  				.description
  					font-size:10px
  					color:rgb(147,153,159)
  					line-height:14px
  					margin:8px 0
  				.price
  					font-weight:700
  					.food-price
  						font-size:14px
  						color:rgb(240,20,20)
  						line-height:24px
  						margin-right:8px
  					.discount-price
  						font-size:10px
  						color:rgb(147,153,159)
  						line-height:24px
  						text-decoration:line-through
  				.selectnumbtn-wrapper
  					position:absolute
  					right:0
  					bottom:12px
  				.extra
  					margin-bottom:8px
  					font-size:10px
  					color:rgb(147,153,159)
  					line-height:10px
  					.sellCount
  						margin-right:5px       
</style>
