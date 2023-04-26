<template>
  <v-container class="py-12">
    <h1 class="text-center primary--text">회원가입</h1>

    <v-stepper
      v-model="step"
      width="100%"
      flat
      elevation="0"
      alt-labels
      class="transparent">
      <v-stepper-header class="font-weight-medium mx-auto">
        <v-stepper-step :complete="step > 1" complete-icon="1" step="1">약관 동의</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step :complete="step > 2" complete-icon="2" step="2">근무지 인증</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step :complete="step > 3" complete-icon="3" step="3">계정정보 설정</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step :complete="step > 4" complete-icon="4" step="4">회원정보 입력</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="5">가입 완료</v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <v-form v-model="STEP_VALID[0]" ref="STEP_1">
            <v-container fluid class="mx-auto" style="width: 800px;">
              <v-row>
                <v-col cols="6">
                  <p class="font-weight-medium">1. 서비스 이용약관</p>
                  <div class="terms overflow-y-auto pa-2"><TermsService /></div>
                  <v-checkbox
                    hide-details
                    :ripple="false"
                    :rules="[v => !!v]"
                    off-icon="mdi-checkbox-marked"
                    class="pt-0">
                    <template v-slot:label>서비스 이용약관 동의 <span class="primary--text ml-1" style="font-size: 10px;">(필수)</span></template>
                  </v-checkbox>
                </v-col>
                <v-col cols="6">
                  <p class="font-weight-medium">2. 개인정보 처리 방침</p>
                  <div class="terms overflow-y-auto pa-2"><TermsPolicy /></div>
                  <v-checkbox
                    hide-details
                    :ripple="false"
                    :rules="[v => !!v]"
                    off-icon="mdi-checkbox-marked"
                    class="pt-0">
                    <template v-slot:label>개인정보 처리 방침 <span class="primary--text ml-1" style="font-size: 10px;">(필수)</span></template>
                  </v-checkbox>
                </v-col>
              </v-row>
              <v-row>
                <v-col class="text-center">
                  <v-btn
                    :disabled="!STEP_VALID[0]"
                    depressed
                    width="335"
                    color="primary"
                    class="mt-6"
                    @click="step = 2">
                    다음
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-stepper-content>
        <v-stepper-content step="2">
          <v-form v-model="STEP_VALID[1]" ref="STEP_2" class="full-form d-flex align-end flex-column">
            <div class="d-flex mb-7">
              <v-subheader>근무지</v-subheader>
              <div class="text-field">
                <v-menu
                  max-width="460"
                  max-height="299"
                  rounded="0"
                  offset-y
                  content-class="elevation-0">
                  <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-bind="attrs"
                    v-model="model.WORK_PLACE"
                    outlined
                    placeholder="근무지를 검색하세요"
                    append-icon="mdi-magnify"
                    hide-details
                    :rules="[v => !!v]">
                    <template v-slot:append>
                      <v-btn
                        v-on="on"
                        width="24"
                        height="24"
                        icon
                        :ripple="false"
                        @click="doSearch">
                        <v-icon>mdi-magnify</v-icon>
                      </v-btn>
                    </template>
                  </v-text-field>
                  </template>

                  <v-list
                    height="299"
                    elevation="0"
                    tile
                    two-line
                    class="grey lighten-2">
                    <template v-if="lists.length > 0">
                      <v-list-item
                        v-for="(list, index) in lists"
                        :key="index"
                        link
                        @click="doSelectPlace(list)">
                        <v-list-item-content>
                          <v-list-item-title class="black--text">{{ list.title }}</v-list-item-title>
                          <v-list-item-subtitle class="mt-2 grey--text text--lighten-5">{{ list.addr }}</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                    </template>
                    <div
                      v-else
                      class="d-flex align-center justify-center fill-height text-center" style="width: 100%;">검색 결과가 없습니다.<br/>다른 단어로 검색해 보세요.</div>
                  </v-list>
                </v-menu>
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
              :disabled="!STEP_VALID[1]"
              width="335"
              depressed
              color="primary"
              @click="doVerification">
              인증번호 받기
            </v-btn>
            <v-btn
              v-else
              :disabled="!STEP_VALID[1]"
              width="335"
              depressed
              color="primary"
              @click="step = 3">
              다음
            </v-btn>
          </div>
        </v-stepper-content>
        <v-stepper-content step="3">
          <v-form v-model="STEP_VALID[2]" ref="STEP_2" class="full-form d-flex align-end flex-column">
            <div class="d-flex">
              <v-subheader>아이디</v-subheader>
              <div class="d-flex text-field">
                <v-text-field
                v-model="model.LOGIN_ID"
                outlined
                placeholder="아이디"
                :rules="idRules" />
                <v-btn
                  outlined
                  color="grey lighten-4"
                  class="ml-2">
                  중복확인
                </v-btn>
              </div>
            </div>
            <div class="d-flex">
              <v-subheader>비밀번호</v-subheader>
              <div class="text-field">
                <v-text-field
                  v-model="model.PASSWORD"
                  outlined
                  type="password"
                  placeholder="비밀번호"
                  messages="messages"
                  :rules="[
                    v => !!v,
                    v => /(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,16}/.test(v)
                  ]">
                  <template v-slot:message>
                    <v-icon size="14">mdi-check</v-icon> 영문 <v-icon size="14" class="ml-2">mdi-check</v-icon> 숫자 <v-icon size="14" class="ml-2">mdi-check</v-icon> 특수문자 <v-icon size="14" class="ml-2">mdi-check</v-icon> 8자리 이상
                  </template>
                </v-text-field>
              </div>
            </div>
            <div class="d-flex">
              <v-subheader>비밀번호 재입력</v-subheader>
              <div class="text-field"><v-text-field
                v-model="model.PASSWORD_CONFIRM"
                outlined
                type="password"
                placeholder="비밀번호 재입력"
                messages="messages"
                :rules="[v => !!v]">
                <template v-slot:message>
                  <v-icon size="14">mdi-check</v-icon> 일치합니다
                </template>
              </v-text-field></div>
            </div>
          </v-form>
          <div class="mt-7 text-center">
            <v-btn
              :disabled="!STEP_VALID[2]"
              width="335"
              depressed
              color="primary"
              @click="step = 4">
              다음
            </v-btn>
          </div>
        </v-stepper-content>
        <v-stepper-content step="4">
          <v-form v-model="STEP_VALID[3]" ref="STEP_3" class="full-form d-flex align-end flex-column">
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
                  v-model="model.PHONE[0]"
                  v-mask="'###'"
                  outlined
                  placeholder="033"
                  :rules="[v => !!v]" />
                  <span class="mx-2 grey--text text--lighten-5" style="line-height: 48px;">-</span>
                <v-text-field
                  v-model="model.PHONE[1]"
                  v-mask="'####'"
                  outlined
                  placeholder="1234"
                  :rules="[v => !!v]" />
                  <span class="mx-2 grey--text text--lighten-5" style="line-height: 48px;">-</span>
                <v-text-field
                  v-model="model.PHONE[2]"
                  v-mask="'####'"
                  outlined
                  placeholder="1234"
                  :rules="[v => !!v]" />
              </div>
            </div>
          </v-form>
          <div class="mt-7 text-center">
            <v-btn
              :disabled="!STEP_VALID[3]"
              width="335"
              depressed
              color="primary"
              @click="step = 5">
              가입 완료
            </v-btn>
          </div>
        </v-stepper-content>
        <v-stepper-content step="5">
          <div class="d-flex flex-column align-center justify-center">
            <v-icon size="72" color="primary">mdi-check</v-icon>
            <p class="mt-10 mb-5 font-weight-medium" style="font-size: 32px;"><b class="primary--text">회원가입</b>을 완료하였습니다.</p>
            <p class="mb-15" style="font-size: 16px;">로그인하여 폴라이프를 이용하세요.</p>
            <v-btn
              width="335"
              depressed
              color="primary"
              to="/">
              로그인
            </v-btn>
          </div>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-container>
