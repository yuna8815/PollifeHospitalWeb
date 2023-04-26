<template>
  <div class="d-flex flex-column align-center justify-center my-16">
    <v-icon size="72" color="primary">mdi-check</v-icon>
    <p class="mt-10 mb-5 font-weight-medium" style="font-size: 32px;"><b class="primary--text">회원탈퇴</b>가 완료되었습니다.</p>
    <p class="mb-15" style="font-size: 16px;">로그인하여 폴라이프를 이용하세요.</p>
    <v-btn
      width="335"
      depressed
      color="primary"
      to="/">
      로그인 화면으로 돌아가기
    </v-btn>
  </div>
</template>
<script>
export default {

}
</script>
<style lang="scss" scoped>
.v-btn {
  font-size: 16px;
}  
</style>