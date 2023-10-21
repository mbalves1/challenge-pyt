<template>
  <div class="border-2 border-secondary rounded p-6">
    <div class="row">
      <div class="col">
        <form autocomplete="off" id="Form">
          <div class="form-row">
            <div class="col-md-4 mb-3 flex flex-col justify-left">
              <PTextField
                label="Nome completo"
                placeholder="Digite seu nome completo"
                @inputvalue="validateName"
                :hasError="validation.invalid.firstName"
              ></PTextField>

              <PErrorMessage :validate="validation.invalid.firstName"></PErrorMessage>

            </div>

            <div class="col-md-4 mb-3 flex flex-col justify-left">
              <PTextField
                label="Email"
                placeholder="Digite seu email"
                @inputvalue="validateEmail"
                :hasError="validation.invalid.email"
              ></PTextField>

              <PErrorMessage :validate="validation.invalid.email"></PErrorMessage>

            </div>

            <div class="flex grid grid-cols-2 gap-8 w-full  mt-4">
              <div class="col-6 flex flex-col">
                <label class="mb-1 text-left text-sm font-bold" for="tel">Telefone</label>
                <input
                  type="text"
                  placeholder="(00) x0000-0000"
                  class="outline-orange border-2 rounded p-2 bg-grey"
                  :class="validation.invalid.phone ? 'border-red' : 'border-secondary'"
                  @change="validatePhone()"
                  v-model="phone"
                  @input="phone = formatarPhone(phone)"
                  >

                  <PErrorMessage :validate="validation.invalid.phone"></PErrorMessage>

              </div>
              <div class="col-6 flex flex-col">
                <label class="mb-1 text-left text-sm font-bold" for="tel">CEP</label>
                <input
                  type="text"
                  placeholder="Digite seu CEP"
                  class="outline-orange border-2 rounded p-2 bg-grey"
                  :class="validation.invalid.cep ? 'border-red' : 'border-secondary'"
                  v-model="cep"
                  @change="validateCep()"
                  @input="cep = formatarCep(cep)"
                >

                <PErrorMessage :validate="validation.invalid.cep"></PErrorMessage>

              </div>
            </div>

            <div class="col-md-4 mb-3 mt-4 flex flex-col justify-left">
              <label for="endereco" class="mb-1 text-left text-sm font-bold font-bold">Endereco</label>
              <input
                id="endereco"
                placeholder="Digite seu endereco"
                class="outline-orange border-2 rounded p-2 bg-grey"
                :class="validation.invalid.endereco ? 'border-red' : 'border-secondary'"
                v-on:focus="clearValidation('endereco')"
                v-model="endereco"
                :disabled="disabled"
                @change="validateEndereco()"
              >

              <PErrorMessage :validate="validation.invalid.endereco"></PErrorMessage>

            </div>

            <div class="flex grid grid-cols-2 gap-8 w-full mt-4">
              <div class="col-6 flex flex-col">
                <label class="mb-1 text-left text-sm font-bold" for="tel">Numero</label><div>
                  <div class="border-2 border-secondary rounded flex items-center h-11">
                    <input type="number" placeholder="Número" class="w-10 sm:w-40 p-2 bg-grey text-sm focus:outline-none outline-orange">
                    <input type="checkbox" class="w-4 h-4 text-orange bg-orange border border-orange " v-model="notNumber">
                    <span class="text-xs ml-2">Sem número</span>
                  </div>
                </div>
              </div>
              <div class="col-6 flex flex-col">
                <label class="mb-1 text-left text-sm font-bold" for="tel">Complemento</label>
                <input type="text" placeholder="Digite seu complemento" class="outline-orange border-2 border-secondary rounded p-2 bg-grey">
              </div>
            </div>

            <div class="col-md-4 mb-3 mt-4 flex flex-col justify-left">
              <label for="bairro" class="mb-1 text-left text-sm font-bold">Bairro</label>
              <input
                id="bairro"
                placeholder="Digite seu bairro"
                class="outline-orange border-2 rounded p-2 bg-grey"
                :class="validation.invalid.bairro ? 'border-red' : 'border-secondary'"
                @focus="clearValidation('bairro')"
                v-model="bairro"
                :disabled="disabled"
                @change="validateBairro()"
              >

              <PErrorMessage :validate="validation.invalid.bairro"></PErrorMessage>

            </div>

            <div class="flex grid grid-cols-2 gap-8 w-full mt-4">
              <div class="col-6 flex flex-col">
                <label class="mb-1 text-left text-sm font-bold" for="tel">Cidade</label>
                <input
                  type="text"
                  placeholder="Digite sua cidade"
                  class="border-2 rounded p-2 bg-grey outline-orange" 
                  :class="validation.invalid.cidade ? 'border-red' : 'border-secondary'"
                  :disabled="disabled"
                  @change="validateCidade()"
                  v-model="cidade">

                <PErrorMessage :validate="validation.invalid.cidade"></PErrorMessage>

              </div>
              <div class="col-6 flex flex-col">
                <label class="mb-1 text-left text-sm font-bold" for="tel">Estado</label>
                  <select
                    v-model="uf"
                    :disabled="disabled"
                    class="border-2 border-secondary rounded p-2 bg-grey outline-orange"
                    placeholder="Estado"    
                    >
                    <option v-for="(u, ux) in ufs" :key="ux">
                      {{ u }}
                    </option>
                  </select>
              </div>
            </div>
          </div>
        </form>
        </div>
      </div>
  </div>
