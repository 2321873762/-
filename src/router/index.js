import Vue from 'vue'
import VueRouter from 'vue-router'
import dgq from './董国强'
import gx from './高祥'
import zq from './张庆'
import lht from './李洪涛'
import sg from './舍根'
import gy from './郭彦'
import zwf from './郑文辅'
import hfx from './贺飞祥'

//重复点击报错解决
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
  ...gx,
  ...dgq,
  ...zq,
  ...lht,
  ...sg,
  ...gy,
  ...zwf,
  ...hfx
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
