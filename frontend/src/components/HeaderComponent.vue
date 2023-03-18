<template>
<header class="header">
  <div class="container">
    <div class="header__inner">
      <div class="header__logotype">
        <img src="../assets/images/logotype.png" alt="" class="header__img">
      </div>
      <div class="header__body" v-if="!paid">
        <h2 class="header__title">
          Мой счет
          <span class="header__line"></span>
          <span class="header__tabel">столик {{ tabel }}</span>
        </h2>
      </div>
    </div>
  </div>
</header>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "HeaderComponent",
  computed: {
    ...mapState({
      tabel: state => state.tabel,
      paid: state => state.paid
    }),
  },
  methods: {

  }
}
</script>

<style scoped lang="scss">
  .header {
    padding: 20px 0;
    border-radius: 0px 0px 35px 35px;
    background: var(--dark);

    &__inner {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 30px;
    }
    &__logotype {
      max-width: 166px;
    }
    &__img {
      width: 100%;
      height: auto;
    }
    &__body {
      width: 100%;
    }
    &__title {
      font-weight: 800;
      font-size: 28px;
      line-height: 36px;
      color: #ffffff;

      display: flex;
      align-items: center;
      gap: 10px;
    }
    &__line {
      width: 2px;
      height: 26px;
      border-radius: 1px;
      background: #ffffff;
    }
    &__tabel {
      font-weight: 700;
      font-size: 16px;
      line-height: 20px;
    }
  }
</style>