</template>
<script>
import store from '../store';
import PErrorMessage from './shared/PErrorMessage.vue';
import PTextField from './shared/PTextField.vue';

export default {
  components: { PTextField, PErrorMessage },
  data: () => ({
    firstName: '',
    email: '',
    cep: '',
    endereco: '',
    bairro: '',
    cidade: '',
    uf: '',
    phone: '',
    notNumber: false,
    disabled: false,
    ufs: [ "AC", "AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO",],
    validation: {
      invalid: {},
      valid: {},
    }
  }),
  methods: {
    async getCep() {
      if (!this.cep) {
        return
      }
      const data = await store.dispatch('getCep', this.cep);
      const { logradouro, bairro, localidade, uf } = data
      this.endereco = logradouro
      this.bairro = bairro
      this.cidade = localidade
      this.uf = uf

      if (data) {
        this.disabled = true
      }
    },
    validateName(item) {
      this.firstName = item
      if (!item) {
        this.validation.invalid.firstName = 'Por favor, insira seu nome.';
      } else {
        delete this.validation.invalid.firstName;
      }
      this.$forceUpdate();
    },
    validateEmail(item) {
      this.email = item
      if (!this.email) {
        this.validation.invalid.email = 'Por favor, insira seu email.';
      } else if (!/^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$)/.test(this.email)) {
        this.validation.invalid.email = 'Email inválido.';
      } else {
        delete this.validation.invalid.email;
      }
      this.$forceUpdate();
    },
    validateCep() {
      if (!this.cep) {
        this.validation.invalid.cep = 'Por favor, insira um cep válido!.';
      } else if (!/^[0-9]{5}-[0-9]{3}$/.test(this.cep)) {
        this.validation.invalid.cep = 'CEP inválido.';
      } else {
        delete this.validation.invalid.cep;
        this.getCep()
      }
      this.$forceUpdate();
    },
    validatePhone() {
      if (!this.phone) {
        this.validation.invalid.phone = 'Por favor, insira um telefone válido!.';
      } else {
        delete this.validation.invalid.phone;
      }
      if (this.phone.length !== 15) {
        this.validation.invalid.phone = 'Por favor, insira um telefone válido!.';
      } 
      this.$forceUpdate();
    },
    validateCidade() {
      if (!this.cidade) {
        this.validation.invalid.cidade = 'Por favor, insira uma cidade!.';
      } else {
        delete this.validation.invalid.cidade;
      }
      this.$forceUpdate();
    },
    validateBairro() {
      if (!this.bairro) {
        this.validation.invalid.bairro = 'Por favor, insira uma bairro!.';
      } else {
        delete this.validation.invalid.bairro;
      }
      this.$forceUpdate();
    },
    validateEndereco(item) {
      this.endereco = item
      if (!this.endereco) {
        this.validation.invalid.endereco = 'Por favor, insira uma enderço!.';
      } else {
        delete this.validation.invalid.endereco;
      }
      this.$forceUpdate();
    },
    formatarCep(cep) {
      cep = cep.replace(/\D/g, '');

      if (cep.length > 5) {
        cep = cep.substring(0, 5) + '-' + cep.substring(5);
      }

      return cep;
    },
    formatarPhone(phone) {
      phone = phone.replace(/\D/g, '');
      if (phone.length === 11) {
        phone = `(${phone.substring(0, 2)}) ${phone.substring(2, 7)}-${phone.substring(7)}`;
      } else if (phone.length === 10) {
        phone = phone.substring(0, 2) + '-' + phone.substring(2);
      }

      return phone;
    },
    clearValidation: function(field) {
      this.validation.valid[field] = '';
      this.validation.invalid[field] = '';
      this.$forceUpdate();
    }
  },
  watch: {
    cep(val) {
      if (!val) this.disabled = false
    },
    cidade(val) {
      if (!val) this.disabled = false
    }
  }
}
</script>
