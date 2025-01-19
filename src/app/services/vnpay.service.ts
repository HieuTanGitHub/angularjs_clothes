import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as qs from 'qs';
import * as moment from 'moment-timezone';
import * as forge from 'node-forge';

function sortObject(obj: any) {
  return Object.entries(obj)
    .sort(([key1], [key2]) => key1.toString().localeCompare(key2.toString()))
    .reduce((result, item: any) => {
      result = {
        ...result,
        [item[0]]: encodeURIComponent(item[1].toString().replace(/ /g, '+')),
      };

      return result;
    }, {});
}

@Injectable({
  providedIn: 'root',
})
export class VnpayService {
  constructor(private http: HttpClient) {}

  generatePaymentUrl(orderInfo: any): string {
    const vnpTmnCode = '1VYBIYQP'; // VNPay Merchant Code
    const vnpHashSecret = 'NOH6MBGNLQL9O9OMMFMZ2AX8NIEP50W1'; // VNPay Hash Secret
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

      vnp_Amount: 5000000 * 100,
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
    //http://localhost:4200/checkout
    // ?vnp_Amount=500000000
    // &vnp_BankCode=NCB
    // &vnp_BankTranNo=VNP14798305
    // &vnp_CardType=ATM
    // &vnp_OrderInfo=ThanhtoanchomaGD:19132415
    // &vnp_PayDate=20250119132430
    // &vnp_ResponseCode=00
    // &vnp_TmnCode=1VYBIYQP
    // &vnp_TransactionNo=14798305
    // &vnp_TransactionStatus=00
    // &vnp_TxnRef=19132415
    // &vnp_SecureHash=542714922ec68f9667601f1add84c98722deffaeb1d1d87dfc9e21e6d0958ca0320fe5d60770f1a5caf9fc6425f4e4e1dc63b67c4803035676ab63d80dbf385a
  }
}
