<template>
<div class="success">
  <div class="container">
    <div class="success__inner">
      <img src="../assets/images/success.png" alt="Ваш заказ успешно оплачен :)" class="success__image" />
      <h1 class="success__title">
        Оплата прошла успешно ✅
      </h1>
      <p class="success__desc">
        Вы успешно оплатили счет и можете идти по своим делам, будем рады видеть вас снова
      </p>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "SuccessComponent"
}
</script>

<style scoped lang="scss">
  .success {
    width: 100%;
    background: #ffffff;

    &__inner {
      width: 100%;
      height: calc(100vh - 70px);
      display: flex;
      flex-direction: column;
      gap: 6px;
      align-items: center;
      justify-content: center;
    }
    &__image {
      height: 177px;
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