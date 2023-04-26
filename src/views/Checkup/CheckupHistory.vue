<template>
  <v-container class="pa-0">
    <div class="d-flex align-end pt-6 px-16 pb-4">
      <div>
        <p class="mb-0 grey--text text--lighten-4">검진데이터 업로드</p>
        <div class="d-flex align-center">
          <h1 class="mb-0 black--text">업로드 기록 보기</h1>
          <router-link to="/checkup" class="ml-3 grey--text text--lighten-5 font-weight-medium" style="font-size: 14px;">검진 데이터 업로드로 돌아가기</router-link>
        </div>
      </div>
      <v-spacer />
      <div class="d-flex align-center">
        <p class="mb-0 text-right grey--text text--lighten-5" style="font-size: 14px;">필터 <span class="primary--text font-weigth-medium">{{ filterParams.filterCount }}</span> 개 적용 중<br>현재 <span class="primary--text font-weigth-medium">{{ total }}</span> 개의 업로드 기록이 검색되었습니다.</p>
        <v-menu
          v-model="filterParams.isOpen"
          left
          offset-y
          nudge-bottom="4"
          min-width="715"
          max-width="715"
          :close-on-content-click="false"
          content-class="elevation-0">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              outlined
              small
              class="mr-4 ml-3">
              검색 필터
              <v-icon size="20" color="grey" class="ml-2">mdi-filter-variant</v-icon>
            </v-btn>
          </template>
          <CheckupListFilter :params="filterParams" />
        </v-menu>
        <v-btn
          to="/checkup/reupload"
          :disabled="!isFail"
          depressed
          small
          color="primary">
          실패 항목 일괄 재업로드
        </v-btn>
      </div>
    </div>
    <v-divider class="grey" />
    <v-sheet
      v-scroll.self="onScroll"
      style="height: calc(100vh - 36px - 98px - 167px); overflow-y: auto;">
      <table class="default-table">
        <thead>
          <tr>
            <th class="pl-14">업로드 일자</th>
            <th class="pl-10">검진 일자</th>
            <th class="pl-10">성함 <v-chip outlined small>검진대상자</v-chip></th>
            <th class="pl-10">주민등록번호 <v-chip outlined small>검진대상자</v-chip></th>
            <th class="pl-10">업무 이메일 <v-chip outlined small>검진대상자</v-chip></th>
            <th class="pl-10 pr-14">데이터 업로드 상태 </th>
          </tr>
        </thead>
        <tbody>
          <template v-if="items.length < 1">
            <tr>
              <td colspan="6" class="text-center">업로드 기록이 없습니다.</td>
            </tr>
          </template>
          <template v-else>
            <tr v-for="(item, idx) of items" :key="idx">
              <td class="pl-14">{{ item.UPLOAD_DATE }}</td>
              <td class="pl-10">{{ item.CHECKUP_DATE }}</td>
              <td class="pl-10">{{ item.NAME }}</td>
              <td class="pl-10">{{ item.BIRTH }}-{{ item.GENDER }}<span class="grey--text text--lighten-5" style="font-size: 14px;">******</span></td>
              <td class="pl-10">{{ item.EMAIL }} <span class="grey--text text--lighten-5 font-weight-light" style="font-size: 14px;">@police.go.kr</span></td>
              <td class="pl-10 pr-14">
                <template v-if="item.STATUS == 1">성공</template>
                <template v-else-if="item.STATUS == 2"><span style="color: rgba(237, 27, 47, 0.6)">실패 <span style="font-size: 14px;">(잘못된 파일)</span></span></template>
                <template v-else-if="item.STATUS == 3"><span style="color: rgba(237, 27, 47, 0.6)">실패 <span style="font-size: 14px;">(검진 데이터 중복)</span></span></template>
                <template v-else><span class="grey--text text--lighten-5 font-weight-light">분석 중</span></template>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </v-sheet>
  </v-container>
</template>

<script>
import CheckupListFilter from '@/components/widget/CheckupListFilter'
export default {
  components: {
    CheckupListFilter
  },
  data: () => ({
    filterParams: { isOpen: false, filterCount: 0, callback: null },

    total: 10,
    items: [
      { UPLOAD_DATE: '2022.10.28', CHECKUP_DATE: '-', NAME: '홍길동', BIRTH: 221028, GENDER: 1, EMAIL: 'police123', STATUS: 0},
      { UPLOAD_DATE: '2022.10.28', CHECKUP_DATE: '2022.10.17', NAME: '홍길동', BIRTH: 221028, GENDER: 1, EMAIL: 'police123', STATUS: 1},
      { UPLOAD_DATE: '2022.10.28', CHECKUP_DATE: '-', NAME: '홍길동', BIRTH: 221028, GENDER: 1, EMAIL: 'police123', STATUS: 2},
      { UPLOAD_DATE: '2022.10.28', CHECKUP_DATE: '-', NAME: '홍길동', BIRTH: 221028, GENDER: 1, EMAIL: 'police123', STATUS: 3},
      { UPLOAD_DATE: '2022.10.28', CHECKUP_DATE: '-', NAME: '홍길동', BIRTH: 221028, GENDER: 1, EMAIL: 'police123', STATUS: 0},
      { UPLOAD_DATE: '2022.10.28', CHECKUP_DATE: '-', NAME: '홍길동', BIRTH: 221028, GENDER: 1, EMAIL: 'police123', STATUS: 0},
      { UPLOAD_DATE: '2022.10.28', CHECKUP_DATE: '-', NAME: '홍길동', BIRTH: 221028, GENDER: 1, EMAIL: 'police123', STATUS: 0},
      { UPLOAD_DATE: '2022.10.28', CHECKUP_DATE: '-', NAME: '홍길동', BIRTH: 221028, GENDER: 1, EMAIL: 'police123', STATUS: 0},
      { UPLOAD_DATE: '2022.10.28', CHECKUP_DATE: '-', NAME: '홍길동', BIRTH: 221028, GENDER: 1, EMAIL: 'police123', STATUS: 0},
      { UPLOAD_DATE: '2022.10.28', CHECKUP_DATE: '-', NAME: '홍길동', BIRTH: 221028, GENDER: 1, EMAIL: 'police123', STATUS: 0},
    ]
  }),
  computed: {
    isFail() {
      const _items = this.items.filter(el => el.STATUS > 1)
      return _items.length > 0
    }
  },
  methods: {
    onScroll(ev) {
      let clientHeight = ev.target.clientHeight
      let scrollY = ev.target.scrollHeight - ev.target.scrollTop

      if(scrollY == clientHeight) this.addItems();
    },
    addItems() {
      for(let i = 0;i < 10;i++) {
        this.items.push({ UPLOAD_DATE: '2022.10.28', CHECKUP_DATE: '-', NAME: '홍길동', BIRTH: 221028, GENDER: 1, EMAIL: 'police123', STATUS: 0});
      }
    }
  }
}
</script>

<style lang="scss" scoped>
table.default-table thead tr th {
  position: sticky;
  top: 0;
  background-color: white;
}
table.default-table tbody td {
  vertical-align: middle;
}
</style>