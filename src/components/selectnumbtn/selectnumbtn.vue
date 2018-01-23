<template>
 	<div class="quantity">
 	<transition name="move">
	 	<div class="cart-decrease" v-show="food.count>0" @click.stop="decreaseCart($event)">
		    <a class="decrease">
			    <i class="el-icon-remove-outline inner"></i>
			</a>
		</div>
	</transition>	
		<div class="cart-text" v-show="food.count>0">
			<span class="text">{{food.count}}</span>
		</div>
		<div class="cart-increase" @click.stop="addCart($event)">
			<a class="increase">
				<i class="el-icon-circle-plus"></i>
			</a>
		</div>
	</div>
</template>

<script>
import Vue from 'vue';
   export default{
    props: {
      food: {
        type: Object
      }
    },
    created() {
        // console.log(this.food);
    },
    methods: {
        addCart(event) {
            if (!event._constructed) { // 阻止非vue事件
                return;
            }
            if (!this.food.count) {
                // this.food.count = 1;
                Vue.set(this.food, 'count', 1);
            } else {
                this.food.count ++;
            }
            // console.log(this.food.count);
        },
        decreaseCart(event) {
            if (!event._constructed) { // 阻止非vue事件
                return;
            }
            if (this.food.count < 0) {
                this.food.count = 0;
            } else {
                this.food.count --;
            }
        }
    }
   };
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/minxin.styl"
    .quantity
    	box-sizing:border-box
    	.cart-decrease
            display:inline-block
            font-size:24px
            line-height:24px
            padding:6px
            vertical-align: middle;
            transition:all 0.5s linear
            &.move-transition
            	opacity:1
            	transform:translate3d(0,0,0)
            	transform:rotate(0)
            &.move-enter,&.move-leave
            	opacity:0
            	transition:all 0.5s linear
            	transform:translate3d(24px,0,0)
            	transform:rotate(180deg)
            .decrease
            	color:rgb(0,160,220)
        .cart-text
            display:inline-block
            text-align:center
            vertical-align: middle;
            .text
                font-size:10px
                color:rgb(147,153,159)
                line-height:24px
        .cart-increase
            display:inline-block
            font-size:24px
            line-height:24px
            padding:6px
            vertical-align: middle;
            .increase
            	color:rgb(0,160,220)
</style>
