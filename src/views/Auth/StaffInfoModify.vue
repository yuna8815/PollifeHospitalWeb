<template>
  <v-container class="py-12">
    <h1 class="text-center primary--text">담당자 정보 변경</h1>

    <v-stepper
      v-model="step"
      width="100%"
      flat
      elevation="0"
      alt-labels
      class="transparent">
      <v-stepper-header class="font-weight-medium mx-auto">
        <v-stepper-step :complete="step > 1" complete-icon="1" step="1">비밀번호 확인</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step :complete="step > 2" complete-icon="2" step="2">이메일 인증/변경</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step :complete="step > 3" complete-icon="3" step="3">담당자 정보 입력/변경</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="4">변경 완료</v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <v-form v-model="STEP_VALID[0]" ref="STEP_1" class="full-form d-flex align-end flex-column my-16">
            <div class="d-flex">
              <v-subheader>비밀번호</v-subheader>
              <div class="text-field"><v-text-field
              v-model="model.PASSWORD"
              outlined
              type="password"
              placeholder="비밀번호"
              :rules="[
                v => !!v,
                v => /(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,16}/.test(v)
              ]" /></div>
            </div>
          </v-form>
          <div class="mt-7 text-center">
            <v-btn
              width="200"
              depressed
              outlined
              class="mr-4"
              @click="goBack()">
              정보 변경 취소
            </v-btn>
            <v-btn
              :disabled="!STEP_VALID[0]"
              width="200"
              depressed
              color="primary"
              @click="step = 2">
              다음
            </v-btn>
          </div>
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-form v-model="STEP_VALID[1]" ref="STEP_2" class="full-form d-flex align-end flex-column">
            <div class="d-flex align-center mb-5">
              <v-subheader>근무지</v-subheader>
              <div class="text-field">
                <p class="mb-0">{{ this.model.WORK_PLACE }}</p>
              </div>
            </div>
            <div class="d-flex">
              <v-subheader>담당자 업무 이메일</v-subheader>
              <div class="text-field"><v-text-field
                v-model="model.EMAIL"
                outlined
                placeholder="이메일"
                :rules="emailRules" /></div>
            </div>
            <div
            v-if="isVerificationVisible"
            class="d-flex"
            >
              <v-subheader>인증번호</v-subheader>
              <div class="text-field d-flex">
                <v-text-field
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
              width="200"
              depressed
              outlined
              class="mr-4"
              @click="goBack()">
              정보 변경 취소
            </v-btn>
            <v-btn
              v-if="!isVerificationVisible"
              :disabled="!STEP_VALID[1]"
              width="200"
              depressed
              color="primary"
              @click="doVerification">
              인증번호 받기
            </v-btn>
            <v-btn
              v-else
              :disabled="!STEP_VALID[1]"
              width="200"
              depressed
              color="primary"
              @click="step = 3">
              다음
            </v-btn>
          </div>
        </v-stepper-content>

        <v-stepper-content step="3">
          <v-form v-model="STEP_VALID[2]" ref="STEP_3" class="full-form d-flex align-end flex-column">
            <div class="d-flex">
              <v-subheader>담당자 성함</v-subheader>
              <div class="text-field"><v-text-field
                v-model="model.NAME"
                outlined
                placeholder="성함"
                :rules="[v => !!v]" /></div>
            </div>
            <div class="d-flex">
              <v-subheader>직무/직책</v-subheader>
              <div class="text-field"><v-text-field
                v-model="model.DEPT"
                outlined
                placeholder="직무/직책"
                :rules="[v => !!v]" /></div>
            </div>
            <div class="d-flex">
              <v-subheader>담당자 연락처</v-subheader>
              <div class="d-flex text-field">
                <v-text-field
                  v-model="model.PHONE_0"
                  outlined
                  placeholder="033"
                  :rules="[
                    v => !!v,
                    v => /\d{3}/.test(v),
                    v => v && v.length < 4
                  ]" />
                  <span class="mx-2 grey--text text--lighten-5" style="line-height: 48px;">-</span>
                <v-text-field
                  v-model="model.PHONE_1"
                  outlined
                  placeholder="1234"
                  :rules="[
                    v => !!v,
                    v => /\d{4}/.test(v),
                    v => v && v.length < 5
                  ]" />
                  <span class="mx-2 grey--text text--lighten-5" style="line-height: 48px;">-</span>
                <v-text-field
                  v-model="model.PHONE_2"
                  outlined
                  placeholder="1234"
                  :rules="[
                    v => !!v,
                    v => /\d{4}/.test(v),
                    v => v && v.length < 5
                  ]" />
              </div>
            </div>
          </v-form>
          <div class="mt-7 text-center">
            <v-btn
              width="200"
              depressed
              outlined
              class="mr-4"
              @click="goBack()">
              정보 변경 취소
            </v-btn>
            <v-btn
              :disabled="!STEP_VALID[2]"
              width="200"
              depressed
              color="primary"
              @click="step = 4">
              변경 완료
            </v-btn>
          </div>
        </v-stepper-content>

        <v-stepper-content step="4">
          <div class="d-flex flex-column align-center justify-center">
            <v-icon size="72" color="primary">mdi-check</v-icon>
            <p class="mt-10 mb-5 font-weight-medium" style="font-size: 32px;"><b class="primary--text">담당자 정보 변경</b>이 완료되었습니다.</p>
            <p class="mb-15" style="font-size: 16px;">버튼을 누르면 지정병원 정보 수정 페이지로 돌아갑니다.</p>
            <v-btn
              width="335"
              depressed
              color="primary"
              @click="goBack">
              확인
            </v-btn>
          </div>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-container>
