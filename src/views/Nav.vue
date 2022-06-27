<template>
    <div class="nav__routes">
      <div class="nav__routes-list">
        <router-link to="/style">Style</router-link>
        <router-link to="/modals">Modals</router-link>
        <router-link to="/">Главная</router-link>
        <router-link to="/transportations">Пассажирские рейсы</router-link>
        <router-link to="/transportation-rules">Правила перевозок</router-link>
        <router-link to="/about">О компании</router-link>
        <router-link to="/contacts">Контакты</router-link>
        <router-link to="/account">Личный кабинет</router-link>
        <router-link to="/flight-registration">Записаться на рейс</router-link>
        <a href="#" id="specialButton">Версия для слабовидящих</a>
      </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Nav',
})
</script>

<style scoped lang="scss">
.nav {
  &__routes {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &__routes-list{
    a{
      margin-bottom: 10px;
      display: block;
    }
  }
}
</style>
