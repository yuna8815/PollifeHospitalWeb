<template>
  <v-container class="py-12">
    <h1 class="mb-16 text-center primary--text">비밀번호 변경</h1>

    <div style="width: 1280px; margin: 0 auto">
      <v-form v-model="valid" ref="valid" class="full-form d-flex align-end flex-column">
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
          <div class="text-field">
            <v-text-field
              v-model="model.PASSWORD_CONFIRM"
              outlined
              type="password"
              placeholder="비밀번호 재입력"
              messages="messages"
              :rules="[
                v => !!v,
                v => /(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,16}/.test(v)
              ]">
              <template v-slot:message>
                <v-icon size="14">mdi-check</v-icon> 일치합니다
              </template>
            </v-text-field>
          </div>
        </div>
      </v-form>
      <div class="mt-7 text-center">
        <v-btn
          to="/auth/find-pw-result"
          :disabled="!valid"
          width="335"
          depressed
          color="primary">
          비밀번호 변경
        </v-btn>
      </div>
    </div>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    valid: true,

    model: {}
  })
}
</script>

<style lang="scss" scoped>
h1 {
  font-size: 16px;
}
</style>