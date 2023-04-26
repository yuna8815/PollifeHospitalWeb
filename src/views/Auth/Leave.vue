<template>
  <v-container class="py-12">
    <div class="d-flex flex-column align-center justify-center">
      <p class="mt-10 mb-5 font-weight-medium" style="font-size: 32px;"><b class="primary--text">폴라이프</b>를 탈퇴하시겠습니까?</p>
      <p class="mb-15" style="font-size: 16px;">확인을 위해 아이디와 비밀번호를 입력해주세요.</p>
    </div>

    <div style="width:1280px; margin: 0 auto">
      <v-form v-model="valid" ref="valid" class="full-form d-flex align-end flex-column">
        <div class="d-flex">
          <v-subheader>아이디</v-subheader>
          <div class="text-field"><v-text-field
            v-model="model.LOGIN_ID"
            outlined
            placeholder="아이디"
            :rules="[v => !!v]" /></div>
        </div>
        
        <div class="d-flex">
          <v-subheader>비밀번호</v-subheader>
          <div class="text-field">
            <v-text-field
              v-model="model.PASSWORD"
              outlined
              type="password"
              placeholder="비밀번호"
              :rules="[
                v => !!v,
                v => /(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,16}/.test(v)
              ]">
            </v-text-field>
          </div>
        </div>

        <div class="text-field">
          <v-checkbox
            hide-details
            :ripple="false"
            :rules="[v => !!v]"
            off-icon="mdi-checkbox-marked"
            class="pt-0 withdrawal-agree">
            <template v-slot:label>폴라이프 <span class="primary--text ml-1" style="font-size: 10px;">개인정보 처리 방침</span>에 따라<br>기입한 개인정보가 최대 5년까지 보관될 수 있는 점을 이해하였습니다.</template>
          </v-checkbox>
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
        @click="goPage('/auth/leave-result')">
        탈퇴하기
      </v-btn>
    </div>
  </v-container>
</template>
<script>
export default {
  name: 'LeavePage',
  data: () => ({
    valid: true,

    model: {},
  }),
  methods: {
    goBack() {
      this.$router.back();
    },
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