<template>
  <v-container class="pa-0">
    <div class="d-flex align-end pt-6 px-16 pb-4">
      <div>
        <p class="mb-0 grey--text text--lighten-4">업로드 기록 보기</p>
        <div class="d-flex align-center">
          <h1 class="mb-0 black--text">업로드 실패 항목 일괄 재업로드</h1>
        </div>
      </div>
      <v-spacer />
      <div class="d-flex align-center">
        <v-btn
          to="/checkup/history"
          outlined
          small>
          입력 취소 및 돌아가기
        </v-btn>
        <v-btn
          depressed
          small
          color="primary"
          class="ml-4">
          입력된 데이터 업로드
        </v-btn>
      </div>
    </div>
    <v-divider class="grey" />
    <table class="default-table">
      <thead>
        <tr>
          <th class="pl-16 text-center">번호</th>
          <th class="pl-10">성함 <v-chip outlined small class="ml-1">검진대상자</v-chip></th>
          <th class="pl-10">주민등록번호 <v-chip outlined small class="ml-1">검진대상자</v-chip></th>
          <th class="pl-10">업무 이메일 <v-chip outlined small class="ml-1">검진대상자</v-chip></th>
          <th class="pl-10">검진 데이터 파일</th>
          <th class="pl-10"></th>
          <th class="pl-10 pr-16"></th>
        </tr>
      </thead>
      <tbody>
         <tr v-for="(item, idx) of items" :key="idx">
          <td class="pl-16 text-center font-weight-light" style="font-size: 16px;vertical-align: middle;"> {{ idx + 1 }} </td>
          <td class="pl-10 pt-2">
            <v-text-field 
              v-model="item.NAME"
              dense
              hide-details />
          </td>
          <td class="pl-10 pt-2" style="font-size: 16px;">
            <div class="d-flex">
              <div style="width:84px;"><v-text-field
                v-model="item.BIRTH"
                v-mask="'######'"
                dense
                hide-details /></div>
              <span class="mx-1 font-weight-light grey--text text--lighten-4" style="line-height: 36px;">-</span>
              <div style="width:20px;"><v-text-field
                v-model="item.GENDER"
                v-mask="'#'"
                dense
                hide-details
                class="idcard-2" /></div>
              <span class="grey--text text--lighten-5" style="line-height: 36px;">******</span>
            </div>
          </td>
          <td class="pl-10 pt-2">
            <div class="d-flex mr-10">
              <v-text-field
                v-model="item.EMAIL"
                dense
                hide-details />
              <span class="grey--text text--lighten-5 font-weight-light" style="font-size: 14px;line-height: 36px;">@police.go.kr</span>
            </div>
          </td>
          <td class="pl-10" style="vertical-align: middle;">
            <input ref="fileInput" type="file" hidden @change="onChangeFiles($event, idx)">
            <template v-if="item.FILE == null">
              <template v-if="item.STATUS == 2">
                <span class="grey--text text--lighten-5 font-weight-light">분석이 불가능하거나,<br>입력한 인물과 일치하지 않는 데이터 입니다.</span>
              </template>
              <template v-else-if="item.STATUS == 3">
                <span class="grey--text text--lighten-5 font-weight-light">분석 결과, 중복된 의료 데이터 입니다.</span>
              </template>
            </template>
            <template v-else>
              <v-chip close @click:close="item.FILE = null">{{ item.FILE }}</v-chip>
            </template>
          </td>
          <td class="pl-10" style="vertical-align: middle;">
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
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>해당 항목 재업로드 제외하기</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-menu>
          </td>
         </tr>
      </tbody>
    </table>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    items: [
      { NAME: '백영현', BIRTH: '123456', GENDER: '1', EMAIL: 'police123', FILE: null, FILE_URL: null, STATUS: 2 },
      { NAME: '이진백', BIRTH: '123456', GENDER: '1', EMAIL: 'police123police', FILE: null, FILE_URL: null, STATUS: 3 },
      { NAME: '류정남', BIRTH: '123456', GENDER: '1', EMAIL: 'police123police43210', FILE: null, FILE_URL: null, STATUS: 3 },
    ]
  }),
  methods: {
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