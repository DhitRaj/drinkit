export interface SmsPayload {
  to: string;
  template: 'OTP' | 'ORDER_PLACED' | 'OUT_FOR_DELIVERY' | 'ORDER_DELIVERED';
  variables: Record<string, string | number>;
}

export class SmsService {
  /**
   * Send transactional SMS / OTP
   */
  static async sendSms(payload: SmsPayload): Promise<{ success: boolean; messageId: string }> {
    const { to, template, variables } = payload;
    let messageBody = '';

    switch (template) {
      case 'OTP':
        messageBody = `Your Drinkit verification code is ${variables.otp}. Valid for 5 minutes. Do not share this with anyone. Enjoy responsibly.`;
        break;
      case 'ORDER_PLACED':
        messageBody = `Drinkit: Order #${variables.orderNumber} confirmed! Dark store is packing your items. ⚡ ETA: 10 mins. Track live at drinkit.in/tracking/${variables.orderId}`;
        break;
      case 'OUT_FOR_DELIVERY':
        messageBody = `Drinkit: Rider ${variables.riderName} is on the way! Please keep your Govt ID ready. Share Delivery OTP ${variables.otp} upon doorstep verification.`;
        break;
      case 'ORDER_DELIVERED':
        messageBody = `Drinkit: Order #${variables.orderNumber} delivered! Thank you for choosing Drinkit. Cheers!`;
        break;
      default:
        messageBody = `Drinkit Notification: ${JSON.stringify(variables)}`;
    }

    // In Production: Calls Fast2SMS / Twilio / MSG91 API
    // In Dev/Test: Logs formatted SMS to console
    const messageId = `sms_${Math.random().toString(36).substring(2, 11)}`;
    console.log(`\n📱 [SMS GATEWAY DISPATCH] -> To: ${to}`);
    console.log(`📱 [SMS Content]: "${messageBody}"`);
    console.log(`📱 [Status]: DELIVERED (ID: ${messageId})\n`);

    return {
      success: true,
      messageId,
    };
  }
}
