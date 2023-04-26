<template>
  <v-footer class="d-block transparent">
    <p class="mb-2 primary--text font-weight-bold">관리자에게 문의</p>
 
    <div class="mb-4 d-flex align-center font-weight-medium black--text">
      <p class="mr-4">전화번호 {{ ADMIN.PHONE }}</p>
      <p>이메일 {{ ADMIN.EMAIL }}</p>
    </div>
 
    <div class="term d-flex align-center mb-4 grey--text">
      <p>서비스 이용약관</p>
      <p class="mx-2 grey--text text--lignten-4">|</p>
      <p>개인정보 처리 방침</p>
    </div>
 
    <div class="address">
      <div class="d-flex align-center">
        <p class="mr-4">연세대학교 원주의과대학</p>
        <p class="mr-4">강원도 원주시 일산로 20 (일산동)</p>
        <p class="mr-4">FAX 033-747-0409</p>
        <p class="mr-4">대표전화 033-741-0114</p>
        <p>사업자 등록번호 224-82-00091</p>
      </div>
 
      <p class="mt-1">Copyright {{ YEAR }}. 연세대학교 원주의과대학 All rights reserved.</p>
    </div>
  </v-footer>
</template>

<script>
export default {
  name: 'FooterComponent',
  data: () => ({
    YEAR: new Date().getFullYear(),
    ADMIN: {
      PHONE: '###-###-####',
      EMAIL: 'admin@email.com'
    }
  })
}
</script>

<style lang="scss" scoped>
.v-footer {
  padding: 24px 48px !important;
  font-size: 10px;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
    width: 100%;
    border-top: solid 1px var(--v-grey-lighten3) !important;
  }
  p {
    margin-bottom: 0;
  }
}
.term p,
.address p {
  color: var(--v-grey-base);
}
.address {
  font-size: 8px;
}
</style>