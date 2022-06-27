export interface IDeviceCheckUtil {
  isTouchDevice: () => boolean,
  getScreenWidth: () => number,
}

export const deviceCheckUtil: IDeviceCheckUtil = {
  /**
   * Определяет, зашли ли с устройства, на котором доступны касания
   * В компоненте будет доступна как $utils.isTouchDevice() (в template)
   * и this.$utils.isTouchDevice() (в script)
   */
  isTouchDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)
  },
  /**
   * Возвращает ширину экрана
   */
  getScreenWidth: () => {
    return Math.max(
      document.body.scrollWidth,
      document.documentElement.scrollWidth,
      document.body.offsetWidth,
      document.documentElement.offsetWidth,
      document.body.clientWidth,
      document.documentElement.clientWidth
    )
  }
}
