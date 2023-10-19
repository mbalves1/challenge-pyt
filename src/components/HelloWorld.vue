<template>
  <div class="sm:w-screen">
    <div class="w-7/12 mx-auto">
      <product-cart></product-cart>

      <forms-checkout></forms-checkout>
    </div>
  </div>
</template>

<script>
import ProductCart from './ProductCart.vue';
import FormsCheckout from './FormsCheckout.vue';

export default {
  components: {
    ProductCart,
    FormsCheckout
  }
}
</script>
