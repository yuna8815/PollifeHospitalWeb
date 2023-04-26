import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Auth',
    component: require("@/layout/FooterLayout.vue").default,
    redirect: "/auth/login",
    children: [
      {
        path: "/auth/login",
        name: "Login",
        component: () => import ("@/views/Auth/Login.vue")
      },
      {
        path: "/auth/signup",
        name: "SignUp",
        component: () => import ("@/views/Auth/SignUp.vue")
      },
      {
        path: "/auth/find-id",
        name: "FindId",
        component: () => import ("@/views/Auth/FindId.vue")
      },
      {
        path: "/auth/find-id-result",
        name: "FindIdResult",
        component: () => import ("@/views/Auth/FindIdResult.vue")
      },
      {
        path: "/auth/find-pw",
        name: "FindPw",
        component: () => import ("@/views/Auth/FindPw.vue")
      },
      {
        path: "/auth/find-pw-reset",
        name: "FindPwReset",
        component: () => import ("@/views/Auth/FindPwReset.vue")
      },
      {
        path: "/auth/find-pw-result",
        name: "FindPwReset",
        component: () => import ("@/views/Auth/FindPwResult.vue")
      },
      {
        path: '/auth/staffinfomodify',
        name: 'StaffInfoModify',
        component: () => import("@/views/Auth/StaffInfoModify.vue")
      },
      {
        path: '/auth/passwordmodify',
        name: 'PasswordModify',
        component: () => import("@/views/Auth/PasswordModify.vue")
      },
      {
        path: '/auth/passwordmodifycom',
        name: 'PasswordModifyComplete',
        component: () => import("@/views/Auth/PasswordModifyCom.vue")
      },
      {
        path: '/auth/leave',
        name: 'MemberLeave',
        component: () => import("@/views/Auth/Leave.vue")
      },
      {
        path: '/auth/leave-result',
        name: 'MemberLeave-result',
        component: () => import("@/views/Auth/Leave-Result.vue")
      }
    ]
  },
  {
    path: '/init',
    name: 'Init',
    component: require("@/layout/FooterLayout.vue").default,
    redirect: "/init/cover",
    children: [
      {
        path: '/init/cover',
        name: 'InitCover',
        component: () => import ("@/views/Init/InitCover.vue")
      },
      {
        path: '/init/info',
        name: 'InitInfo',
        component: () => import ("@/views/Init/InitInfo.vue")
      }
    ]
  },
  {
    path: '/checkup',
    name: 'Checkup',
    component: require("@/layout/DefaultLayout.vue").default,
    redirect: '/checkup/upload',
    children: [
      {
        path: '/checkup/upload',
        name: 'CheckupUpload',
        component: () => import("@/views/Checkup/CheckupUpload.vue")
      },
      {
        path: '/checkup/history',
        name: 'CheckupHistory',
        component: () => import("@/views/Checkup/CheckupHistory.vue")
      },
      {
        path: '/checkup/reupload',
        name: 'CheckupReupload',
        component: () => import("@/views/Checkup/CheckupReupload.vue")
      }
    ]
  },
  {
    path: '/settings',
    name: 'Settings',
    component: require("@/layout/DefaultLayout.vue").default,
    redirect: '/settings/account',
    children: [
      {
        path: '/settings/account',
        name: 'SettingsAccount',
        component: () => import("@/views/Settings/SettingsAccount.vue")
      },
      {
        path: '/settings/hospital',
        name: 'SettingsHospital',
        component: () => import("@/views/Settings/SettingsHospital.vue")
      },
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router