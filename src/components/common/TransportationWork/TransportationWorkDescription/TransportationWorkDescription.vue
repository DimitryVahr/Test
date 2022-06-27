<template>
  <Container>
    <div class='work'>
      <h2 class="h2_large">Перевозим <a class="linkAnchor" href="#title1">людей</a> и&nbsp;доставляем любые <a class="linkAnchor" href="#title2">грузы</a></h2>
      <div class="workInfo workInfo--end">
        <div class="workInfo__separator">
        </div>
        <div class="workInfo__text">
          <div class="workInfo__textItem">
            <span class="workInfo__textTitle workInfo__textTitle--first ">Работаем на суше и на море</span>
            <p>Летаем по&nbsp;территории Камчатского края и&nbsp;в&nbsp;акваторию Охотского и&nbsp;Берингова морей на&nbsp;морские суда.</p>
          </div>
          <div class="workInfo__textItem">
            <span class="workInfo__textTitle">Летаем в&nbsp;труднодоступные места</span>
            <p>Завозим и&nbsp;вывозим людей и&nbsp;грузы из&nbsp;труднодоступных районов полуострова: рек, озер, побережья морей и&nbsp;Тихого океана.</p>
          </div>
          <Button  @click="openHelicopterOrderModal" class="workInfo__button" kind="Primary">
            Заказать вертолет
          </Button>
        </div>

        <div class="workInfo__text">
          <div class="workInfo__textItem">
            <span class="workInfo__textTitle">Любой маршрут по&nbsp;вашему желанию</span>
            <p>Кроме этого, по&nbsp;вашей просьбе, предусмотрим несколько стоянок или заброску с&nbsp;ожиданием в&nbsp;другом месте.</p>
          </div>
          <div class="workInfo__textItem">
            <span class="workInfo__textTitle">Аккуратно разгружаем</span>
            <p>В&nbsp;зависимости от&nbsp;груза разгружаем вертолёт одним из&nbsp;трех способов: после посадки, в&nbsp;полёте методом сброса или в&nbsp;режиме висения вертолёта.</p>
          </div>
        </div>
      </div>
    </div>
  </Container>
  <div class="work work__img work__img--mobile">
    <img src="@/assets/img/airWork/imgSeparator/separator.jpg" alt="mountain">
  </div>
  <Container>
    <div class="work">
      <TransportationWorkTabs/>
    </div>
  </Container>
  <div class="work work__img work__img--desktop">
    <img src="@/assets/img/airWork/imgSeparator/separator.jpg" alt="mountain">
  </div>
  <Container class="container--full">
    <div id="title1" class="work">
      <h2 class="h2_large">Индивидуальные перевозки: туристические и&nbsp;служебные</h2>
      <div class="workInfo">
          <div class="workInfo__imgLargeLeft">
            <img src="@/assets/img/airWork/imgLarge/large.jpg" alt="mountain">
          </div>
        <div class="workInfo__text">
          <h3 class="h3_large workInfo__title">Любой маршрут<br> по&nbsp;вашему желанию</h3>
          <p>Долина гейзеров и&nbsp;Курильское озеро, горячие источники, Ключевская группа вулканов, Толбачик, реки и&nbsp;озера, объекты инфраструктуры и&nbsp;т.&nbsp;п<br>
          <br>
            Перевезем до&nbsp;26&nbsp;человек вместе с&nbsp;туристическим снаряженим или оборудованием для работы, с&nbsp;любым количеством остановок. Заберем и&nbsp;высадим там, где потребуется.
          </p>
          <Button  @click="openHelicopterOrderModal" class="workInfo__button" kind="Primary">
            Заказать вертолет
          </Button>
        </div>
      </div>
      <div class="workInfoUnder">
        <div class="workInfoUnder__item">
          <img class="workInfoUnder__itemImg" src="@/assets/img/airWork/img/img1.jpg" alt="helicopter">
          <span class="workInfoUnder__itemText">Для больших групп подойдут пассажирские комплектации <span class="heliText">Ми-8П</span>  или <span class="heliText">МИ-8МТВ-1</span> </span>
        </div>
        <div class="workInfoUnder__item workInfoUnder__item--img2">
          <img class="workInfoUnder__itemImg" src="@/assets/img/airWork/img/img2.jpg" alt="helicopter-salon">
          <span class="workInfoUnder__itemText">Для комфортных деловых поездок рекомендуем вертолёт бизнес-<br>класса <span class="heliText"> Ми-8МТВ VIP</span></span>
        </div>
        <div class="workInfoUnder__item">
          <div class="workInfoUnder__itemLinks">
            <h3 class="h3 workInfoUnder__itemLinksTitle" >Популярные варианты перевозок</h3 >
            <a class="workInfoUnder__itemLink" href="https://vityaz.travel/">VIP-туры и Хелиски <Icon class="workInfoUnder__itemLinkIcon" :width="24" :height="24" :name="EIconNames.ArrowUpRight"/> </a>
            <a class="workInfoUnder__itemLink" href="https://xn--80ahmhqwmf0b.xn--p1ai/">VIP-туры для рыбаков и охотников <Icon class="workInfoUnder__itemLinkIcon" :width="24" :height="24" :name="EIconNames.ArrowUpRight"/></a>
            <a class="workInfoUnder__itemLink" href="https://saint-timon.com/">Туристические экскурсии <Icon class="workInfoUnder__itemLinkIcon" :width="24" :height="24" :name="EIconNames.ArrowUpRight"/></a>
            <a class="workInfoUnder__itemLink" href="http://localhost:8080/#/vip">VIP-перевозки </a>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  </Container>
  <div class="work work__img work__separator">
      <img src="@/assets/img/airWork/imgSeparator/separator2.jpg" alt="mountains">
  </div>
  <Container>
    <div id="title2" class="work">
      <h2 class="h2_large ">Перевозка грузов и&nbsp;работы с&nbsp;внешней подвеской</h2>
      <div class="workInfo__imgLargeRight workInfo__imgLargeRight--mobile">
        <img src="@/assets/img/airWork/imgLarge/large2.jpg" alt="snowmobile">
      </div>
      <div class="workInfo">
        <div class="workInfo__text">
          <h3 class="h3_large workInfo__title">Перевозка грузов</h3>
          <p>Перевозим любые грузы, в&nbsp;том числе опасные и&nbsp;негабаритные. Груз перевозится внутри фюзеляжа и&nbsp;с&nbsp;использованием внешней подвески.<br><br>
            Внешняя подвеска используется, если габариты груза не&nbsp;позволяют разместить его внутри фюзеляжа или если невозможна посадка в&nbsp;месте погрузки или разгрузки.</p>
            <Button  @click="openHelicopterOrderModal" class="workInfo__button" kind="Primary">
            Заказать вертолет
          </Button>
        </div>
        <div class="workInfo__imgLargeRight workInfo__imgLargeRight--desktop">
          <img src="@/assets/img/airWork/imgLarge/large2.jpg" alt="helicopter">
        </div>
      </div>
      <div class="workInfoUnder">
        <div class="workInfoUnder__itemWrap">
          <div class="workInfoUnder__item workInfoUnder__item--img3">
            <img class="workInfoUnder__itemImg" src="@/assets/img/airWork/img/img3.jpg" alt="helicopter">
            <span class="workInfoUnder__itemText">Для транспортировки грузов обычно достаточно <span class="heliText">Ми-8Т</span></span>
          </div>
          <div class="workInfoUnder__item workInfoUnder__item--img4 workInfoUnder__item--desktop">
            <img class="workInfoUnder__itemImg" src="@/assets/img/airWork/img/img4.jpg" alt="helicopter">
            <span class="workInfoUnder__itemText">На более сложные задачи отправляем&nbsp;<span class="heliText">Ми-8МТВ-1</span></span>
          </div>
        </div>
        <div class="workInfoUnder__item">
          <div class="workInfo__text workInfo__text--cargo">
            <h3 class="h3_large workInfo__title workInfo__title--mobile" >Авиаработы с внешней подвеской</h3 >
            <p>Выполняем авиаработы с внешней подвеской любой сложности. Внешняя подвеска используется в монтажных работах, прокладке линий связи, нефтепроводов и т.п.<br><br>Исключение погрузочно-разгрузочных работ сокращает трудозатраты и повышает мобильность.</p>
            <Button  @click="openHelicopterOrderModal" class="workInfo__button" kind="Primary">
            Заказать вертолет
            </Button>
          </div>
          <div class="workInfoUnder__item workInfoUnder__item--img4 workInfoUnder__item--mobile">
            <img class="workInfoUnder__itemImg" src="@/assets/img/airWork/img/img4.jpg" alt="helicopter">
            <span class="workInfoUnder__itemText">На более сложные задачи отправляем&nbsp;<span class="heliText">Ми-8МТВ-1</span></span>
          </div>
        </div>
      </div>
    </div>
  </Container>
  <div class=" work work__img work__img--separator">
      <img src="@/assets/img/airWork/imgSeparator/separator3.jpg" alt="mountain">
  </div>
  <Container>
    <div class="work">
      <h2 class="h2_large">Аварийно-спасательные работы и&nbsp;санитарные задания</h2>
      <div class="workInfo">
        <div class="workInfo__imgLargeLeft">
          <img src="@/assets/img/airWork/imgLarge/large3.jpg" alt="">
          <div class="workInfoUnder__item--img5 workInfoUnder__itemImg--desktop">
            <img class="workInfoUnder__itemImg" src="@/assets/img/airWork/img/img5.jpg" alt="helicopter">
            <span class="workInfoUnder__itemText">На санитарные задания обычно отправляется <span class="heliText">Ми-8П </span></span>
          </div>
        </div>
        <div class="workInfo__text">
          <h3 class="h3_large workInfo__title">Участвуем в&nbsp;спасательных операциях совместно с&nbsp;МЧС России</h3>
          <p>Выполняем аварийно-спасательные работы вместе с&nbsp;камчатскими спасателями и&nbsp;медициной катастроф: участвуем в&nbsp;тушении пожаров, поиске и&nbsp;эвакуации пострадавших из&nbsp;отдаленных районов и&nbsp;труднодоступных мест (со&nbsp;склонов вулканов, рек, морского побережья), перевозим больных по&nbsp;санитарным заданиям.<br><br>
          Благодаря использованию вертолета значительно сокращается время реагирования, особенно в&nbsp;труднодоступных местах, и&nbsp;ускоряется оказание помощи.</p>
          <Button  @click="openHelicopterOrderModal" class="workInfo__button" kind="Primary">
            Заказать вертолет
          </Button>
        </div>
        <div class="workInfoUnder__item--img5 workInfoUnder__itemImg--mobile">
            <img class="workInfoUnder__itemImg" src="@/assets/img/airWork/img/img5.jpg" alt="helicopter">
            <span class="workInfoUnder__itemText">На санитарные задания обычно отправляется <span class="heliText">Ми-8П </span></span>
        </div>
      </div>
    </div>
  </Container>
  <div class="work work__img work__img--separator work__img--last">
    <img src="@/assets/img/airWork/imgSeparator/separator4.jpg" alt="helicopter">
  </div>

  <div class="buttonWrap">
    <Button @click="openHelicopterOrderModal" class="workInfo__button workInfo__button--mobile" kind="Primary">
      Заказать вертолет
    </Button>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import Icon from '@ui/Icon/Icon.vue'
import Container from '@shared/Container/Container.vue'
import Button from '@ui/Button/Button.vue'
import TransportationWorkTabs from '@common/TransportationWork/TransportationWorkTabs/TransportationWorkTabs.vue'

export default defineComponent({
  name: 'TransportationWorkDescription',
  components: {
    Container,
    Button,
    TransportationWorkTabs,
    Icon
  },
  methods: {
    openHelicopterOrderModal(): void {
      this.$store.commit('mutOpenedModalName', this.EModalsNames.HelicopterOrderModal)
    }
  }
})
</script>

<style scoped lang='scss'>
@import 'TransportationWorkDescription';
</style>
