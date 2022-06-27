<template>
  <div class="footer">
      <div class="footerUpper">
        <div class="footerContainer">
          <div class="footerUpper__phone">
            <a class="footerUpper__phone_number" href="tel:+78003334127">
              <Icon class="footerUpper__phone_icon" :width="24" :height="24" :name="EIconNames.Phone"/>8 (800) 250-69-69
            </a>
            <span class="footerUpper__phone_description">Звонок по России бесплатный</span>
          </div>
          <div class="footerUpper__mail">
            <a class="footerUpper__mail_text" href="mailto:office@vityaz-aero.ru">
              <Icon class="footerUpper__mail_icon" :width="24" :height="24" :name="EIconNames.Mail"/>office@vityaz-aero.ru
            </a>
          </div>
          <div class="footerUpper__apps">
            <a target="_blank" href="https://apps.apple.com/ru/app/%D0%B2%D0%B8%D1%82%D1%8F%D0%B7%D1%8C-%D0%B0%D1%8D%D1%80%D0%BE/id1525758994"><Icon class="footerUpper__apps_apple" :width="178" :height="52" :name="EIconNames.AppApple"/></a>
            <a target="_blank" href="https://play.google.com/store/apps/details?id=com.vityaz.aero"><Icon class="footerUpper__apps_google" :width="178" :height="52" :name="EIconNames.AppGoogle"/></a>
          </div>
        </div>
      </div>
      <div class="footerLower">
        <div class="footerContainer">
          <span>© 2021 АК «ВИТЯЗЬ - АЭРО»</span>
          <a class="footerLower__privacyPolicy" href="./documents/vityaz-aero_policy.pdf" target="_blank">Политика конфиденциальности</a>
          <div class="footerLower__cards">
            <div>
              <Icon class="footerLower__cards_visa" :width="48" :height="32" :name="EIconNames.CardVisa"/>
            </div>
            <div>
              <Icon class="footerLower__cards_master" :width="48" :height="32" :name="EIconNames.CardMaster"/>
            </div>
            <div>
              <Icon class="footerLower__cards_mir" :width="48" :height="32" :name="EIconNames.CardMir"/>
            </div>
          </div>
          <div class="footerLower__socials">
            <!-- <a class="footerLower__socials_instWrap" href="https://www.instagram.com/vityaz.aero/">
              <img class="footerLower__socials_inst" src="@/assets/img/footer/insta.png">
            </a> -->
            <a class="footerLower__socials_wrap" href="https://t.me/vityaz_aero">
              <img class="footerLower__social_icon" src="@/assets/img/footer/Telegram_Compact_Logo.svg">
            </a>
            <a class="footerLower__socials_wrap" href="https://vk.com/vityaz.aero">
              <img class="footerLower__social_icon" src="@/assets/img/footer/VK_Compact_Logo.svg">
            </a>
          </div>
          <span class="footerLower__nutnet">Сделано в <a class="footerLower__nutnet_link" href="https://nutnet.ru/">Nutnet</a>, 2022</span>
        </div>
      </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import Icon from '@ui/Icon/Icon.vue'

export default defineComponent({
  name: 'Footer',
  components: {
    Icon,
  }
})

</script>

<style lang='scss'>
  @import 'Footer';
</style>
