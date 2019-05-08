import Vue from 'vue'
import Router from 'vue-router'
import Nav from '@/components/Nav'
import Home from '@/components/Home'
import Detail from '@/components/Detail'
import CartList from '@/components/CartList'
import CheckOut from '@/components/CheckOut'
import Account from '@/components/account/Account'
import AcAddress from '@/components/account/AcAddress'
import AcOrder from '@/components/account/AcOrder'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      components: {
        Naview:Nav,
        default:Home
      }
    },
    {
      path: '/detail/:idx',
      components: {
        Naview: Nav,
        default: Detail
      }
    },
    {
      path: '/cartlist',
      components: {
        Naview: Nav,
        default: CartList
      }
    }, {
      path: '/checkout',
      components: {
        Naview: Nav,
        default: CheckOut
      }
    },{
      path:'/account',
      components:{
        Naview:Nav,
        default:Account
      },
      children:[
        {
          path:'address',
          component:AcAddress
        },{
          path:'order',
          component:AcOrder
        }
      ]
    }
  ]
})
