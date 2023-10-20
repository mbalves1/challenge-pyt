<template>
  <div>
    <div class="text-lg mt-8 mb-6 font-bold text-left">{{ title }}</div>
    <div class="grid grid-cols-3 grid-rows-1 gap-3">
      <div v-for="(card, cx) in cards" :key="cx">
        <div class="border-2 border-secondary rounded-xl flex flex-col items-center p-6" style="height:180px">
          <component :is="card.icon"></component>
          <div class="text-xs pt-3">{{ card.subtitle }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import IconCalendar from '@/components/icons/iconCalendar.vue'
import IconClock from '@/components/icons/iconClock.vue'
import IconEmail from '@/components/icons/iconEmail.vue'

export default {
  components: {
    IconCalendar,
    IconClock,
    IconEmail,
  },
  data() {
    return {
      title: 'Atenção:',
      cards: [
        { icon: 'IconClock', subtitle: 'Boletos levam até 3 dias úteis para serem compensados e então terem os produtos liberados' },
        { icon: 'IconEmail', subtitle: 'Depois do pagamento, fique atento ao seu e-mail para receber os dados de acesso ao produto (verifique também a caixa de SPAM)' },
        { icon: 'IconCalendar', subtitle: 'A cada renovação da assinatura enviaremos um código PIX. Assim, você fica sempre em dia sem se preocupar.' }
      ]
    }
  }
}
</script>