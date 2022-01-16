<template>
  <div v-click-outside="hideDropdown" class="wrapper">
    <label :for="id" class="base-label">
      {{ label }}
    </label>
    <div
      :class="['base-input-wrapper', {'base-input-wrapper_focused': focused}]"
    >
      <input
        :id="id"
        class="base-input"
        v-bind="$attrs"
        :placeholder="$attrs.placeholder"
        @focus="focusHandler"
        @input="inputHandler"
        v-model="searchValue"
        @blur="blurHandler"
        readonly
      >
    </div>
    <div
      v-if="isDropdownOpen"
      class="list-selector___dropdown"
    >
      <ul>
        <li
          v-for="item in filteredList"
          :key="item.id"
          @click="onItemClick(item)"
        >
          {{ item[itemKey] }}
        </li>
        <li v-if="!filteredList.length" class="empty">
          Ничего не найдено
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import ClickOutside from 'vue-click-outside'

export default {

  directives: {
    ClickOutside
  },
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

    list: {
      type: Array
    },

    itemKey: {
      type: String
    }
  },

  data () {
    return {
      focused: false,
      isDropdownOpen: false,
      selectedListItem: {},
      filteredList: this.list,
      searchValue: ''
    }
  },

  methods: {
    inputHandler () {
      this.isDropdownOpen = true
    },

    focusHandler () {
      this.focused = true
      this.isDropdownOpen = true
    },

    blurHandler () {
      this.focused = false
    },

    hideDropdown () {
      this.isDropdownOpen = false
    },

    onItemClick (item) {
      this.selectedListItem = item
      this.searchValue = item[this.itemKey]
      this.isDropdownOpen = false
    },

    getSearchItem () {
      this.filteredList = this.list.filter(item => item[this.itemKey].toLowerCase().includes(this.searchValue.toLowerCase()))
    }
  },
  watch: {
    selectedListItem () {
      this.$emit('selected', this.selectedListItem)
    }
  }
}
</script>

<style scoped lang="scss">

.wrapper {
  position: relative;
}

.base-input-wrapper {
  background: #FFFEFB;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  border: 1px solid transparent;
  border-radius: 4px;
  width: 100%;
  &:hover{
    border-color: #B4B4B4;
  }
}

.base-input-wrapper_focused {
  border-color: #545454;
}

.base-input {
  width: 122px;
  height: 36px;
  margin: 0;
  border: none;
  outline: none;
  padding: 10px 24px 10px 16px;
  background-color: transparent;
  background-repeat: no-repeat;
  background-image: url("../assets/img/rectangle.svg");
  background-position: center right 12px;
  font-size: 12px;
  line-height: 15px;
  cursor: pointer;
  text-align: center;
  &::placeholder {
    color: #B4B4B4;
  }
}

.base-label {
  color: #6B7686;
  font-size: 18px;
}

.list-selector___dropdown {
  max-height: 100px;
  width: -webkit-fill-available;
  position: absolute;
  background-color: white;
  border: 1px solid #545454;
  border-radius: 4px;
  margin-top: 2px;
  z-index: 1;
  overflow-y: auto;
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    font-size: 12px;
    line-height: 15px;
  }
  li {
    padding: 6px;
    cursor: pointer;
  }
  li:hover {
    background-color: #B0B6BE66;
  }
}
.empty {
  text-align: center;
  font-size: 12px;
}

li.empty:hover {
  background-color: transparent;
}

</style>
