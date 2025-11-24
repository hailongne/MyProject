// backend/pages/api/dealhot.js

const deals = [
  {
    id: 1,
    title: 'Combo Bà Nà Hills: Cáp Treo Khứ Hồi & Buffet Trưa',
    image: 'https://picsum.photos/300/400?random=9',
    badge: 'Miễn phí Show After Glow',
    location1: 'Buffet Trưa Sẵn Bà Nà Hills',
    price1: 380000,
    location2: 'Cáp Treo Bà Nà',
    price2: 950000,
    finalPrice: 922000,
    originalPrice: 985000,
    reviews: 32162,
  },
  {
    id: 2,
    title: 'Combo Hòn Thơm: Cáp Treo Khứ Hồi & Buffet Trưa',
    image: 'https://picsum.photos/300/400?random=10',
    badge: 'Miễn phí vé Cầu Hôn',
    location1: 'Cáp Treo Hòn Thơm',
    price1: 700000,
    location2: 'Buffet Trưa Nhà Hàng Mango',
    price2: 370000,
    finalPrice: 1000000,
    originalPrice: 1090000,
    reviews: 7459,
  },
  {
    id: 3,
    title: 'Combo Trọn Gói: Cáp Treo, Buffet Trưa & Tàu Hòa Mường Hoa',
    image: 'https://picsum.photos/300/400?random=11',
    locations: [
      { name: 'Cáp Treo Fansipan', price: 850000 },
      { name: 'Vé buffet trưa', price: 300000 },
      { name: 'Tàu Hòa Mường Hoa Khứ Hồi', price: 200000 },
    ],
    finalPrice: 1164000,
    originalPrice: 1281000,
    reviews: 9217,
  },
  {
    id: 4,
    title: 'Combo All In One Núi Bà Đen: Cáp Treo Khứ Hồi & Buffet Trưa',
    image: 'https://picsum.photos/300/400?random=12',
    badge: 'Hữu ích nhượng lợi',
    location1: 'Cáp Treo Chúa Hàng',
    price1: 250000,
    location2: 'Buffet Văn Sơn - Nhà Hàng Sơn Kitchen',
    price2: 270000,
    location3: 'Cáp Treo Tâm An',
    price3: 400000,
    finalPrice: 625000,
    originalPrice: 688000,
    reviews: 7639,
  },
];

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  res.status(200).json(deals);
}
