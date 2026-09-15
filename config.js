// Store Configuration
const STORE_CONFIG = {
  storeName: 'خيرات دجبية',
  whatsappNumber: '21650000000', // Replace with your WhatsApp number (include country code, no +)
  
  contact: {
    phone: '+216 50 000 000',
    email: 'info@khayrat-dijbia.tn',
    address: 'دجبة، تونس',
  },
  
  delivery: 'التوصيل متوفر إلى كامل تراب الجمهورية',
  paymentMethod: 'الدفع عند التوصيل',
  businessHours: 'من الاثنين إلى الجمعة، من 9 صباحًا إلى 17 مساءً',
  
  social: {
    facebook: 'https://facebook.com/khayrat-dijbia',
    instagram: 'https://instagram.com/khayrat_dijbia',
    tiktok: 'https://tiktok.com/@khayrat_dijbia',
  },
};

// Products Database
const PRODUCTS = [
  {
    id: 1,
    name: 'الفلفل الأحمر الناشف',
    category: 'خضر',
    price: 12.5,
    oldPrice: null,
    image: 'https://images.unsplash.com/photo-1585518419759-efb7a2b61e65?w=500&h=500&fit=crop',
    description: 'فلفل أحمر ناشف طازج من دجبة',
  },
  {
    id: 2,
    name: 'التين الجاف',
    category: 'فواكه',
    price: 18.0,
    oldPrice: 22.0,
    image: 'https://images.unsplash.com/photo-1599599810694-a5d5d5d5d5d5?w=500&h=500&fit=crop',
    description: 'تين جاف عالي الجودة',
    discount: 18,
  },
  {
    id: 3,
    name: 'التمر المجفف',
    category: 'فواكه',
    price: 15.0,
    oldPrice: null,
    image: 'https://images.unsplash.com/photo-1599599810694-a5d5d5d5d5d5?w=500&h=500&fit=crop',
    description: 'تمر مجفف طازج',
  },
  {
    id: 4,
    name: 'الفلفل الأسود',
    category: 'توابل',
    price: 25.0,
    oldPrice: 30.0,
    image: 'https://images.unsplash.com/photo-1585518419759-efb7a2b61e65?w=500&h=500&fit=crop',
    description: 'فلفل أسود درجة أولى',
    discount: 17,
  },
  {
    id: 5,
    name: 'الزعتر البري',
    category: 'توابل',
    price: 14.0,
    oldPrice: null,
    image: 'https://images.unsplash.com/photo-1599599810694-a5d5d5d5d5d5?w=500&h=500&fit=crop',
    description: 'زعتر بري طازج من الجبال',
  },
  {
    id: 6,
    name: 'الثوم الناشف',
    category: 'خضر',
    price: 16.0,
    oldPrice: 20.0,
    image: 'https://images.unsplash.com/photo-1585518419759-efb7a2b61e65?w=500&h=500&fit=crop',
    description: 'ثوم ناشف محلي',
    discount: 20,
  },
];