<template>
  <div class="wrap">
    <div class="container">
      <div class="header">
        <h1>Добавление товара</h1>
        <div>
          По умолчанию
        </div>
      </div>
      <div class="sidebar">
        <AddForm />
      </div>
      <div class="product-list">
        <div v-for="(product, index) in getProductsList" :key="index">
          <ProductCard :product="product" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import AddForm from '../components/AddForm'
import ProductCard from '../components/ProductCard'
export default {
  components: { ProductCard, AddForm },
  computed: {
    ...mapGetters({ getProductsList: 'getProductsList' })
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
  align-items: flex-start;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 32px 16px 8px 0;
  flex: 0 0 100%;
  max-width: 100%;

  h1 {
    font-family: 'Source Sans Pro', sans-serif;
    font-weight: 600;
    font-size: 28px;
    line-height: 35px;
    margin: 0;
    color: #3F3F3F;
  }
}

.sidebar {
  width: 332px;
  padding-top: 8px;
  position: relative;
  min-height: calc(100vh - 75px);
  & > div {
    top: 24px;
    margin-bottom: 2px;
    position: sticky;
    width: 332px;
  }
}

.product-list {
  flex: 0 0 calc(100% - 332px);
  width: 100%;
  max-width: calc(100% - 332px);
  padding: 0 0 30px 16px;
  display: flex;
  flex-wrap: wrap;
  min-height: calc(100vh - 75px);

  & > div {
    margin: 8px 0 8px;
    max-width: 33.33%;
    flex: 0 0 33.33%;
    padding-right: 16px;
  }
}

</style>
