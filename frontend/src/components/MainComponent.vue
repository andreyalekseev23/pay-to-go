<template>
  <section class="main"
           :style="[
               order.length > 0 && hookah.length > 0 ?
               {
                  paddingBottom: '375px'
               }
               :
               {
                  paddingBottom: '212px'
               }
           ]"
  >
    <div class="container">
      <div class="main__inner">
        <div class="main__share">
          <button class="main__share__button" @click="shareSwitcher">
            <h2 class="main__share__title">
              Разделить счет
            </h2>
            <span class="main__share__switcher"
                  :style="[share ?
                    {
                      backgroundColor: 'var(--orange)'
                    }
                    :
                    {
                      backgroundColor: 'var(--grey)'
                    }
                  ]"
            >
              <span class="main__share__switch"
                    :style="[share ?
                      {
                        transform: 'translateX(20.5px)'
                      }
                      :
                      {
                        transform: 'translateX(0px)'
                      }
                    ]"
              ></span>
            </span>
          </button>
          <button class="main__share__link" @click="sharePage">
            <svg width="16" height="21" viewBox="0 0 16 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.5 6.83185H11.6667C11.1625 6.83185 10.75 7.2294 10.75 7.71528C10.75 8.20117 11.1625 8.59872 11.6667 8.59872H13.5V18.3165H2.49999V8.59872H4.33332C4.83749 8.59872 5.24999 8.20117 5.24999 7.71528C5.24999 7.2294 4.83749 6.83185 4.33332 6.83185H2.49999C1.49166 6.83185 0.666656 7.62694 0.666656 8.59872V18.3165C0.666656 19.2883 1.49166 20.0833 2.49999 20.0833H13.5C14.5083 20.0833 15.3333 19.2883 15.3333 18.3165V8.59872C15.3333 7.62694 14.5083 6.83185 13.5 6.83185Z" fill="#252525"/>
              <path d="M7.99999 13.8993C8.50416 13.8993 8.91666 13.5018 8.91666 13.0159V4.18155H10.5575C10.97 4.18155 11.1717 3.7045 10.8783 3.43064L8.32082 0.965858C8.13749 0.789172 7.85332 0.789172 7.66999 0.965858L5.11249 3.43064C5.04915 3.49291 5.00635 3.57187 4.98949 3.65755C4.97263 3.74323 4.98247 3.83181 5.01776 3.91211C5.05305 3.99242 5.11221 4.06085 5.1878 4.1088C5.26338 4.15675 5.352 4.18207 5.44249 4.18155H7.08332V13.0159C7.08332 13.5018 7.49582 13.8993 7.99999 13.8993Z" fill="#252525"/>
            </svg>
          </button>
        </div>
        <div class="main__content">
          <div class="main__order" v-if="order.length !== 0">
            <v-expansion-panels v-model="panel1">
              <v-expansion-panel>
                <v-expansion-panel-title>
                  <div class="main__list__head">
                    <h2 class="main__title">
                      Основное меню
                    </h2>
                    <span class="main__line"></span>
                  </div>
                </v-expansion-panel-title>
                <div class="main__list">
                  <v-expansion-panel-text v-for="item of order" :key="item.slug">
                    <div :class="[ item.status ? 'main__item main__item__paid' : 'main__item']">
                      <div class="main__checkbox" v-if="!item.status && share">
                        <input type="checkbox" class="main__input" name="checkbox" v-model="item.checked" @change="setShared(item)">
                        <label for="checkbox"></label>
                      </div>
                      <div class="main__info">
                        <span class="main__name">{{ item.name}}</span>
                        <span class="main__mass" v-if="item.mass">{{ item.mass }} гр.</span>
                        <div class="main__counter">
                          <span class="main__amount" v-if="item.amount === 1">{{ item.amount }} шт.</span>
                          <div class="main__toggle" v-if="item.amount !== 1">
                            <button class="main__button" v-if="share" @click="minusHandler(item)">
                              <svg width="16" height="2" viewBox="0 0 16 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 1.00003H15" stroke="#E28800" stroke-width="1.5" stroke-linecap="round"/>
                              </svg>
                            </button>
                            <span class="main__amount" v-if="share">{{ item.amount_share }}/{{ item.amount }} шт.</span>
                            <span class="main__amount" v-if="!share">{{ item.amount }} шт.</span>
                            <button class="main__button" v-if="share" @click="plusHandler(item)">
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 8.00003H15M8 15V1.00003" stroke="#E28800" stroke-width="1.5" stroke-linecap="round"/>
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div class="main__value">
                        <span class="main__price" v-if="item.amount === 1">{{ item.price }}₽</span>
                        <span class="main__price" v-if="item.amount !== 1">{{ item.price * item.amount_share }}₽</span>
                        <span class="main__status main__status__paid" v-if="item.status && share">Оплачено</span>
                        <span class="main__status main__status__not-paid" v-if="!item.status && share">Не оплачено</span>
                      </div>
                    </div>
                  </v-expansion-panel-text>
                </div>
              </v-expansion-panel>
            </v-expansion-panels>
          </div>
          <div class="main__hookah" v-if="hookah.length !== 0">
            <v-expansion-panels v-model="panel2">
              <v-expansion-panel>
                <v-expansion-panel-title>
                  <div class="main__list__head">
                    <h2 class="main__title">
                      Кальянное меню
                    </h2>
                    <span class="main__line"></span>
                  </div>
                </v-expansion-panel-title>
                <v-expansion-panel-text v-for="item of hookah" :key="item.slug">
                  <div :class="[ item.status ? 'main__item main__item__paid' : 'main__item']">
                    <div class="main__checkbox" v-if="!item.status && share">
                      <input type="checkbox" class="main__input" name="checkbox" v-model="item.checked" @change="setShared(item)">
                      <label for="checkbox"></label>
                    </div>
                    <div class="main__info">
                      <span class="main__name">{{ item.name}}</span>
                      <span class="main__mass" v-if="item.mass">{{ item.mass }} гр.</span>
                      <div class="main__counter">
                        <span class="main__amount" v-if="item.amount === 1">{{ item.amount }} шт.</span>
                        <span class="main__amount" v-if="item.amount !== 1 && !share">{{ item.amount }} шт.</span>
                        <span class="main__amount" v-if="item.amount !== 1 && item.status && share">{{ item.amount }} шт.</span>
                        <div class="main__toggle" v-if="item.amount !== 1 && !item.status">
                          <button class="main__button" v-if="share" @click="minusHandler(item)">
                            <svg width="16" height="2" viewBox="0 0 16 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M1 1.00003H15" stroke="#E28800" stroke-width="1.5" stroke-linecap="round"/>
                            </svg>
                          </button>
                          <span class="main__amount" v-if="share">{{ item.amount_share }}/{{ item.amount }} шт.</span>

                          <button class="main__button" v-if="share" @click="plusHandler(item)">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M1 8.00003H15M8 15V1.00003" stroke="#E28800" stroke-width="1.5" stroke-linecap="round"/>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div class="main__value">
                      <span class="main__price" v-if="item.amount === 1">{{ item.price }}₽</span>
                      <span class="main__price" v-if="item.amount !== 1">{{ item.price * item.amount_share }}₽</span>
                      <span class="main__status main__status__paid" v-if="item.status">Оплачено</span>
                      <span class="main__status main__status__not-paid" v-if="!item.status && share">Не оплачено</span>
                    </div>
                  </div>
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import {mapMutations, mapState} from "vuex";

