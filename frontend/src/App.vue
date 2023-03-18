<template>
  <SpecialComponent v-if="special"/>
  <HeaderComponent />
  <MainComponent v-if="!paid && !empty "/>
  <SuccessComponent v-if="paid"/>
  <EmptyComponent v-if="empty"/>
  <FooterComponent v-if="!paid && !empty"/>
</template>

<script>
import HeaderComponent from "@/components/HeaderComponent.vue";
import MainComponent from "@/components/MainComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";
import SuccessComponent from "@/components/SuccessComponent.vue";
import EmptyComponent from "@/components/EmptyComponent.vue";
import {mapMutations, mapState} from 'vuex';
import SpecialComponent from "@/components/SpecialComponent.vue";

export default {
  name: 'App',
  components: {
    SpecialComponent,
    EmptyComponent,
    SuccessComponent,
    HeaderComponent,
    MainComponent,
    FooterComponent
  },
  computed: {
    ...mapState({
      empty: state => state.empty,
      paid: state => state.paid,
      special: state => state.special
    })
  },
  methods: {
    ...mapMutations([
        'setState'
    ]),
    async getOrder () {
      console.log('get order func');

      const response = await fetch('/api/order');
      const data = await response.json();

      const order = data[0]

      order.order.forEach(item => {
          item.checked = false;
          if(item.amount !== 1) {
            item.amount_share = 1
          }
      });
      order.hookah.forEach(item => {
        item.checked = false;
        if(item.amount !== 1) {
          item.amount_share = 1
        }
      });

      this.setState(order);
    }
  },
  mounted () {
    this.getOrder ();
    setInterval(() => {
      this.getOrder();
    }, 3000);
  }
}
</script>

