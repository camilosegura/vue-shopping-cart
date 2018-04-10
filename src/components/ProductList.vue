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
        {{product.title}} - {{product.price | currency}} - {{product.inventory}}
        <button
          :disabled="!productIsInStock(product)"
          @click="addProductToCart(product)">
          Add to Cart
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
  import { mapState, mapGetters, mapActions } from 'vuex'

  export default {
    name: 'ProductList',
    data () {
      return {
        loading: false
      }
    },
    computed: {
      ...mapState('products', {
        products: state => state.items
      }),
      ...mapGetters('products', {
        productIsInStock: 'productIsInStock'
      })
    },
    created () {
      this.loading = true
      this.fetchProducts()
        .then(() => {
          this.loading = false
        })
    },
    methods: {
      ...mapActions({
        addProductToCart: 'cart/addProductToCart',
        fetchProducts: 'products/fetchProducts'
      })
    }
  }
</script>

<style scoped>

</style>
