<template>
<div class="pay">
  <div class="container">
    <div class="pay__inner">
      <div class="pay__system">
        <div class="pay__icon">
          <svg width="28" height="35" viewBox="0 0 28 35" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 7.90069L4.18264 15.2603V19.7494L0.00489299 27.0945L0 7.90069Z" fill="#5B57A2"/>
            <path d="M16.0597 12.5822L19.979 10.2175L28 10.2101L16.0597 17.4107V12.5822Z" fill="#D90751"/>
            <path d="M16.0375 7.85731L16.0597 17.6011L11.8672 15.0653V0.5L16.0375 7.85731Z" fill="#FAB718"/>
            <path d="M28 10.2101L19.9787 10.2175L16.0375 7.85731L11.8672 0.5L28 10.2101Z" fill="#ED6F26"/>
            <path d="M16.0597 27.1353V22.4079L11.8672 19.9202L11.8695 34.5L16.0597 27.1353Z" fill="#63B22F"/>
            <path d="M19.9692 24.7922L4.18264 15.2603L0 7.90069L27.983 24.7825L19.9692 24.7922Z" fill="#1487C9"/>
            <path d="M11.8698 34.5L16.0597 27.1353L19.9689 24.7922L27.9827 24.7825L11.8698 34.5Z" fill="#017F36"/>
            <path d="M0.00489299 27.0945L11.9015 19.9205L7.90189 17.5048L4.18264 19.7494L0.00489299 27.0945Z" fill="#984995"/>
          </svg>
        </div>
        <div style="display: flex; flex-direction: column; align-items: start;">
          <div class="pay__system__desc">Способ оплаты</div>
          <div class="pay__system__name">Система быстрых платежей</div>
        </div>
      </div>
      <div class="pay__content" v-if="order.length > 0 && hookah.length > 0">
        <v-expansion-panels v-model="panel" >
          <v-expansion-panel bg-color="transparent">
            <v-expansion-panel-title>
              <div class="pay__panel__head">
                <svg width="24" height="24"
                     viewBox="0 0 24 24"
                     fill="none"
                     xmlns="http://www.w3.org/2000/svg"
                     stroke="#ffffff"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                  <g id="SVGRepo_iconCarrier">
                    <path d="M22 6V8.42C22 10 21 11 19.42 11H16V4.01C16 2.9 16.91 2 18.02 2C19.11 2.01 20.11 2.45 20.83 3.17C21.55 3.9 22 4.9 22 6Z" stroke="#7a7a7a" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>
                    <path d="M2 7V21C2 21.83 2.93998 22.3 3.59998 21.8L5.31 20.52C5.71 20.22 6.27 20.26 6.63 20.62L8.28998 22.29C8.67998 22.68 9.32002 22.68 9.71002 22.29L11.39 20.61C11.74 20.26 12.3 20.22 12.69 20.52L14.4 21.8C15.06 22.29 16 21.82 16 21V4C16 2.9 16.9 2 18 2H7H6C3 2 2 3.79 2 6V7Z" stroke="#7a7a7a" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>
                    <path opacity="0.2" d="M6 9H12" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                    <path opacity="0.2" d="M6.75 13H11.25" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                  </g>
                </svg>
                <h2 class="pay__title">
                  Столик {{ tabel }}:
                  <span class="pay__total">{{ summary }}₽</span>
                </h2>
              </div>
              <template v-slot:actions>
                <svg class="pay__panel__icon"
                     :style="[panel === 0 ? {rotate: '-90deg'} : {rotate: '90deg'}]"
                     width="24"
                     height="24"
                     viewBox="0 0 1024 1024"
                     xmlns="http://www.w3.org/2000/svg"
                     fill="#7A7A7A72"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                  <g id="SVGRepo_iconCarrier">
                    <path fill="#7A7A7A72" d="M340.864 149.312a30.592 30.592 0 0 0 0 42.752L652.736 512 340.864 831.872a30.592 30.592 0 0 0 0 42.752 29.12 29.12 0 0 0 41.728 0L714.24 534.336a32 32 0 0 0 0-44.672L382.592 149.376a29.12 29.12 0 0 0-41.728 0z">
                    </path>
                  </g>
                </svg>
              </template>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <div class="pay__buttons">
                <button class="pay__button">Основное меню: {{ menu_summary }}₽</button>
                <button class="pay__button pay__button__hookah">Кальянное меню: {{ hookah_summary }}₽</button>
              </div>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>
      <button class="pay__button"
              v-if="order.length > 0 && hookah.length === 0"
      >
        Оплатить: {{ menu_summary }}₽
      </button>
      <button class="pay__button pay__button__hookah"
              v-if="hookah.length > 0 && order.length === 0"
      >
        Оплатить: {{ hookah_summary }}₽
      </button>
      <div class="pay__commission">
        <input class="pay__input"
               type="checkbox"
               v-model="this.$store.state.commission"
               name="commission"
               @change="calcSummary"

        >
        <label for="commission" class="pay__label">
          Я хочу компенсировать комиссию сервиса
        </label>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import {mapMutations, mapState} from "vuex";

