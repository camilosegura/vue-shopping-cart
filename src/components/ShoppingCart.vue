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
  export default {
    name: 'ShoppingCart',
    computed: {
      products () {
        return this.$store.getters.getCartProducts
      },
      total () {
        return this.$store.getters.cartTotal
      },
      checkoutStatus () {
        return this.$store.state.checkoutStatus
      }
    },
    methods: {
      checkout () {
        this.$store.dispatch('checkout')
      }
    }
  }
</script>

<style scoped>

</style>
