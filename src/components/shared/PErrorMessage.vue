<template>
  <div>
    <div class="text-red text-xs text-right" v-if="validate">
      {{ validate }}
    </div>
  </div>
</template>
<script>
export default {
  props: {
    validate: {
      type: [String, Object],
      default: () => {}
    }
  }
}
</script>