export default {
  name: "MainComponent",
  data () {
    return {
      panel1: [0],
      panel2: [0]
    }
  },
  computed: {
    ...mapState({
      order: state => state.order,
      hookah: state => state.hookah,
      share: state => state.share,
    })
  },
  methods: {
    ...mapMutations([
        'shareSwitcher',
        'minusHandler',
        'plusHandler',
        'setShared'
    ]),
    sharePage () {
      const thisUrl = window.location.href,
          thisTitle = document.title;
      if (navigator.share) {
        navigator.share({
          title: thisTitle,
          url: thisUrl
        }).then(() => {
          alert('Thanks for sharing!');
        })
            .catch(console.error);
      } else {
        alert('Web Share API не поддерживается');
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .main {
    background: #FFFFFF;
    width: 100%;

    &__inner {
      width: 100%;
      padding: 20px 0;
      display: flex;
      flex-direction: column;
      align-items: start;
      gap: 10px;
    }
    &__share {
      width: 100%;
      display: flex;
      align-items: center;
      gap: 10px;

      &__button {
        border: 1px solid #E0E0E0;
        border-radius: 15px;
        height: 52px;
        width: calc(100% - 62px);
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 16px;
      }

      &__title {
        font-weight: 700;
        font-size: 14px;
        line-height: 18px;
      }

      &__switcher {
        position: relative;
        width: 51px;
        height: 28px;
        border-radius: 36.5px;
      }

      &__switch {
        position: absolute;
        top: 4px;
        left: 4.5px;
        width: 21.25px;
        height: 20px;
        border-radius: 100px;
        background: #FFFFFF;
        transition: all .3s ease;
      }
      &__link {
        border: 1px solid #E0E0E0;
        border-radius: 15px;
        width: 52px;
        height: 52px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    &__content {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: start;
    }
    &__order, &__hookah {
      width: 100%;
    }
    &__list__head {
      width: 100%;
      display: flex;
      align-items: center;
      gap: 20px;
    }
    &__title {
      font-weight: 800;
      font-size: 16px;
      line-height: 20px;
      display: block;
      width: 150px;
    }
    &__line {
      width: calc(100% - 170px);
      height: 0;
      border: 1px dashed var(--grey);
    }
    &__list {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: start;
      gap: 5px;
    }
    &__item {
      width: 100%;
      display: flex;
      align-items: center;
      gap: 15px;
      padding: 10px 15px;

      &__paid {
        opacity: .5;
      }
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
      background: #ffffff;
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
    &__info {
      display: flex;
      flex-direction: column;
      align-items: start;
    }
    &__name {
      font-weight: 700;
      font-size: 14px;
      line-height: 18px;
    }
    &__mass {
      font-weight: 700;
      font-size: 12px;
      line-height: 15px;
      color: var(--grey)
    }
    &__amount {
      font-weight: 800;
      font-size: 14px;
      line-height: 18px;
      color: var(--orange);
    }
    &__toggle {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    &__button {
      width: 28px;
      height: 28px;
      border: 1px solid #DCDCDC;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    &__value {
      margin-left: auto;
      display: flex;
      flex-direction: column;
      align-items: end;
    }
    &__price {
      font-weight: 800;
      font-size: 16px;
      line-height: 20px;
      color: var(--orange);
    }
    &__status {
      font-weight: 700;
      font-size: 12px;
      line-height: 15px;

      &__paid {
        color: var(--green);
      }
      &__not-paid {
        color: var(--red);
      }
    }
  }
</style>