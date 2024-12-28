-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: localhost:3306
-- Thời gian đã tạo: Th12 19, 2024 lúc 11:53 PM
-- Phiên bản máy phục vụ: 10.6.16-MariaDB-cll-lve-log
-- Phiên bản PHP: 8.2.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `gcbukmyy_lope`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `album_images`
--

CREATE TABLE `album_images` (
  `id` varchar(50) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `src` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Đang đổ dữ liệu cho bảng `album_images`
--

INSERT INTO `album_images` (`id`, `title`, `src`) VALUES
('0417', '3', 'https://pendecor.vn/uploads/files/2021/04/15/quan-tran-shoes-5.jpg'),
('3185', '6', 'https://pendecor.vn/uploads/files/2021/04/15/quan-tran-shoes-10.jpg'),
('6624', '2', 'https://pendecor.vn/uploads/files/2021/04/15/quan-tran-shoes-2.jpg'),
('84ab', '1', 'https://pendecor.vn/uploads/files/2021/04/15/quan-tran-shoes-8.jpg'),
('9cf8', '5', 'https://pendecor.vn/uploads/files/2021/04/15/quan-tran-shoes-1.jpg'),
('e7ef', '4', 'https://pendecor.vn/uploads/files/2021/04/15/quan-tran-shoes-4.jpg');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `comment`
--

CREATE TABLE `comment` (
  `id` int(11) NOT NULL,
  `productId` int(11) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `content` text DEFAULT NULL,
  `createdDate` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Đang đổ dữ liệu cho bảng `comment`
--

INSERT INTO `comment` (`id`, `productId`, `userId`, `content`, `createdDate`) VALUES
(1, 1, 1, 'Giày ??p giá r? sài gòn', '2004-10-16'),
(2, 2, 1, 'Giày ??p giá r? sài gòn', '2004-10-16'),
(3, 3, 1, 'Giày ??p giá r? sài gòn', '2004-10-16');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `danh_muc`
--

CREATE TABLE `danh_muc` (
  `id` int(11) NOT NULL,
  `ten` varchar(255) NOT NULL,
  `thu_tu` int(11) DEFAULT NULL,
  `an_hien` tinyint(4) NOT NULL,
  `hinh` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Đang đổ dữ liệu cho bảng `danh_muc`
--

INSERT INTO `danh_muc` (`id`, `ten`, `thu_tu`, `an_hien`, `hinh`) VALUES
(1, 'Giày Sneaker', 1, 1, 'assets/img/5.png'),
(2, 'Áo', 2, 1, 'assets/img/6.png'),
(3, 'Qu?n', 3, 1, 'assets/img/7.png');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `login`
--

CREATE TABLE `login` (
  `id` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Đang đổ dữ liệu cho bảng `login`
--

INSERT INTO `login` (`id`) VALUES
('6d2d');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `news`
--

CREATE TABLE `news` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `date` date DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Đang đổ dữ liệu cho bảng `news`
--

INSERT INTO `news` (`id`, `title`, `description`, `date`, `image`) VALUES
(1, 'Giày Air Jordan Real - Secondhand s?p c?p b?n!!!', 'C?n c?nh h?n 200 ?ôi giày Nike Air Jordan chính hãng ?ã qua s? d?ng s?p c?p b?n t?i Ti?m Giày C? Sài Gòn', '2023-10-01', 'https://bizweb.dktcdn.net/thumb/grande/100/424/874/files/z4214956675880-13d60d0122fce8e1ef6afb15c7d9ba51.jpg?v=1679890387358'),
(2, 'AIR MAX DAY 2023', '??i v?i Ti?m, nh?ng ?ôi Nike Air Max c? chính là dòng giày \"kh?i nghi?p\" khi b??c chân vào th? tr??ng 2hand k? t? n?m 2015 ??n nay.', '2023-10-02', 'https://bizweb.dktcdn.net/100/424/874/files/post-1-air-max-day.jpg?v=1679542069445'),
(3, 'NH?NG ?ÔI GIÀY AIR FORCE 1 ???C YÊU THÍCH NH?T', 'B?n có quen thu?c v?i giày AF1 c?a Nike? N?m nay, hãng ?ã ra m?t nhi?u phiên b?n màu s?c n?i b?t. Phiên b?n nào là yêu thích nh?t c?a b?n?', '2023-10-03', 'https://giaygiare.vn/upload/sanpham/thumbs/nhung-doi-giay-air-force-1-duoc-yeu-thich-nhat.jpg'),
(4, 'GIÀY TH? THAO CH?I PICKLEBALL, QU?N V?T, TENNIS', 'N?u b?n ?ang chu?n b? ra sân ch?i các b? môn nh? tennis, pickleball, qu?n v?t, c?u lông', '2024-11-21', 'https://giaygiare.vn/upload/images/asics-court-ff-2-novak-white-kale.jpg');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `nha_sx`
--

CREATE TABLE `nha_sx` (
  `id` int(11) NOT NULL,
  `id_danhmuc` int(11) DEFAULT NULL,
  `ten` varchar(255) NOT NULL,
  `thu_tu` int(11) DEFAULT NULL,
  `an_hien` tinyint(4) NOT NULL,
  `hinh` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Đang đổ dữ liệu cho bảng `nha_sx`
--

INSERT INTO `nha_sx` (`id`, `id_danhmuc`, `ten`, `thu_tu`, `an_hien`, `hinh`) VALUES
(1, 1, 'Adidas', 1, 1, 'assets/img/5.png'),
(2, 1, 'Nike', 2, 1, 'assets/img/6.png'),
(3, 1, 'Acis', 3, 1, 'assets/img/7.png'),
(4, NULL, 'MLB', 4, 1, 'assets/img/8.png'),
(5, NULL, 'NewEra', 5, 1, 'assets/img/9.png'),
(6, NULL, 'Diceo', 6, 1, 'assets/img/10.png');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `orderDetails`
--

CREATE TABLE `orderDetails` (
  `id` varchar(50) NOT NULL,
  `orderId` varchar(50) DEFAULT NULL,
  `productId` int(11) DEFAULT NULL,
  `productPrice` int(11) NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Đang đổ dữ liệu cho bảng `orderDetails`
--

INSERT INTO `orderDetails` (`id`, `orderId`, `productId`, `productPrice`, `quantity`) VALUES
('11bb', 'b2e0', 2, 2200000, 2),
('16a9', 'b83a', 1, 2000000, 1),
('20df', 'b2e0', 2, 2200000, 1),
('374c', 'b83a', 2, 2200000, 1),
('3915', 'b2e0', 1, 2000000, 1),
('3952', 'b83a', 3, 4100000, 1),
('a95e', 'b2e0', 3, 4100000, 2),
('b4a9', 'b83a', 3, 4100000, 1),
('be52', 'b83a', 1, 2000000, 4),
('dd1c', 'b2e0', 1, 2000000, 1),
('e0f8', 'b83a', 1, 2000000, 1),
('e5e0', 'b83a', 1, 2000000, 1),
('f452', 'b2e0', 2, 2200000, 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `orders`
--

CREATE TABLE `orders` (
  `id` varchar(50) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `customerName` varchar(255) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `totalPrice` int(11) NOT NULL,
  `message` text DEFAULT NULL,
  `status` int(11) NOT NULL,
  `createdAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Đang đổ dữ liệu cho bảng `orders`
--

INSERT INTO `orders` (`id`, `userId`, `customerName`, `address`, `phone`, `email`, `totalPrice`, `message`, `status`, `createdAt`) VALUES
('2f2e', 1, 'C??ng Nguy?n M?nh', '124 N08 An Bình Trung Hoà Tr?ng Bom ??ng', '0522322920', 'dodatcao@gmail.com', 4200000, '', 4, '2024-10-30 16:59:25'),
('3ec9', 1, 'C??ng Nguy?n M?nh', '124 N08 An Bình Trung Hoà Tr?ng Bom ??ng', '0522322920', 'manhcuong16102004@gmail.com', 8300000, '', 0, '2024-11-21 15:09:52'),
('59b3', 1, 'C??ng Nguy?n M?nh', '124 N08 An Bình Trung Hoà Tr?ng Bom ??ng', '0522322920', 'manhcuong16102004@gmail.com', 2000000, '1', 1, '2024-11-21 14:21:59'),
('6cf5', 1, 'C??ng Nguy?n M?nh', '124 N08 An Bình Trung Hoà Tr?ng Bom ??ng', '0522322920', 'manhcuong16102004@gmail.com', 8300000, '', 1, '2024-10-31 05:49:33'),
('b2e0', 1, '?? ??t Cao', '124 N08 An Bình Trung Hoà Tr?ng Bom ??ng', '0522322920', 'dodatcao@gmail.com', 2000000, '111', 3, '2024-10-30 16:21:40'),
('b83a', 1, 'Admin', '124 N08 An Bình Trung Hoà Tr?ng Bom ??ng', '0522322920', 'manhcuong16102004@gmail.com', 8300000, '111', 3, '2024-10-30 15:53:05'),
('bde2', 1, 'C??ng Nguy?n M?nh', '124 N08 An Bình Trung Hoà Tr?ng Bom ??ng', '0522322920', 'manhcuong16102004@gmail.com', 10400000, '', 2, '2024-10-31 15:06:16'),
('c2d8', 1, 'C??ng Nguy?n M?nh', '124 N08 An Bình Trung Hoà Tr?ng Bom ??ng', '0522322920', 'manhcuong16102004@gmail.com', 2000000, '', 1, '2024-10-31 05:49:45');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `reviews`
--

CREATE TABLE `reviews` (
  `id` int(11) NOT NULL,
  `productId` int(11) DEFAULT NULL,
  `content` text DEFAULT NULL,
  `rating` int(11) NOT NULL,
  `customerName` varchar(255) DEFAULT NULL,
  `date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Đang đổ dữ liệu cho bảng `reviews`
--

INSERT INTO `reviews` (`id`, `productId`, `content`, `rating`, `customerName`, `date`) VALUES
(1, 1, 'S?n ph?m r?t t?t!', 5, 'Nguy?n V?n A', '2023-10-01'),
(2, 1, 'Ch?t l??ng ?n.', 4, 'Tr?n Th? B', '2023-10-02'),
(3, 4, 'R?t hài lòng v?i s?n ph?m này.', 5, 'Lê V?n C', '2023-10-03'),
(4, 2, 'ss', 4, 'Tên Khách Hàng', '2024-11-04'),
(5, 2, 'aa', 5, 'Tên Khách Hàng', '2024-11-04'),
(6, 3, 'quá ?ã', 2, 'Tên Khách Hàng', '2024-11-07'),
(7, 1, 'Giày ??p l?m nha', 5, 'Tên Khách Hàng', '2024-12-19');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `san_pham`
--

CREATE TABLE `san_pham` (
  `id` int(11) NOT NULL,
  `id_nhasx` int(11) DEFAULT NULL,
  `id_danhmuc` int(11) DEFAULT NULL,
  `ten` varchar(255) NOT NULL,
  `gia` int(11) NOT NULL,
  `gia_km` int(11) DEFAULT NULL,
  `hinh` varchar(255) DEFAULT NULL,
  `ngay` date DEFAULT NULL,
  `xem` int(11) DEFAULT NULL,
  `hot` tinyint(4) NOT NULL,
  `an_hien` tinyint(4) NOT NULL,
  `mo_ta` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Đang đổ dữ liệu cho bảng `san_pham`
--

INSERT INTO `san_pham` (`id`, `id_nhasx`, `id_danhmuc`, `ten`, `gia`, `gia_km`, `hinh`, `ngay`, `xem`, `hot`, `an_hien`, `mo_ta`) VALUES
(1, 1, 1, 'Giày Adidas chính hãng - Advantage Base n?', 2000000, 1200000, 'https://bizweb.dktcdn.net/thumb/1024x1024/100/347/092/products/93440f41eb2941b4891cab0a0053b1.jpg?v=1729181469433', '2022-07-11', 115, 0, 1, 'V?i thi?t k? tinh t?...'),
(2, 1, 1, 'Giày Adidas Nam N? Chính Hãng - Hoops 3.0', 2200000, 1180000, 'https://bizweb.dktcdn.net/thumb/1024x1024/100/347/092/products/giay-adidas-3-0-low-classic-vintage-gy5434-01.jpg', '2022-07-11', 91, 0, 1, 'Hoops 3.0 là m?u giày...'),
(3, 2, 1, 'Giày Nike Nam Chính Hãng - Nike Air Force 1', 4100000, 2650000, 'https://bizweb.dktcdn.net/thumb/1024x1024/100/347/092/products/giay-nike-air-force-1-07-fq4296-101-01.jpg', '2024-07-11', 91, 0, 1, 'Nike Air Force 1 là bi?u t??ng...'),
(4, 1, 1, 'Giày Adidas Stan Smith Fairway M20324', 2300000, 2100000, 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/4edaa6d5b65a40d19f20a7fa00ea641f_9366/Giay_Stan_Smith_trang_M20325_01_standard.jpg', '2022-07-11', 221, 0, 1, 'Giày Adidas Stan Smith...'),
(5, 1, 1, 'Giày Adidas Superstar OG Vintage White C77124', 2500000, 2100000, 'https://bizweb.dktcdn.net/100/446/588/products/giayadidasnamsuperstarc7712411.jpg?v=1675315152807', '2022-07-11', 87, 0, 1, 'Giày Adidas Superstar OG...'),
(6, 3, 1, 'Giày Acis Gel-Kayano 28', 3900000, 2800000, 'https://sneakerdaily.vn/wp-content/uploads/2023/09/Giay-ASICS-GEL-KAYANO-28-PLATINUM-Mens-Running-1011B291.020.jpg', '2023-06-10', 102, 1, 1, 'Giày Acis Gel-Kayano 28...'),
(7, 4, 2, 'Áo MLB Big Logo New York Yankees', 1500000, 1200000, 'https://bizweb.dktcdn.net/100/446/974/products/ao-thun-mlb-chinh-hang-big-logo-ny-mau-den-3atsb1843-50bks-2.jpg?v=1710344153397', '2023-03-25', 50, 0, 1, 'Áo MLB Big Logo...'),
(8, 5, 2, 'Áo NewEra Essential Tee', 1100000, 950000, 'https://bizweb.dktcdn.net/100/446/974/products/ao-thun-mlb-new-era-basic-new-york-yankees-black-13731451-1.jpg?v=1692358155763', '2023-07-01', 63, 1, 1, 'Áo NewEra Essential Tee...'),
(9, 6, 3, 'Qu?n Diceo Jogger Pants', 900000, 800000, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP0TpOeW_GMVVvJor5B_3i_5anV1zo_6T_iQ&s', '2023-02-28', 45, 0, 1, 'Qu?n Diceo Jogger Pants...'),
(10, 2, 1, 'Giày Nike Jordan 1 Retro High OG', 5600000, 4500000, 'https://shopgiayreplica.com/wp-content/uploads/2019/07/Nike-Air-Jordan-1-Retro-High-Og-Bred-Toe-replica-800x650.jpg', '2024-05-10', 190, 1, 1, 'Giày Nike Jordan 1 Retro High OG...'),
(11, 1, 1, 'Giày Adidas Ultraboost 21', 4000000, 3200000, 'https://bizweb.dktcdn.net/thumb/large/100/378/584/products/giay-adidas-ultraboost-fy0402-giayauthentic-1.jpg', '2024-01-20', 81, 0, 1, 'Giày Adidas Ultraboost 21...'),
(12, 5, 2, 'Áo Hoodie NewEra Black', 1800000, 1500000, 'https://bizweb.dktcdn.net/thumb/grande/100/413/756/products/image-1728027852604.png?v=1728027862127', '2023-11-25', 95, 1, 1, 'Áo Hoodie NewEra Black...'),
(13, 4, 2, 'Áo MLB Monogram Tee', 1300000, 1150000, 'https://bizweb.dktcdn.net/thumb/1024x1024/100/410/787/products/53ecb66d-15ef-4a2b-966d-5b1432ff5219.jpg?v=1650858964317', '2024-04-10', 45, 0, 1, 'Áo MLB Monogram Tee...'),
(14, 3, 3, 'Qu?n Acis Training Shorts', 750000, 650000, 'https://bizweb.dktcdn.net/100/425/004/products/434758075-389800867156202-3525131519647684757-n-1712059085061.jpg?v=1712059089620', '2023-05-15', 58, 0, 1, 'Qu?n Acis Training Shorts...'),
(15, 1, 1, 'Giày Adidas Yeezy Boost 350 V2', 6200000, 5000000, 'https://cdn.beeonline.vn/media/1/products/giay-sneaker/adidas/adidas-yeezy-350-v2-true-form/adidas-yeezy-350-v2-true-form-1-min.jpg', '2024-08-01', 146, 1, 1, 'Giày Adidas Yeezy Boost 350 V2...'),
(16, 2, 1, 'Giày Nike ZoomX Vaporfly Next%', 5400000, 4200000, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ7fC_st8XGjo-pWSieesHjkKjKrIGdh-CYQ&s', '2023-12-10', 110, 1, 1, 'Giày Nike ZoomX Vaporfly Next%...'),
(17, 3, 1, 'Giày Acis Gel-Lyte III OG', 3800000, 2800000, 'https://bizweb.dktcdn.net/100/424/874/products/1ce02bf5-a673-425e-aea3-17398b0ac3ba.jpg?v=1621914233187', '2023-09-10', 100, 1, 1, 'Giày Acis Gel-Lyte III OG...'),
(18, 4, 2, 'Áo MLB Oversize Logo Tee', 1400000, 1200000, 'https://bizweb.dktcdn.net/100/446/974/products/ao-mlb-classic-monogram-big-logo-short-sleeve-t-shirt-new-york-yankees-black-3atsm0233-50bks-3.jpg?v=1686635060437', '2024-03-10', 77, 0, 1, 'Áo MLB Oversize Logo Tee...'),
(19, 5, 3, 'Qu?n Jogger NewEra Essential', 1000000, 850000, 'https://ccauthentic.vn/uploads/products/a6a29b7800f81684e24c5f149d5b736e.jpg', '2023-11-20', 60, 0, 1, 'Qu?n Jogger NewEra Essential...'),
(20, 2, 1, 'Giày Nike Special Field Air Force 1', 5000000, 4000000, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShBZ4F44AKeCRhWtm47FD6pOXfiOnvymxtIg&s', '2024-09-01', 50, 1, 1, 'Giày Nike Special Field Air Force 1...'),
(21, 1, 2, 'Áo Adidas Originals Trefoil', 1600000, 1300000, 'https://cdn.chiaki.vn/unsafe/0x480/left/top/smart/filters:quality(75)/https://chiaki.vn/upload/product/2022/07/ao-thun-ba-la-adidas-originals-trefoil-tee-h32312-62c7d0df3b0c8-08072022133823.jpg', '2024-08-20', 35, 0, 1, 'Áo Adidas Originals v?i logo...'),
(22, 6, 3, 'Qu?n Shorts Diceo Slim Fit', 850000, 700000, 'https://1557691689.e.cdneverest.net/fast/913x0/filters:format(webp)/static.5sfashion.vn/storage/product_color/merehBpasf6HplGeXLZ6flZ3LP3WsUxH.webp', '2024-07-15', 70, 0, 1, 'Qu?n Shorts Diceo Slim Fit...'),
(23, 3, 1, 'Giày Acis Gel-Nimbus 23', 4700000, 3500000, 'https://cdn.vuahanghieu.com/unsafe/0x900/left/top/smart/filters:quality(90)/https://admin.vuahanghieu.com/upload/product/2023/04/giay-the-thao-asics-gel-kayano-29-extra-wide-1011b471-0024e-mau-den-xam-size-40-644211e019d8f-21042023113232.jpg', '2024-06-05', 40, 1, 1, 'Giày Acis Gel-Nimbus 23...'),
(24, 4, 2, 'Áo MLB Classic Hoodie', 2000000, 1700000, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-CvkojM-eYveaLdR6vQC0TcA-Z5vZ-U_SoA&s', '2024-05-25', 60, 0, 1, 'Áo MLB Classic Hoodie...'),
(25, 1, 1, 'Giày Adidas NMD R1', 3500000, 2900000, 'https://bizweb.dktcdn.net/100/413/756/products/61tjlycssml-ac-ul1200.jpg?v=1626175044303', '2024-09-10', 50, 1, 1, 'Giày Adidas NMD R1...'),
(26, 2, 1, 'Giày Nike Air Max 90', 3800000, 2800000, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaL_4I9Gi6nZfaXIqXxcgHJqjSqh9-c9SBMA&s', '2024-08-15', 60, 1, 1, 'Giày Nike Air Max 90...'),
(27, 1, 2, 'Áo Adidas Essentials Logo Tee', 1300000, 1100000, 'https://bizweb.dktcdn.net/100/401/610/products/adidasessentialslogoteegendern-8f23a3a6-880e-49b9-8295-765404783f6d.jpg?v=1711468679333', '2024-07-20', 45, 0, 1, 'Áo Adidas Essentials...'),
(28, 2, 3, 'Qu?n Nike Dri-FIT Training Pants', 1200000, 1000000, 'https://sneakerdaily.vn/wp-content/uploads/2024/08/Quan-Nike-Men-Dri-Fit-Academy-23-Training-Pants-Black-DV9743-010.jpg', '2024-06-25', 55, 0, 1, 'Qu?n Nike Dri-FIT...'),
(29, 3, 1, 'Giày Acis Gel-Quantum 180', 4100000, 3000000, 'https://www.jordan1.vn/wp-content/uploads/2023/09/image_-_2023-07-28t130848.745_798d50f93ca841ee9e08988fa2471523.png', '2024-05-30', 70, 1, 1, 'Giày Acis Gel-Quantum 180...'),
(30, 4, 2, 'Áo MLB Classic Big Logo', 1500000, 1300000, 'https://bizweb.dktcdn.net/thumb/grande/100/446/974/products/ao-mlb-classic-monogram-big-logo-short-sleeve-t-shirt-boston-red-sox-l-melange-grey-3atsm0233-43mgl-3.jpg?v=1686635060347', '2024-04-15', 50, 0, 1, 'Áo MLB Classic Big Logo...'),
(31, 5, 3, 'Qu?n NewEra Essential Pants', 950000, 800000, 'https://cdn-images.kiotviet.vn/littleusastore/84194cfd1b3043a4a2a779ecf4008175.png', '2024-03-10', 65, 0, 1, 'Qu?n NewEra Essential Pants...'),
(32, 1, 1, 'Giày Adidas Superstar Future', 4000000, 3200000, 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/52c64d1f42944b7d8d60ad490071b34a_9366/Giay_Superstar_Futureshell_trang_H00197_01_standard.jpg', '2024-02-20', 80, 1, 1, 'Giày Adidas Superstar Future...'),
(33, 2, 2, 'Áo Nike Sportswear Element', 1700000, 1500000, 'https://sneakerdaily.vn/wp-content/uploads/2024/01/Ao-Nike-Element-Repel-Therma-FIT-Mens-Thermal-Water-Repellent-Running-Top-FB8565-681.jpg', '2024-01-15', 90, 1, 1, 'Áo Nike Sportswear Element...'),
(34, 3, 3, 'Qu?n Acis Flex Shorts', 800000, 700000, 'https://www.mude-sports.com/wp-content/uploads/2022/02/11078-Side-Right.jpg', '2024-02-01', 40, 0, 1, 'Qu?n Acis Flex Shorts...'),
(35, 4, 1, 'Giày MLB Retro Runner', 4500000, 3900000, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSn7WPpp8X353yMmt3sBOOjTYBnfH_1jPefgQ&s', '2024-01-28', 75, 1, 1, 'Giày MLB Retro Runner...'),
(36, 5, 2, 'Áo NewEra Core Classic Tee', 1200000, 900000, 'https://cdn.vuahanghieu.com/unsafe/0x900/left/top/smart/filters:quality(90)/https://admin.vuahanghieu.com/upload/product/2023/11/ao-phong-new-era-colorful-graduation-t-shirt-ma-u-xa-m-655d746937ab0-22112023102425.jpg', '2023-12-15', 80, 0, 1, 'Áo NewEra Core Classic Tee...'),
(37, 1, 2, 'Áo Adidas Adicolor Classic', 1400000, 1200000, 'https://bizweb.dktcdn.net/100/410/787/products/157-jpeg-1705655278998.jpg?v=1705655708367', '2023-11-30', 65, 1, 1, 'Áo Adidas Adicolor...'),
(38, 2, 1, 'Giày Nike React Infinity Run', 4900000, 4300000, 'https://bizweb.dktcdn.net/100/455/705/products/reactxx.jpg?v=1702960470063', '2023-11-01', 60, 1, 1, 'Giày Nike React Infinity Run...'),
(39, 3, 3, 'Qu?n Nike Flex Stride', 1400000, 1200000, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDitdxkNZJPSGujo8OkBXrflxXESbuo901Tw&s', '2023-05-10', 95, 1, 1, 'Qu?n Nike Flex Stride...'),
(40, 5, 1, 'Giày NewEra Essential Sneakers', 2600000, 2200000, 'https://kingshoes.vn/data/upload/media/fear-of-god-essentials-es03w19u-srlefag3wb-king-shoes-sneaker-real-hcm-4.jpg', '2023-08-10', 90, 1, 1, 'Giày NewEra Essential Sneakers...'),
(41, 1, 1, 'Giày Adidas Samba', 3700000, 3100000, 'https://product.hstatic.net/200000581855/product/giay_adidas_samba_og_white_black_gum_b758068_985da8a8aa2a4662ac9857f9efd30238_master.jpg', '2023-07-25', 75, 0, 1, 'Giày Adidas Samba...'),
(42, 3, 2, 'Áo Acis Training Tee', 1350000, 1150000, 'https://bizweb.dktcdn.net/thumb/1024x1024/100/347/092/products/asics-2031c218-401-01.jpg', '2023-06-17', 82, 0, 1, 'Áo Acis Training Tee...'),
(43, 2, 3, 'Qu?n Nike Dri-FIT Jogger Pants', 1600000, 1400000, 'https://sneakerdaily.vn/wp-content/uploads/2024/05/Quan-Nike-Dri-FIT-Academy-23-Pants-Black-DV9743-010.jpg', '2024-05-20', 70, 1, 1, 'Qu?n Nike Dri-FIT Jogger...'),
(44, 1, 2, 'Áo Adidas Essentials 3-Stripes', 1500000, 1200000, 'https://techkids.vn/wp-content/uploads/2021/06/ao-thun-nam-adidas-3-stripes-tee-shyny07.jpg', '2024-06-10', 50, 0, 1, 'Áo Adidas Essentials...'),
(45, 4, 1, 'Giày Adidas Campus', 2200000, 1900000, 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/82822e1c98664c529462abfa0062e7f5_9366/Giay_Campus_Do_M20321_01_standard.jpg', '2024-05-05', 80, 1, 1, 'Giày Adidas Campus...'),
(46, 5, 3, 'Qu?n Th? Thao NewEra Essential', 950000, 850000, 'https://cdn.shopify.com/s/files/1/0031/0100/4494/products/henry_comfy_pants_white_2_d0d02b38-089f-4f9f-b0a9-531e877faf83.jpg?v=1636798090', '2024-06-15', 45, 0, 1, 'Qu?n Th? Thao NewEra...'),
(47, 6, 2, 'Áo Thun Diceo Classic', 890000, 790000, 'https://cdn.shopify.com/s/files/1/0475/7715/9617/products/black-front-600x.png?v=1615618359', '2024-07-01', 72, 1, 1, 'Áo Thun Diceo Classic...'),
(48, 1, 1, 'Giày Adidas 4D Run 1.0', 4200000, 3200000, 'https://cdn.shopify.com/s/files/1/0031/0100/4494/products/2022-adidas-4D-Run-1.0-Black-603778.jpg?v=1621607843', '2024-07-20', 60, 0, 1, 'Giày Adidas 4D Run 1.0...'),
(49, 2, 3, 'Qu?n Jogger Adicolor', 1300000, 1100000, 'https://cdn.shopify.com/s/files/1/0459/0496/5865/products/adidas-x-nai-by-yo-cotton-jersey-jogger-black_d1d0ab9a-5e96-476e-8479-638cb414828e.jpg?v=1645888519', '2024-08-18', 85, 0, 1, 'Qu?n Jogger Adicolor...'),
(50, 3, 2, 'Áo Thun MLB Dynamic', 1200000, 1000000, 'https://cdn.shopify.com/s/files/1/0482/1808/1834/products/MLB_Ao_Phat_Dynamic_3.jpg?v=1643888243', '2024-09-12', 90, 1, 1, 'Áo Thun MLB Dynamic...');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tinh_chat`
--

CREATE TABLE `tinh_chat` (
  `id` int(11) NOT NULL,
  `ten` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Đang đổ dữ liệu cho bảng `tinh_chat`
--

INSERT INTO `tinh_chat` (`id`, `ten`) VALUES
(1, 'Bình th??ng'),
(2, 'Giá r?'),
(3, 'Gi?m s?c'),
(4, 'Cao c?p');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `fullname` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `rePassword` varchar(255) DEFAULT NULL,
  `isAdmin` tinyint(4) NOT NULL,
  `isBlocked` tinyint(4) NOT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `dob` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`id`, `name`, `password`, `phone`, `fullname`, `email`, `rePassword`, `isAdmin`, `isBlocked`, `gender`, `dob`) VALUES
(1, 'admin', '123456', '0522322920', 'Admin là tôi', 'manhcuong16102004@gmail.com', '123456', 1, 0, 'male', '2004-10-16'),
(2, 'manhcuong1610', '123456', '0345678920', 'Nguy?n M?nh C??ng', 'cuongnmps36452@fpt.edu.vn', '123456', 0, 0, 'male', '1998-05-15'),
(3, 'lethikhanh789', 'khanh45678', '0345678930', 'Lê Th? Khanh', 'khanh789@gmail.com', 'khanh45678', 0, 0, 'female', '1995-09-25'),
(4, 'nguyenvana123', 'anaaa123', '0345678940', 'Nguy?n V?n A', 'vana123@gmail.com', 'anaaa123', 0, 0, 'male', '1992-12-12'),
(5, 'phamngoctuan', 'tuan12345', '0345678950', 'Ph?m Ng?c Tu?n', 'tuan123@gmail.com', 'tuan12345', 0, 0, 'male', '2001-04-07'),
(6, 'moinha', '123456', '124', '123456', 'moinha@gmail.com', '123456', 0, 0, 'male', '2011-11-11');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `album_images`
--
ALTER TABLE `album_images`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `productId` (`productId`),
  ADD KEY `userId` (`userId`);

--
-- Chỉ mục cho bảng `danh_muc`
--
ALTER TABLE `danh_muc`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `login`
--
ALTER TABLE `login`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `nha_sx`
--
ALTER TABLE `nha_sx`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_danhmuc` (`id_danhmuc`);

--
-- Chỉ mục cho bảng `orderDetails`
--
ALTER TABLE `orderDetails`
  ADD PRIMARY KEY (`id`),
  ADD KEY `orderId` (`orderId`),
  ADD KEY `productId` (`productId`);

--
-- Chỉ mục cho bảng `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Chỉ mục cho bảng `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `productId` (`productId`);

--
-- Chỉ mục cho bảng `san_pham`
--
ALTER TABLE `san_pham`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_nhasx` (`id_nhasx`),
  ADD KEY `id_danhmuc` (`id_danhmuc`);

--
-- Chỉ mục cho bảng `tinh_chat`
--
ALTER TABLE `tinh_chat`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `san_pham` (`id`),
  ADD CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`);

--
-- Các ràng buộc cho bảng `nha_sx`
--
ALTER TABLE `nha_sx`
  ADD CONSTRAINT `nha_sx_ibfk_1` FOREIGN KEY (`id_danhmuc`) REFERENCES `danh_muc` (`id`);

--
-- Các ràng buộc cho bảng `orderDetails`
--
ALTER TABLE `orderDetails`
  ADD CONSTRAINT `orderDetails_ibfk_1` FOREIGN KEY (`orderId`) REFERENCES `orders` (`id`),
  ADD CONSTRAINT `orderDetails_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `san_pham` (`id`);

--
-- Các ràng buộc cho bảng `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`);

--
-- Các ràng buộc cho bảng `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `san_pham` (`id`);

--
-- Các ràng buộc cho bảng `san_pham`
--
ALTER TABLE `san_pham`
  ADD CONSTRAINT `san_pham_ibfk_1` FOREIGN KEY (`id_nhasx`) REFERENCES `nha_sx` (`id`),
  ADD CONSTRAINT `san_pham_ibfk_2` FOREIGN KEY (`id_danhmuc`) REFERENCES `danh_muc` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
