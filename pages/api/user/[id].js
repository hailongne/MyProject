export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { id } = req.query;

  // Dữ liệu mẫu đầy đủ
  const user = {
    id,
    firstName: 'Nguyễn',
    lastName: 'Văn A',
    email: 'nguyenvana@gmail.com',
    history: [
      {
        id: 'ORD001',
        product: 'Cáp Treo Bà Nà Hills Khứ Hồi',
        date: '2024-12-20',          // ngày sử dụng
        bookingDate: '2024-12-01',   // ngày đặt
        location: 'Đà Nẵng',
        tickets: 3,
        price: 1746000,              // tổng tiền
        status: 'success',
        image: 'https://picsum.photos/100/100?random=1',
        adults: 2,
        children: 1,
        seniors: 0,
        pricePerAdult: 582000,
        pricePerChild: 291000,
        pricePerSenior: 465600
      },
      {
        id: 'ORD002',
        product: 'Cáp Treo Hòn Thơm Khứ Hồi',
        date: '2024-12-25',
        bookingDate: '2024-12-05',
        location: 'Phú Quốc',
        tickets: 2,
        price: 1500000,
        status: 'pending',
        image: 'https://picsum.photos/100/100?random=2',
        adults: 1,
        children: 1,
        seniors: 0,
        pricePerAdult: 750000,
        pricePerChild: 375000,
        pricePerSenior: 600000
      },
      {
        id: 'ORD003',
        product: 'Cáp Treo Bà Nà Hills Khứ Hồi',
        date: '2024-11-15',
        bookingDate: '2024-11-10',
        location: 'Đà Nẵng',
        tickets: 1,
        price: 582000,
        status: 'cancelled',
        image: 'https://picsum.photos/100/100?random=3',
        adults: 1,
        children: 0,
        seniors: 0,
        pricePerAdult: 582000,
        pricePerChild: 291000,
        pricePerSenior: 465600
      }
    ]
  };

  if (req.method === 'GET') {
    return res.status(200).json(user);
  }

  if (req.method === 'PUT') {
    const updatedUser = req.body;
    return res.status(200).json({
      message: 'Cập nhật thành công',
      user: updatedUser,
    });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
