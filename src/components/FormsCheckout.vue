<template>
  <div class="border rounded p-6">
    <div class="row">
      <div class="col">
        <form v-on:submit.prevent="validate" autocomplete="off" id="Form">
          <div class="form-row">
            <div class="col-md-4 mb-3 flex flex-col justify-left">
              <label for="firstName" class="text-left text-sm">Nome completo</label>
              <input
                id="firstName"
                placeholder="Digite o nome completo"
                class="border rounded p-2 bg-grey"
                autocomplete="false"
                :class="{ 'is-valid': validation.valid.firstName, 'is-invalid': validation.invalid.firstName }"
                v-on:focus="clearValidation('firstName')"
                v-model="firstName"
              />

              <div class="text-red text-xs" v-if="validation.valid.firstName">{{ validation.valid.firstName }}</div>

              <div class="text-red text-xs" v-if="validation.invalid.firstName">{{ validation.invalid.firstName }}</div>

            </div>

            <div class="col-md-4 mb-3 flex flex-col justify-left">
              <label for="userName" class="text-left text-sm">Username</label>
              <input
                id="userName"
                placeholder="Username"
                class="border rounded p-2 bg-grey"
                :class="{ 'is-valid': validation.valid.userName, 'is-invalid': validation.invalid.userName }"
                v-on:focus="clearValidation('userName')"
                v-model="userName"
              />
              <div
                class="valid-feedback text-red text-xs"
                v-if="validation.valid.userName"
              >{{ validation.valid.userName }}</div>

              <div
                class="invalid-feedback text-red text-xs"
                v-if="validation.invalid.userName">
                {{ validation.invalid.userName }}
              </div>
            </div>

            <div class="flex grid grid-cols-2 gap-4 w-full">
              <div class="col-6 flex flex-col">
                <label class="text-left text-sm" for="tel">Telefone</label>
                <input type="text" placeholder="Username" class="border rounded p-2 bg-grey">
              </div>
              <div class="col-6 flex flex-col">
                <label class="text-left text-sm" for="tel">CEP</label>
                <input type="text" placeholder="Username" class="border rounded p-2 bg-grey" v-model="cep">
              </div>
            </div>

            <div class="col-md-4 mb-3 mt-2 flex flex-col justify-left">
              <label for="endereco" class="text-left text-sm">endereco</label>
              <input
                id="endereco"
                placeholder="endereco"
                class="border rounded p-2 bg-grey"
                :class="{ 'is-valid': validation.valid.endereco, 'is-invalid': validation.invalid.endereco }"
                v-on:focus="clearValidation('endereco')"
                v-model="endereco"
              />
            </div>

            <div class="flex grid grid-cols-2 gap-4 w-full">
              <div class="col-6 flex flex-col">
                <label class="text-left text-sm" for="tel">Numero</label><div>
                  <div class="border rounded flex items-center h-11">
                    <input type="text" placeholder="Username" class="w-10 sm:w-40 p-2 bg-grey text-xs focus:outline-none">
                    <input type="checkbox" class="text-sm text-grey">Sem número
                  </div>
                </div>
              </div>
              <div class="col-6 flex flex-col">
                <label class="text-left text-sm" for="tel">Complemento</label>
                <input type="text" placeholder="Username" class="border rounded p-2 bg-grey">
              </div>
            </div>

            <div class="col-md-4 mb-3 mt-2 flex flex-col justify-left">
              <label for="bairro" class="text-left text-sm">Bairro</label>
              <input
                id="bairro"
                placeholder="bairro"
                class="border rounded p-2 bg-grey"
                :class="{ 'is-valid': validation.valid.bairro, 'is-invalid': validation.invalid.bairro }"
                v-on:focus="clearValidation('bairro')"
                v-model="bairro"
              />
            </div>

            <div class="flex grid grid-cols-2 gap-4 w-full">
              <div class="col-6 flex flex-col">
                <label class="text-left text-sm" for="tel">Cidade</label>
                <input type="text" placeholder="Username" class="border rounded p-2 bg-grey" v-model="cidade">
              </div>
              <div class="col-6 flex flex-col">
                <label class="text-left text-sm" for="tel">Estado</label>
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
    userName: '',
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
      const data = await store.dispatch('getCep', this.cep);
      const { logradouro, bairro, localidade, uf } = data
      this.endereco = logradouro
      this.bairro = bairro
      this.cidade = localidade
      this.uf = uf
      console.log(data);
    },
    validate: function () {
      this.getCep()
      if (!this.cep) {
        this.validation.invalid.firstName = 'Please type your First Name.';
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
      
      if (!this.userName) {
        this.validation.invalid.userName = 'Please type your Username.';
      } else if (this.userName.length < 5) {
        this.validation.invalid.userName = 'Username should have min. 5 characters.';
      } else if (this.userName.match(/[^a-z]/i)) {
        this.validation.invalid.userName = 'Username should contains only latin letters, numbers and _ (a-z, 0-9, _).';
      } else {
        this.validation.valid.userName = 'Username is OK.';
      }
      
      // force update because deep object change
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