<template>
  <v-container class="pa-0">
    <div class="d-flex align-end pt-6 px-16 pb-4">
      <h1 class="mt-5 mb-0 black--text">계정 설정</h1>
    </div>
    <v-divider class="grey" />
    <v-container fluid>
      <v-row class="py-8 px-12">
        <v-col class="pa-4">
          <div class="d-flex align-center">
            <p class="title">계정 정보</p>
            <v-spacer />
            <v-btn
              text
              small
              color="grey lighten-5"
              class="mb-3"
              @click="goPage('/auth/leave')">
              회원 탈퇴하기
            </v-btn>
          </div>
          <v-divider class="grey lighten-5" />
          <div>
            <div class="d-flex mt-4">
              <v-subheader>아이디</v-subheader>
              <v-text-field
                v-model="user.LOGIN_ID"
                readonly
                dense
                hide-details />
            </div>
            <div class="d-flex mt-4">
              <v-subheader>비밀번호</v-subheader>
              <div class="d-flex align-center flex-grow-1">
                <v-text-field
                  v-model="user.PASSWORD"
                  readonly
                  dense
                  hide-details />
                <v-spacer />
                <v-btn
                  text
                  small
                  color="grey lighten-5"
                  class="ml-4"
                  @click="goPage('/auth/passwordmodify')">
                  비밀번호 변경
                </v-btn>
              </div>
            </div>
          </div>
        </v-col>
        <v-col class="pa-4">
          <div class="d-flex align-center">
            <p class="title">담당자 정보</p>
            <v-spacer />
            <v-btn
              text
              small
              color="grey lighten-5"
              class="mb-3"
              @click="goPage('/auth/staffinfomodify')">
              담당자 정보 변경
            </v-btn>
          </div>
          <v-divider class="grey lighten-5" />
          <div>
            <div class="d-flex mt-4">
              <v-subheader>담당자</v-subheader>
              <v-text-field
                v-model="user.USER_NAME"
                readonly
                dense
                hide-details />
            </div><div class="d-flex mt-4">
              <v-subheader>담당자 연락처</v-subheader>
              <div class="d-flex">
                <v-text-field
                  v-model="user.TEL_NO[0]"
                  readonly
                  dense
                  hide-details />
                <span class="mx-2 grey--text text--lighten-3" style="line-height: 36px; font-size: 16px;">-</span>
                <v-text-field
                  v-model="user.TEL_NO[1]"
                  readonly
                  dense
                  hide-details />
                <span class="mx-2 grey--text text--lighten-3" style="line-height: 36px; font-size: 16px;">-</span>
                <v-text-field
                  v-model="user.TEL_NO[2]"
                  readonly
                  dense
                  hide-details />
              </div>
            </div>
            <div class="d-flex mt-4">
              <v-subheader>담당자 이메일</v-subheader>
              <v-text-field
                v-model="user.EMAIL"
                dense
                readonly
                hide-details />
            </div>
          </div>
        </v-col>
        <v-col class="pa-4">
          <div class="d-flex align-center">
            <div class="d-flex align-center">
              <p class="title">지정병원</p>
              <p class="grey--text text--lighten-5 ml-2 mb-3" style="font-size: 13px;">인증됨</p>
            </div>
            <v-spacer />
            <v-btn
              to="/settings/hospital"
              text
              small
              color="grey lighten-5"
              class="mb-3">
              지정병원 정보 수정
            </v-btn>
          </div>
          <v-divider class="grey lighten-5" />
          <div>
            <div class="d-flex mt-4">
              <v-subheader>지정 병원</v-subheader>
              <v-text-field
                v-model="user.MEMBER_NAME"
                dense
                readonly
                hide-details />
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['user']),
  },
  methods: {
    goPage(path) {
      this.$router.push({path: path})
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  padding: 0 8px 12px;
  margin: 0;
  color: black !important;
  font-size: 16px !important;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: 0 !important;
  text-align: left;
}
.v-subheader {
  min-width: 108px;
  width: 108px;
  height: 36px;
  padding: 0 16px 0 0;
  color: var(--v-primary-base);
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: 0em;
}
</style>