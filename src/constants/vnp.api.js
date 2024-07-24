import 'dotenv/config'

export const VNP_PAYMENT_GATEWAY_SANDBOX_HOST = process.env.VNP_SANDBOX_HOST_API
export const VNP_PAYMENT_ENDPOINT = process.env.VNP_PAYMENT_ENDPOINT
export const QUERY_DR_REFUND_ENDPOINT = process.env.VNP_QUERY_DR_REFUND_ENDPOINT
export const GET_BANK_LIST_ENDPOINT = process.env.VNP_GET_BANK_ENDPOINT
export const VNP_VERSION = process.env.VNP_VERSION
export const VNP_CURRENCY_CODE = process.env.VNP_CURRENCY_CODE
export const VNP_DEFAULT_COMMAND = process.env.VNP_DEFAULT_COMMAND
export const VNP_LOCALE = process.env.VNP_LOCALE
export const VNP_RETURN_URL = process.env.VNP_RETURN_URL

export const VNP_PRODUCT_CODE = {
  FoodConsumption: '100000',
  PhoneTablet: '110000',
  ElectricAppliance: '120000',
  ComputersOfficeEquipment: '130000',
  ElectronicsSound: '140000',
  BooksNewspapersMagazines: '150000',
  SportsPicnics: '160000',
  HotelTourism: '170000',
  Cuisine: '180000',
  EntertainmentTraining: '190000',
  Fashion: '200000',
  HealthBeauty: '210000',
  MotherBaby: '220000',
  KitchenUtensils: '230000',
  Vehicle: '240000',
  Pay: '250000',
  AirlineTickets: '250007',
  CardCode: '260000',
  PharmacyMedicalServices: '270000',
  Other: 'other'
}

export const WRONG_CHECKSUM_KEY = 'WRONG_CHECKSUM_KEY'

export const RESPONSE_MAP = new Map([
  ['00', { vn: 'Giao dịch thành công', en: 'Approved' }],
  ['01', { vn: 'Giao dịch đã tồn tại', en: 'Transaction is already exist' }],
  [
    '02',
    {
      vn: 'Merchant không hợp lệ (kiểm tra lại vnp_TmnCode)',
      en: 'Invalid merchant (check vnp_TmnCode value)'
    }
  ],
  [
    '03',
    {
      vn: 'Dữ liệu gửi sang không đúng định dạng',
      en: 'Sent data is not in the right format'
    }
  ],
  [
    '04',
    {
      vn: 'Khởi tạo GD không thành công do Website đang bị tạm khoá',
      en: 'Payment website is not available'
    }
  ],
  [
    '05',
    {
      vn: 'Giao dịch không thành công do: Quý khách nhập sai mật khẩu thanh toán quá số lần quy định. Xin quý khách vui lòng thực hiện lại giao dịch',
      en: 'Transaction failed: Too many wrong password input'
    }
  ],
  [
    '06',
    {
      vn: 'Giao dịch không thành công do Quý khách nhập sai mật khẩu xác thực giao dịch (OTP). Xin quý khách vui lòng thực hiện lại giao dịch.',
      en: 'Transaction failed: Wrong OTP input'
    }
  ],
  [
    '07',
    {
      vn: 'Trừ tiền thành công. Giao dịch bị nghi ngờ (liên quan tới lừa đảo, giao dịch bất thường). Đối với giao dịch này cần merchant xác nhận thông qua merchant admin: Từ chối/Đồng ý giao dịch',
      en: 'This transaction is suspicious'
    }
  ],
  [
    '08',
    {
      vn: 'Giao dịch không thành công do: Hệ thống Ngân hàng đang bảo trì. Xin quý khách tạm thời không thực hiện giao dịch bằng thẻ/tài khoản của Ngân hàng này.',
      en: 'Transaction failed: The banking system is under maintenance. Please do not temporarily make transactions by card / account of this Bank.'
    }
  ],
  [
    '09',
    {
      vn: 'Giao dịch không thành công do: Thẻ/Tài khoản của khách hàng chưa đăng ký dịch vụ InternetBanking tại ngân hàng.',
      en: 'Transaction failed: Cards / accounts of customer who has not yet registered for Internet Banking service.'
    }
  ],
  [
    '10',
    {
      vn: 'Giao dịch không thành công do: Khách hàng xác thực thông tin thẻ/tài khoản không đúng quá 3 lần',
      en: 'Transaction failed: Customer incorrectly validate the card / account information more than 3 times'
    }
  ],
  [
    '11',
    {
      vn: 'Giao dịch không thành công do: Đã hết hạn chờ thanh toán. Xin quý khách vui lòng thực hiện lại giao dịch.',
      en: 'Transaction failed: Pending payment is expired. Please try again.'
    }
  ],
  [
    '24',
    {
      vn: 'Giao dịch không thành công do: Khách hàng hủy giao dịch',
      en: 'Transaction canceled'
    }
  ],
  [
    '51',
    {
      vn: 'Giao dịch không thành công do: Tài khoản của quý khách không đủ số dư để thực hiện giao dịch.',
      en: 'Transaction failed: Your account is not enough balance to make the transaction.'
    }
  ],
  [
    '65',
    {
      vn: 'Giao dịch không thành công do: Tài khoản của Quý khách đã vượt quá hạn mức giao dịch trong ngày.',
      en: 'Transaction failed: Your account has exceeded the daily limit.'
    }
  ],
  [
    '75',
    {
      vn: 'Ngân hàng thanh toán đang bảo trì',
      en: 'Banking system is under maintenance'
    }
  ],
  [WRONG_CHECKSUM_KEY, { vn: 'Sai checksum', en: 'Wrong checksum' }],
  ['default', { vn: 'Giao dịch thất bại', en: 'Failure' }]
])
