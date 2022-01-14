<template>
  <div ref="addForm" class="add-form">
    <div :class="['success-message', {'success-message--show': isShowSuccessMessage}]">
      <p>Товар удачно добавлен</p>
      <button @click="closeSuccessMessage">
        Хорошо
      </button>
    </div>
    <BaseInput
      id="name"
      label="Наименование товара"
      :value="fields.name.value"
      invalid-text="Поле является обязательным"
      placeholder="Введите наименование товара"
      required
      :invalid="isFormDirty && !fields.name.isValid"
      @input="changeFieldValue(fields.name, $event); validateField(fields.name)"
    />
    <BaseInput
      id="description"
      textarea
      rows="6"
      cols="50"
      label="Описание товара"
      :value="fields.description.value"
      placeholder="Введите описание товара"
      @input="changeFieldValue(fields.description, $event)"
    />
    <BaseInput
      id="image"
      label="Ссылка на изображение товара"
      placeholder="Введите ссылку"
      required
      :value="fields.image.value"
      :invalid="isFormDirty && !fields.image.isValid"
      invalid-text="Поле является обязательным"
      @input="changeFieldValue(fields.image, $event); validateField(fields.image)"
    />
    <BaseInput
      id="price"
      label="Цена товара"
      placeholder="Введите цену"
      required
      :value="formatPrice(fields.price.value)"
      :invalid="isFormDirty && !fields.price.isValid"
      invalid-text="Поле является обязательным"
      @input="changeFieldValue(fields.price, $event); validateField(fields.price)"
    />
    <button
      :disabled="isAddButtonDisabled"
      :class="['submit-button', {'submit-button--disable': isAddButtonDisabled}]"
      @click="addProduct"
    >
      Добавить товар
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
      fields: {
        name: { value: '', isValid: false },
        description: { value: '', notValidate: true },
        image: { value: '', isValid: false },
        price: { value: '', isValid: false }
      },
      isFormDirty: false,
      isShowSuccessMessage: false
    }
  },
  computed: {
    isAddButtonDisabled () {
      return !Object.values(this.fields).every((item) => {
        if (item.isValid === undefined) {
          return true
        }
        return item.isValid === true
      })
    }
  },
  methods: {
    ...mapActions({ setProduct: 'setProduct' }),
    resetProductForm () {
      this.isFormDirty = false
      Object.values(this.fields).forEach((field) => {
        field.value = ''
        if (field.notValidate === undefined) {
          field.isValid = false
        }
      })
    },
    addProduct () {
      this.validateAllFields()

      const isFormValid = Object.values(this.fields).every((item) => {
        return item.isValid
      })
      if (isFormValid) {
        this.setProduct({
          id: `${this.fields.name.value}+${Math.random().toFixed(4)}`,
          ...Object.fromEntries(Object.entries(this.fields).map(([key, value]) => [key, value.value]))
        })
        this.resetProductForm()
        this.isShowSuccessMessage = true
      }
    },
    changeFieldValue (field, value) {
      this.isFormDirty = true
      if (field === this.fields.price) {
        field.value = this.formatPrice(value)
      } else {
        field.value = value
      }
    },
    validateAllFields () {
      Object.entries(this.fields).forEach(([_, field]) => this.validateField(field))
    },
    validateField (field) {
      if (field.notValidate) {
        field.isValid = true
      } else {
        field.isValid = field.value.length !== 0
      }
    },
    formatPrice (value) {
      const formatValue = value.replace(/\s/g, '')
      if (formatValue.length === 3) {
        return formatValue
      } else if (formatValue.length === 4) {
        return `${formatValue[0]} ${formatValue.slice(1)}`
      } else if (formatValue.length === 5) {
        return `${formatValue[0]}${formatValue[1]} ${formatValue.slice(2)}`
      } else if (formatValue.length === 6) {
        return `${formatValue[0]}${formatValue[1]}${formatValue[2]} ${formatValue.slice(3)}`
      } else if (formatValue.length === 7) {
        return `${formatValue[0]} ${formatValue[1]}${formatValue[2]}${formatValue[3]} ${formatValue.slice(4, 7)}`
      } else {
        return value
      }
    },
    closeSuccessMessage () {
      this.isShowSuccessMessage = false
    }
  }
}
</script>

<style scoped lang="scss">

.success-message {
  width: 100%;
  height: 100%;
  background-color: rgba(197, 194, 194, 0.65);
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  z-index: 1;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  transition: all 0.7s;
  opacity: 0;
  pointer-events: none;
  &--show {
    pointer-events: unset;
    opacity: 1;
  }
  p {
    color: #6ed551;
    max-width: 280px;
    text-align: center;
    margin: 0;
    font-size: 28px;
    line-height: 35px;
  }
  button {
    border: none;
    background-color: #FFFEFB;
    border-radius: 4px;
    padding: 10px 16px;
    margin-top: 10px;
    cursor: pointer;
    color: #3F3F3F;
  }
}

.add-form {
  width: 100%;
  padding: 24px;
  background: #FFFEFB;
  box-shadow: 0 20px 30px rgba(0, 0, 0, 0.04), 0 6px 10px rgba(0, 0, 0, 0.02);
  border-radius: 4px;
  position: relative;
}

.submit-button {
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  color: #FFFFFF;
  width: 100%;
  background: #7BAE73;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
