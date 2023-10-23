<template>
  <div class="border-2 border-secondary bg-white rounded p-2 sm:p-6 mb-10">
    <div class="sm:flex sm:flex-row flex-col justify-center gap-6 mb-6">
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

    <div v-if="paymentChoise === 'credit'" class="gap-5 grid grid-cols-1 sm:grid-cols-2">
      <div class="sm:pr-4">
        <form id="Form">
          <div class="">
            <div class="mb-3 flex flex-col justify-left">
              <PTextField
                type-input="number"
                label="Número do cartão"
                placeholder="Digite somente números"
                @inputvalue="validateCardNumber"
                :hasError="validation.invalid.cardnumber"
              ></PTextField>

              <PErrorMessage :validate="validation.invalid.cardnumber"></PErrorMessage>
            </div>

            <div class="mb-3 flex flex-col justify-left">
              <PTextField
                label="Titular do cartão"
                placeholder="Digite o nome impresso no cartão"
                @inputvalue="validateCardName"
                :hasError="validation.invalid.cardName"
              ></PTextField>

              <PErrorMessage :validate="validation.invalid.cardName"></PErrorMessage>
            </div>

            <div class="mb-3 flex flex-col justify-left">
              <label class="mb-1 mb-1 text-left text-sm font-bold">CPF/CNPJ do titular</label>
              <input
                placeholder="Para emissão da nota fiscal"
                class="border-2 rounded p-2 bg-grey outline-orange"
                :class="
                  validation.invalid.cardCpf ? 'border-red' : 'border-secondary'"
                v-model="cardCpf"
                v-mask="'###.###.###-##'"
              >

              <PErrorMessage :validate="validation.invalid.cardCpf"></PErrorMessage>
            </div>

            <div class="mb-3 mt-4 flex flex-col justify-left">
              <div class="flex flex-col sm:flex-row">
                <div class="flex flex-col w-full">
                  <label class="mb-1 mb-1 text-left text-sm font-bold">Validade</label>
                  <div class="flex">
                    <select
                      placeholder="Mês"
                      class="border-2 bg-white rounded p-2 border-secondary outline-orange mr-2"
                      v-model="validateMonth"
                    >
                      <option v-for="(month, mx) in months" :key="mx" :value="month.value">
                        {{ month.label }}
                      </option>
                    </select>
                    <input
                      placeholder="Ano"
                      type="number"
                      class="border-2 w-20 rounded p-2 bg-white border-secondary outline-orange"
                      v-mask="'##'"
                      v-model="validateYear"
                    >
                  </div>
                </div>
                <div class="flex flex-col">
                  <div class="w-28">
                    <PTextField
                      type-input="number"
                      label="CVV"
                      placeholder="CVV"
                      @inputvalue="validateCVV"
                      :hasError="validation.invalid.cvv"
                    ></PTextField>

                    <PErrorMessage :validate="validation.invalid.cvv"></PErrorMessage>
                  </div>
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
              <div class="rounded border border-white" style="background: #291933; width: 60px; height: 40px; opacity: 1;"></div>
              <div
                v-if="flag.type !== 'mastercard'
                  || flag.type !== 'visa'"
                >
                  {{ flag.type === 'mastercard' || flag.type === 'visa' ? '' : flag.type }}
              </div>
              <img v-if="flag.type === 'mastercard'" src="@/assets/mastercard.svg" class="w-10">
              <img v-if="flag.type === 'visa'" src="@/assets/visa.svg" class="w-10">
            </div>
            <div class="text-white text-lg mr-20">
              {{ cardnumber ? `#### #### #### #${cardnumber.substr(-3)}` : '#### #### #### ####'}}
            </div>
            <div class="flex justify-between py-4 px-10 text-white text-sm">
              <div class="flex flex-col">
                <div>Titular</div>
                <div class="font-bold">{{ cardName || 'João Silva'}}</div>
              </div>
              <div class="flex flex-col text-left">
                <div>Validade</div>
                <div class="font-bold">{{ `${validateMonth}/${validateYear}`}}</div>
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
          <input
            class="border-2 p-2 outline-orange rounded" 
            :class="validation.invalid.cpfandboleto ? 'border-red' : 'border-secondary'"
            @blur="validateCpfandboleto(paymentChoise)"
            v-model="cpfandboleto"
            v-mask="'###.###.###-##'"
          >

          <div v-if="validation.invalid.cpfandboleto" class="text-red text-xs text-right">{{ validation.invalid.cpfandboleto }}</div>

        </div>
      </div>
      <div class="grid grid-cols-2 mt-6">
        <button class="w-full bg-orange rounded h-20 text-3xl text-white" @click="buyNow">Comprar Agora</button>
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
import PErrorMessage from './shared/PErrorMessage.vue'
import PTextField from './shared/PTextField.vue'

