import { cloneDeep, forEach } from 'lodash-es'

export default function useRemoveParams(params: Record<string, any>) {
  if (params) {
    const _params = cloneDeep(params)
    const keys = Object.keys(_params)
    forEach(keys, (key) => {
      if (!_params[key] || _params[key] === 'undefined' || key === 'tab') {
        delete _params[key]
      }
      // remove key loading
      if (key === 'loading') {
        delete _params[key]
      }
      if (key === 'name') {
        delete _params[key]
      }
    })
    return _params
  }
  return params
}
