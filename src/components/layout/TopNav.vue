<template>
  <v-app-bar 
    app
    absolute
    flat
    height="36"
    color="primary"
  >
    <v-container class="d-flex align-center py-0">
      <div class="d-flex align-center">
        <v-img max-width="75" height="24" src="@/assets/logo_horizontal_dark.svg" />
        <p class="mb-0 ml-4 white--text">의료 데이터 관리 웹</p>
      </div>
      <v-spacer />
      <div class="d-flex align-center">
        <router-link to="/checkup" class="d-flex align-center text-decoration-none font-weight-medium white--text">
          <v-img max-width="20" src="@/assets/icon_recent_actors.svg" class="mr-2" /> 검진 데이터 업로드
        </router-link>
        <p class="mb-0 mx-9 font-weight-bold white--text">원주 세브란스 기독병원</p>
        <div class="account">
          <router-link to="/settings" class="font-weight-medium text-decoration-none white--text">계정 설정</router-link>
          <router-link to="/" class="logout ml-5 white--text text-decoration-none font-weight-regular" @click="doLogout">로그아웃</router-link>
          <!-- <v-btn
            text
            small
            class="logout ml-5 white--text text-decoration-none font-weight-regular"
            @click="doLogout">로그아웃</v-btn> -->
        </div>
      </div>
    </v-container>
  </v-app-bar>
</template>

<script>
export default {
  methods: {
    doLogout() {
      this.$router.push({ path: '/'})
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  p {
    font-size: 13px;
    font-weight: 500;
  }
  .account .logout {
    font-size: 13px;
    opacity: .8;
    position: relative;
    &::before {
      position: absolute;
      content: '';
      height: 16px;
      width: 1px;
      top: 0;
      left: -10px;
      opacity: 1;
      background-color: rgba(255,255,255,.3) !important;
    }
  }
}
</style>