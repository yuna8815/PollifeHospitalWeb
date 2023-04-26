<template>
  <v-container class="flex-column justify-center py-12 fill-height">
    <v-icon size="72" color="primary">mdi-check</v-icon>
    <h1 class="my-7 font-weight-medium" style="font-size: 32px;"><b class="primary--text">비밀번호 변경</b>을 완료하였습니다.</h1>
    <p class="mb-12" style="font-size: 16px;line-height: 28px;">로그인하여 {{ APP_NAME }}을 이용해 보세요.</p>

    <v-btn
      to="/"
      width="335"
      depressed
      color="primary">
      로그인
    </v-btn>
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