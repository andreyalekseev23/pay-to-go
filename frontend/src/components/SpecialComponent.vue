<template>
<a :href="path" ref="special" class="special" target="_blank">
  <button class="special__close" @click.prevent="closeSpecial">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 6L6 18" stroke="#252525" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M6 6L18 18" stroke="#252525" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </button>
  <img :src="picture" alt="Рекламное предложение" class="special__image" />
</a>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "SpecialComponent",
  methods: {
    closeSpecial () {
      const spec = this.$refs.special;

      spec.style.transform = 'translateX(-100%)';
      setTimeout(() => {
        spec.style.display = 'none';
      }, 250)
    }
  },
  computed: {
    ...mapState({
      path: state => state.special_path,
      picture: state => state.special_picture
    })
  }
}
</script>

<style scoped lang="scss">
  .special {
    display: block;
    width: 100%;
    height: 100px;
    position: relative;
    background: red;
    transition: all .3s ease;

    &__close {
      position: absolute;
      top: 10px;
      right: 10px;
      z-index: 1;
    }
    &__image {
      width: 100%;
      height: 100px;
      position: absolute;
      top: 0;
      left: 0;
    }
  }
</style>