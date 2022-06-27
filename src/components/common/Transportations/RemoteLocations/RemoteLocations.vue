<template>
  <section class="remoteLocations">
    <Container>
      <div class="remoteLocations__content">
        <div class="remoteLocations__video">
          <img src="@/assets/img/transportations/remoteLocationsPreview2.jpg" alt="Камчатка с воздуха">
        </div>
        <div class="remoteLocations__info">
          <div class="remoteLocations__title">
            <h2 class="h2">Полеты в отдаленные населенные пункты Камчатки</h2>
          </div>
          <div class="remoteLocations__description">
            <p>Большинство населённых пунктов Камчатского края находятся в труднодоступных местах, добраться до которых возможно только на вертолете.</p>
            <router-link class="remoteLocations__btn" :to="{name:'FlightRegistration'}">Записаться на рейс</router-link >
          </div>
        </div>
      </div>
    </Container>
  </section>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import Container from '@shared/Container/Container.vue'

export default defineComponent({
  components: { Container },
  name: 'RemoteLocations',
})
</script>

<style scoped lang='scss'>
@import 'RemoteLocations';
</style>
