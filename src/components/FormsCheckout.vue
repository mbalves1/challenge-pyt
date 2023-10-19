<template>
  <div class="border rounded p-6">
    <div class="row">
      <div class="col">
        <form v-on:submit.prevent="validate" autocomplete="off" id="Form">
          <div class="form-row">
            <div class="col-md-4 mb-3 flex flex-col justify-left">
              <label for="firstName" class="mb-1 text-left text-sm">Nome completo</label>
              <input
                id="firstName"
                placeholder="Digite o nome completo"
                class="border border-gray-50 rounded p-2 bg-grey outline-orange"
                autocomplete="false"
                
              
                v-model="firstName"
              />

              <div class="text-red text-xs text-right" v-if="validation.valid.firstName">{{ validation.valid.firstName }}</div>

              <div class="text-red text-xs text-right" v-if="validation.invalid.firstName">{{ validation.invalid.firstName }}</div>

            </div>

            <div class="col-md-4 mb-3 mt-4 flex flex-col justify-left">
              <label for="email" class="mb-1 mb-1 text-left text-sm">E-mail</label>
              <input
                id="email"
                placeholder="Digite seu email"
                class="border rounded p-2 bg-grey"
                :class="{ 'is-valid': validation.valid.email, 'is-invalid': validation.invalid.email }"
                v-on:focus="clearValidation('email')"
                v-model="email"
              />
              <div
                class="valid-feedback text-red text-xs text-right"
                v-if="validation.valid.userName"
              >{{ validation.valid.userName }}</div>

              <div
                class="invalid-feedback text-red text-xs text-right"
                v-if="validation.invalid.userName">
                {{ validation.invalid.userName }}
              </div>
            </div>

            <div class="flex grid grid-cols-2 gap-4 w-full  mt-4">
              <div class="col-6 flex flex-col">
                <label class="mb-1 text-left text-sm" for="tel">Telefone</label>
                <input type="text" placeholder="(00) x0000-0000" class="border rounded p-2 bg-grey">
              </div>
              <div class="col-6 flex flex-col">
                <label class="mb-1 text-left text-sm" for="tel">CEP</label>
                <input type="text" placeholder="Digite seu CEP" class="border rounded p-2 bg-grey" v-model="cep">

                <div class="text-red text-xs text-right" v-if="validation.valid.cep">{{ validation.valid.cep }}</div>

                <div class="text-red text-xs text-right" v-if="validation.invalid.cep">{{ validation.invalid.cep }}</div>
              </div>
            </div>

            <div class="col-md-4 mb-3 mt-4 flex flex-col justify-left">
              <label for="endereco" class="mb-1 text-left text-sm">Endereco</label>
              <input
                id="endereco"
                placeholder="Digite seu endereco"
                class="border rounded p-2 bg-grey"
                :class="{ 'is-valid': validation.valid.endereco, 'is-invalid': validation.invalid.endereco }"
                v-on:focus="clearValidation('endereco')"
                v-model="endereco"
              />
            </div>

            <div class="flex grid grid-cols-2 gap-4 w-full mt-4">
              <div class="col-6 flex flex-col">
                <label class="mb-1 text-left text-sm" for="tel">Numero</label><div>
                  <div class="border rounded flex items-center h-11">
                    <input type="text" placeholder="Número" class="w-10 sm:w-40 p-2 bg-grey text-sm focus:outline-none">
                    <input type="checkbox" class="text-sm text-grey">Sem número
                  </div>
                </div>
              </div>
              <div class="col-6 flex flex-col">
                <label class="mb-1 text-left text-sm" for="tel">Complemento</label>
                <input type="text" placeholder="Digite seu complemento" class="border rounded p-2 bg-grey">
              </div>
            </div>

            <div class="col-md-4 mb-3 mt-4 flex flex-col justify-left">
              <label for="bairro" class="mb-1 text-left text-sm">Bairro</label>
              <input
                id="bairro"
                placeholder="Digite seu bairro"
                class="border rounded p-2 bg-grey"
                :class="{ 'is-valid': validation.valid.bairro, 'is-invalid': validation.invalid.bairro }"
                v-on:focus="clearValidation('bairro')"
                v-model="bairro"
              />
            </div>

            <div class="flex grid grid-cols-2 gap-4 w-full mt-4">
              <div class="col-6 flex flex-col">
                <label class="mb-1 text-left text-sm" for="tel">Cidade</label>
                <input type="text" placeholder="Digite sua cidade" class="border rounded p-2 bg-grey" v-model="cidade">
              </div>
              <div class="col-6 flex flex-col">
                <label class="mb-1 text-left text-sm" for="tel">Estado</label>
                <input type="text" placeholder="Username" class="border rounded p-2 bg-grey" v-model="uf">
              </div>
            </div>

            <div class="col-sm-12">
              <button class="btn btn-primary" type="submit">Submit form</button>
            </div>
          </div>
        </form>
        </div>
      </div>
  </div>
</template>
<script>
import store from '../store';

export default {
  data: () => ({
    firstName: '', // default values
    lastName: '',
    email: '',
    cep: '',
    endereco: '',
    bairro: '',
    cidade: '',
    uf: '',
    validation: {
      invalid: {
//        firstName: 'First name NOT OK!',
      },
      valid: {
//        firstName: 'First name OK!',
      },
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
      console.log(data);
    },
    validate: function () {
      if (!this.cep) {
        this.validation.invalid.cep = 'Por favor, insira um cep válido!.';
      }
      if (!this.firstName) {
        this.validation.invalid.firstName = 'Please type your First Name.';
      } else if (this.firstName.length < 2) {
        this.validation.invalid.firstName = 'First Name should have min. 2 characters.';
      } else if (this.firstName.match(/[^a-z]/i)) {
        this.validation.invalid.firstName = 'First Name should contains only latin letters (a-z).';
      } else {
        this.validation.valid.firstName = 'First Name is OK.';
      }
      
      if (!this.lastName) {
        this.validation.invalid.lastName = 'Please type your Last Name.';
      } else if (this.lastName.length < 2) {
        this.validation.invalid.lastName = 'Last Name should have min. 2 characters.';
      } else if (this.lastName.match(/[^a-z]/i)) {
        this.validation.invalid.lastName = 'Last Name should contains only latin letters (a-z).';
      } else {
        this.validation.valid.lastName = 'Last Name is fine.';
      }
      
      if (!this.email) {
        this.validation.invalid.email = 'Por favor, insira seu email.';
      } else if (this.email.length < 5) {
        this.validation.invalid.email = 'email deve ter pelo menos 5 characters.';
      } else if (this.email.match(/[^a-z]/i)) {
        this.validation.invalid.email = 'email should contains only latin letters, numbers and _ (a-z, 0-9, _).';
      } else {
        this.validation.valid.email = 'Email is OK.';
      }
      
      // force update because deep object change
      this.getCep()
      this.$forceUpdate();
    },
    clearValidation: function(field) {
      this.validation.valid[field] = '';
      this.validation.invalid[field] = '';
      this.$forceUpdate();
    }
  },
}
</script>