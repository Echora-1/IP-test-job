<template>
  <div class="wrap">
    <div class="container">
      <div class="header">
        <h1>Добавление товара</h1>
        <BaseDropdown id="sort" :list="sortList" item-key="sortName" placeholder="По умолчанию" @selected="(value) => selectSort(value)" />
      </div>
      <div class="sidebar">
        <AddForm />
      </div>
      <transition-group name="list" tag="div" :class="['product-list', {'product-list--empty': !getProductsList.length}]">
        <div v-for="(product, index) in getProductsList" :key="index">
          <ProductCard :product="product" />
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import AddForm from '../components/AddForm'
import ProductCard from '../components/ProductCard'
import BaseDropdown from '../components/BaseDropdown'
export default {
  components: { BaseDropdown, ProductCard, AddForm },
  data () {
    return {
      sortList: [{ sortName: 'Мин. цена', id: 1, value: 'min' }, { sortName: 'Мах. цена', id: 2, value: 'max' }, { sortName: 'По наим.', id: 3, value: 'name' }],
      sort: ''
    }
  },
  computed: {
    ...mapGetters({ getProductsList: 'getProductsList' })
  },
  watch: {
    sort () {
      if (this.sort === 'min') {
        this.sortProductsListMin()
      }
      if (this.sort === 'max') {
        this.sortProductsListMax()
      }
      if (this.sort === 'name') {
        this.sortProductsListName()
      }
    }
  },
  mounted () {
    if (localStorage.getItem('productList') != null) {
      this.setList(JSON.parse(localStorage.getItem('productList')))
    }
  },
  methods: {
    ...mapActions({ sortProductsListMin: 'sortProductsListMin', sortProductsListMax: 'sortProductsListMax', sortProductsListName: 'sortProductsListName', setList: 'setList' }),
    selectSort (value) {
      this.sort = value.value
    }
  }
}
</script>

<style scoped lang="scss">
.wrap {
  background-color: #FFFEFBCC;
}

.container {
  display: flex;
  flex-wrap: wrap;

  @media (max-width: 610px){
    flex-direction: column;
  }
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 32px 16px 0 0;
  flex: 0 0 100%;
  max-width: 100%;
  @media (max-width: 950px){
    padding-right: 0;
  }
  @media (max-width: 610px){
    flex-direction: column;
    align-items: flex-start;
  }

  h1 {
    font-weight: 600;
    font-size: 28px;
    line-height: 35px;
    margin: 0;
    color: #3F3F3F;
  }
}

.sidebar {
  width: 332px;
  padding-top: 10px;
  position: relative;
  min-height: calc(100vh - 108px);
  @media (max-width: 767px){
    width: 280px;
  }
  @media (max-width: 610px){
    display: flex;
    justify-content: center;
    align-items: flex-start;
    width: 100%;
    min-height: auto;
  }
  & > div {
    top: 24px;
    margin-bottom: 2px;
    position: sticky;
    width: 332px;
    @media (max-width: 767px){
      width: 280px;
    }
  }
}

.empty-text {
  width: 100%;
}

.product-list {
  flex: 0 0 calc(100% - 332px);
  width: 100%;
  max-width: calc(100% - 332px);
  padding: 10px 0 16px 16px;
  display: flex;
  flex-wrap: wrap;
  min-height: calc(100vh - 92px);
  overflow: hidden;
  @media (max-width: 767px){
    flex: 0 0 calc(100% - 280px);
    max-width: calc(100% - 280px);
  }
  @media (max-width: 610px){
    flex: 0 0 100%;
    max-width: 100%;
    padding-left: 0;
  }
  &--empty {
    position: relative;
    &::after {
      content: 'Список товаров пуст';
      text-align: center;
      position: absolute;
      font-weight: 600;
      font-size: 28px;
      line-height: 35px;
      margin: 0;
      color: rgba(63, 63, 63, 0.7);
      top: 50%;
      left: 50%;
      transform: translate( -50%, -50%);
      @media (max-width: 610px){
        top: 20%;
      }
    }
  }
  & > div {
    margin: 8px 0 8px;
    max-width: 33.33%;
    flex: 0 0 33.33%;
    max-height: 423px;
    padding-right: 16px;
    @media (max-width: 1200px){
      max-width: 50%;
      flex: 50%;
    }
    @media (max-width: 950px){
      max-width: 100%;
      flex: 100%;
      display: flex;
      justify-content: center;
      padding-right: 0;
    }
  }
}

.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active до версии 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}

</style>
