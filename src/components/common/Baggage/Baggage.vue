<template>
  <Container>
    <HeadBanner text="Провоз багажа"/>
    <InfoBlock title="Нормы бесплатного провоза багажа" description="">
      <template v-slot:slot1>
        <div class="baggageContent">
          <p class="baggageContent__text">Согласно требованиям обеспечения безопасности, весь багаж, перевозимый пассажиром, включая багаж в&nbsp;салоне воздушного судна, должен быть предъявлен при регистрации на&nbsp;рейс.</p>
          <p class="baggageContent__text">Багаж пассажира, который авиакомпания принимает к&nbsp;перевозке под свою ответственность за&nbsp;его сохранность, маркируется багажной биркой и&nbsp;перевозится в&nbsp;багажном отсеке воздушного судна, называется регистрируемый багаж.</p>
          <div class="baggageContent__table">
            <div class="baggageContent__table_description">
              <span>Маршрут</span>
              <span>Норма</span>
            </div>
            <TableItem route="Петропавловск-Камчатский — Озерновский" weight="20 кг"/>
            <TableItem route="Петропавловск-Камчатский — Оссора — Тымлат" weight="20 кг"/>
            <TableItem route="Петропавловск-Камчатский — Эссо — Тигиль — Усть-Хайрюзово" weight="30 кг"/>
            <TableItem route="Петропавловск-Камчатский&nbsp;&mdash; Тиличики и&nbsp;по&nbsp;населенным пунктам Олюторского и&nbsp;Пенжинского районов" weight="20 кг"/>
          </div>
          <p class="baggageContent__text">Сверхнормативный, негабаритный и&nbsp;тяжеловесный багаж принимаются к&nbsp;перевозке только при наличии на&nbsp;воздушном судне свободной провозной емкости и&nbsp;при условии оплаты пассажиром провоза такого багажа.</p>
          <p class="baggageContent__text">Сверхнормативный и&nbsp;негабаритный багаж&nbsp;– габариты одного места в&nbsp;упакованном виде превышают 203 сантиметра в&nbsp;сумме трех измерений. Тяжеловесный багаж&nbsp;&mdash; вес одного места превышает 30 килограммов.</p>
        </div>
      </template>
    </InfoBlock>
    <InfoBlock title="Ручная кладь" description="">
      <template v-slot:slot1>
        <div class="baggageContent">
          <p class="baggageContent__text">Вещи, находящиеся при пассажире и&nbsp;перевозимые в&nbsp;салоне воздушного судна, вес и&nbsp;габариты которых установлены перевозчиком и&nbsp;позволяют безопасно разместить их&nbsp;в&nbsp;салоне воздушного судна, называются ручная кладь.</p>
          <div class="baggageContent__note">
            <span class="baggageContent__note_title">Обратите внимание</span>
            <div class="baggageContent__note_block">
              <div class="baggageContent__note_point"></div>
                <span>для безопасного размещения ручной клади под сиденьем впереди стоящего кресла или на багажной полке, ее&nbsp;размеры не&nbsp;должны превышать 55&nbsp;см в&nbsp;длину, 40&nbsp;см в&nbsp;ширину, 20&nbsp;см в&nbsp;высоту;</span>
            </div>
            <div class="baggageContent__note_block">
              <div class="baggageContent__note_point"></div>
                <span>при регистрации на&nbsp;рейс ручная кладь подлежит взвешиванию и&nbsp;маркируется биркой, в случае превышения нормы провоза ручной клади по&nbsp;весу и/или по&nbsp;размеру, ручная кладь оформляется в&nbsp;качестве регистрируемого багажа.</span>
            </div>
          </div>
        </div>
      </template>
    </InfoBlock>
    <InfoBlock title="Предметы, запрещенные к&nbsp;перевозке" description="">
      <template v-slot:slot1>
        <div class="baggageContent__itemsWrapper">
          <div class="baggageContent__itemsWrapper_block">
            <div class="baggageContent__prohibitedItem">
              <div class="baggageContent__prohibitedItem_icon"><Icon :height="64" :width="64" :name="EIconNames.BlueBgRadioactive"/></div>
              <span>Радиоактивные материалы</span>
            </div>
            <div class="baggageContent__prohibitedItem">
              <div class="baggageContent__prohibitedItem_icon"><Icon :height="64" :width="64" :name="EIconNames.BlueBgOxide"/></div>
              <span>Окисляющие вещества</span>
            </div>
            <div class="baggageContent__prohibitedItem">
              <div class="baggageContent__prohibitedItem_icon"><Icon :height="64" :width="64" :name="EIconNames.BlueBgWeapon"/></div>
              <span>Оружие, взрывчатые вещества</span>
            </div>
            <div class="baggageContent__prohibitedItem">
              <div class="baggageContent__prohibitedItem_icon"><Icon :height="64" :width="64" :name="EIconNames.BlueBgPoison"/></div>
              <span>Токсичные вещества и&nbsp;яды</span>
            </div>
          </div>
          <div class="baggageContent__itemsWrapper_block">
            <div class="baggageContent__prohibitedItem">
              <div class="baggageContent__prohibitedItem_icon"><Icon :height="64" :width="64" :name="EIconNames.BlueBgInfection"/></div>
              <span>Инфекционные вещества и&nbsp;яды</span>
            </div>
            <div class="baggageContent__prohibitedItem">
              <div class="baggageContent__prohibitedItem_icon"><Icon :height="64" :width="64" :name="EIconNames.BlueBgAerosol"/></div>
              <span>Газообразные вещества</span>
            </div>
            <div class="baggageContent__prohibitedItem">
              <div class="baggageContent__prohibitedItem_icon"><Icon :height="64" :width="64" :name="EIconNames.BlueBgFlamable"/></div>
              <span>Легковоспламеняющиеся вещества, едкие и&nbsp;коррозионные вещества.</span>
            </div>
          </div>
        </div>
      </template>
    </InfoBlock>
  </Container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Icon from '@ui/Icon/Icon.vue'
import HeadBanner from '@ui/HeadBanner/HeadBanner.vue'
import InfoBlock from '@ui/InfoBlock/InfoBlock.vue'
import Container from '@shared/Container/Container.vue'
import TableItem from '@/components/common/Baggage/TableItem/TableItem.vue'

export default defineComponent({
  name: 'Baggage',
  components: {
    HeadBanner,
    Container,
    InfoBlock,
    TableItem,
    Icon,
  }
})
</script>

<style scoped lang='scss'>
@import 'Baggage.scss';
</style>
