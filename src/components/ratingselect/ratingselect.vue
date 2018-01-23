<template>
   <div class="rating-select">
      <div class="rating-type border-1px">
      	<span class="common positive" @click="select(2,$event)" :class="{'active':selectType.default===2 || selectType === 2}">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
      	<span class="common positive" @click="select(0,$event)" :class="{'active':selectType===0}">{{desc.positive}}<span class="count">{{positives.length}}</span></span>
      	<span class="common negative" @click="select(1,$event)" :class="{'active':selectType===1}">{{desc.negative}}<span class="count">{{negatives.length}}</span></span>
      </div>
      <div class="switch">
      	<span class="el-icon-circle-check" @click="toggleContent($event)" :class="{'toggle':onlyContent===true || onlyContent.default===true}"></span>
      	<span class="switch-title">只看有内容的评价</span>
      </div>
   </div>
</template>

<script>
   const POSITIVE = 0;
   const NEGATIVE = 1;
   const All = 2;
   export default{
   	props: {
   		ratings: {
   			type: Array,
   			default() {
   				return [];
   			}
   		},
   		// selectType: {
   		// 	type: Number,
   		// 	default: All
   		// },
   		// onlyContent: {
   		// 	type: Boolean,
   		// 	default: false
   		// },
   		desc: {
   			type: Object,
   			default() {
   				return {
   					all: '全部',
   					positive: '满意',
   					negative: '不满意'
   				};
   			}
   		}
   	},
   	data() {
    return {
        selectType: {
   			type: Number,
   			default: All
   		},
   		onlyContent: {
   			type: Boolean,
   			default: true
   		}
        };
    },
   	computed: {
   		positives() {
   			return this.ratings.filter((rating) => {
   				return rating.rateType === POSITIVE;
   			});
   		},
   		negatives() {
   			return this.ratings.filter((rating) => {
   				return rating.rateType === NEGATIVE;
   			});
   		}
   	},
   	methods: {
   		select(type, event) {
   			if (!event._constructed) { // 阻止非vue事件
                return false;
            } else {
                this.selectType = type;
                this.$emit('select-type', this.selectType); // 将selectType传给父组件
            }
   		},
   		toggleContent(event) {
   			if (!event._constructed) { // 阻止非vue事件
                return false;
            }
            this.onlyContent = !this.onlyContent;
            this.$emit('content-toggle', this.onlyContent); // 将onlyContent传给父组件
   		}
   	}
   };
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/minxin.styl"
    .rating-select
    	.rating-type
    		padding:18px 0
    		margin:0 18px
    		font-size:0
    		border-1px(rgba(7,17,27,0.1))
    		.common
    			width:60px
    			height:34px
    			display:inline-block
    			text-align:center
    			font-size:12px
    			line-height:34px
    			border-radius:1px
    			margin-right:8px
    			color:rgb(77,85,93)
    			.count
    				font-size:8px
    				margin-left:2px
    		.positive
    			background:rgba(0,160,220,0.2)
    		.negative
    			background:rgba(77,85,93,0.2)
    		.active
    			background:rgb(0,160,220)
    			color:rgb(255,255,255)
    	.switch
    		padding:12px 18px
    		line-height:24px
    		color:rgb(147,153,159)
    		border-1px(rgba(7,17,27,0.1))
    		font-size:0
    		.el-icon-circle-check
    			font-size:24px
    			margin-right:4px
    		.toggle
    			color:rgba(0,160,220,0.8)
    		.switch-title 
    			font-size:12px
    			vertical-align: top;
</style>
