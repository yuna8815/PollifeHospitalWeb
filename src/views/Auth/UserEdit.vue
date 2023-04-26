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
          <v-form v-model="STEP_VALID[0]" ref="STEP_1" class="full-form d-flex align-end flex-column">
            <div class="d-flex mb-7">
              <v-subheader>비밀번호</v-subheader>
              <div class="text-field"><v-text-field
                v-model="model.PASSWORD"
                type="password"
                outlined
                placeholder="비밀번호"
                :rules="[v => !!v]" /></div>
            </div>
          </v-form>
          <div class="text-center">
            <v-btn
              width="200"
              outlined
              @click="goBack">
              정보 변경 취소
            </v-btn>
            <v-btn
              width="200"
              depressed
              :disabled="!STEP_VALID[0]"
              color="primary"
              class="ml-4">
              다음
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
    STEP_VALID: [ true, true, true ],

    model: {}
  }),
  methods: {
    goBack() {
      this.$router.back()
    }
  }
}
</script>

<style lang="scss" scoped>
.v-stepper__header {
  width: 560px;
}
.v-stepper__items {
  width: 1280px;
  margin: 0 auto;
}
</style>