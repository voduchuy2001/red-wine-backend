import { VNP_PAYMENT_ENDPOINT } from '@constants/vnp.api'
import {
  VNP_CURRENCY,
  VNP_DEFAULT_COMMAND,
  VNP_LOCALE,
  VNP_PAYMENT_GATEWAY_SANDBOX_HOST,
  VNP_PRODUCT_CODE,
  VNP_VERSION
} from '@constants/vnp.api'
import moment from 'moment'

export default class VNPayService {
  constructor({
    vnpHost = VNP_PAYMENT_GATEWAY_SANDBOX_HOST,
    vnpVersion = VNP_VERSION,
    vnpCurrency = VNP_CURRENCY,
    vnpLocale = VNP_LOCALE,
    paymentEndpoint = VNP_PAYMENT_ENDPOINT,
    ...config
  }) {
    this.vnpConfig = {
      vnpHost,
      paymentEndpoint,
      vnpVersion,
      vnpCurrency,
      vnpLocale,
      vnpOrderType: VNP_PRODUCT_CODE.Other,
      vnpCommand: VNP_DEFAULT_COMMAND,
      ...config
    }
  }

  defaultConfig() {
    return {
      vnpTmnCode: this.vnpConfig.tmnCode,
      vnpVersion: this.vnpConfig.vnpVersion,
      vnpCurrCode: this.vnpConfig.vnpCurrCode,
      vnpLocale: this.vnpConfig.vnpLocale,
      vnpCommand: this.vnpConfig.vnpCommand,
      vnpOrderType: this.vnpConfig.vnpOrderType
    }
  }

  generatePaymentRedirectUrl(data = {}) {
    const dataToGenerate = { ...this.vnpConfig, data }

    dataToGenerate.vnp_Amount = dataToGenerate.vnpAmount * 100

    const paymentDate = new Date()
    dataToGenerate.vnp_CreateDate = moment(paymentDate).format('yyyyMMddHHmmss')

    const redirectURL = new URL(this.vnpConfig.vnpHost, this.vnpConfig.paymentEndpoint)
  }
}
