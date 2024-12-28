import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as qs from 'qs';
import * as moment from 'moment-timezone';
import * as forge from 'node-forge';

function sortObject(obj: { [key: string]: any }): { [key: string]: any } {
  const sortedObj: { [key: string]: any } = {};
  const keys = Object.keys(obj).sort();
  keys.forEach((key) => {
    sortedObj[key] = obj[key];
  });
  return sortedObj;
}

@Injectable({
  providedIn: 'root',
})
export class VnpayService {
  constructor(private http: HttpClient) {}

  generatePaymentUrl(orderInfo: any): string {
    const vnpTmnCode = 'WDTROKWT'; // VNPay Merchant Code
    const vnpHashSecret = 'JWZDRA2XN8NMYNW704K4ISEAXWT9WJDN'; // VNPay Hash Secret
    const vnpUrl = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html'; // VNPay URL
    const vnpReturnUrl = 'http://localhost:4200/checkout'; // Return URL

    const vnpCreateDate = moment
      .tz('Asia/Ho_Chi_Minh')
      .format('YYYYMMDDHHmmss'); // VN timezone
    const vnpExpireDate = moment
      .tz('Asia/Ho_Chi_Minh')
      .add(15, 'minutes')
      .format('YYYYMMDDHHmmss'); // Expire +15m
    const orderId = moment().format('DDHHmmss'); // Unique transaction ID

    const vnpParams = {
      vnp_Version: '2.1.0',
      vnp_Command: 'pay',
      vnp_TmnCode: vnpTmnCode,
      vnp_Locale: 'vn',
      vnp_CurrCode: 'VND',
      vnp_TxnRef: orderId,

      vnp_Amount: 5000 * 100,
      vnp_OrderInfo: `ThanhtoanchomaGD:${orderId}`,
      vnp_OrderType: 'other',
      vnp_ReturnUrl: vnpReturnUrl,
      vnp_IpAddr: '127.0.0.1',
      vnp_BankCode: 'VNBANK',
      vnp_CreateDate: vnpCreateDate,
      vnp_ExpireDate: vnpExpireDate,
    };

    // Sort parameters
    const sortedVnpParams = sortObject(vnpParams);

    // Create query string
    const vnpParamsString = qs.stringify(sortedVnpParams, { encode: false });

    // Generate HMAC-SHA512 hash using `forge`
    const hmac = forge.hmac.create();
    hmac.start('sha512', vnpHashSecret);
    hmac.update(vnpParamsString);
    const hashValue = hmac.digest().toHex();

    // Construct final payment URL
    const paymentUrl = `${vnpUrl}?${vnpParamsString}&vnp_SecureHash=${hashValue}`;
    // console.log('Payment URL:', paymentUrl);
    return paymentUrl;
  }
}
