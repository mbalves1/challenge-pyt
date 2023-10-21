<template>
  <div class="">
    <div class="w-7/12 mx-auto gap-5 flex flex-col">
      <product-cart />
      <FormsCheckout></FormsCheckout>
      <PaymentCard></PaymentCard>
    </div>
  </div>
</template>

<script>
import ProductCart from './ProductCart.vue';
import FormsCheckout from './FormsCheckout.vue';
import PaymentCard from './PaymentCard.vue';

export default {
  components: {
    ProductCart,
    FormsCheckout,
    PaymentCard
  }
}
</script>
