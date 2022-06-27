<template>
  <div class="accountTabs__tab">
    <div class="accountTabs__section">
      <h3 class="accountTabs__sectionTitle">Реквизиты</h3>

      <div>
        <div class="accountTabs__row">
          <span class="userAccount_textSecondary">Название</span>
          <p class="userAccount_textCommon">{{ getUserInfo.info?.fullTitle || '' }}</p>
        </div>

        <div class="accountTabs__row">
          <span class="userAccount_textSecondary">ОГРН</span>
          <p class="userAccount_textCommon">{{ getUserInfo.info?.ogrn || '–' }}</p>
        </div>

        <div class="accountTabs__row">
          <span class="userAccount_textSecondary">ИНН</span>
          <p class="userAccount_textCommon">{{ getUserInfo.info?.inn || '–' }}</p>
        </div>

        <div class="accountTabs__row">
          <span class="userAccount_textSecondary">КПП</span>
          <p class="userAccount_textCommon">{{ getUserInfo.info?.kpp || '–' }}</p>
        </div>

        <div class="accountTabs__row">
          <span class="userAccount_textSecondary">Наименование банка</span>
          <p class="userAccount_textCommon">{{ getUserInfo.info?.bank || '–' }}</p>
        </div>

        <div class="accountTabs__row">
          <span class="userAccount_textSecondary">БИК</span>
          <p class="userAccount_textCommon">{{ getUserInfo.info?.bic || '–' }}</p>
        </div>

        <div class="accountTabs__row">
          <span class="userAccount_textSecondary">Рассчетный счет</span>
          <p class="userAccount_textCommon">{{ getUserInfo.info?.account || '–' }}</p>
        </div>

        <div class="accountTabs__row">
          <span class="userAccount_textSecondary">Юридический адрес</span>
          <p class="userAccount_textCommon">{{ getUserInfo.info?.address || '–' }}</p>
        </div>

        <div class="accountTabs__row">
          <span class="userAccount_textSecondary">Почтовый адрес</span>
          <p class="userAccount_textCommon">{{ getUserInfo.info?.addressPost || '–' }}</p>
        </div>

      </div>
    </div>

    <div class="accountTabs__bottomActions">
      <Button
        kind="Primary"
        :withIcon="true"
        className="accountTabs__bottomActionBtn"
        @click="switchToModal(EModalsNames.OrganizationUpdateModal)"
      >
        <Icon
          :name="EIconNames.Edit"
          width="24"
          height="24"
          class="accountTabs__btnIcon"
        />
        <span>Изменить данные</span>
      </Button>

      <Button
        kind="Secondary"
        :noBorder="true"
        :withIcon="true"
        className="accountTabs__bottomActionBtn link"
        @click="switchToModal(EModalsNames.PasswordChangeModal)"
      >
        <Icon
          :name="EIconNames.Edit"
          width="24"
          height="24"
          class="accountTabs__btnIcon link"
        />
        <span>Изменить пароль</span>
      </Button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Button from '@ui/Button/Button.vue'
import Icon from '@ui/Icon/Icon.vue'
import { mapGetters } from 'vuex'
import { EModalsNames } from '@/models/modals'

export default defineComponent({
  name: 'organiztionInfo',
  components: { Icon, Button },
  computed: {
    ...mapGetters(['getUserInfo'])
  },
  methods: {
    switchToModal(modalName: EModalsNames): void {
      this.$store.commit('mutOpenedModalName', modalName)
    }
  }
})
</script>

<style scoped lang="scss">
@import 'OrganizationInfo';
@import '../../UserAccount';
@import '../AccountTabs';
@import '../AccountProfile/AccountProfile';
</style>
