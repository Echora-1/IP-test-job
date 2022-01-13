<template>
  <div>
    <label :for="id" :class="['base-label', {'base-label--required': required}]">
      {{ label }}
    </label>
    <div
      :class="['base-input-wrapper', {'base-input-wrapper--focused': focused, 'base-input-wrapper--invalid': invalid}]"
    >
      <template v-if="textarea">
        <textarea
          :id="id"
          class="base-input"
          v-bind="$attrs"
          :placeholder="$attrs.placeholder"
          :value="value"
          @focus="focusHandler"
          @input="inputHandler"
          @blur="blurHandler"
        />
      </template>
      <template v-else>
        <input
          :id="id"
          class="base-input"
          v-bind="$attrs"
          :placeholder="$attrs.placeholder"
          :value="value"
          @focus="focusHandler"
          @input="inputHandler"
          @blur="blurHandler"
        >
      </template>
    </div>
    <div class="invalid-text">
      <p v-show="invalid">
        {{ invalidText }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    },

    id: {
      type: String,
      default: ''
    },

    label: {
      type: String,
      default: ''
    },

    textarea: {
      type: Boolean,
      default: false
    },

    required: {
      type: Boolean,
      default: false
    },

    invalid: {
      type: Boolean,
      default: false
    },

    invalidText: {
      type: String,
      default: ''
    }
  },

  data () {
    return {
      focused: false
    }
  },

  methods: {
    inputHandler (event) {
      this.$emit('input', event.target.value)
    },

    focusHandler () {
      this.focused = true
    },

    blurHandler () {
      this.focused = false
    }
  }
}
</script>

<style scoped lang="scss">

.base-input-wrapper {
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border: 1px solid transparent;
  border-radius: 4px;
  width: 100%;
  margin: 4px 0;
  & textarea {
    height: auto;
    resize: none;
  }
  &--focused {
    border-color: gray;
  }
  &--invalid {
    border-color: #FF8484;
  }
}

.base-input {
  font-family: 'Source Sans Pro', sans-serif;
  width: 100%;
  height: 36px;
  margin: 0;
  border: none;
  outline: none;
  padding: 10px 16px;
  background: transparent;
  font-size: 12px;
  line-height: 15px;
  color: #3F3F3F;
  &::placeholder {
    color: #B4B4B4;
  }
}

.base-label {
  font-family: 'Source Sans Pro', sans-serif;
  color: #49485E;
  font-size: 10px;
  line-height: 13px;
  letter-spacing: -0.02em;
  &--required {
    padding-right: 5px;
    position: relative;
    &::after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      width: 4px;
      height: 4px;
      background: #FF8484;
      border-radius: 4px;
    }
  }
}

.invalid-text {
  min-height: 10px;
  & p {
    margin: 0;
    font-family: 'Source Sans Pro', sans-serif;
    font-size: 8px;
    line-height: 10px;
    letter-spacing: -0.02em;
    color: #FF8484;
  }
}

</style>
