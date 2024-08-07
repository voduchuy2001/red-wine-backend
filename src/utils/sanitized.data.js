export default class SanitizedData {
  static(value) {
    if (typeof value === 'string') {
      return value.trim() === '' ? null : value
    }

    if (typeof value === 'number' && isNaN(value)) {
      return null
    }
  }
}
