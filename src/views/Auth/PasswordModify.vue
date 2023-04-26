<template>
  <v-container class="py-12">
    <div class="d-flex flex-column align-center justify-center">
      <h1 class="mb-4 text-center primary--text">비밀번호 변경</h1>
      <p class="mb-15" style="font-size: 16px;">현재의 비밀번호와 변경할 비밀번호를 입력해주세요.</p>
    </div>

    <div style="width:1280px; margin: 0 auto">
      <v-form v-model="valid" ref="valid" class="full-form d-flex align-end flex-column">
        <div class="d-flex">
          <v-subheader>현재 비밀번호</v-subheader>
          <div class="text-field">
            <v-text-field
              v-model="model.PASSWORD"
              outlined
              type="password"
              placeholder="현재 비밀번호"
              :rules="[
                v => !!v,
                v => /(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,16}/.test(v)
              ]">
            </v-text-field>
          </div>
        </div>  
        <div class="d-flex">
          <v-subheader>변경할 비밀번호</v-subheader>
          <div class="text-field">
            <v-text-field
              v-model="model.NEW_PASSWORD"
              outlined
              type="password"
              placeholder="변경할 비밀번호"
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
            v-model="model.NEW_PASSWORD_CONFIRM"
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
    </div>

    <div class="d-flex justify-center">
      <v-btn
        depressed
        width="200"
        outlined
        class="mt-11 mr-4 grey--text text--lighten-5"
        @click="goBack()">
        뒤로가기
      </v-btn>
      <v-btn
        :disabled="!valid"
        depressed
        width="200"
        color="primary"
        class="mt-11"
        @click="goPage('/auth/passwordmodifycom')">
        변경하기
      </v-btn>
    </div>
  </v-container>
</template>
<script>
export default {
  data: () => ({
    valid: true,

    model: {},
  }),
  methods: {
    goBack() {
      this.$router.back();
    },
    goPage(path) {
      this.$router.push({path: path})
    }
  }
}
</script>
<style lang="scss" scoped>
h1 {
  font-size: 16px;
}
.v-btn {
  font-size: 16px;
}
</style>