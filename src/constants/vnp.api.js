import 'dotenv/config'

export const VNP_PAYMENT_GATEWAY_SANDBOX_HOST = process.env.VNP_SANDBOX_HOST_API
export const VNP_PAYMENT_ENDPOINT = process.env.VNP_PAYMENT_ENDPOINT
export const QUERY_DR_REFUND_ENDPOINT = process.env.VNP_QUERY_DR_REFUND_ENDPOINT
export const GET_BANK_LIST_ENDPOINT = process.env.VNP_GET_BANK_ENDPOINT
export const VNP_VERSION = process.env.VNP_VERSION
export const VNP_CURRENCY = process.env.VNP_CURRENCY
export const VNP_DEFAULT_COMMAND = process.env.VNP_DEFAULT_COMMAND
export const VNP_LOCALE = process.env.VNP_LOCALE

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
