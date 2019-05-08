<template>
    <div class="item">
        <div>
            <div class="item-img">
                <img alt="Smartisan 快充移动电源 10000mAh" :src="good.stock_info[num].image" style="opacity: 1;">
            </div>
            <h6>{{good.stock_info[num].title}}</h6>
            <h3 >{{good.stock_info[num].sub_title}}</h3>
            <div class="params-colors">
                <ul class="colors-list">
                    <li v-for="(item,index) in good.stock_info" :key="index" @click="changeFn(index)">
                        <a href="javascript:;" :class="index==num?'active':''" :style="'background:'+item.detail.color"></a>
                    </li>
                </ul>
            </div>
            <div class="item-btns clearfix">
                <span class="item-gray-btn">
                     <router-link :to="'/detail/'+gindex">查看详情</router-link>
                </span>
                <span class="item-blue-btn" @click="cartAdd">加入购物车</span>
            </div>
            <div class="item-price clearfix">
                <i>¥</i><span>{{good.stock_info[num].price}}</span>
            </div>
            <div class="discount-icon">false</div>
            <div class="item-cover">
                <a href="javascript:;" target="_blank"></a>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                num: 0
            }
        },
        props: {
            good: Object,
            gindex: Number
        },
        computed:{
           
        },
        methods: {
            changeFn(i) {
                this.num = i
            },
            cartAdd(){
                var obj = this.good.stock_info[this.num]; 
                this.$store.commit('cartAddMut',obj)
            }
        }
    }
</script>

<style scoped>

</style>