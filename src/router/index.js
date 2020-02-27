import Vue from 'vue'
import BaiduMap from 'vue-baidu-map'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import keyikanti from '../views/keyikanti'
import keyishunxu from '../views/keyishunxu'
import keyimoni from '../views/keyimoni'
import keyiCuoti from '../views/KeyiCuoti'
import Kesishunxu from  '../views/KesiShunxu'
import kesikanti from '../views/kesikanti'
import kesimoni from '../views/kesimoni'
import KesiCuoti from "../views/KesiCuoti";
import keer from  "../views/keer"
import aitest from '../views/aitest'
import personcenter from '../views/PersonCenter'
import faceadd from '../views/faceadd'
// import VueVideoPlayer from 'vue-video-player'
import hourstatistic from '../views/hourstatistic'
import showscore from '../views/showscore'
import schoolrate from '../views/schoolrate'
import examschedule from '../views/examschedule'
import coachrate from '../views/coachrate'
// import 'videojs-flash'
// import 'videojs-contrib-hls'
// import 'video.js/dist/video-js.css'

// Vue.use(VueVideoPlayer)
Vue.use(VueRouter)
Vue.use(BaiduMap, {
  ak: 'qndpvrYqRPHWaspKTGpZcuN2l3FudVgh'    //这个地方是官方提供的ak密钥
})
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/personcenter',
    component: personcenter,
    children:[
      {
        path: '/faceadd',
        component: faceadd
      },
      {
        path: '/schoolrate',
        component: schoolrate
      },
      {
        path: '/examschedule',
        component: examschedule
      },
      {
        path: '/coachrate',
        component: coachrate
      },
      {
        path: '/showscore',
        component: showscore
      },
      {
        path:'/aitest',
        component:aitest
      },
      {
        path: '/hourstatistic',
        component: hourstatistic
      }
    ]
  },


  {
    path:'/kesishunxu',
    component:Kesishunxu
  },
  {
    path:'/keer',
    component:keer
  },
  {
    path:'/kesan',
    component:keer
  },
  {
    path:'/kesimoni',
    component:kesimoni
  },
  {
    path:'/kesikanti',
    component:kesikanti
  },
  {
    path: '/keyikanti',
    component: keyikanti
  },
  {
    path: '/keyishunxu',
    component: keyishunxu
  },
  {
    path: '/kesicuoti',
    component: KesiCuoti
  },
  {
    path: '/keyimoni',
    component: keyimoni
  },
  {
    path: '/keyicuoti',
    component: keyiCuoti
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
