<template>
  <div class="product-card" tabindex="0">
    <div class="product-card__delete-button" @click="() => removeProduct(product.id)"></div>
    <img src="../assets/img.png" width="100%" height="200" alt="">
    <div class="product-card__info">
      <p class="product-card__name">{{ product ? product.name : 'Наименование товара' }}</p>
      <p class="product-card__description">{{
          product ? product.description :
          'Довольно - таки интересное описание товара в несколько строк.Довольно - таки интересное описание товара в несколько строк'
        }}</p>
      <p class="product-card__price">{{ product ? product.price : '10 000 руб.' }}</p>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: ['product'],
  methods: {
    ...mapActions({ removeProduct: 'removeProduct' })
  }
}
</script>

<style scoped lang="scss">

.product-card {
  background-color: #FFFEFB;
  box-shadow: 0px 20px 30px rgba(0, 0, 0, 0.04), 0px 6px 10px rgba(0, 0, 0, 0.02);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  max-width: 332px;
  width: 100%;
  position: relative;
  &:hover {
    transform: scale(1.02);
  }

  &__delete-button {
    position: absolute;
    display: none;
    top: -8px;
    right: -8px;
    background-color: #FF8484;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    height: 32px;
    width: 32px;
    background-image: url("../assets/delete.png");
    background-repeat: no-repeat;
    background-position: center;
    .product-card:hover & {
      display: block;
    }
  }

  &__info {
    display: flex;
    flex-direction: column;
    padding: 16px 16px 24px;
    & p {
      font-family: 'Source Sans Pro', sans-serif;
      margin-top: 0;
      color: #3F3F3F;
      max-width: 300px;
    }
  }

  &__name {
    font-weight: 600;
    font-size: 20px;
    line-height: 25px;
    margin-bottom: 16px;
  }

  &__description {
    font-size: 16px;
    line-height: 20px;
    height: 80px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    -webkit-line-clamp: 4;
    margin-bottom: 32px;
  }

  &__price {
    font-weight: 600;
    font-size: 24px;
    line-height: 30px;
    margin-bottom: 0;
  }
}

</style>
