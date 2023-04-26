<template>
  <div class="summary-wrap d-flex px-6 py-5">
    <div class="tit-wrap pr-6">
      <h2 class="mb-1">원주 세브란스 기독병원</h2>
      <p>강원 원주시 일산로 20</p>
      <div>
        <v-icon size="20" class="mr-2 black--text">mdi-pencil</v-icon>
        <router-link to="/settings/hospital">지정병원 정보 수정</router-link>
      </div>
    </div>
    <v-divider vertical class="grey lighten-3" />
    <div class="date-wrap px-6">
      <v-subheader>특수 건강검진 기간</v-subheader>
      <p class="black--text">23.06.01<br>-<br>23.12.31</p>
    </div>
    <v-divider vertical class="grey lighten-3" />
    <div class="content-wrap flex-grow-1 pl-6">
      <v-subheader>특수 건강검진 추가검사 목록</v-subheader>
      <ul class="column pa-0 black--text">
        <li>LDL-콜레스테롤(혈액)</li>
        <li>당화혈색소</li>
        <li>CYFRA21-1(폐암종양표지자)</li>
        <li>CEA(대장암종양표지자)</li>
        <li>CA19-9(췌장암종양표지자)</li>
        <li>AFli(간암종양표지자)</li>
        <li>불면증 증상 문진(야간근무)</li>
        <li>웨장관계 관련증상 문진</li>
        <li>심전도검사</li>
        <li>폐기능검사</li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.summary-wrap {
  height: 128px;
  background: var(--v-grey-lighten1);
  border: 1px solid var(--v-grey-lighten3);
  border-radius: 4px;
}
.v-subheader {
  height: auto;
  padding: 0 0 8px;
  font-weight: 300;
  font-size: 13px;
}
.tit-wrap {
  width: 280px;
  h2 {
    font-size: 20px;
    font-weight: 500;
    line-height: 25px;
  }
  p {
    font-size: 13px;
    color: var(--v-grey-lighten5);
    margin-bottom: 6px;
  }
  a {
    font-weight: 500;
    font-size: 14px;
  }
}
.date-wrap {
  width: 150px;
}
ul, li {
  list-style: none;
}
.column {
  column-count: auto;
  column-width: 160px;
  column-gap: 24px;
}
</style>