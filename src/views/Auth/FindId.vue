<template>
  <v-container class="py-12">
    <h1 class="mb-16 text-center primary--text">아이디 찾기</h1>

    <div style="width: 1280px; margin: 0 auto">
      <v-form v-model="valid" ref="valid" class="full-form d-flex align-end flex-column">
        <div class="d-flex">
          <v-subheader>담당자 성함</v-subheader>
          <div class="text-field"><v-text-field
            v-model="model.NAME"
            outlined
            placeholder="성함"
            :rules="[v => !!v]" /></div>
        </div>
        <div class="d-flex">
          <v-subheader>담당자 업무 이메일</v-subheader>
          <div class="text-field"><v-text-field
            v-model="model.EMAIL"
            outlined
            placeholder="이메일"
            :rules="[v => !!v]" /></div>
        </div>
        <div
          v-if="isVerificationVisible"
          class="d-flex">
          <v-subheader>인증번호</v-subheader>
          <div class="d-flex text-field">
            <v-text-field
              v-model="model.VERIFY_CODE"
              outlined
              placeholder="인증번호"
              suffix="5:00"
              :rules="verifyCodeRules" />
            <v-btn
              outlined
              color="grey lighten-4"
              class="ml-2"
              @click="doVerification">
              재요청
            </v-btn>
          </div>
        </div>
      </v-form>
      <div class="mt-7 text-center">
        <v-btn
          v-if="!isVerificationVisible"
          :disabled="!valid"
          width="335"
          depressed
          color="primary"
          @click="doVerification">
          인증번호 받기
        </v-btn>
        <v-btn
          v-else
          :disabled="!valid"
          width="335"
          depressed
          color="primary"
          @click="findResult">
          다음
        </v-btn>
      </div>
    </div>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    isVerificationVisible: false,

    model: {}
  }),
  computed: {
    verifyCodeRules() {
      return [
        v => !!v,
        v => /^[0-9]{6}$/.test(v) || '인증번호는 6자리 숫자입니다.',
        // v => !!v || '전송된 번호와 다릅니다. 인증번호를 재확인해주세요.',
        // v => !!v || '인증번호가 재전송되었습니다.'
      ]
    }
  },
  methods: {
    doVerification() {
      this.isVerificationVisible = true;
    },
    findResult() {
      this.$router.push({ name: 'FindIdResult', params: { name: this.model.NAME, email: this.model.EMAIL } });
    }
  }
}
</script>

<style lang="scss" scoped>
h1 {
  font-size: 16px;
}
.v-btn.v-btn--outlined.grey--text {
  font-size: 12px;
  color: var(--v-grey-lighten5) !important;
  border-color: var(--v-grey-lighten4) !important;
}
</style>