import { SETTING_KEY } from '@constants/setting.key'
import CryptoJS from 'crypto-js'
import moment from 'moment'

export default class VNPayService {
  constructor(settingRepository) {
    this.settingRepository = settingRepository
  }

  async getVnpSetting() {
    const setting = await this.settingRepository.getSetting(SETTING_KEY.VNPAY)
    const { enabled, ...data } = JSON.parse(setting.value)
    return enabled ? data : false
  }

  hash(data, secret) {
    return CryptoJS.HmacSHA256(data, secret).toString(CryptoJS.enc.Hex)
  }

  getDateInGMT7(date) {
    return moment(date).tz('Asia/Ho_Chi_Minh').toDate()
  }

  dateFormat(date, format = 'yyyyMMddHHmmss') {
    const pad = (n) => (n < 10 ? `0${n}` : n).toString()

    const year = date.getFullYear()
    const month = pad(date.getMonth() + 1)
    const day = pad(date.getDate())
    const hour = pad(date.getHours())
    const minute = pad(date.getMinutes())
    const second = pad(date.getSeconds())

    return Number(
      format
        .replace('yyyy', year.toString())
        .replace('MM', month)
        .replace('dd', day)
        .replace('HH', hour)
        .replace('mm', minute)
        .replace('ss', second)
    )
  }

  async generatePaymentUrl(data = {}) {
    const settings = await this.getVnpSetting()
    const dataToGenerate = {
      ...settings,
      ...data
    }

    dataToGenerate.vnp_Amount = dataToGenerate.vnp_Amount * 100

    const timeGMT7 = this.getDateInGMT7()
    dataToGenerate.vnp_CreateDate = this.dateFormat(timeGMT7)

    const redirectUrl = new URL('https://sandbox.vnpayment.vn/paymentv2/vpcpay.html')

    Object.entries(dataToGenerate)
      .sort(([key1], [key2]) => key1.toString().localeCompare(key2.toString()))
      .forEach(([key, value]) => {
        if (!value || value === '' || value === undefined || value === null) {
          return
        }

        redirectUrl.searchParams.append(key, value.toString())
      })

    const signed = this.hash(settings.vnp_HashSecret, Buffer.from(redirectUrl.search.slice(1).toString(), 'utf-8'))

    return redirectUrl.searchParams.append('vnp_SecureHash', signed)
  }
}
