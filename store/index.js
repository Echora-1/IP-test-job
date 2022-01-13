const state = {
  productsList: []
}

const getters = {
  getProductsList: state => state.productsList
}

const actions = {
  setProduct ({ commit }, product) {
    commit('addProduct', product)
  },
  removeProduct ({ commit }, id) {
    commit('deleteProduct', id)
  }
}

const mutations = {
  addProduct (state, product) {
    state.productsList.push(product)
  },
  deleteProduct (state, id) {
    state.productsList = state.productsList.filter((product) => {
      return product.id !== id
    })
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
