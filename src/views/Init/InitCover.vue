<template>
  <v-container class="fill-height">
    <v-row>
      <v-col class="text-center">
        <v-img
          src="@/assets/logo.svg"
          alt="POLIFE"
          width="110"
          class="mx-auto mb-6" />
        <h1 class="font-weight-medium" style="font-size: 32px;"><b class="primary--text">지정병원 정보</b>를 입력해주세요.</h1>
        <p class="mt-4" style="font-size: 16px;">성공적으로 회원가입 및 로그인이 되었습니다.<br>협력에 감사드립니다.<br>
        <br>
        지정병원 협약 정보를 입력해주세요.<br>해당 정보는 협약 내역과 비교, 의료 DB 생성에 사용됩니다.</p>
        <div class="mt-15 d-flex justify-center">
          <v-btn
            width="200"
            outlined
            @click="doLogout">
            로그아웃
          </v-btn>
          <v-btn
            to="/init/info"
            width="200"
            depressed
            color="primary"
            class="ml-4">
            지정병원 정보 입력
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  methods: {
    doLogout() {
      // 로그아웃
      this.$router.push({path: '/'})
    }
  }
}
</script>