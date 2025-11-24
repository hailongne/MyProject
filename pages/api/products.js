// backend/pages/api/products.js

const products = [
  {
    id: 1,
    title: 'Cáp Treo Bà Nà Hills Khứ Hồi',
    image: 'https://picsum.photos/400/300?random=1',
    price: 582000,
    originalPrice: 647000,
    location: 'Đà Nẵng',
    discount: '11% OFF',
    dateRange: '1/11/2025 - 11/11/2025',
    rating: 4.5,
    reviews: 1945,
  },
  {
    id: 2,
    title: 'Cáp Treo Hòn Thơm Khứ Hồi',
    image: 'https://picsum.photos/400/300?random=2',
    price: 750000,
    originalPrice: 835000,
    location: 'Phú Quốc',
    discount: '11% OFF',
    dateRange: '1/11/2025 - 11/11/2025',
    rating: 4.6,
    reviews: 9955,
  },
  {
    id: 3,
    title: 'Sun World Bà Nà Hills',
    image: 'https://picsum.photos/400/300?random=3',
    price: 750000,
    originalPrice: 835000,
    location: 'Đà Nẵng',
    discount: '11% OFF',
    dateRange: '1/11/2025 - 11/11/2025',
    rating: 4.4,
    reviews: 8750,
  },
  {
    id: 4,
    title: 'VinWonders Phú Quốc',
    image: 'https://picsum.photos/400/300?random=4',
    price: 680000,
    originalPrice: 755000,
    location: 'Phú Quốc',
    discount: '11% OFF',
    dateRange: '1/11/2025 - 11/11/2025',
    rating: 4.7,
    reviews: 12500,
  },
  {
    id: 5,
    title: 'Nhà Thờ Đức Bà Sài Gòn',
    image: 'https://picsum.photos/400/300?random=5',
    price: 350000,
    originalPrice: 390000,
    location: 'Sài Gòn',
    discount: '11% OFF',
    dateRange: '1/11/2025 - 11/11/2025',
    rating: 4.3,
    reviews: 4250,
  },
  {
    id: 6,
    title: 'Biển Nha Trang',
    image: 'https://picsum.photos/400/300?random=6',
    price: 250000,
    originalPrice: 280000,
    location: 'Nha Trang',
    discount: '11% OFF',
    dateRange: '1/11/2025 - 11/11/2025',
    rating: 4.4,
    reviews: 7280,
  },
  {
    id: 7,
    title: 'Hoàng Thành Huế',
    image: 'https://picsum.photos/400/300?random=7',
    price: 420000,
    originalPrice: 467000,
    location: 'Huế',
    discount: '11% OFF',
    dateRange: '1/11/2025 - 11/11/2025',
    rating: 4.2,
    reviews: 3560,
  },
  {
    id: 8,
    title: 'Cố Đô Huế',
    image: 'https://picsum.photos/400/300?random=8',
    price: 650000,
    originalPrice: 722000,
    location: 'Huế',
    discount: '11% OFF',
    dateRange: '1/11/2025 - 11/11/2025',
    rating: 4.5,
    reviews: 6340,
  },
];

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

  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  res.status(200).json(products);
}
