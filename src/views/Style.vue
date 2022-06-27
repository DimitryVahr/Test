<template>
  <div class="home">
    <CommonLayout>
      <Container>
        <img alt="Vue logo" src="../assets/logo.png">

        <h2>Кнопки</h2>
        <Button kind="Primary"> Кнопка</Button>
        <Button kind="Primary" :isDisabled="true"> Кнопка</Button>
        <Button kind="Secondary"> Кнопка</Button>
        <Button kind="Secondary" :isDisabled="true"> Кнопка</Button>

        <h2>Инпуты</h2>
        <Input label="label"/>
        <Input errorText="Error text" label="label"/>
        <Input :disabled="true" label="label"/>
        <Input :isRound="true" label="label"/>

        <h2>Инпуты пароля</h2>
        <InputPassword passwordHint="Не менее 6 символов" label="label"/>
        <InputPassword :error="true" errorText="Error text" label="label"/>
        <InputPassword :disabled="true" label="label"/>
        <InputPassword :isRound="true" label="label"/>

        <h2>Текстареа</h2>
        <Textarea label="label"/>
        <Textarea :error="true" errorText="Error text" label="label"/>
        <Textarea :disabled="true" label="label"/>
        <Textarea :isRound="true" label="label"/>

        <h2>Селекты</h2>
        <Select :disabled="false" :items="items" label="label"/>
        <Select :disabled="true" :items="items" label="label"/>

        <h2>Датапикеры</h2>
        <Datepicker
          :isCommon="true"
          v-model:datePickerModel="datepickerModel1"
          inputLabel="Туда"
        />
        <Datepicker
          :isCommon="true"
          v-model:datePickerModel="datepickerModel2"
          inputLabel="Обратно"
        />

        <Datepicker
          :isCommon="false"
          v-model:datePickerModel="datepickerModel3"
          inputLabel="Туда"
        />
        <Datepicker
          :isCommon="false"
          v-model:datePickerModel="datepickerModel4"
          inputLabel="Обратно"
        />

        <h2>Чекбокс</h2>
        <Checkbox text="Текст чекбокса" v-model:checkboxModel="checkboxValue"/>
        <Checkbox text="Текст чекбокса" :disabled="true"/>

        <h2>Загрузка файла</h2>
        <InputFile/>

        <h2>Футер</h2>
      </Container>

    </CommonLayout>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Button from '@ui/Button/Button.vue'
import Input from '@ui/Input/Input.vue'
import Checkbox from '@ui/Checkbox/Checkbox.vue'
import InputPassword from '@ui/Input/InputPassword.vue'
import Textarea from '@ui/Textarea/Textarea.vue'
import Select from '@ui/Select/Select.vue'
import Container from '@shared/Container/Container.vue'
import Datepicker from '@shared/Datepicker/Datepicker.vue'
import InputFile from '@shared/InputFile/InputFile.vue'
import CommonLayout from '@/layouts/CommonLayout/CommonLayout.vue'
import { ISelectItem } from '@/models/breadcrumbs'

interface IData {
  items: ISelectItem[],
  datepickerModel1: string,
  datepickerModel2: string,
  datepickerModel3: string,
  datepickerModel4: string,
  checkboxValue: boolean,
}

export default defineComponent({
  name: 'Style',
  components: {
    Datepicker,
    Button,
    Input,
    InputPassword,
    Textarea,
    Select,
    Container,
    Checkbox,
    InputFile,
    CommonLayout,
  },
  data(): IData {
    return {
      items: [
        {
          label: 'Label1',
          value: 'value1',
        },
        {
          label: 'Label2',
          value: 'value2',
        },
        {
          label: 'Label3',
          value: 'value3',
        },
      ],
      datepickerModel1: '',
      datepickerModel2: '',
      datepickerModel3: '',
      datepickerModel4: '',
      checkboxValue: false,
    }
  },

})
</script>
