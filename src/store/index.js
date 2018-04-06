import Vue from 'vue'
import Vuex from 'vuex'
import shop from '@/api/shop'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    products: [],
    cart: []
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
    },
    addProductToCart (context, product) {
      if (product.inventory > 0) {
        const cartItem = context.state.cart.find(item => item.id === product.id)

        if (cartItem) {
          context.commit('incrementItemQuantity', cartItem)
        } else {
          context.commit('pushProductToCart', product.id)
        }

        context.commit('decrementProductInventory', product)
      }
    }
  },
  mutations: {
    setProducts (state, products) {
      state.products = products
    },
    incrementItemQuantity (state, cartItem) {
      cartItem.quantity++
    },
    pushProductToCart (state, productId) {
      const item = {
        id: productId,
        quantity: 1
      }

      state.cart.push(item)
    },
    decrementProductInventory (state, product) {
      product.inventory--
    }
  }
})

export default store
