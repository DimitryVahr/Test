import rootStore from '@/store/rootStore'

export interface IEyesightPluginUtil {
  setupEyesightPlugin(): void
  audioButton(specialWrapper: Element): void
  defaultViewButton(specialWrapper: Element): void
  imagesButton(specialWrapper: Element): void
}

export const eyesightPluginUtil: IEyesightPluginUtil = {
  /**
   * Доработка функционала версии для слабовидящих
   */
  setupEyesightPlugin() {
    const wrapper = document.querySelector('#special')
    if (wrapper) {
      this.audioButton(wrapper)
      this.defaultViewButton(wrapper)
      this.imagesButton(wrapper)
    }
  },

  /**
   * Кнопка озвучивания текста
   */
  audioButton(specialWrapper) {
    const button = specialWrapper.querySelector('.special-audio button') as HTMLButtonElement
    if (!button) return
    button.addEventListener('click', () => {
      if (+button.value === 0) {
        window.location.reload()
      }
    })
  },

  /**
   * Кнопка возвращения в обычный режим
   */
  defaultViewButton(specialWrapper) {
    const button = specialWrapper.querySelector('.special-quit button') as HTMLButtonElement
    if (!button) return
    button.addEventListener('click', () => {
      window.location.reload()
    })
  },

  /**
   * Кнопка скрыть/показать изображения
   */
  imagesButton(specialWrapper) {
    const button = specialWrapper.querySelector('.special-images button') as HTMLButtonElement
    if (!button) return

    button.addEventListener('click', () => {
      rootStore.commit('mutIsImagesHidden', !+button.value)

      const images = document.querySelectorAll('img')
      images.forEach((img) => {
        img.style.opacity = +button.value ? '1' : '0'
      })
    })
  }
}
