<template>
  <svg :style="{ display: 'none' }">
    <A/>
    <B/>
    <C/>
    <D/>
    <E/>
    <F/>
    <I/>
    <M/>
    <P/>
    <S/>
    <T/>
    <V/>
    <W/>
    <Z/>
  </svg>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import A from './Icons/A.vue'
import B from './Icons/B.vue'
import C from './Icons/C.vue'
import D from './Icons/D.vue'
import E from './Icons/E.vue'
import F from './Icons/F.vue'
import I from './Icons/I.vue'
import M from './Icons/M.vue'
import P from './Icons/P.vue'
import S from './Icons/S.vue'
import T from './Icons/T.vue'
import V from './Icons/V.vue'
import W from './Icons/W.vue'
import Z from './Icons/Z.vue'

export default defineComponent({
  name: 'IconSprite',
  components: {
    A,
    B,
    C,
    D,
    E,
    F,
    I,
    M,
    P,
    S,
    T,
    V,
    W,
    Z
  }
})
</script>
