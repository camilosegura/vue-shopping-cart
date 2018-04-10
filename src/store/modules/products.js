import shop from '@/api/shop'

const products = {
  state: {
    items: []
  },
  getters: {
    availableProducts (state, getters, rootState) {
      return state.items.filter(product => product.inventory > 0)
    },
    productIsInStock () {
      return (product) => {
        return product.inventory > 0
      }
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
      state.items = products
    },

    decrementProductInventory (state, product) {
      product.inventory--
    }
  }
}

export default products
