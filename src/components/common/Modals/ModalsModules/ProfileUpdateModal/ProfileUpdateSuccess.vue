<template>
  <div class="forms__content">
    <Icon
      :name="EIconNames.Success"
      width="48"
      height="48"
      class="forms__succes-icon"
    />
    <h2 class="forms__title notify">
      Открыт персональный бонусный счет {{ getUserInfo.bonus }}
    </h2>
    <p class="forms__common-text forms__row">
      Благодарим за&nbsp;регистрацию в&nbsp;программе лояльности.
    </p>
    <p class="forms__common-text forms__row">
      Получайте бонусные баллы за&nbsp;каждый полет и&nbsp;тратьте их&nbsp;на&nbsp;новые полеты. За&nbsp;каждый
      полет мы
      начисляем бонусные баллы в&nbsp;размере&nbsp;10% от&nbsp;стоимости билета.
    </p>

    <Button
      kind="Link"
      className="forms__link"
    >
      Подробнее о программе лояльности
    </Button>
  </div>
  <router-link :to="{ name: 'FlightRegistration' }">
    <Button
      kind="Primary"
      :isFluid="true"
      className="forms__submit-btn"
    >
      Записаться на рейс
    </Button>
  </router-link>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import Icon from '@ui/Icon/Icon.vue'
import { mapGetters } from 'vuex'
import Button from '@ui/Button/Button.vue'

export default defineComponent({
  name: 'ProfileUpdateSuccess',
  components: { Button, Icon },
  computed: {
    ...mapGetters([
      'getUserInfo'
    ])
  },
})
</script>

<style scoped lang='scss'>
@import '../Forms';
</style>
