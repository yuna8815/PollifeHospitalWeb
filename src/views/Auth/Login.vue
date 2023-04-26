<template>
  <v-container class="fill-height">
    <v-form
      ref="form"
      v-model="valid"
      class="pt-9 pb-12 mx-auto">
      <!-- 
        !TODO 이미지 변경
       -->
      <v-img
        src="@/assets/logo.svg"
        alt="POLIFE"
        width="110"
        class="mx-auto" />

      <v-text-field
        placeholder="아이디"
        outlined
        :rules="[v => !!v]"
        class="mt-5" />
      <v-text-field
        placeholder="비밀번호"
        outlined
        :rules="[v => !!v]" />
      
      <div class="d-flex align-center mb-7">
        <v-checkbox
          v-model="isAutoLogin"
          label="자동 로그인 하기"
          hide-details
          :ripple="false"
          off-icon="mdi-checkbox-marked"
          class="mt-0 pt-0" />
        <v-spacer />
        <router-link
          to="/auth/signup"
          class="primary--text font-weight-bold text-decoration-none">
          회원가입
        </router-link>
      </div>

      <v-btn
        block
        depressed
        :disabled="!valid"
        color="primary"
        @click="doValidation"
        >로그인</v-btn>

      <div class="d-flex align-center justify-center mt-9">
        <router-link
          to="/auth/find-id"
          class="grey--text text--lighten-5 text-decoration-none">
          아이디 찾기
        </router-link>
        <span class="mx-3 grey--text text--lighten-5">|</span>
        <router-link
          to="/auth/find-pw"
          class="grey--text text--lighten-5 text-decoration-none">
          비밀번호 찾기
        </router-link>
      </div>
    </v-form>
  </v-container>
</template>

<script>
export default {
  name: 'LoginPage',
  data: () => ({
    valid: true,
    isAutoLogin: false,
  }),
  methods: {
    doValidation() {
      // 로그인
      this.$router.push({path: '/init/cover'})
    }
  }
}
</script>

<style lang="scss" scoped>
.v-form {
  width: 460px;
}
</style>