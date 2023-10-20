<template>
  <div class="border-2 border-secondary rounded mt-3">
    <div class="flex justify-between p-4 bg-white">
      <div class="mt-2 flex">
        <img src="../assets/product.png" alt="" class="h-52">
        <div class="flex flex-col items-start ml-5 justify-center">
          <div class="font-bold text-xl">{{ product.title }}</div>
          <div class="font-bold my-3 text-2xl text-orange">{{ product.val }}</div>
          <div class="">{{ product.plan }}</div>
        </div>
      </div>
      <div class="">
        <div class="border-2 p-2 border-secondary rounded text-xs">Alterar país</div>
      </div>
    </div>
    <div class="rounded-b py-3 px-4 bg-orange text-white font-bold text-sm flex">
      {{ product.contact }}
    </div>
  </div>
</template>
<script>
  export default {
    name: 'ProductCart',
    data() {
      return {
        product: {
          title: 'Nome do produto',
          val: 'R$ 50,00 / mês',
          plan: 'Plano mensal com renovação automática',
          contact:  'contatolivrediet@gmail.com'
        }
      }
    }
  }
</script>