export default {
  name: "FooterComponent",
  data () {
    return {
      panel: 1,
      input: true
    }
  },
  computed: {
    ...mapState([
        'tabel',
        "summary",
        'menu_summary',
        'hookah_summary',
        'hookah',
        'order'
    ]),
  },
  methods: {
    ...mapMutations({
      createPayment: commit => commit('createPayment'),
      calcSummary: commit => commit('calcSummary'),
    }),
    paymentFunction () {
      const order = this.createPayment();
    },
  },
}
</script>

<style scoped lang="scss">
  .pay {
    position: fixed;
    z-index: 1;
    bottom: 0;
    left: 0;
    width: 100%;
    border-radius: 35px 35px 0 0;
    background: var(--dark);
    padding: 30px 0;

    &__inner {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: start;
      gap: 20px;
    }
    &__system {
      width: 100%;
      display: flex;
      align-items: start;
      gap: 16px;

      &__name {
        font-weight: 800;
        font-size: 14px;
        line-height: 150%;
        color: #ffffff;
      }
      &__desc {
        font-weight: 700;
        font-size: 12px;
        line-height: 150%;
        color: var(--grey);
      }
    }
    &__content {
      width: 100%;
      border: 1px dashed #7A7A7A72;
      border-radius: 15px;
      padding: 0 15px;
    }
    &__panel__head {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    &__panel__icon {
      transition: rotate .3s ease;
    }
    &__title {
      color: #ffffff;
      font-weight: 800;
      font-size: 18px;
      line-height: 120%;
    }
    &__buttons {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 15px;
      padding-bottom: 20px;
      padding-top: 10px;
      border-top: 1px dashed #7a7a7a72;
    }
    &__button {
      width: 100%;
      background-color: var(--orange);
      border-radius: 15px;
      color: #ffffff;
      font-weight: 800;
      font-size: 16px;
      line-height: 20px;
      padding: 16px 0;
      display: flex;
      justify-content: center;
    }
    &__commission {
      width: 100%;
      display: flex;
      align-items: center;
      gap: 15px;
    }
    &__label {
      font-weight: 700;
      font-size: 12px;
      line-height: 150%;
      color: #ffffff;
    }
    &__input {
      position: absolute;
      z-index: 1;
      opacity: 0;
      width: 20px;
      height: 20px;
    }
    &__input+label {
      display: inline-flex;
      align-items: center;
      user-select: none;
    }
    &__input+label::before {
      content: '';
      display: inline-block;
      width: 20px;
      height: 20px;
      background: var(--dark);
      border: 2px solid var(--orange);
      border-radius: 5px;
      flex-shrink: 0;
      flex-grow: 0;
      margin-right: 0.5em;
      background-repeat: no-repeat;
      background-position: center center;
      background-size: 75% 75%;
      cursor: pointer;
    }
    &__input:checked+label::before {
      border-color: var(--orange);
      background-color: var(--orange);
      background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3e%3c/svg%3e");
    }

  }
</style>