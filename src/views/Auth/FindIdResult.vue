<template>
  <v-container class="flex-column justify-center py-12 fill-height">
    <v-icon size="72" color="primary">mdi-check</v-icon>
    <template v-if="!isResult">
      <h1 class="my-7 font-weight-medium" style="font-size: 32px;">가입된 아이디가 없습니다.</h1>
      <p class="mb-12" style="font-size: 16px;line-height: 28px;">회원가입하여 {{ APP_NAME }}을 이용해 보세요.</p>

      <div class="d-flex">
        <v-btn
          to="/auth/signup"
          width="200"
          depressed
          color="primary">
          회원가입
        </v-btn>
        <v-btn
          to="/"
          width="200"
          depressed
          outlined
          color="grey"
          class="ml-4">
          메인으로
        </v-btn>
      </div>
    </template>

    <template v-else>
      <h1 class="my-7 font-weight-medium" style="font-size: 32px;"><b class="primary--text">아이디</b>를 찾았습니다.</h1>
      <p style="font-size: 16px;line-height: 28px;">오랫동안 로그인하지 않았다면, 비밀번호 찾기를 통해<br>비밀번호를 변경한 후 로그인하는 것이 안전합니다.</p>
      <p class="mt-11 mb-4 font-weight-bold black--text" style="font-size: 24px;">po****1234</p>
      <p class="mb-12 grey--text text--lighten-5" style="font-size: 14px;">2021년 5월 3일 가입</p>

      <div class="d-flex">
        <v-btn
          to="/"
          width="200"
          depressed
          color="primary">
          로그인
        </v-btn>
        <v-btn
          to="/auth/find-pw"
          width="200"
          depressed
          outlined
          color="grey"
          class="ml-4">
          비밀번호 찾기
        </v-btn>
      </div>
    </template>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';
export default {
  props: {
    name: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      default: "",
    },
  },
  data: () => ({
    isResult: false,
  }),
  computed: {
    ...mapState(['APP_NAME'])
  },
  mounted() {
    this.findResult();
  },
  methods: {
    findResult() {
      const _result = false;
      if(_result) {
        this.isResult = true;
      }
      else this.isResult = false;
    }
  }
}
</script>