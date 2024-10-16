import { MAIL_CONFIGURATION } from '@constants/mail'
import nodemailer from 'nodemailer'
import path from 'path'
import fs from 'fs'
import ejs from 'ejs'

class Mail {
  constructor(mailData) {
    this.mailData = mailData
    this.transporter = nodemailer.createTransport(MAIL_CONFIGURATION)
  }

  envelop() {
    return {
      from: this.mailData.from || process.env.MAIL_FROM_ADDRESS,
      to: this.mailData.to,
      subject: this.mailData.subject
    }
  }

  async content(template, context) {
    const templatePath = path.join(__dirname, `../views/mail/${template}.ejs`)
    const templateContent = fs.readFileSync(templatePath, 'utf8')
    return ejs.render(templateContent, context)
  }

  attachments() {
    return []
  }

  async send(template, context) {
    const mailOptions = {
      ...this.envelop(),
      html: await this.content(template, context),
      attachments: this.attachments()
    }

    await this.transporter.sendMail(mailOptions)
  }
}

export default Mail
