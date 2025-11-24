// backend/pages/api/products/[id].js

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5555');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { id } = req.query;

  const db = {
    1: {
      id: 1,
      title: 'Cáp Treo Bà Nà Hills Khứ Hồi',
      image: 'https://picsum.photos/400/300?random=1',
      price: 582000,
      originalPrice: 647000,
      location: 'Đà Nẵng',
      discount: '11% OFF',
      rating: 4.5,
      reviews: 1945,
      description: 'Trải nghiệm cáp treo Bà Nà Hills - một trong những điểm đến nổi tiếng nhất Việt Nam. Hành trình cáp treo dài nhất thế giới mang đến khung cảnh tuyệt đẹp của núi rừng Bà Nà. Khám phá công viên vui chơi Fantasy Park, Hầm Rượu Debay, Chùa Linh Ứng và nhiều điểm tham quan khác.',
      areas: [
        { id: 1, name: 'Cáp treo Bà Nà Hills' },
        { id: 2, name: 'Vườn Pháp' },
        { id: 3, name: 'Khu vui chơi Golden Hands' },
      ],
      timeSlots: ['07:30-11:00', '11:00-15:00', '15:00-17:00'],
    },
    2: {
      id: 2,
      title: 'Cáp Treo Hòn Thơm Khứ Hồi',
      image: 'https://picsum.photos/400/300?random=2',
      price: 750000,
      originalPrice: 835000,
      location: 'Phú Quốc',
      discount: '11% OFF',
      rating: 4.6,
      reviews: 9955,
      description: 'Khám phá Cáp Treo Hòn Thơm - biểu tượng du lịch Phú Quốc. Hành trình cáp treo với tổng chiều dài hơn 8km mang đến tầm nhìn tuyệt đẹp ra biển Đông. Trải nghiệm zipline, cầu treo kính, và ngắm hoàng hôn tuyệt đẹp từ độ cao 100m.',
      areas: [
        { id: 1, name: 'Cáp treo Hòn Thơm' },
        { id: 2, name: 'Bãi Sao' },
      ],
      timeSlots: ['08:00-12:00', '12:00-16:00', '16:00-18:00'],
    },
    3: {
      id: 3,
      title: 'Sun World Bà Nà Hills',
      image: 'https://picsum.photos/400/300?random=3',
      price: 750000,
      originalPrice: 835000,
      location: 'Đà Nẵng',
      discount: '11% OFF',
      rating: 4.4,
      reviews: 8750,
      description: 'Khu du lịch Sun World Bà Nà Hills - "Đà Lạt của miền Trung". Trải nghiệm khí hậu bốn mùa trong ngày, khám phá Cầu Vàng nổi tiếng thế giới, Làng Pháp với kiến trúc châu Âu, và công viên Fantasy Park với nhiều trò chơi mạo hiểm.',
      areas: [
        { id: 1, name: 'Cầu Vàng' },
        { id: 2, name: 'Làng Pháp' },
        { id: 3, name: 'Fantasy Park' },
        { id: 4, name: 'Hầm Rượu Debay' },
      ],
      timeSlots: ['07:00-11:30', '11:30-16:00', '16:00-17:30'],
    },
    4: {
      id: 4,
      title: 'VinWonders Phú Quốc',
      image: 'https://picsum.photos/400/300?random=4',
      price: 680000,
      originalPrice: 755000,
      location: 'Phú Quốc',
      discount: '11% OFF',
      rating: 4.7,
      reviews: 12500,
      description: 'VinWonders Phú Quốc - công viên giải trí lớn nhất Việt Nam với 7 phân khu chính. Trải nghiệm Công viên nước, Thế giới lưỡng cư, và nhiều show diễn đặc sắc. Đặc biệt với công viên chủ đề dành cho trẻ em và người lớn.',
      areas: [
        { id: 1, name: 'Công viên nước' },
        { id: 2, name: 'Thế giới lưỡng cư' },
        { id: 3, name: 'Làng Cá Heo' },
        { id: 4, name: 'Khu vui chơi thiếu nhi' },
      ],
      timeSlots: ['09:00-13:00', '13:00-17:00', '17:00-20:00'],
    },
    5: {
      id: 5,
      title: 'Nhà Thờ Đức Bà Sài Gòn',
      image: 'https://picsum.photos/400/300?random=5',
      price: 350000,
      originalPrice: 390000,
      location: 'Sài Gòn',
      discount: '11% OFF',
      rating: 4.3,
      reviews: 4250,
      description: 'Nhà Thờ Đức Bà - biểu tượng kiến trúc của Sài Gòn từ thế kỷ XIX. Ngắm kiến trúc Gothic, tham quan nội thất và chụp ảnh với hàng cột trụ khổng lồ. Khám phá lịch sử và văn hóa của thời kỳ Pháp thuộc.',
      areas: [
        { id: 1, name: 'Nhà chính tòa' },
        { id: 2, name: 'Vườn thánh' },
        { id: 3, name: 'Quảng trường' },
        { id: 2, name: 'Vườn thánh' },
        { id: 3, name: 'Quảng trường' },
      ],
      timeSlots: ['08:00-11:00', '14:00-17:00'],
    },
    6: {
      id: 6,
      title: 'Biển Nha Trang',
      image: 'https://picsum.photos/400/300?random=6',
      price: 250000,
      originalPrice: 280000,
      location: 'Nha Trang',
      discount: '11% OFF',
      rating: 4.4,
      reviews: 7280,
      description: 'Thành phố biển Nha Trang - điểm đến nghỉ dưỡng nổi tiếng Việt Nam. Thưởng thức bãi biển trắng mịn, nước xanh trong vắt. Khám phá làng chài cổ, bảo tàng biển, đèo Cả và nhiều điểm vui chơi giải trí ven biển.',
      areas: [
        { id: 1, name: 'Bãi biển Nha Trang' },
        { id: 2, name: 'Làng chài cổ' },
        { id: 3, name: 'Bảo tàng biển' },
        { id: 4, name: 'Đèo Cả' },
      ],
      timeSlots: ['06:00-10:00', '14:00-18:00'],
    },
    7: {
      id: 7,
      title: 'Hoàng Thành Huế',
      image: 'https://picsum.photos/400/300?random=7',
      price: 420000,
      originalPrice: 467000,
      location: 'Huế',
      discount: '11% OFF',
      rating: 4.2,
      reviews: 3560,
      description: 'Hoàng Thành Huế - di tích lịch sử văn hóa thế giới. Khám phá cung điện xưa của nhà Nguyễn, nghe đờn ca tài tử Huế, thưởng thức đặc sản cố đô. Hành trình ngược thời gian về triều Nguyễn với kiến trúc cung đình độc đáo.',
      areas: [
        { id: 1, name: 'Ngọ Môn' },
        { id: 2, name: 'Thái Hòa Điện' },
        { id: 3, name: 'Thiện Điền - nhà thơ' },
        { id: 4, name: 'Hồ Thủy Tiên' },
      ],
      timeSlots: ['08:00-12:00', '13:00-17:00'],
    },
    8: {
      id: 8,
      title: 'Cố Đô Huế',
      image: 'https://picsum.photos/400/300?random=8',
      price: 650000,
      originalPrice: 722000,
      location: 'Huế',
      discount: '11% OFF',
      rating: 4.5,
      reviews: 6340,
      description: 'Tour Cố Đô Huế - khám phá toàn bộ quần thể di tích Huế. Bao gồm chùa Thiên Mụ, lăng tẩm các vua Nguyễn, nghe đờn ca tài tử và thưởng thức ẩm thực Huế. Trải nghiệm đầy đủ văn hóa cung đình Việt Nam.',
      areas: [
        { id: 1, name: 'Chùa Thiên Mụ' },
        { id: 2, name: 'Lăng vua Gia Long' },
        { id: 3, name: 'Lăng vua Minh Mạng' },
        { id: 4, name: 'Lăng vua Khải Định' },
        { id: 5, name: 'Lăng vua Thiệu Trị' },
      ],
      timeSlots: ['07:30-11:30', '13:30-17:30'],
    },
  };

  const product = db[id];
  if (!product) return res.status(404).json({ error: 'Not found' });
  res.status(200).json(product);
}
