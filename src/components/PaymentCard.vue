<template>
  <div class="border-2 border-secondary bg-white rounded p-6 mb-10">
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

    <component v-if="paymentChoise !== 'credit'" :is="paymentChoise === 'pix' ? 'payment-pix' : 'payment-boleto'"></component>

    <div v-if="paymentChoise === 'credit'" class="sm:flex flex-col sm:flex-row justify-between gap-5">
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
                max-length="16"
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
                  <label class="mb-1 mb-1 text-left text-sm font-bold">CVV</label>
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
      <div class="w-full mt-5">
        <Tilt>
          <div class="border-2 rounded bg-hero-pattern h-auto p-2 flex flex-col justify-between" style="height: 250px;">
            <div class="flex justify-between p-4 text-white">
              <div class="rounded" style="background: #291933; width: 60px; height: 40px; opacity: 1;"></div>
              <div class="bg-card-mastercard">{{ flag.type }}</div>
              <img :src="cardnumber ? `@/assets/${flag.type}.svg` : ''" style="width: 50px;">
            </div>
            <div class="text-white">
              ####
            </div>
            <div class="flex justify-between py-4 px-10 text-white text-sm">
              <div class="flex flex-col">
                <div>Titular</div>
                <div>Murilo Barros</div>
              </div>
              <div class="flex flex-col text-left">
                <div>Validade</div>
                <div>20/10</div>
              </div>
            </div>
          </div>
        </Tilt>
      </div>
    </div>
    <div class="mt-10">
      <div class="text-lg text-left font-bold">Detalhes da compra</div>
      <div class="flex justify-between text-sm font-bold my-5">
        <span>Nome do produto</span>
        <span>R$ 50,00 / mês</span>
      </div>
      <div v-if="paymentChoise === 'credit'" class="flex items-center">
        <icon-credit-edit />
        <div class="text-left ml-2 text-sm">Essa cobrança aparecerá na sua fatura como: PAYT*NomeDoProduto</div>
      </div>
      <div v-else class="grid grid-cols-2 mt-2">
        <div class="flex flex-col">
          <label class="text-left">CPF/CNPJ (Para emissão de Nota Fiscal)</label>
          <input class="border-2 p-2 border-secondary outline-orange rounded">
        </div>
      </div>
      <div class="grid grid-cols-2 mt-6">
        <button class="w-full bg-orange rounded h-20 text-3xl text-white">Comprar Agora</button>
      </div>

      <div class="flex justify-center mt-10">
        <img src="@/assets/safe.png">
      </div>
    </div>
  </div>
</template>
<script>
// Lib externa
import Tilt from 'vanilla-tilt-vue'
import creditCardType from 'credit-card-type'

import iconCredit from '@/components/icons/iconCredit.vue'
import iconCreditEdit from '@/components/icons/iconCreditEdit.vue'
import iconPix from '@/components/icons/iconPix.vue'
import iconBoleto from '@/components/icons/iconBoleto.vue'

// Shared steps
import PaymentPix from './stepspayments/PaymentPix.vue'
import PaymentBoleto from './stepspayments/PaymentBoleto.vue'

export default {
  components: {
    iconCredit,
    iconPix,
    iconBoleto,
    iconCreditEdit,
    Tilt,
    PaymentPix,
    PaymentBoleto
  },
  data () {
    return {
      paymentChoise: 'credit',
      validation: {
        invalid: {},
        valid: {}
      },
      cardnumber: '',
      flag: '',
      cardName: '',
      cvv: '',
      cardCpf: '',
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
    },
  },
  watch: {
    cardnumber (val) {
      if (val === undefined) {
        return null;
      }
      const type = creditCardType(val)
      this.flag = type[0]
    }
  }
}
</script>