</template>

<script>
import TermsService from '@/components/widget/TermsService'
import TermsPolicy from '@/components/widget/TermsPolicy'

export default {
  components: {
    TermsService,
    TermsPolicy
  },
  data: () => ({
    step: 1,
    STEP_VALID: [ true, true, true ],
    isVerificationVisible: false,

    model: {},

    lists: [
      { title: '원주 세브란스 기독병원', addr: '강원도 원주시 일산로 20 (연세대학교 원주의과대학)' },
      { title: '신촌세브란스병원', addr: '서울 서대문구 연세로 50-1' },
      { title: '신촌세브란스병원', addr: '서울 서대문구 연세로 50-1' }
    ]
  }),
  computed: {
    // !TODO
    // 조건문 적용
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
    idRules() {
      return [
        v => !!v,
        v => /^[a-z0-9_-]{5,20}$/.test(v) || '5~20자의 영문 소문자, 숫자와 특수기호( _ ), ( - )만 사용 가능합니다.',
        // v => !!v || '이미 사용중인 아이디입니다.'
      ]
    }
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
      PHONE: ['033', '1234', '5678']
    }
  },
  methods: {
    doSearch() {
      // !TODO
      console.log("근무지 키워드 검색", this.model.WORK_PLACE)
    },
    doSelectPlace(obj) {
      console.log(obj)
      this.model.WORK_PLACE = obj.title
    },
    doVerification() {
      this.isVerificationVisible = true;
    },
    checkWorkplace(v) {
      console.log(v)
      return true;
    },
    checkEmail(v) {
      console.log(v)
      return true;
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
.terms {
  height: 130px;
  border: 1px solid var(--v-grey-lighten2);
  background: white;
}
.v-list {
  padding: 10px;
  .v-list-item {
    padding: 0 24px;
    height: 88px;
    background-color: white;
    border: 1px solid var(--v-grey-lighten3);
    & + .v-list-item {
      margin-top: 8px;
    }
  }
  .v-list-item__title {
    font-size: 16px;
    line-height: 20px;
  }
  .v-list-item__subtitle {
    font-size: 14px;
    line-height: 18px;
  }
}
.v-btn.v-btn--outlined.grey--text {
  font-size: 12px;
  color: var(--v-grey-lighten5) !important;
  border-color: var(--v-grey-lighten4) !important;
}
</style>