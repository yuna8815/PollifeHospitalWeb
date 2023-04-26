<template>
  <v-form v-model="valid" ref="form" class="fill-height">
    <div class="d-flex align-end pt-6 px-16 pb-4">
      <div>
        <p class="mb-0 grey--text text--lighten-4">검진데이터 업로드</p>
        <h1 class="mb-0 black--text">지정병원 정보 수정</h1>
      </div>
      <v-spacer />
      <v-btn
        v-if="initial"
        width="172"
        depressed
        :disabled="!valid"
        small
        color="primary"
        @click="doSave">
        저장
      </v-btn>
      <div v-else>
        <v-btn
          width="172"
          depressed
          small
          outlined
          @click="goPage('/settings')">
          이전 화면 돌아가기
        </v-btn>
        <v-btn
          width="172"
          :disabled="!isChange"
          depressed
          small
          color="primary"
          class="ml-4"
          @click="doSave">
          변경사항 저장
        </v-btn>
      </div>
    </div>
    <v-divider class="grey" />

    <v-container fluid>
      <v-row class="py-8 px-12">
        <v-col class="pa-4">
          <p class="title">근무지 정보</p>
          <v-divider class="grey lighten-5" />
          <div>
            <div class="d-flex mt-4">
              <v-subheader>근무지</v-subheader>
              <v-text-field
                v-model="user.MEMBER_NAME"
                dense
                readonly
                hide-details />
            </div>
            <div class="d-flex mt-4">
              <v-subheader>주소</v-subheader>
              <v-text-field
                v-model="user.ADDRESS"
                :rules="[v => !!v]"
                dense
                hide-details
                @change="getChange" />
            </div>
            <div class="d-flex mt-4">
              <v-subheader>대표 연락처</v-subheader>
              <div class="d-flex">
                <v-text-field
                  v-model="user.MEMBER_TEL_NO[0]"
                  v-mask="'###'"
                  :rules="[v => !!v]"
                  dense
                  hide-details
                  @change="getChange" />
                <span class="mx-2 grey--text text--lighten-3" style="line-height: 36px; font-size: 16px;">-</span>
                <v-text-field
                  v-model="user.MEMBER_TEL_NO[1]"
                  v-mask="'####'"
                  :rules="[v => !!v]"
                  dense
                  hide-details
                  @change="getChange" />
                <span class="mx-2 grey--text text--lighten-3" style="line-height: 36px; font-size: 16px;">-</span>
                <v-text-field
                  v-model="user.MEMBER_TEL_NO[2]"
                  v-mask="'####'"
                  :rules="[v => !!v]"
                  dense
                  hide-details
                  @change="getChange" />
              </div>
            </div>
          </div>
        </v-col>
        <v-col class="pa-4">
          <div class="d-flex align-center">
            <p class="title">담당자 정보</p>
            <v-spacer />
            <v-btn
              v-if="!initial"
              text
              small
              color="primary"
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
                dense
                readonly
                hide-details />
            </div>
            <div class="d-flex mt-4">
              <v-subheader>담당자 연락처</v-subheader>
              <div class="d-flex">
                <v-text-field
                  v-model="user.TEL_NO[0]"
                  v-mask="'###'"
                  :rules="[v => !!v]"
                  :readonly="!initial"
                  dense
                  hide-details />
                <span class="mx-2 grey--text text--lighten-3" style="line-height: 36px; font-size: 16px;">-</span>
                <v-text-field
                  v-model="user.TEL_NO[1]"
                  v-mask="'####'"
                  :rules="[v => !!v]"
                  :readonly="!initial"
                  dense
                  hide-details />
                <span class="mx-2 grey--text text--lighten-3" style="line-height: 36px; font-size: 16px;">-</span>
                <v-text-field
                  v-model="user.TEL_NO[2]"
                  v-mask="'####'"
                  :rules="[v => !!v]"
                  :readonly="!initial"
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
          <div class="d-flex align-end">
            <p class="title">특수 건강검진 기간</p>
            <p v-if="isFocus" class="mb-3 grey--text text--lighten-5" style="font-size: 11px;">텍스트 직접 입력시 숫자만 6자리 입력</p>
          </div>
          <v-divider class="grey lighten-5" />
          <div>
            <div class="d-flex mt-4">
              <v-subheader>협약 시작일</v-subheader>
              <v-menu
                ref="menu"
                v-model="menu1"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="model.START_DATE"
                    v-mask="'####-##-##'"
                    v-bind="attrs"
                    append-icon="mdi-calendar"
                    dense
                    hide-details
                    @focus="isFocus = !isFocus"
                    @blur="isFocus = !isFocus"
                    @change="getChange">
                    <template v-slot:append>
                      <v-btn
                        v-on="on"
                        width="24"
                        height="24"
                        icon
                        :ripple="false">
                        <v-icon>mdi-calendar</v-icon>
                      </v-btn>
                    </template>
                  </v-text-field>
                </template>
                <v-date-picker
                  v-model="model.START_DATE"
                  no-title
                  scrollable />
              </v-menu>
            </div>
            <div class="d-flex mt-4">
              <v-subheader>협약 종료일</v-subheader>
              <v-menu
                ref="menu"
                v-model="menu2"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="model.END_DATE"
                    v-mask="'####-##-##'"
                    v-bind="attrs"
                    append-icon="mdi-calendar"
                    dense
                    hide-details
                    @focus="isFocus = !isFocus"
                    @blur="isFocus = !isFocus"
                    @change="getChange">
                    <template v-slot:append>
                      <v-btn
                        v-on="on"
                        width="24"
                        height="24"
                        icon
                        :ripple="false">
                        <v-icon>mdi-calendar</v-icon>
                      </v-btn>
                    </template>
                  </v-text-field>
                </template>
                <v-date-picker
                  v-model="model.END_DATE"
                  no-title
                  scrollable />
              </v-menu>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>

    <div class="px-16">
      <p class="title">추가검사 항목</p>
    </div>
    <v-divider class="grey" />
    <table class="default-table">
      <thead>
        <tr>
          <th class="pl-16">검사명</th>
          <th class="pl-10" style="width: 290px;">검사 결과 형태</th>
          <th class="pl-10" style="width: 440px;">정상 범위</th>
          <th class="pl-10">수치 단위</th>
          <th class="pr-16" style="width: 40px;"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, idx) of inspection" :key="idx">
          <td class="pl-16 pt-2">
            <v-text-field
              v-model="item.NAME"
              dense
              hide-details
              @change="getChange" />
          </td>
          <td class="pl-10 pt-2">
            <v-select
              v-model="item.RESULT_TYPE"
              :items="types"
              dense
              flat
              hide-details
              @change="getChange" />
          </td>
          <td class="pl-10">
            <div class="d-flex align-start my-1">
              <div class="mr-2" style="width: 120px;">
                <v-checkbox
                  v-model="item.RANGE_TYPE"
                  label="정상범위 없음"
                  value="C"
                  hide-details
                  :ripple="false"
                  off-icon="mdi-checkbox-marked"
                  class="mt-0 pt-0"
                  @change="doChangeRangeType(item)" />
                <v-checkbox
                  v-model="item.RANGE_TYPE"
                  label="남/여 범위 다름"
                  value="B"
                  hide-details
                  :ripple="false"
                  off-icon="mdi-checkbox-marked"
                  class="mt-0 pt-0"
                  @change="doChangeRangeType(item)" />
              </div>
              <template v-if="item.RANGE_TYPE == 'B'">
                <div class="my-1">
                  <div
                    class="d-flex align-center">
                    <v-chip outlined small class="mr-2">남성</v-chip>
                    <div style="width: 76px;"><v-text-field
                      v-model="item.RANGE[0].min"
                      dense
                      hide-details
                      @change="getChange" /></div>
                    <span class="mr-3 grey--text text--lighten-5 font-weight-light">이상</span>
                    <div style="width: 76px;"><v-text-field
                      v-model="item.RANGE[0].max"
                      dense
                      hide-details
                      @change="getChange" /></div>
                    <span class="mr-3 grey--text text--lighten-5 font-weight-light">이하</span>
                  </div>
                  <div
                    class="d-flex align-center mt-2">
                    <v-chip outlined small class="mr-2">여성</v-chip>
                    <div style="width: 76px;"><v-text-field
                      v-model="item.RANGE[1].min"
                      dense
                      hide-details
                      @change="getChange" /></div>
                    <span class="mr-3 grey--text text--lighten-5 font-weight-light">이상</span>
                    <div style="width: 76px;"><v-text-field
                      v-model="item.RANGE[1].max"
                      dense
                      hide-details
                      @change="getChange" /></div>
                    <span class="mr-3 grey--text text--lighten-5 font-weight-light">이하</span>
                  </div>
                </div>
              </template>
              <template v-else>
                <div
                  class="d-flex align-center my-1"
                  :class="item.RANGE_TYPE == 'C' ? 'disabled':''">
                  <v-chip outlined small class="mr-2" :disabled="item.RANGE_TYPE == 'C'">공통</v-chip>
                  <div style="width: 76px;"><v-text-field
                    v-model="item.RANGE[0].min"
                    dense
                    :disabled="item.RANGE_TYPE == 'C'"
                    hide-details
                    @change="getChange" /></div>
                  <span class="mr-3 grey--text font-weight-light" :class="item.RANGE_TYPE == 'C' ? 'text--lighten-3':'text--lighten-5'">이상</span>
                  <div style="width: 76px;"><v-text-field
                    v-model="item.RANGE[0].max"
                    dense
                    :disabled="item.RANGE_TYPE == 'C'"
                    hide-details
                    @change="getChange" /></div>
                  <span class="mr-3 grey--text font-weight-light" :class="item.RANGE_TYPE == 'C' ? 'text--lighten-3':'text--lighten-5'">이하</span>
                </div>
              </template>
            </div>
          </td>
          <td class="pl-10 pt-2">
            <div style="width: 92px;"><v-text-field
              v-model="item.figure"
              dense
              hide-details
              @change="getChange" /></div>
          </td>
          <td class="pl-10 pr-16 pt-2">
            <v-menu
              left
              bottom
              nudge-bottom="40"
              content-class="elevation-0">
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
                <v-list-item @click="doDeleteList(idx)">
                  <v-list-item-content>
                    <v-list-item-title>해당 검사항목 행 지우기</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
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
        라인추가
      </v-btn>
    </div>
  </v-form>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    initial: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    valid: true,
    isFocus: false,
    isChange: false,

    menu1: false,
    menu2: false,
    
    model: {},
    inspection: [
      { NAME: '', RESULT_TYPE: '', RANGE_TYPE: 'A', RANGE: [{ min: null, max: null }], figure: '' }
    ],
    types: [
      '숫자 및 부등호로 표현되는 데이터',
      '2단계 표현 (음성 / 양성)',
      '2단계 표현 (정상 / 위험)',
      '3단계 표현 (정상 / 경고 / 위험)',
      '4단계 표현 (정상 / 주의 / 경고 / 위험)'
    ]
  }),
  computed: {
    ...mapState(['user']),
  },
  methods: {
    doDeleteList(idx) {
      if(this.inspection.length == 1) return;
      this.inspection.splice(idx, 1);
    },
    doAddList() {
      this.inspection.push(
        { NAME: '', RESULT_TYPE: '', RANGE_TYPE: 'A', RANGE: [{min: null, max: null}], figure: '', isRangeCheckbox1: false, isRangeCheckbox2: false }
      );
    },
    doChangeRangeType(item) {
      switch(item.RANGE_TYPE) {
        case 'B':
          item.RANGE = [
            {min: item.RANGE[0].min, max: item.RANGE[0].max},
            {min: null, max: null}
          ];
          break;
        case 'C':
          item.RANGE = [{min: null, max: null}];
          break;
        default:
          item.RANGE_TYPE = 'A'
          item.RANGE = [{min: item.RANGE[0].min, max: item.RANGE[0].max}];
          break;
      }
    },
    getChange() {
      if(!this.initial) this.isChange = true;
    },
    goPage(path) {
      this.$router.push({ path: path })
    },
    doSave() {
      if(this.initial) this.goPage('/checkup')
      else this.goPage('/settings')
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