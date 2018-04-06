<template>
  <div>
    <h1>Product List</h1>
    <img
      v-if="loading"
      src="https://i.imgur.com/JfPpwOA.gif"/>
    <ul>
      <li
        v-for="product in products"
      >
        {{product.title}} - {{product.price}}
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'ProductList',
    data () {
      return {
        loading: false
      }
    },
    computed: {
      products () {
        return this.$store.getters.availableProducts
      }
    },
    created () {
      this.loading = true
      this.$store.dispatch('fetchProducts')
        .then(() => {
          this.loading = false
        })
    }
  }
</script>

<style scoped>

</style>
