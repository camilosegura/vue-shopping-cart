import Vue from 'vue'
import Vuex from 'vuex'
import shop from '@/api/shop'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    products: []
  },
  getters: {
    availableProducts (state, getters) {
      return state.products.filter(product => product.inventory > 0)
    }
  },
  actions: {
    fetchProducts (context) {
      return new Promise((resolve, reject) => {
        shop.getProducts(products => {
          context.commit('setProducts', products)
          resolve()
        })
      })
    }
  },
  mutations: {
    setProducts (state, products) {
      state.products = products
    }
  }
})

export default store
