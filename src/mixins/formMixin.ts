import { ErrorObject } from '@vuelidate/core'

export const formMixin = {
  methods: {
    getFieldErrorMsg(errorsList: ErrorObject[], fieldName: string): string {

      for (let i = 0; i < errorsList.length; i++) {
        if (errorsList[i].$property === fieldName) {
          return errorsList[i].$message.toString()
        }
      }

      return ''
    },
    isFieldError(errorsList: ErrorObject[], fieldName: string): boolean {

      for (let i = 0; i < errorsList.length; i++) {
        if (errorsList[i].$property === fieldName) {
          return true
        }
      }

      return false
    }
  }
}
