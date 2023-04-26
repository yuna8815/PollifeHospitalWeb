<template>
  <v-card class="checkup-list-filter">
    <v-form v-model="valid" ref="form">
      <v-card-text class="pa-6">
        <v-row>
          <v-col class="pr-6">
            <v-subheader>성함 <v-chip outlined small class="ml-1">검진대상자</v-chip></v-subheader>
            <v-text-field
              v-model="NAME"
              dense
              append-icon="mdi-magnify"
              :rules="[v => !!v]"
              hide-details
              @keydown.enter="doChangeChip"
              @click:append="doChangeChip" />
          </v-col>
          <v-col class="pl-6">
            <v-subheader>
              업로드 일자
              <v-spacer />
              <v-checkbox
                v-model="isUpload"
                label="기간 선택"
                :ripple="false"
                hide-details
                off-icon="mdi-checkbox-marked"
                class="mt-0 pt-0"/>
            </v-subheader>
            <div class="d-flex">
              <v-menu
                v-model="menu1"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-bind="attrs"
                    v-model="UPLOAD_START_DATE"
                    v-mask="'####-##-##'"
                    :disabled="!isUpload"
                    :rules="isUpload ? [v => !!v]:[]"
                    append-icon="mdi-calendar"
                    dense
                    hide-details>
                    <template v-slot:append>
                      <v-btn
                        v-on="on"
                        :disabled="!isUpload"
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
                  v-model="UPLOAD_START_DATE"
                  no-title
                  scrollable />
              </v-menu>
              <span class="mx-2 align-self-center" style="white-space: pre">부터</span>
              <v-menu
                v-model="menu2"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="auto">
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-bind="attrs"
                    v-model="UPLOAD_END_DATE"
                    v-mask="'####-##-##'"
                    :disabled="!isUpload"
                    :rules="isUpload ? [v => !!v]:[]"
                    append-icon="mdi-calendar"
                    dense
                    hide-details>
                    <template v-slot:append>
                      <v-btn
                        v-on="on"
                      :disabled="!isUpload"
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
                  v-model="UPLOAD_END_DATE"
                  no-title
                  scrollable />
              </v-menu>
              <span class="ml-2 align-self-center" style="white-space: pre">까지</span>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="pr-6">
            <v-subheader>
              데이터 업로드 상태
              <v-spacer />
              <v-checkbox
                v-model="SELECTED_STATUS"
                label="전체 선택"
                :ripple="false"
                hide-details
                off-icon="mdi-checkbox-marked"
                class="mt-0 pt-0"
                @change="doAllSelect"/>
            </v-subheader>
            <div>
              <v-row class="mx-0 my-4">
                <v-col class="pa-0">
                  <v-checkbox
                    ref="STATUS_0"
                    v-model="STATUS[0]"
                    label="성공"
                    :ripple="false"
                    hide-details
                    off-icon="mdi-checkbox-marked"
                    class="mt-0 pt-0"/>
                </v-col>
                <v-col class="pa-0">
                  <v-checkbox
                    v-model="STATUS[1]"
                    label="분석 중"
                    :ripple="false"
                    hide-details
                    off-icon="mdi-checkbox-marked"
                    class="mt-0 pt-0 font-weight-light"/>
                </v-col>
                <v-col class="pa-0" cols="5">
                  <v-checkbox
                    v-model="STATUS[2]"
                    label="재업로드 성공"
                    :ripple="false"
                    hide-details
                    off-icon="mdi-checkbox-marked"
                    class="mt-0 pt-0"/>
                </v-col>
              </v-row>
              <v-row class="ma-0">
                <v-col class="pa-0">
                  <v-checkbox
                    v-model="STATUS[3]"
                    label="실패(잘못된 파일)"
                    :ripple="false"
                    hide-details
                    off-icon="mdi-checkbox-marked"
                    class="mt-0 pt-0 red--text"/>
                </v-col>
                <v-col class="pa-0">
                  <v-checkbox
                    v-model="STATUS[4]"
                    label="실패(검진 데이터 중복)"
                    :ripple="false"
                    hide-details
                    off-icon="mdi-checkbox-marked"
                    class="mt-0 pt-0 red--text"/>
                </v-col>
              </v-row>
            </div>
          </v-col>
          <v-col class="pl-6">
            <v-subheader>
              검진 일자
              <v-spacer />
              <v-checkbox
                v-model="isCheckup"
                label="기간 선택"
                :ripple="false"
                hide-details
                off-icon="mdi-checkbox-marked"
                class="mt-0 pt-0"
                @change="$refs.form.validate()"/>
            </v-subheader>
            <div class="d-flex">
              <v-menu
                v-model="menu3"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-bind="attrs"
                    v-model="CHECKUP_START_DATE"
                    v-mask="'####-##-##'"
                    :rules="isCheckup ? [v => !!v]:[]"
                    append-icon="mdi-calendar"
                    dense
                    hide-details>
                    <template v-slot:append>
                      <v-btn
                        v-on="on"
                        :disabled="!isCheckup"
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
                  v-model="CHECKUP_START_DATE"
                  no-title
                  scrollable />
              </v-menu>
              <span class="mx-2 align-self-center" style="white-space: pre">부터</span>
              <v-menu
                v-model="menu4"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="auto">
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-bind="attrs"
                    v-model="CHECKUP_END_DATE"
                    v-mask="'####-##-##'"
                    :disabled="!isCheckup"
                    :rules="isCheckup ? [v => !!v]:[]"
                    append-icon="mdi-calendar"
                    dense
                    hide-details>
                    <template v-slot:append>
                      <v-btn
                        v-on="on"
                        :disabled="!isCheckup"
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
                  v-model="CHECKUP_END_DATE"
                  no-title
                  scrollable />
              </v-menu>
              <span class="ml-2 align-self-center" style="white-space: pre">까지</span>
            </div>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions class="px-6 pb-6">
        <p class="mb-0 grey--text text--lighten-5">필터 {{ $props.params.filterCount }} 개 적용 중</p>
        <v-btn
          text
          small
          :disabled="$props.params.filterCount == 0"
          :color="$props.params.filterCount > 0 ? 'primary':'grey lighten-4'"
          class="ml-2"
          @click="doReset">
          필터 초기화
        </v-btn>
        <v-spacer />
        <v-btn
          width="162"
          small
          outlined
          @click="$props.params.isOpen = false">
          취소
        </v-btn>
        <v-btn
          width="162"
          depressed
          :disabled="!valid"
          small
          color="primary"
          class="ml-4"
          @click="doSetFilter">
          적용
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
export default {
  props: {
    params: Object
  },
  data: () => ({
    valid: false,
    isUpload: false,
    isCheckup: false,

    menu1: false,
    menu2: false,
    menu3: false,
    menu4: false,

    NAME: null,
    UPLOAD_START_DATE: null,
    UPLOAD_END_DATE: null,
    CHECKUP_START_DATE: null,
    CHECKUP_END_DATE: null,

    STATUS: [true, true, true, true, true]
  }),
  computed: {
    SELECTED_STATUS: {
      get() {
        return this.STATUS.every(v => v == true)
      },
      set(newValue) {
        return newValue;
      }
    },
    filterCount() {
      let _value = [false, false, false, false]
      _value[0] = this.NAME != null
      _value[1] = this.isUpload;
      _value[2] = !this.SELECTED_STATUS;
      _value[3] = this.isCheckup;
      return _value.filter(v => v == true).length
    }
  },
  methods: {
    doChangeChip(ev) {
      // !TODO
      // append 클릭시 selection으로 값을 넘기는 방법 확인
      console.log(ev, this.NAME)
    },
    doAllSelect(ev) {
      if(!ev) return;
      this.STATUS = [true, true, true, true, true]
    },
    doReset() {
      // !TODO
      // reset시 checkbox 값이 null이 되는 현상
      this.$refs.form.reset();
      this.$props.params.filterCount = 0;
      this.doAllSelect(true);
      this.$props.params.isOpen = false
    },
    doSetFilter() {
      console.log("필터 갯수", this.filterCount)
      this.$props.params.filterCount = this.filterCount;
      this.$props.params.isOpen = false
    }
  }
}
</script>

<style lang="scss" scoped>
.v-card {
  border: solid 1px var(--v-grey-lighten4);
}
.v-subheader {
  height: 24px;
  padding: 0;
  color: black;
  font-size: 14px;
  font-weight: 500;
  line-height: 16px;
  .v-checkbox .v-label {
    font-size: 13px;
    font-weight: 400;
    line-height: 16px;
  }
}
.v-chip {
  font-size: 16px;
  font-weight: 400;
  line-height: 20px;
  border-radius: 2px;
  background: #F2F2F2 !important;
}
</style>