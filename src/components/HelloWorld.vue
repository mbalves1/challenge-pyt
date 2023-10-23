<template>
  <div class="">
    <div class="w-7/12 mx-auto gap-5 flex flex-col">
      <product-cart />
      <FormsCheckout :validPayment="validForm"></FormsCheckout>
      <PaymentCard @checkPayment="validPayment"></PaymentCard>
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
  },
  data() {
    return {
      validForm: false
    }
  },
  methods: {
    validPayment() {
      this.validForm = !this.validForm
    }
  },
  watch: {
  checkPayment: function () {
    console.log('O evento check-payment foi ouvido!');
  },
  validForm() {
  }
}
}
</script>
