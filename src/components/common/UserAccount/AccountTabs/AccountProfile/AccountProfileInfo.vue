<template>
  <div class="accountTabs__tab">
    <div class="accountTabs__section">
      <h3 class="accountTabs__sectionTitle">Персональная информация</h3>

      <div>
        <div class="accountTabs__row">
          <span class="userAccount_textSecondary">ФИО</span>
          <p class="userAccount_textCommon">
            {{ getUserInfo.surname }} {{ getUserInfo.name }} {{ getUserInfo.patronymic || '' }}
          </p>
        </div>

        <div class="accountTabs__row">
          <span class="userAccount_textSecondary">Пол</span>
          <p class="userAccount_textCommon">{{ +getUserInfo.sex === 0 ? 'Мужской' : 'Женский' }}</p>
        </div>

        <div class="accountTabs__row">
          <span class="userAccount_textSecondary">Дата рождения</span>
          <p class="userAccount_textCommon">{{ getUserInfo.birthday }}</p>
        </div>
      </div>

    </div>

    <div class="accountTabs__section">
      <h3 class="accountTabs__sectionTitle">Документы</h3>

      <div>
        <div class="accountTabs__row">
          <span class="userAccount_textSecondary">{{ $utils.getDocType(getUserInfo.document) }}</span>
          <p class="userAccount_textCommon">{{ getUserInfo.documentNum }}</p>
          <Button
            kind="Link"
            className="accountProfile__documentsScansBtn"
          >
            Сканы документов
          </Button>
        </div>

      </div>
    </div>

    <div class="accountTabs__bottomActions">
      <Button
        kind="Primary"
        :withIcon="true"
        className="accountTabs__bottomActionBtn"
        @click="switchToModal(EModalsNames.ProfileEditModal)"
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

<script lang='ts'>
import { defineComponent } from 'vue'
import Button from '@ui/Button/Button.vue'
import Icon from '@ui/Icon/Icon.vue'
import { mapGetters } from 'vuex'
import { EModalsNames } from '@/models/modals'

export default defineComponent({
  name: 'AccountProfileInfo',
  components: { Icon, Button },
  computed: {
    ...mapGetters([
      'getUserInfo'
    ])
  },
  methods: {
    switchToModal(modalName: EModalsNames): void {
      this.$store.commit('mutOpenedModalName', modalName)
    },
  }
})
</script>

<style scoped lang='scss'>
@import '../../UserAccount';
@import '../AccountTabs';
@import 'AccountProfile';
</style>
