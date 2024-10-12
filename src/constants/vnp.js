const VNP_PAYMENT_GATEWAY_SANDBOX_HOST = process.env.VNP_SANDBOX_HOST_API
const VNP_PAYMENT_ENDPOINT = process.env.VNP_PAYMENT_ENDPOINT
const VNP_VERSION = process.env.VNP_VERSION
const VNP_CURRENCY_CODE = process.env.VNP_CURRENCY_CODE
const VNP_DEFAULT_COMMAND = process.env.VNP_DEFAULT_COMMAND
const VNP_LOCALE = process.env.VNP_LOCALE
const VNP_RETURN_URL = process.env.VNP_RETURN_URL

const VNP_PRODUCT_CODE = {
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

const WRONG_CHECKSUM_KEY = 'WRONG_CHECKSUM_KEY'

const RESPONSE_MAP = {
  '00': 'Approved',
  '01': 'Transaction is already exist',
  '02': 'Invalid merchant (check vnp_TmnCode value)',
  '03': 'Sent data is not in the right format',
  '04': 'Payment website is not available',
  '05': 'Transaction failed: Too many wrong password input',
  '06': 'Transaction failed: Wrong OTP input',
  '07': 'This transaction is suspicious',
  '08': 'Transaction failed: The banking system is under maintenance. Please do not temporarily make transactions by card / account of this Bank.',
  '09': 'Transaction failed: Cards / accounts of customer who has not yet registered for Internet Banking service.',
  10: 'Transaction failed: Customer incorrectly validate the card / account information more than 3 times',
  11: 'Transaction failed: Pending payment is expired. Please try again.',
  24: 'Transaction canceled',
  51: 'Transaction failed: Your account is not enough balance to make the transaction.',
  65: 'Transaction failed: Your account has exceeded the daily limit.',
  75: 'Banking system is under maintenance',
  WRONG_CHECKSUM_KEY: 'Wrong checksum',
  default: 'Failure'
}

export {
  VNP_PAYMENT_GATEWAY_SANDBOX_HOST,
  VNP_PAYMENT_ENDPOINT,
  VNP_VERSION,
  VNP_CURRENCY_CODE,
  VNP_DEFAULT_COMMAND,
  VNP_LOCALE,
  VNP_RETURN_URL,
  VNP_PRODUCT_CODE,
  WRONG_CHECKSUM_KEY,
  RESPONSE_MAP
}
