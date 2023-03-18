<template>
<div class="empty">
  <div class="container">
    <div class="empty__inner">
      <img src="../assets/images/empty.png" alt="" class="empty__image">
      <h1 class="empty__title">Тут пока ничего нет</h1>
      <p class="empty__desc">
        Официант ещё не внес ваш заказ в чек или вы ещё ничего не заказали
      </p>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "EmptyComponent"
}
</script>

<style scoped lang="scss">
  .empty {
    width: 100%;
    background: #ffffff;

    &__inner {
      width: 100%;
      height: calc(100vh - 136px);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
      justify-content: center;
    }
    &__image {
      height: 140px;
      width: auto;
      margin-bottom: 18px;
    }
    &__title {
      font-weight: 800;
      font-size: 22px;
      line-height: 28px;
      color: var(--dark);
    }
    &__desc {
      max-width: 300px;
      font-size: 14px;
      line-height: 18px;
      text-align: center;
      color: var(--grey);
    }
  }
</style>