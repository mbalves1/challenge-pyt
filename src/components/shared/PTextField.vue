<template>
  <div class="col-md-4 mb-3 flex flex-col justify-left">

    <label class="mb-1 text-left text-sm font-bold">{{ label }}</label>
    <input
      :placeholder="placeholder"
      class="border-2 rounded p-2 bg-grey outline-orange"
      :class="
        hasError ? 'border-red' : 'border-secondary'"
      autocomplete="false"
      @blur="changeValue()"
      :disabled="disabled"
      :type="typeInput"
      @focus="InitiateCheckout"
      v-model="valueInput"
    >
  </div>
</template>
<script>

export default {
  data: () => ({
    valueInput: '',
    maskValue: '',
    cpfMask: ''
  }),
  props: {
    label: {
      type: String,
      default: 'Label'
    },
    placeholder: {
      type: String,
      default: ''
    },
    nameproperty: {
      type: String
    },
    hasError: {
      type: String
    },
    disabled: {
      type: Boolean,
      default: false
    },
    modelValue: {
      type: String
    },
    typeInput: {
      type: String,
      default: 'text'
    },
    hasBackgroundColor: {
      type: Boolean,
      default: true
    }
  },
  created() {
    this.valueInput = this.modelValue
  },
  computed: {
    bgClass() {
      return this.hasBackgroundColor ? 'bg-grey' : 'bg-white'
    }
  },
  methods: {
    changeValue() {
      this.$emit('inputvalue', this.valueInput)
      this.$emit('AddToCart', this.label)
    },
    InitiateCheckout() {
      if (this.label === 'Nome completo') {
        this.$emit('InitiateCheckout', true)
      }
      
    }
  }
}
</script>
