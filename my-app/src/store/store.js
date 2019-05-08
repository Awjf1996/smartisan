import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        num: 0,
       cartData: [{
           "stock_id": 1000701,
           "title": "畅呼吸防护口罩（花粉、粉尘、PM2.5、病菌）",
           "sub_title": "五层防护、高达 98% 的平均过滤效率",
           "image": "https://resource.smartisan.com/resource/ef67ff9577c62979930b356a37b86251.jpg",
           "price": 99,
           "limit_num": 10, //限制购买数量
           "cartnum": 1,
           "isCheck": true,
           "detail": {
             "color": "#FBF084",
             "color_name": "绿色"
           }
         },
         {
           "stock_id": 1000801,
           "title": "坚果Pro保护膜 红色",
           "sub_title": "耐刮花、防指纹 宝石蓝",
           "image": "https://resource.smartisan.com/resource/e883f15eed51a49e1fbc9d8ddd82460b.png",
           "price": 50,
           "cartnum": 1,
           "isCheck": true,
           "limit_num": 5, //限制购买数量
           "detail": {
             "color": "#78282a",
             "color_name": "红色"
           }
         }
       ],
        addressInfor: [{
            'username': '张三丰',
            'phone': 13888888888,
            'tel': ['023', '66666666'],
            'location': [{
                'area_name': '重庆市',
                'num': 0
              },
              {
                'area_name': '县城',
                'num': 1
              },
              {
                'area_name': '巫山',
                'num': 2
              }
            ],
            'address': '除却巫山不是云',
            'isDefault': true
          },
          {
            'username': '张无忌',
            'phone': 13866666666,
            'tel': ['023', '66666666'],
            'location': [{
                'area_name': '甘肃省',
                'num': 1
              },
              {
                'area_name': '市区',
                'num': 0
              },
              {
                'area_name': '天水市',
                'num': 4
              }
            ],
            'address': '麦积山脚下',
            'isDefault': false
          }
        ]
    },
    getters:{
        allInfor(state){
            var allNum = 0,
              allPrice = 0, //购物车中所有商品总价
              checkNum = 0, //已选商品总数
              checkPrice = 0, //已选商品总价
              allCheck = true;
            var cdata = state.cartData
            var len = cdata.length
            for (var i = 0; i < len; i++) {
                allNum += cdata[i].cartnum
                allPrice += cdata[i].cartnum * cdata[i].price
                if (cdata[i].isCheck) {
                    checkNum += cdata[i].cartnum
                    checkPrice += cdata[i].cartnum * cdata[i].price
            }
                if (!cdata[i].isCheck) {
                    allCheck = false
                }
            }
            return {
                 allNum,
                 allPrice:allPrice.toFixed(2),
                 checkNum,
                 checkPrice:checkPrice.toFixed(2),
                 allCheck
            }
        },
        checkCartData(state){
            return state.cartData.filter(function (obj) {
              return obj.isCheck
            })
        }
    },
    mutations: {
        cartAddMut(state, obj) { //加入购物车的mutation
          var cdata = state.cartData;
          var len = cdata.length;
          // obj = JSON.parse(JSON.stringify(obj));
        //   console.log(obj)
          for (var i = 0; i < len; i++) {
            if (cdata[i].stock_id == obj.stock_id) { //如果购物车中已经有相同商品，则修改该商品的数量
              if (obj.cartnum) {
                cdata[i].cartnum += obj.cartnum;
              } else {
                cdata[i].cartnum++
              }
              cdata[i].cartnum > cdata[i].limit_num ? cdata[i].cartnum = cdata[i].limit_num : ''; //限定单个商品条数不能多于限制最大条数
              return false;
            }
          }
          obj.cartnum ? '' : Vue.set(obj, 'cartnum', 1); //为新添加的商品设置一个商品个数字段
          Vue.set(obj, "isCheck", true); //为商品添加一个用以控制勾选状态的字段
          state.cartData.push(obj)
        },
        cartDelMut(state,i){
          state.cartData.splice(i,1)
        },
        checkMut(state, i) { //购物清单组件的单个商品勾选
          state.cartData[i].isCheck = !state.cartData[i].isCheck
        },
        allCheckMut(state, bool) { //全选按钮触发的mutation
          var cdata = state.cartData;
          var len = cdata.length;
          for (var i = 0; i < len; i++) {
            cdata[i].isCheck = !bool;
          }
        },
        plusMut(state, i) { //购物清单商品增加
          if (state.cartData[i].cartnum < state.cartData[i].limit_num) {
            state.cartData[i].cartnum++
          }
        },
        minuMut(state, i) { //购物清单商品减少
          if (state.cartData[i].cartnum > 1) {
            state.cartData[i].cartnum--
          }
        },
        saveLocMut(state,obj){
          // console.log(obj)
          if(obj.editnum==-1){
            state.addressInfor.push(obj.newLocData)
          }else{
            state.addressInfor[obj.editnum] = obj.newLocData
          }
        },
        addressDelMut(state,i){
            state.addressInfor.splice(i,1)
        },
        setDefaultMut(state,n){
          state.addressInfor.forEach(function (obj, i) {
            obj.isDefault = i == n ? true : false
          })
        }
       
    }
})