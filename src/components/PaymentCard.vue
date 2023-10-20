<template>
  <div class="border-2 border-secondary bg-white rounded p-6">
    <div class="flex justify-center gap-6 mb-6">
      <div
        class="border-2 rounded p-3 w-40 flex items-center justify-center cursor-pointer"
        :class="paymentChoise === 'credit' ? 'border-orange bg-lightOrange' : 'border-secondary'"
        @click="payment('credit')">
        <icon-credit />
        <div class="text-sm pl-3 text-left">Cartão de crédito</div>
      </div>
      <div
        class="border-2 rounded p-3 w-40 flex items-center justify-center cursor-pointer"
        :class="paymentChoise === 'pix' ? 'border-orange bg-lightOrange' : 'border-secondary'"
        @click="payment('pix')"
        >
        <icon-pix />
        <div class="text-base pl-3">Pix</div>
      </div>
      <div
        class="border-2 rounded p-3 w-40 flex items-center justify-center cursor-pointer"
        :class="paymentChoise === 'boleto' ? 'border-orange bg-lightOrange' : 'border-secondary'"
        @click="payment('boleto')"
      >
        <icon-boleto />
        <div class="text-base pl-3">Boleto</div>
      </div>
    </div>

    <div class="sm:flex flex-col sm:flex-row justify-between gap-5">
      <div class="w-full pr-4">
        <form autocomplete="off" id="Form">
          <div class="form-row">
            <div class="mb-3 flex flex-col justify-left">
              <label for="cardnumber" class="mb-1 text-left text-sm font-bold">Número do cartão</label>
              <input
                id="cardnumber"
                placeholder="Digite somente números"
                class="border-2 rounded p-2 border-secondary outline-orange"
                autocomplete="false"
                v-model="cardnumber"
              >
            </div>

            <div class="mb-3 mt-4 flex flex-col justify-left">
              <label for="cardName" class="mb-1 mb-1 text-left text-sm font-bold">Titular do cartão</label>
              <input
                id="cardName"
                placeholder="Digite o nome impresso no cartão"
                class="border-2 rounded p-2 border-secondary outline-orange"
                v-model="cardName"
              >
            </div>

            <div class="mb-3 mt-4 flex flex-col justify-left">
              <label for="cardCpf" class="mb-1 mb-1 text-left text-sm font-bold">CPF/CNPJ do titular</label>
              <input
                id="cardCpf"
                placeholder="Para emissão da nota fiscal"
                type="number"
                class="border-2 rounded p-2 border-secondary outline-orange"
                v-model="cardCpf"
              >
            </div>

            <div class="mb-3 mt-4 flex flex-col justify-left">
              <div class="flex">
                <div class="flex flex-col w-full">
                  <label class="mb-1 mb-1 text-left text-sm font-bold">Validade</label>
                  <div class="flex">
                    <select
                      placeholder="Mês"
                      class="border-2 bg-white rounded p-2 border-secondary outline-orange mr-2"
                      v-model="validateMonth"
                    >
                      <option v-for="(month, mx) in months" :key="mx">
                        {{ month }}
                      </option>
                    </select>
                    <input
                      placeholder="Ano"
                      class="border-2 w-20 rounded p-2 bg-white border-secondary outline-orange"
                      v-model="validateYear"
                    >
                  </div>
                </div>
                <div class="flex flex-col">
                  <label class="mb-1 mb-1 text-left text-sm font-bold">Validade</label>
                  <input
                    placeholder="CVV"
                    type="number"
                    class="border-2 rounded p-2 border-secondary outline-orange"
                    v-model="cvv"
                  > 
                </div>
              </div>
            </div>

            <div class="mb-3 mt-4 flex flex-col justify-left">
              <label class="mb-1 mb-1 text-left text-sm font-bold">Número de parcelas</label>
              <select
                class="border-2 rounded p-2 border-secondary bg-white outline-orange"
                v-model="installment"
              >
                <option v-for="(i, ix) in installments" :key="ix">
                  {{ i }}
                </option>
              </select>
            </div>
          </div>
        </form>
      </div>
      <div class="w-full h-40 bg-orange">
        <div class="border">
          Aqui
          {{ installment }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import iconCredit from '@/components/icons/iconCredit.vue'
import iconPix from '@/components/icons/iconPix.vue'
import iconBoleto from '@/components/icons/iconBoleto.vue'
export default {
  components: {
    iconCredit,
    iconPix,
    iconBoleto
  },
  data () {
    return {
      paymentChoise: '',
      validation: {
        invalid: {},
        valid: {}
      },
      cardnumber: '',
      validateMonth: "Janeiro",
      validateYear: "0000",
      installments: ["1x de R$ 50,00", "2x de R$ 25,00", "3x de R$ 16,66", "4x de R$ 12,50"],
      installment: '',
      months: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho","Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]
    }
  },
  methods: {
    payment(itme) {
      console.log(itme)
      this.paymentChoise = itme
    }
  }
}
</script>
