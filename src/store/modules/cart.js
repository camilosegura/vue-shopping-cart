import shop from '@/api/shop'

const cart = {
  namespaced: true,
  state: {
    items: [],
    checkoutStatus: null
  },
  getters: {
    getCartProducts (state, getters, rootState) {
      const products = []

      state.items.length && state.items.map(item => {
        const product = rootState.products.items.find(product => product.id === item.id)

        if (product) {
          products.push({
            ...product,
            quantity: item.quantity
          })
        }
      })

      return products
    },
    cartTotal (state, getters) {
      return getters.getCartProducts.reduce((total, product) => {
        total += product.price * product.quantity
        return total
      }, 0)
    }
  },
  actions: {
    addProductToCart (context, product) {
      if (context.rootGetters['products/productIsInStock'](product)) {
        const cartItem = context.state.items.find(item => item.id === product.id)

        if (cartItem) {
          context.commit('incrementItemQuantity', cartItem)
        } else {
          context.commit('pushProductToCart', product.id)
        }

        context.commit('products/decrementProductInventory', product, {root: true})
      }
    },
    checkout (context) {
      shop.buyProducts(
        context.state.items,
        () => {
          context.commit('emptyCart')
          context.commit('setCheckoutStatus', 'success')
        },
        () => {
          context.commit('setCheckoutStatus', 'fail')
        }
      )
    }
  },
  mutations: {
    incrementItemQuantity (state, cartItem) {
      cartItem.quantity++
    },
    pushProductToCart (state, productId) {
      const item = {
        id: productId,
        quantity: 1
      }

      state.items.push(item)
    },
    emptyCart (state) {
      state.items = []
    },
    setCheckoutStatus (state, status) {
      state.checkoutStatus = status
    }
  }
}

export default cart
