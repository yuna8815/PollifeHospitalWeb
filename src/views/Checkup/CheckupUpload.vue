<template>
  <v-container class="pa-0">
    <div class="my-6 mx-11">
      <MemberSummary />
    </div>
    <div class="d-flex align-center pl-16 pr-11 pb-3">
      <div class="d-flex align-center">
        <h1 class="black--text">검진 데이터 업로드</h1>
        <router-link to="/checkup/history" class="ml-3 grey--text text--lighten-5 font-weight-medium" style="font-size: 14px;">업로드 기록 보기</router-link>
      </div>
      <v-spacer />
      <v-btn
        width="172"
        depressed
        small
        color="primary"
        @click="doUpload">
        입력된 데이터 업로드
      </v-btn>
    </div>

    <v-divider class="grey" />
    <table class="default-table">
      <thead>
        <tr>
          <th class="pl-16" style="width: 90px;">번호</th>
          <th class="pl-10" style="width: 150px;">성함 <v-chip outlined small class="ml-1">검진대상자</v-chip></th>
          <th class="pl-10">주민등록번호 <v-chip outlined small class="ml-1">검진대상자</v-chip></th>
          <th class="pl-10">업무 이메일 <v-chip outlined small class="ml-1">검진대상자</v-chip></th>
          <th class="pl-10" style="width: 440px;">검진 데이터 파일</th>
          <th class="pl-10" style="width: 60px;"></th>
          <th class="pl-16" style="width: 40px;"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, idx) of items" :key="idx">
          <td class="pl-16 pt-2 text-center"> {{ idx + 1 }} </td>
          <td class="pl-10 pt-2">
            <v-text-field 
              v-model="item.NAME"
              dense
              hide-details />
          </td>
          <td class="pl-10 pt-2">
            <div class="d-flex">
              <v-text-field
                v-model="item.BIRTH"
                v-mask="'######'"
                dense
                hide-details />
              <span class="mx-1">-</span>
              <v-text-field
                v-model="item.GENDER"
                v-mask="'#'"
                dense
                hide-details
                style="width:20px;"
                class="idcard-2" />
              <span class="grey--text text--lighten-5 mt-1">******</span>
            </div>
          </td>
          <td class="pl-10 pt-2">
            <div class="d-flex mr-10">
              <v-text-field
                v-model="item.EMAIL"
                dense
                hide-details />
              <span class="grey--text text--lighten-5 font-weight-light" style="font-size: 14px;">@police.go.kr</span>
            </div>
          </td>
          <td class="pl-10 pt-2">
            <input ref="fileInput" type="file" hidden @change="onChangeFiles($event, idx)">
            <template v-if="item.FILE == null">
              <span class="none-file grey--text text--lighten-5 font-weight-light">첨부된 파일이 없습니다.</span>
            </template>
            <template v-else>
              <v-chip close @click:close="item.FILE = null">{{ item.FILE }}</v-chip>
            </template>
          </td>
          <td class="pl-10 pt-2">
            <v-btn
              small
              text
              :ripple="false"
              color="primary"
              @click="onClickFileUpload(idx)">
              <template v-if="item.FILE == null">파일 첨부</template>
              <template v-else>파일 변경</template>
            </v-btn>
          </td>
          <td class="pl-10 pr-16 pt-2">
            <v-menu
              left
              bottom
              nudge-bottom="40"
              content-class="elevation-0" >
              <template v-slot:activator="{ on, attrs, value }">
                <v-btn
                  v-bind="attrs"
                  v-on="on"
                  icon
                  small>
                  <v-icon :color="value ? 'primary':'grey lighten-4'">mdi-dots-vertical</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item-group>
                  <v-list-item @click="doDeleteList(idx)">
                    <v-list-item-content>
                      <v-list-item-title>해당 검진 데이터 행 지우기</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>해당 검진 데이터 행만 업로드하기</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-menu>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="px-16 py-5">
      <v-btn
        small
        text
        :ripple="false"
        color="primary"
        @click="doAddList">
        라인 10개 추가하기
      </v-btn>
    </div>

  </v-container>
</template>
<script>
import MemberSummary from '@/components/widget/MemberSummary.vue'

export default {
  components: {
    MemberSummary
  },
  data: () => ({
    items: [
      { NAME: '백영현', BIRTH: '123456', GENDER: '1', EMAIL: 'police123', FILE: 'police_221020.pdf', FILE_URL: null },
      { NAME: '이진백', BIRTH: '123456', GENDER: '1', EMAIL: 'police123police', FILE: 'police123police_221020.pdf', FILE_URL: null },
      { NAME: '류정남', BIRTH: '123456', GENDER: '1', EMAIL: 'police123police43210', FILE: 'police123police43210_221020.pdf', FILE_URL: null },
      { NAME: '', BIRTH: '', GENDER: '', EMAIL: '', FILE: null, FILE_URL: null },
      { NAME: '', BIRTH: '', GENDER: '', EMAIL: '', FILE: null, FILE_URL: null },
      { NAME: '', BIRTH: '', GENDER: '', EMAIL: '', FILE: null, FILE_URL: null },
      { NAME: '', BIRTH: '', GENDER: '', EMAIL: '', FILE: null, FILE_URL: null },
      { NAME: '', BIRTH: '', GENDER: '', EMAIL: '', FILE: null, FILE_URL: null },
      { NAME: '', BIRTH: '', GENDER: '', EMAIL: '', FILE: null, FILE_URL: null },
      { NAME: '', BIRTH: '', GENDER: '', EMAIL: '', FILE: null, FILE_URL: null },
    ]
  }),
  methods: {
    doUpload() {
      console.log("입력된 데이터 업로드")
    },
    doDeleteList(idx) {
      if(this.items.length == 1) return;
      this.items.splice(idx, 1);
    },
    doAddList() {
      this.items.push(
        { NAME: '', BIRTH: '', GENDER: '', EMAIL: '', FILE: null, FILE_URL: null },
        { NAME: '', BIRTH: '', GENDER: '', EMAIL: '', FILE: null, FILE_URL: null },
        { NAME: '', BIRTH: '', GENDER: '', EMAIL: '', FILE: null, FILE_URL: null },
        { NAME: '', BIRTH: '', GENDER: '', EMAIL: '', FILE: null, FILE_URL: null },
        { NAME: '', BIRTH: '', GENDER: '', EMAIL: '', FILE: null, FILE_URL: null },
        { NAME: '', BIRTH: '', GENDER: '', EMAIL: '', FILE: null, FILE_URL: null },
        { NAME: '', BIRTH: '', GENDER: '', EMAIL: '', FILE: null, FILE_URL: null },
        { NAME: '', BIRTH: '', GENDER: '', EMAIL: '', FILE: null, FILE_URL: null },
        { NAME: '', BIRTH: '', GENDER: '', EMAIL: '', FILE: null, FILE_URL: null },
        { NAME: '', BIRTH: '', GENDER: '', EMAIL: '', FILE: null, FILE_URL: null },
      )
    },
    onClickFileUpload(idx) {
      this.$refs.fileInput[idx].click();
    },
    onChangeFiles(e, idx) {
      const file = e.target.files[0]; // Get first index in files
      this.items[idx].FILE_URL = URL.createObjectURL(file); // Create File URL
      this.items[idx].FILE = file.name;
    },
  }
}
</script>

<style lang="scss" scoped>
.default-table {
  thead th {
    line-height: 47px;
  }
  tbody td {
    font-size: 16px;
    line-height: 38px;
  }
}
</style>