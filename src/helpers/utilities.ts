import isArray from 'lodash/isArray'
import { mask } from 'maska'
export default {
  getLocation() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 5000,
      })
    })
  },
  hasValue(field) {
    return field !== null && typeof field !== 'undefined'
  },
  hasTextLength(string) {
    if (!string || !this.hasValue(string) || string.length === 0)
      return false

    return true
  },

  hasObjectLength(field) {
    return field && Object.keys(field).length !== 0
  },

  hasLength(field) { return field && field.length !== 0 && typeof field === 'object' },

  isEmpty(fields) { return !this.hasValue(fields) || !this.hasLength(fields) },

  isArray(fields) { return this.hasValue(fields) && this.hasLength(fields) },

  isBooleanTrue(value: any) {
    return this.hasValue(value) && (value === 'YES' || value === 'yes' || value === 1 || value === true)
  },
}
