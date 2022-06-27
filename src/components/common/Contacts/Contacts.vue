<template>
  <Container>
    <HeadBanner text="Контакты"/>
    <div class="mainContacts">
      <p class="mainContacts__title">Информация<br> по всем вопросам</p>
      <div class="mainContacts__content">
        <div class="mainContacts__content_phone">
          <a class="mainContacts__content_phoneNumber" href="tel:+78003334127">
            <Icon class="mainContacts__content_phoneIcon" :width="24" :height="24" :name="EIconNames.Phone"/>8 (800) 250-69-69
          </a>
          <span class="mainContacts__content_phoneDescription">Звонок по России бесплатный</span>
        </div>
        <Button class="mainContacts__content_buttonPrimary" kind="Primary" @click="openSendMessageModal">Отправить сообщение</Button>
        <Button class="mainContacts__content_buttonSecondary" kind="Secondary" @click="openSendMessageModal">Отправить сообщение</Button>
      </div>
    </div>
    <InfoBlock title="Руководство" description="">
      <template v-slot:slot1>
        <div class="contactsContent">
          <div class="contactsContent__management">
            <p class="contactsContent__management_text">
                Мы&nbsp;открыты к&nbsp;диалогу со своими клиентами.<br>
                Если у&nbsp;вас возникли вопросы, замечания или предложения, связанные с&nbsp;работой авиакомпании, вы&nbsp;можете обратиться напрямую к&nbsp;генеральному директору.
            </p>
            <div class="contactsContent__management_contactWrapper">
              <div class="contactsContent__management_contact">
                <div class="contactsContent__management_contactPhoto"></div>
                <div class="contactsContent__management_contactInfo">
                  <span class="contactsContent__management_contactName">Сиротин Виктор Петрович</span>
                  <span class="contactsContent__management_contactPosition">Генеральный директор</span>
                </div>
              </div>
              <Button class="contactsContent__management_buttonSecondary" kind="Secondary" @click="openSendMessageModal(true)">Отправить сообщение</Button>
            </div>
          </div>
        </div>
      </template>
    </InfoBlock>
    <InfoBlock title="Отделы" description="">
      <template v-slot:slot1>
        <div class="contactsContent__departaments">
          <div class="contactsContent__departaments_item">
            <div class="contactsContent__departament">
              <span class="contactsContent__departament_name">Коммерческий</span>
              <PhoneItem number="+7 (984) 160-60-00" description="Матюшин Евгений Васильевич"/>
              <PhoneItem number="+7 (984) 160-60-60" description="Ерохин Николай Алексеевич"/>
              <PhoneItem number="+7 (984) 160-60-90" description="Аула Андрей Валентинович"/>
              <a class="contactsContent__departament_mail" href="mailto:kom@vityaz-aero.ru">
                <Icon class="contactsContent__departament_mailIcon" :width="24" :height="24" :name="EIconNames.Mail"/>
               kom@vityaz-aero.ru
              </a>
            </div>
          </div>
          <div class="contactsContent__departaments_item">
            <div class="contactsContent__departament">
              <span class="contactsContent__departament_name">Бухгалтерия</span>
              <PhoneItem number="+7 (415-31) 3-24-00" description=""/>
            </div>
            <div class="contactsContent__departament">
              <span class="contactsContent__departament_name">Туристический</span>
              <PhoneItem number="+7 (914) 020-00-11" description=""/>
              <a class="contactsContent__departament_mail" href="mailto:kamchatka@vityaz.travel">
                <Icon class="contactsContent__departament_mailIcon" :width="24" :height="24" :name="EIconNames.Mail"/>
                kamchatka@vityaz.travel
              </a>
            </div>
          </div>
        </div>
      </template>
    </InfoBlock>
    <InfoBlock title="Офис компании" description="">
      <template v-slot:slot1>
        <div class="contactsContent">
          <div class="contactsContent__office">
            <span class="contactsContent__office_title">Аэропорт в с. Николаевка</span>
            <span class="contactsContent__office_adress">cело Николаевка, микрорайон Энтузиастов, строение 1</span>
            <PhoneItem number="+7 (4152) 307-825" description=""/>
            <button @click="setMapOpen(true)" class="contactsContent__office_route">
              <Icon class="contactsContent__office_routeIcon" :width="24" :height="24" :name="EIconNames.MapMarker"/>Схема проезда
            </button>
            <a href="#" class="contactsContent__office_info">
              <Icon class="contactsContent__office_infoIcon" :width="22" :height="22" :name="EIconNames.Info"/>Об аэропорте
            </a>
          </div>
        </div>
      </template>
    </InfoBlock>
    <yandex-map class="contactsContent__office_map" :class="classMap" :width="22" :height="22" :coords="[53.042804, 158.309275]" zoom="10"  :settings="settings" :controls="mapControls">
       <ymapMarker v-for="mapMarker in mapMarkers" :key="mapMarker.markerId" :markerId="mapMarker.markerId" :coords="mapMarker.coords" :icon="mapMarker.icon" :color="mapMarker.color"/>
       <button  @click="setMapOpen(false)" class="contactsContent__office_mapClose"></button>
    </yandex-map>
    <InfoBlock title="Реквизиты" description="">
      <template v-slot:slot0>
        <button class="contactsContent__requisites_copy" @click="copyRequisites">
          <Icon class="contactsContent__requisites_copyIcon" :width="22" :height="22" :name="EIconNames.Copy"/><span>Скопировать реквизиты</span>
        </button>
        <button class="contactsContent__requisites_copy" @click="downloadRequisites">
          <Icon class="contactsContent__requisites_copyIcon" :width="22" :height="22" :name="EIconNames.Download"/><span>Скачать реквизиты</span>
        </button>
      </template>
      <template v-slot:slot1>
        <div class="contactsContent">
          <div class="contactsContent__requisites">
            <Requisite v-for="(item, i) in requisites" :key="item.name + i" :content="item" />
          </div>
        </div>
      </template>
    </InfoBlock>
  </Container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { yandexMap, ymapMarker } from 'vue-yandex-maps'
