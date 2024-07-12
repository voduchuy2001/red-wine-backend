import BaseService from '@services/base.service'

export default class OrderService extends BaseService {
  constructor(orderRepository) {
    super(orderRepository)
  }
}
