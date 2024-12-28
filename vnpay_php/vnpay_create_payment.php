<?php
//cho phép gọi API
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, GET");
header("Access-Control-Allow-Headers: Content-Type");

error_reporting(E_ALL & ~E_NOTICE & ~E_DEPRECATED);
date_default_timezone_set('Asia/Ho_Chi_Minh');

/**
 * Description of vnpay_ajax
 *
 * @author xonv
 */
require_once("./config.php");

// Lấy thông tin từ Angular
$data = json_decode(file_get_contents("php://input"), true);
$amount = $data['amount'];
$orderDescription = $data['orderDescription'];



// Tạo URL thanh toán
$vnp_Url = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
$vnp_Returnurl = "http://localhost/vnpay_php/vnpay_return.php"; // Đường dẫn xử lý callback
$vnp_TmnCode = "YOUR_TMN_CODE"; // Mã website
$vnp_HashSecret = "YOUR_SECRET_KEY"; // Secret key

$vnp_TxnRef = time(); // Mã đơn hàng
$vnp_OrderInfo = $orderDescription;
$vnp_Amount = $amount * 100; // VNPay yêu cầu số tiền tính bằng đơn vị VND * 100

// Thêm các tham số cần thiết
$inputData = array(
  "vnp_Version" => "2.1.0",
  "vnp_TmnCode" => $vnp_TmnCode,
  "vnp_Amount" => $vnp_Amount,
  "vnp_Command" => "pay",
  "vnp_CreateDate" => date('YmdHis'),
  "vnp_CurrCode" => "VND",
  "vnp_IpAddr" => $_SERVER['REMOTE_ADDR'],
  "vnp_Locale" => "vn",
  "vnp_OrderInfo" => $vnp_OrderInfo,
  "vnp_OrderType" => "other",
  "vnp_ReturnUrl" => $vnp_Returnurl,
  "vnp_TxnRef" => $vnp_TxnRef,
);

$vnp_TxnRef = $_POST['order_id']; //Mã đơn hàng. Trong thực tế Merchant cần insert đơn hàng vào DB và gửi mã này sang VNPAY
$vnp_OrderInfo = $_POST['order_desc'];
$vnp_OrderType = $_POST['order_type'];
$vnp_Amount = $_POST['amount'] * 100;
$vnp_Locale = $_POST['language'];
$vnp_BankCode = $_POST['bank_code'];
$vnp_IpAddr = $_SERVER['REMOTE_ADDR'];
//Add Params of 2.0.1 Version
$vnp_ExpireDate = $_POST['txtexpire'];
//Billing
$vnp_Bill_Mobile = $_POST['txt_billing_mobile'];
$vnp_Bill_Email = $_POST['txt_billing_email'];
$fullName = trim($_POST['txt_billing_fullname']);
if (isset($fullName) && trim($fullName) != '') {
    $name = explode(' ', $fullName);
    $vnp_Bill_FirstName = array_shift($name);
    $vnp_Bill_LastName = array_pop($name);
}
$vnp_Bill_Address=$_POST['txt_inv_addr1'];
$vnp_Bill_City=$_POST['txt_bill_city'];
$vnp_Bill_Country=$_POST['txt_bill_country'];
$vnp_Bill_State=$_POST['txt_bill_state'];
// Invoice
$vnp_Inv_Phone=$_POST['txt_inv_mobile'];
$vnp_Inv_Email=$_POST['txt_inv_email'];
$vnp_Inv_Customer=$_POST['txt_inv_customer'];
$vnp_Inv_Address=$_POST['txt_inv_addr1'];
$vnp_Inv_Company=$_POST['txt_inv_company'];
$vnp_Inv_Taxcode=$_POST['txt_inv_taxcode'];
$vnp_Inv_Type=$_POST['cbo_inv_type'];
$inputData = array(
    "vnp_Version" => "2.1.0",
    "vnp_TmnCode" => $vnp_TmnCode,
    "vnp_Amount" => $vnp_Amount,
    "vnp_Command" => "pay",
    "vnp_CreateDate" => date('YmdHis'),
    "vnp_CurrCode" => "VND",
    "vnp_IpAddr" => $vnp_IpAddr,
    "vnp_Locale" => $vnp_Locale,
    "vnp_OrderInfo" => $vnp_OrderInfo,
    "vnp_OrderType" => $vnp_OrderType,
    "vnp_ReturnUrl" => $vnp_Returnurl,
    "vnp_TxnRef" => $vnp_TxnRef,
    "vnp_ExpireDate"=>$vnp_ExpireDate,
    "vnp_Bill_Mobile"=>$vnp_Bill_Mobile,
    "vnp_Bill_Email"=>$vnp_Bill_Email,
    "vnp_Bill_FirstName"=>$vnp_Bill_FirstName,
    "vnp_Bill_LastName"=>$vnp_Bill_LastName,
    "vnp_Bill_Address"=>$vnp_Bill_Address,
    "vnp_Bill_City"=>$vnp_Bill_City,
    "vnp_Bill_Country"=>$vnp_Bill_Country,
    "vnp_Inv_Phone"=>$vnp_Inv_Phone,
    "vnp_Inv_Email"=>$vnp_Inv_Email,
    "vnp_Inv_Customer"=>$vnp_Inv_Customer,
    "vnp_Inv_Address"=>$vnp_Inv_Address,
    "vnp_Inv_Company"=>$vnp_Inv_Company,
    "vnp_Inv_Taxcode"=>$vnp_Inv_Taxcode,
    "vnp_Inv_Type"=>$vnp_Inv_Type

);

if (isset($vnp_BankCode) && $vnp_BankCode != "") {
    $inputData['vnp_BankCode'] = $vnp_BankCode;
}
if (isset($vnp_Bill_State) && $vnp_Bill_State != "") {
    $inputData['vnp_Bill_State'] = $vnp_Bill_State;
}

//var_dump($inputData);
ksort($inputData);
$query = "";
$i = 0;
$hashdata = "";
foreach ($inputData as $key => $value) {
    if ($i == 1) {
        $hashdata .= '&' . urlencode($key) . "=" . urlencode($value);
    } else {
        $hashdata .= urlencode($key) . "=" . urlencode($value);
        $i = 1;
    }
    $query .= urlencode($key) . "=" . urlencode($value) . '&';
}

$vnp_Url = $vnp_Url . "?" . $query;
if (isset($vnp_HashSecret)) {
    $vnpSecureHash =   hash_hmac('sha512', $hashdata, $vnp_HashSecret);//
    $vnp_Url .= 'vnp_SecureHash=' . $vnpSecureHash;
}
$returnData = array('code' => '00'
    , 'message' => 'success'
    , 'data' => $vnp_Url);
    if (isset($_POST['redirect'])) {
        header('Location: ' . $vnp_Url);
        die();
    } else {
        echo json_encode($returnData);
    }

    // Tạo chữ ký
ksort($inputData);
$query = "";
$i = 0;
$hashdata = "";
foreach ($inputData as $key => $value) {
    if ($i == 1) {
        $hashdata .= '&' . urlencode($key) . "=" . urlencode($value);
    } else {
        $hashdata .= urlencode($key) . "=" . urlencode($value);
        $i = 1;
    }
    $query .= urlencode($key) . "=" . urlencode($value) . '&';
}

$vnp_Url .= "?" . $query;
if (isset($vnp_HashSecret)) {
    $vnpSecureHash = hash_hmac('sha512', $hashdata, $vnp_HashSecret);
    $vnp_Url .= 'vnp_SecureHash=' . $vnpSecureHash;
}

echo json_encode(['paymentUrl' => $vnp_Url]);
?>
