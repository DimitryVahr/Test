export const tippyOptions = {
  directive: 'tippy', // => v-tippy
  component: 'tippy', // => <tippy/>
  componentSingleton: 'tippy-singleton', // => <tippy-singleton/>,
  defaultProps: {
    placement: 'top',
    theme: 'light',
    allowHTML: true,
    hideOnClick: false,
    maxWidth: 340,
    animation: 'shift-away',
  }, // => Global default options * see all props
}

/**
 * ПОДСКАЗКА ПО ПОЛОЖЕНИЯМ
 * https://vue-tippy.netlify.app/props
 *   // default
 *   placement: 'top',
 *
 *   // full list:
 *   placement: 'top-start',
 *   placement: 'top-end',
 *
 *   placement: 'right',
 *   placement: 'right-start',
 *   placement: 'right-end',
 *
 *   placement: 'bottom',
 *   placement: 'bottom-start',
 *   placement: 'bottom-end',
 *
 *   placement: 'left',
 *   placement: 'left-start',
 *   placement: 'left-end',
 *
 *   // choose the side with most space
 *   placement: 'auto',
 *   placement: 'auto-start',
 *   placement: 'auto-end',
 */
