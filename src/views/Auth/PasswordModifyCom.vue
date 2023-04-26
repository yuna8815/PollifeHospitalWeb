<template>
  <div class="d-flex flex-column align-center justify-center my-16">
    <v-icon size="72" color="primary">mdi-check</v-icon>
    <p class="mt-10 mb-5 font-weight-medium" style="font-size: 32px;"><b class="primary--text">비밀번호 변경</b>이 완료되었습니다.</p>
    <p class="mb-15" style="font-size: 16px;">버튼을 누르면 계정 설정 페이지로 돌아갑니다.</p>
    <v-btn
      width="335"
      depressed
      color="primary"
      @click="goPage('/settings/')">
      확인
    </v-btn>
  </div>
</template>
<script>
export default {
  methods: {
    goPage(path) {
      this.$router.push({path: path});
    }
  }
}
</script>
<style lang="scss" scoped>
.v-btn {
  font-size: 16px;
}
</style>