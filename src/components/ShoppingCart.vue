<template>
  <div>
    <h1>Shopping Cart</h1>
    <ul>
      <li
        v-for="product in products"
      >
        {{product.title}} - {{product.price  | currency}} - {{product.quantity}}
      </li>
    </ul>
    <div>Total: {{total  | currency}}</div>
    <button @click="checkout()">Checkout</button>
    <p v-if="checkoutStatus">{{checkoutStatus}}</p>
  </div>
</template>

<script>
  import {mapState, mapGetters, mapActions} from 'vuex'

  export default {
    name: 'ShoppingCart',
    computed: {
      ...mapGetters('cart', {
        products: 'getCartProducts',
        total: 'cartTotal'
      }),
      ...mapState('cart', {
        checkoutStatus: state => state.checkoutStatus
      })
    },
    methods: {
      ...mapActions('cart', {
        checkout: 'checkout'
      })
    }
  }
</script>

<style scoped>

</style>
