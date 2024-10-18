import Mail from '@config/mail'

class ConfirmOrderEmail extends Mail {
  constructor(mailData) {
    super(mailData)
  }

  envelop() {
    return {
      from: this.mailData.from || process.env.MAIL_FROM_ADDRESS,
      to: this.mailData.to,
      subject: __('Order Confirmation')
    }
  }

  async content() {
    const context = {
      customerName: this.mailData.customerName,
      orderId: this.mailData.orderId
    }

    return super.content('order.confirmation', context)
  }
}

export default ConfirmOrderEmail