</template>
<script>
export default {
  data: () => ({
    step: 1,
    model: {},
    STEP_VALID: [ true, true, true ],
    isVerificationVisible: false,
  }),
  computed: {
    emailRules() {
      return [
        v => !!v,
        v => /^([a-zA-Z0-9._-])+@[a-zA-Z0-9.-]+.[a-zA-Z]$/.test(v) || '옳바르지 않은 이메일 형식입니다.',
        v => this.checkWorkplace(v) || '해당하는 근무지에서 등록한 이메일을 입력해주세요.',
        v => this.checkEmail(v) || '이미 회원으로 등록된 이메일입니다.'
      ];
    },
    verifyCodeRules() {
      return [
        v => !!v,
        v => /^[0-9]{6}$/.test(v) || '인증번호는 6자리 숫자입니다.',
        // v => !!v || '전송된 번호와 다릅니다. 인증번호를 재확인해주세요.',
        // v => !!v || '인증번호가 재전송되었습니다.'
      ]
    },
  },
  mounted() {
    this.model = {
      WORK_PLACE: '원주 세브란스 기독병원',
      EMAIL: 'test@test.com',
      VERIFY_CODE: 123456,
      LOGIN_ID: 'police123',
      PASSWORD: 'qwer1234!',
      PASSWORD_CONFIRM: 'qwer1234!',
      NAME: '홍길동',
      DEPT: 'A부서',
      PHONE_0: '033',
      PHONE_1: '1234',
      PHONE_2: '5678'
    }
  },
  methods: {
    goPage(path) {
      this.$router.push({ path: path })
    },
    doVerification() {
      this.isVerificationVisible = true;
    },
    goBack() {
      this.$router.back()
    }
  }
}
</script>
<style lang="scss" scoped>
h1 {
  font-size: 16px;
}
.v-stepper__header {
  width: 560px;
}
.v-stepper__items {
  width: 1280px;
  margin: 0 auto;
}
.v-btn {
  font-size: 16px;
}
p {
  font-size: 16px;
}
.v-btn.v-btn--outlined.grey--text {
  font-size: 12px;
  color: var(--v-grey-lighten5) !important;
  border-color: var(--v-grey-lighten4) !important;
}
</style>