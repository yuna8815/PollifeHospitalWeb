import Vue from 'vue'
import Vuex from 'vuex'
 
Vue.use(Vuex)
 
export default new Vuex.Store({
  state: {
    APP_NAME: '폴라이프',
    user: {
      LOGIN_ID: 'police123',
      PASSWORD: '**********',
      MEMBER_NAME: '원주 세브란스 기독병원',
      ADDRESS: '강원도 원주시 일산로 20',
      MEMBER_TEL_NO: ['033','1234','1234'],
      USER_NAME: '윤상진',
      TEL_NO: ['033','1234','1234'],
      EMAIL: 'sangjin123@ywmc.or,kr',
    },
  },
  getters: {},
  actions: {},
  mutations: {}
})