import {
  Document,
  Packer,
  Paragraph,
  ParagraphChild,
  TextRun
} from 'docx'
import { saveAs } from 'file-saver'
import HeadBanner from '@ui/HeadBanner/HeadBanner.vue'
import Icon from '@ui/Icon/Icon.vue'
import InfoBlock from '@ui/InfoBlock/InfoBlock.vue'
import Container from '@shared/Container/Container.vue'
import Button from '@ui/Button/Button.vue'
import PhoneItem from './PhoneItem/PhoneItem.vue'
import Requisite from './Requisite/Requisite.vue'
import { IRequisite } from './types'

interface IYmapsSettings {
  apiKey: string,
  lang: string,
  coordorder: string,
  enterprise: boolean,
  version: string
}

interface IData {
  settings: IYmapsSettings,
  requisites: IRequisite[]
  mapOpen: boolean
}

export default defineComponent({
  name: 'Contacts',
  data(): IData {
    return {
      settings: {
        apiKey: '48624aa4-a580-4eef-869a-6b822cbccb27',
        lang: 'ru_RU',
        coordorder: 'latlong',
        enterprise: false,
        version: '2.1'
      },
      requisites: [
        { name: 'Полное название', value: 'Общество с ограниченной ответственностью авиационная компания «ВИТЯЗЬ - АЭРО»' },
        { name: 'Сокращенное название', value: 'ООО АК «ВИТЯЗЬ-АЭРО»' },
        { name: 'ИНН', value: '4105034950' },
        { name: 'КПП', value: '410501001' },
        { name: 'ОГРН', value: '1094141000304' },
        { name: 'ОКПО', value: '87895586' },
        { name: 'ОКВЭД', value: '51.10.2 (перевозка воздушным пассажирским транспортом, не подчиняющимся расписанию)' },
        { name: 'Р/сч', value: '40702810415020000765 в Филиале «Центральный» Банка ВТБ (ПАО) в г. Москве' },
        { name: 'БИК', value: '044525411' },
        { name: 'К/сч', value: '30101810145250000411' },
        { name: 'Юридический адрес', value: '684032, Камчатский край, Елизовский район, c.\u00A0Николаевка, микрорайон Энтузиастов, строение 1' },
        { name: 'Почтовый адрес', value: '684032, Камчатский край, Елизовский район, c.\u00A0Николаевка, микрорайон Энтузиастов, строение 1' },
        { name: 'Телефон', value: '+7 (415-31) 3-24-00, 8 800 250 6969' },
        { name: 'Факс', value: '+7 (415-31) 3-25-70' },
      ],
      mapOpen: false
    }
  },
  components: {
    HeadBanner,
    Container,
    InfoBlock,
    Button,
    Icon,
    PhoneItem,
    Requisite,
    yandexMap,
    ymapMarker,
  },
  methods: {
    setMapOpen(toggleClass:boolean) {
      this.mapOpen = toggleClass
    },

    copyRequisites(): void {
      const formattedRequisites = this.requisites.map((item) => `${item.name}: ${item.value}`).join('\n')
      navigator.clipboard
        .writeText(formattedRequisites)
        .then(() => {
          this.$store.commit('mutAlertText', 'Реквизиты скопированы в буфер обмена')
        })
        .catch(() => {
          this.$store.commit('mutAlertText', 'Не удалось скопировать реквизиты')
        })
    },

    downloadRequisites(): void {
      const formattedRequisites: ParagraphChild[] = []
      this.requisites.forEach((item) => {
        formattedRequisites.push(new TextRun({ text: `${item.name}: `, bold: true }), new TextRun(`${item.value}\n`))
      })

      const doc = new Document({
        sections: [{
          properties: {},
          children: [
            new Paragraph({
              children: formattedRequisites,
            }),
          ],
        }],
      })

      Packer.toBlob(doc).then((blob) => {
        saveAs(blob, 'Реквизиты.docx')
      })
    },

    openSendMessageModal(toDirector: boolean): void {
      this.$store.commit('mutOpenedModalName', this.EModalsNames.SendMessageModal)
      this.$store.commit('mutIsMessageToDirector', toDirector)
    }
  },

  computed: {
    classMap(): Record<string, boolean> {
      return {
        contactsContent__office_mapMobile: this.mapOpen
      }
    },
    mapControls() {
      return Math.max(
        document.body.scrollWidth,
        document.documentElement.scrollWidth,
        document.body.offsetWidth,
        document.documentElement.offsetWidth,
        document.body.clientWidth,
        document.documentElement.clientWidth
      ) < 768 ? ['zoomControl'] : ['fullscreenControl', 'geolocationControl', 'zoomControl', 'typeSelector']
    },
    mapMarkers() {
      let markers = []
      if (Math.max(
        document.body.scrollWidth,
        document.documentElement.scrollWidth,
        document.body.offsetWidth,
        document.documentElement.offsetWidth,
        document.body.clientWidth,
        document.documentElement.clientWidth
      ) >= 768) {
        markers = [{ markerId: '1', coords: [53.042804, 158.309275], icon: { content: 'Аэропорт «ВИТЯЗЬ - АЭРО»' }, }]
      } else {
        markers = [
          { markerId: '2', coords: [53.044470, 158.325594], icon: { content: 'Памятник «Вертолет МИ-8»' } },
          { markerId: '3', coords: [53.077122, 158.344102], icon: { content: 'Круговой перекресток' } },
          { markerId: '4', coords: [53.185168, 158.388777], icon: { content: 'Автостанция г.Елизово' } },
          { markerId: '5', coords: [53.169333, 158.425356], icon: { content: 'Аэропорт «Елизово»' } },
          { markerId: '6', coords: [53.123301, 158.512349], icon: { content: 'Супермаркет «Агротек»' } },
          { markerId: '7', coords: [53.122226, 158.502081], icon: { content: 'Ресторан «Голд Хаус»' } },
          { markerId: '8', coords: [53.071602, 158.592209], icon: { content: 'Автостанция 10км' } },
          { markerId: '1', coords: [53.042804, 158.309275], icon: { content: 'Аэропорт «ВИТЯЗЬ - АЭРО»', color: 'red' }, },

        ]
      }
      return markers
    }
  }
})

</script>

<style scoped lang='scss'>
@import 'Contacts.scss';
</style>
