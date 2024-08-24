/* eslint-disable @typescript-eslint/no-var-requires */
import emailjs, { EmailJSResponseStatus } from '@emailjs/nodejs';
import { Injectable } from '@nestjs/common';

// require('dotenv').config();

@Injectable()
export class EmailJs {
  user: string;
  org_name: string;

  constructor() {
    this.user = 'nkimajie2@gmail.com';
    this.org_name = 'Task manager assessment';
  }

  async send(message, to, subject) {
    const emailData = {
      to,
      from_name: 'P2Vest',
      subject: subject,
      message_html: message,
    };

    try {
      const info = await emailjs.send(
        'service_6z5k2ko',
        'template_rm88ofm',
        emailData,
        {
          publicKey: 'vfsdxqHfpv9XaRfQp',
          privateKey: 'K2cAJ_RifJmGYZr41mC85',
        },
      );

      console.log({ info });
    } catch (error) {
      console.log({ error });
      if (error instanceof EmailJSResponseStatus) {
        console.log('EMAILJS FAILED...', error);
        return;
      }

      //   this.Log.logg({
      //     type: 'danger',
      //     message: `Message failed: ${error.message}`,
      //   });
      //   throw error.message;
    }
  }
}
