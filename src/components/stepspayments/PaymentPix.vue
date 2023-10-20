<template>
  <div>
    <div class="text-lg mt-8 mb-6 font-bold">{{ title }}</div>
    <div class="grid grid-cols-2 grid-rows-2 gap-3">
      <div v-for="(card, cx) in cards" :key="cx">
        <div class="border-2 border-secondary rounded-xl flex flex-col items-center p-6" style="height:180px">
          <component :is="card.icon"></component>
          <div class="font-bold my-2">{{ card.title }}</div>
          <div class="text-sm">{{ card.subtitle }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import IconCalendar from '@/components/icons/iconCalendar.vue'
import IconClock from '@/components/icons/iconClock.vue'
import IconQR from '@/components/icons/iconQr.vue'
import IconSafe from '@/components/icons/iconSafe.vue'

export default {
  components: {
    IconCalendar,
    IconClock,
    IconQR,
    IconSafe
  },
  data() {
    return {
      title: 'Libere sua compra rapidamente pagando com Pix!',
      cards: [
        { icon: 'IconClock', title: 'Rápida aprovação', subtitle: 'Pagamento em segundos, sem complicação.' },
        { icon: 'IconQR', title: 'Facilidade na finalização', subtitle: 'Basta escanear, com o aplicativo do seu banco, o QRCode que iremos gerar para sua compra.' },
        { icon: 'IconSafe', title: 'Maior segurança', subtitle: 'O Pix foi desenvolvido pelo Banco Central para facilitar suas compras e é 100% seguro.' },
        { icon: 'IconCalendar', title: 'Tranquilidade na renovação', subtitle: 'A cada renovação da assinatura enviaremos um código PIX. Assim, você fica sempre em dia sem se preocupar.' },
      ]
    }
  }
}
</script>