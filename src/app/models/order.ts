export interface OrderType {
  id?: string; // ID của đơn hàng, có thể không có
  userId: number | string; // ID của người dùng, có thể là số hoặc chuỗi
  customerName: string; // Tên khách hàng
  address: string; // Địa chỉ giao hàng
  phone: string; // Số điện thoại
  email: string; // Địa chỉ email
  totalPrice: number; // Tổng giá trị đơn hàng
  message?: string; // Tin nhắn, có thể không có
  status: number; // Trạng thái đơn hàng
  createdAt: string; // Thời gian tạo đơn hàng
  products?: { productId: string; productPrice: number; quantity: number, productName: string }[]; // Thêm trường products
}
