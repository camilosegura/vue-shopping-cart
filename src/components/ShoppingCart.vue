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
      }
    }
  }
</script>

<style scoped>

</style>
