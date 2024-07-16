import BaseService from '@services/base.service'

export default class OrderService extends BaseService {
  constructor(orderRepository, orderHistoryRepository, orderAddressRepository) {
    super(orderRepository)
    this.orderHistoryRepository = orderHistoryRepository
    this.orderAddressRepository = orderAddressRepository
  }

  async create(data = {}) {
    console.log(data)
  }
}