export default {
  components: {
    iconCredit,
    iconPix,
    iconBoleto,
    iconCreditEdit,
    Tilt,
    PaymentPix,
    PaymentBoleto,
    PErrorMessage,
    PTextField
  },
  data () {
    return {
      paymentChoise: 'credit',
      validation: {
        invalid: {
          cvv: '',
          cardCpf: '',
          cardnumber: '',
          cardName: '',
          cpfandboleto: ''
        },
        valid: {}
      },
      cardnumber: '',
      flag: '',
      cardName: '',
      cvv: '',
      cardCpf: '',
      cpfandboleto: '',
      validateMonth: "01",
      validateYear: "00",
      installments: ["1x de R$ 50,00", "2x de R$ 25,00", "3x de R$ 16,66", "4x de R$ 12,50"],
      installment: '1x de R$ 50,00',
      loading: false,
      months: [{ label: "Janeiro", value: '01' },
        { label: "Fevereiro", value: '02' },
        { label: "Março", value: '03' },
        { label: "Abril", value: '04' },
        { label: "Maio", value: '05' },
        { label: "Junho", value: '06' },
        { label: "Julho", value: '07' },
        { label: "Agosto", value: '08' },
        { label: "Setembro", value: '09' },
        { label: "Outubro", value: '10' },
        { label: "Novembro", value: '11' },
        { label: "Dezembro", value: '12' }
      ]
    }
  },
  methods: {
    payment(item) {
      this.paymentChoise = item
    },
    validateCardNumber(item) {
      this.cardnumber = item;
      if (!this.cardnumber) {
        this.validation.invalid.cardnumber = 'Por favor, insira um número de cartão.'
      } else if (this.cardnumber.length !== 16) {
        this.validation.invalid.cardnumber = 'Por favor, insira um número de cartão válido.'
      } else {
        this.validation.valid.cardnumber = true
        delete this.validation.invalid.cardnumber;
      }
      this.AddPaymentInfo()
    },
    validateCardName(item) {
      this.cardName = item
      if (!this.cardName) {
        this.validation.invalid.cardName = 'Por favor, insira um nome do titular.'
      } else {
        this.validation.valid.cardName = true
        delete this.validation.invalid.cardName;
      }
      this.AddPaymentInfo()
    },
    validateCardCpf() {
      if (this.cardCpf === '') {
        this.validation.invalid.cardCpf = 'Por favor, insira um CPF do titular.'
      } else {
        this.validation.valid.cardCpf = true
        delete this.validation.invalid.cardCpf;
      }
      this.AddPaymentInfo()
    },
    validateCVV(item) {
      this.cvv = item
      if (!this.cvv) {
        this.validation.invalid.cvv = 'Por favor, insira um cvv válido.'
      } else {
        this.validation.valid.cvv = true
        delete this.validation.invalid.cvv;
      }

      this.AddPaymentInfo()
    },
    validateCpfandboleto(params) {
      if (this.cpfandboleto.length !== 14) {
        this.validation.invalid.cpfandboleto = 'Por favor, insira um cpf válido.'
      } else {
        delete this.validation.invalid.cpfandboleto;
      }
      this.AddPaymentInfo(params)
    },
    payload() {
      return {
        cardName: this.cardName,
        cardnumber: this.cardnumber,
        cardCpf: this.cardCpf,
        cvv: this.cvv
      }
    },
    Purchase() {
      const payload = this.payload()
      if (this.paymentChoise === 'credit') {
        if (
          this.validation.valid.cardName &&
          this.validation.valid.cardnumber &&
          this.validation.valid.cardCpf &&
          this.validation.valid.cvv
        ) {
          console.log('Purchase', payload)
        } else {
          console.log('PurchaseFail', payload)
        }
      } else {
        if (this.cpfandboleto) {
          console.log('Purchase cpf:', this.cpfandboleto)
        } else {
          console.log('PurchaseFail', this.cpfandboleto)
        }
      }
    },
    buyNow() {
      this.$emit("checkPayment", true)
      this.Purchase()
    },
    AddPaymentInfo(paymentChoise) {
      if (paymentChoise !== 'credit' && this.cpfandboleto) {
        console.log('AddPaymentInfo', this.paymentChoise, this.cpfandboleto)
      } else {
        if (
          this.validation.valid.cardName &&
          this.validation.valid.cardnumber &&
          this.validation.valid.cardCpf &&
          this.validation.valid.cvv
        ) {
          const payload = this.payload()
          console.log('AddPaymentInfo', payload)
        }
      }
    }
  },
  watch: {
    cardnumber (val) {
      if (val === undefined) {
        return null;
      }
      const type = creditCardType(val)
      this.flag = type[0]
    },
    cpfandboleto() {
      if (this.cpfandboleto.length !== 14) {
        this.validation.invalid.cpfandboleto = 'Por favor, insira um cpf válido.'
      } else {
        delete this.validation.invalid.cpfandboleto;
      }
    },
    cardCpf() {
      if (this.cardCpf.length !== 14) {
        this.validation.invalid.cardCpf = 'Por favor, insira um CPF do titular.'
      } else {
        this.validation.valid.cardCpf = true
        delete this.validation.invalid.cardCpf;
      }
      this.AddPaymentInfo()
    }
  }
}
</script>
