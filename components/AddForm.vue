<template>
  <div class="add-form" ref="addForm">
    <BaseInput
      label="Наименование товара"
      id="name"
      v-model="product.name"
      placeholder="Введите наименование товара"
      required
      :invalid="productValidation.name"
      invalid-text="Поле является обязательным"
    />
    <BaseInput
      textarea
      rows="6"
      cols="50"
      label="Описание товара"
      id="description"
      v-model="product.description"
      placeholder="Введите описание товара"
    />
    <BaseInput
      label="Ссылка на изображение товара"
      id="image"
      v-model="product.image"
      placeholder="Введите ссылку"
      required
      :invalid="productValidation.image"
      invalid-text="Поле является обязательным"
    />
    <BaseInput
      label="Цена товара"
      id="price"
      v-model="product.price"
      placeholder="Введите цену"
      required
      :invalid="productValidation.price"
      invalid-text="Поле является обязательным"
    />
    <button
      :disabled="addButtonDisable"
      :class="['submit-button', {'submit-button--disable': addButtonDisable}]"
      @click="addProduct"
    >Добавить товар
    </button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import BaseInput from '../components/BaseInput'

export default {
  components: { BaseInput },
  data () {
    return {
      product: {
        name: '',
        description: '',
        image: '',
        price: ''
      },
      productValidation: {
        name: false,
        image: false,
        price: false
      },
      addButtonDisable: true
    }
  },
  methods: {
    ...mapActions({ setProduct: 'setProduct' }),
    validateForm () {
      this.productValidation.name = !this.product.name.length > 0
      this.productValidation.image = !this.product.image.length > 0
      this.productValidation.price = !this.product.price.length > 0
      return this.productValidation.name || this.productValidation.image || this.productValidation.price
    },
    resetProductForm () {
      this.product = {
        name: '',
        description: '',
        image: '',
        price: ''
      }
    },
    addProduct () {
      const formIsInvalid = this.validateForm()
      if (!formIsInvalid) {
        this.product.id = `${this.product.name}+${Math.random().toFixed(4)}`
        this.setProduct(this.product)
        this.resetProductForm()
      }
    }
  },
  watch: {
    product: {
      handler () {
        let isNotEmpty = false
        for (const key in this.product) {
          if (this.product[key].length > 0) {
            isNotEmpty = true
            this.addButtonDisable = false
            this.productValidation[key] = false
          }
          if (!isNotEmpty) {
            this.addButtonDisable = true
          }
        }
      },
      deep: true
    },
    productValidation: {
      handler () {
        let isInvalid = false
        for (const key in this.productValidation) {
          if (this.productValidation[key] === true) {
            isInvalid = true
          }
          if (isInvalid) {
            this.addButtonDisable = true
          }
        }
      },
      deep: true
    }
  }
}
</script>

<style scoped lang="scss">

.add-form {
  width: 100%;
  padding: 24px;
  background: #FFFEFB;
  box-shadow: 0px 20px 30px rgba(0, 0, 0, 0.04), 0px 6px 10px rgba(0, 0, 0, 0.02);
  border-radius: 4px;
}

.submit-button {
  font-family: 'Source Sans Pro', sans-serif;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  color: #FFFFFF;
  width: 100%;
  background: #7BAE73;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  border: none;
  margin-top: 10px;
  padding: 10px;
  cursor: pointer;
  &:hover {
    background: #8fc985;
  }
  &--disable {
    background: #EEEEEE;
    box-shadow: none;
    color: #B4B4B4;
    cursor: not-allowed;
    &:hover {
      background: #EEEEEE;
    }
  }
}
</style>
