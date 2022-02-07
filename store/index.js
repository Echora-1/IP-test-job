const state = () => ({
  productsList: []
})

const getters = {
  getProductsList: state => state.productsList
}

const actions = {
  setList ({ commit }, list) {
    commit('addList', list)
  },
  setProduct ({ commit }, product) {
    commit('addProduct', product)
  },
  removeProduct ({ commit }, id) {
    commit('deleteProduct', id)
  },
  sortProductsListMin ({ commit }) {
    commit('productsListMin')
  },
  sortProductsListMax ({ commit }) {
    commit('productsListMax')
  },
  sortProductsListName ({ commit }) {
    commit('productsListName')
  }
}
const mutations = {
  addList (state, list) {
    state.productsList = list
  },
  addProduct (state, product) {
    state.productsList.push(product)
    localStorage.setItem('productList', JSON.stringify(state.productsList))
  },
  deleteProduct (state, id) {
    state.productsList = state.productsList.filter((product) => {
      return product.id !== id
    })
    localStorage.setItem('productList', JSON.stringify(state.productsList))
  },
  productsListMin (state) {
    state.productsList = state.productsList.sort((first, second) => {
      return parseInt(first.price.replace(/\s/g, '')) - parseInt(second.price.replace(/\s/g, ''))
    })
  },
  productsListMax (state) {
    state.productsList = state.productsList.sort((first, second) => {
      return parseInt(second.price.replace(/\s/g, '')) - parseInt(first.price.replace(/\s/g, ''))
    })
  },
  productsListName (state) {
    state.productsList = state.productsList.sort((first, second) => {
      if (first.name > second.name) {
        return 1
      }
      if (first.name < second.name) {
        return -1
      }
      return 0
    })
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
