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
      <div class="w-full mt-5">
        <Tilt>
          <div class="border-2 rounded bg-hero-pattern h-auto p-2 flex flex-col justify-between" style="height: 250px;">
            <div class="flex justify-between p-4 text-white">
              <div class="rounded" style="background: #291933; width: 60px; height: 40px; opacity: 1;"></div>
              <div :class="`bg-${flag}`">{{ flag }}</div>
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
      <div class="flex justify-between mt-2 text-sm font-bold">
        <span>Nome do produto</span>
        <span>R$ 50,00 / mês</span>
      </div>
    </div>
  </div>
</template>
<script>
// Lib externa
import Tilt from 'vanilla-tilt-vue'

import iconCredit from '@/components/icons/iconCredit.vue'
import iconPix from '@/components/icons/iconPix.vue'
import iconBoleto from '@/components/icons/iconBoleto.vue'
export default {
  components: {
    iconCredit,
    iconPix,
    iconBoleto,
    Tilt
  },
  data () {
    return {
      paymentChoise: '',
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
      const regexes = {
        visa: ["4"],
        mastercard: ["51","52","53","54","55"],
        diners: ["300","301", "302", "303", "304", "305", "36", "38"],
        elo: ["636368","438935","504175","451416","509048","509067","509049","509069","509050","509074","509068","509040", "509045","509051","509046","509066","509047","509042", "509052","509043","509064 ","509040", "36297", "5067","4576","4011"],
        amex: ["34", "37"],
        hipercard: ["60"]
      };

      // const regex = {
      //   visa: /^4[0-9]{15}$/,
      //   mastercard: /^(50|5[6-9]|6007|6220|6304|6703|6708|6759|676[1-3])|((5(([1-2]|[4-5])[0-9]{8}|0((1|6)([0-9]{7}))|3(0(4((0|[2-9])[0-9]{5})|([0-3]|[5-9])[0-9]{6})|[1-9][0-9]{7})))|((508116)\\d{4,10})|((502121)\\d{4,10})|((589916)\\d{4,10})|(2[0-9]{15})|(67[0-9]{14})|(506387)\\d{4,10})/,
      //   diners: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
      //   amex: /^3[47][0-9]{13}$/,
      //   hipercard: /^606282|^3841(?:[0|4|6]{1})0/,
      //   elo: /^4011(78|79)|^43(1274|8935)|^45(1416|7393|763(1|2))|^50(4175|6699|67[0-6][0-9]|677[0-8]|9[0-8][0-9]{2}|99[0-8][0-9]|999[0-9])|^627780|^63(6297|6368|6369)|^65(0(0(3([1-3]|[5-9])|4([0-9])|5[0-1])|4(0[5-9]|[1-3][0-9]|8[5-9]|9[0-9])|5([0-2][0-9]|3[0-8]|4[1-9]|[5-8][0-9]|9[0-8])|7(0[0-9]|1[0-8]|2[0-7])|9(0[1-9]|[1-6][0-9]|7[0-8]))|16(5[2-9]|[6-7][0-9])|50(0[0-9]|1[0-9]|2[1-9]|[3-4][0-9]|5[0-8]))/,
      // }

      for (const brand in regexes) {
        if (regexes[brand].test(val)) {
          this.flag = brand
          return brand
        }
      }
    }
  }
}
</script>
