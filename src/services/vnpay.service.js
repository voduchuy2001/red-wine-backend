import { SETTING_KEY } from '@constants/setting.key'
import {
  VNP_CURRENCY_CODE,
  VNP_DEFAULT_COMMAND,
  VNP_PAYMENT_ENDPOINT,
  VNP_PAYMENT_GATEWAY_SANDBOX_HOST,
  VNP_RETURN_URL,
  VNP_VERSION
} from '@constants/vnp.api'
import crypto from 'crypto'
import moment from 'moment'
import { Buffer } from 'buffer'

export default class VNPayService {
  constructor(settingRepository) {
    this.settingRepository = settingRepository
  }

  defaultConfig() {
    return {
      vnp_Command: VNP_DEFAULT_COMMAND,
      vnp_Version: VNP_VERSION,
      vnp_CurrCode: VNP_CURRENCY_CODE,
      vnp_ReturnUrl: VNP_RETURN_URL
    }
  }

  async getVnpSetting() {
    const setting = await this.settingRepository.getSetting(SETTING_KEY.VNPAY)
    const { enabled, ...data } = JSON.parse(setting.value)
    return enabled ? data : false
  }

  hash(secret, data) {
    return crypto.createHmac('sha512', secret).update(Buffer.from(data, 'utf-8')).digest('hex')
  }

  getDateInGMT7(date) {
    return moment(date).tz('Asia/Ho_Chi_Minh').toDate()
  }

  resolveUrlString(host, endpoint) {
    host = host.trim()
    endpoint = endpoint.trim()

    if (host.endsWith('/') || host.endsWith('\\)')) host = host.slice(0, -1)

    if (endpoint.startsWith('/') || endpoint.startsWith('\\)')) host = host.slice(0, -1)

    return `${host}/${endpoint}`
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
      vnp_TmnCode: settings.vnp_TmnCode,
      ...this.defaultConfig(),
      ...data
    }

    dataToGenerate.vnp_Amount = dataToGenerate.vnp_Amount * 100

    const timeGMT7 = this.getDateInGMT7()
    dataToGenerate.vnp_CreateDate = this.dateFormat(timeGMT7)

    const redirectUrl = new URL(this.resolveUrlString(VNP_PAYMENT_GATEWAY_SANDBOX_HOST, VNP_PAYMENT_ENDPOINT))

    Object.entries(dataToGenerate)
      .sort(([prevKey], [nextKey]) => prevKey.toString().localeCompare(nextKey.toString()))
      .forEach(([key, value]) => {
        if (!value || value === '' || value === undefined || value === null) {
          return
        }

        redirectUrl.searchParams.append(key, value.toString())
      })

    const signed = this.hash(settings.vnp_HashSecret, Buffer.from(redirectUrl.search.slice(1).toString(), 'utf-8'))
    redirectUrl.searchParams.append('vnp_SecureHash', signed)

    return redirectUrl.toString()
  }
}
