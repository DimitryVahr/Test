<template>
  <div class="transportationVipHeadbanner">
    <Container>
      <div class="transportationVipHeadbanner__wrapper">
        <h1 class="transportationVipHeadbanner__title h1">VIP-перевозки</h1>
        <div class="transportationVipHeadbanner__content">
          <p class="transportationVipHeadbanner__content--desktop">
            Комфортабельные перелеты на&nbsp;флагманском вертолете бизнес-класса
            Ми-8МТВ VIP
          </p>
          <Button
            class="transportationVipHeadbanner__button"
            kind="Primary"
            @click="
              $store.commit(
                'mutOpenedModalName',
                EModalsNames.HelicopterOrderModal
              )
            "
            >Заказать вертолет</Button
          >
        </div>
      </div>
    </Container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Container from '@shared/Container/Container.vue'
import Button from '@ui/Button/Button.vue'

export default defineComponent({
  name: 'TransportationVipHeadbanner',
  components: {
    Button,
    Container
  }
})
</script>

<style scoped lang="scss">
@import 'TransportationVipHeadbanner';
</style>
