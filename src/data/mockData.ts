
import { Product, Category } from '../types';

// Extended product list with 20+ items per subcategory
export const mockProducts: Product[] = [
  // Smartphones (20+ items)
  {
    id: '1',
    name: 'Apple iPhone 15 Pro',
    description: 'Latest iPhone with A17 Pro chip and titanium design',
    price: 89999,
    originalPrice: 99999,
    image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=500',
    category: 'Electronics',
    subcategory: 'smartphones',
    brand: 'Apple',
    rating: 4.8,
    reviews: 1247,
    availability: true,
    deliveryTime: '2-3 days',
    specifications: {
      'Display': '6.1-inch Super Retina XDR',
      'Chip': 'A17 Pro',
      'Storage': '128GB',
      'Camera': '48MP Main + 12MP Ultra Wide'
    }
  },
  {
    id: '2',
    name: 'Samsung Galaxy S24 Ultra',
    description: 'Premium Android flagship with S Pen and 200MP camera',
    price: 87999,
    originalPrice: 94999,
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500',
    category: 'Electronics',
    subcategory: 'smartphones',
    brand: 'Samsung',
    rating: 4.7,
    reviews: 892,
    availability: true,
    deliveryTime: '1-2 days'
  },
  {
    id: '3',
    name: 'OnePlus 12',
    description: 'Flagship killer with Snapdragon 8 Gen 3 and 120Hz display',
    price: 64999,
    originalPrice: 69999,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500',
    category: 'Electronics',
    subcategory: 'smartphones',
    brand: 'OnePlus',
    rating: 4.6,
    reviews: 654,
    availability: true,
    deliveryTime: '2-3 days'
  },
  {
    id: '4',
    name: 'Google Pixel 8 Pro',
    description: 'AI-powered photography with Google Tensor G3 chip',
    price: 84999,
    originalPrice: 89999,
    image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=500',
    category: 'Electronics',
    subcategory: 'smartphones',
    brand: 'Google',
    rating: 4.5,
    reviews: 423,
    availability: true,
    deliveryTime: '3-4 days'
  },
  {
    id: '5',
    name: 'Xiaomi 14 Ultra',
    description: 'Professional photography smartphone with Leica cameras',
    price: 79999,
    originalPrice: 84999,
    image: 'https://images.unsplash.com/photo-1567581935884-3349723552ca?w=500',
    category: 'Electronics',
    subcategory: 'smartphones',
    brand: 'Xiaomi',
    rating: 4.4,
    reviews: 567,
    availability: true,
    deliveryTime: '2-3 days'
  },

  // Laptops (20+ items)
  {
    id: '6',
    name: 'MacBook Air M3',
    description: '13-inch laptop with M3 chip for ultimate performance',
    price: 114900,
    originalPrice: 124900,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500',
    category: 'Electronics',
    subcategory: 'laptops',
    brand: 'Apple',
    rating: 4.9,
    reviews: 2341,
    availability: true,
    deliveryTime: '5-7 days'
  },
  {
    id: '7',
    name: 'Dell XPS 13',
    description: 'Premium ultrabook with Intel Core i7 and stunning display',
    price: 89999,
    originalPrice: 99999,
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500',
    category: 'Electronics',
    subcategory: 'laptops',
    brand: 'Dell',
    rating: 4.6,
    reviews: 1876,
    availability: true,
    deliveryTime: '3-5 days'
  },
  {
    id: '8',
    name: 'ASUS ROG Strix G15',
    description: 'Gaming laptop with RTX 4060 and AMD Ryzen 7',
    price: 84999,
    originalPrice: 94999,
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500',
    category: 'Electronics',
    subcategory: 'laptops',
    brand: 'ASUS',
    rating: 4.5,
    reviews: 1234,
    availability: true,
    deliveryTime: '2-4 days'
  },

  // Fashion items
  {
    id: '9',
    name: 'Nike Air Max 270',
    description: 'Comfortable running shoes with Air Max technology',
    price: 8999,
    originalPrice: 11999,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
    category: 'Fashion',
    subcategory: 'mens-shoes',
    brand: 'Nike',
    rating: 4.7,
    reviews: 456,
    availability: true,
    deliveryTime: '3-5 days'
  },
  {
    id: '10',
    name: 'Adidas Ultraboost 22',
    description: 'Premium running shoes with Boost midsole',
    price: 12999,
    originalPrice: 15999,
    image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=500',
    category: 'Fashion',
    subcategory: 'mens-shoes',
    brand: 'Adidas',
    rating: 4.5,
    reviews: 678,
    availability: true,
    deliveryTime: '2-3 days'
  },

  // Audio Systems
  {
    id: '11',
    name: 'Sony WH-1000XM5',
    description: 'Industry-leading noise canceling headphones',
    price: 29990,
    originalPrice: 34990,
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500',
    category: 'Electronics',
    subcategory: 'audio-systems',
    brand: 'Sony',
    rating: 4.8,
    reviews: 1876,
    availability: true,
    deliveryTime: '2-4 days'
  },
  {
    id: '12',
    name: 'Samsung Galaxy Buds2 Pro',
    description: 'Premium wireless earbuds with active noise cancellation',
    price: 15999,
    originalPrice: 18999,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500',
    category: 'Electronics',
    subcategory: 'audio-systems',
    brand: 'Samsung',
    rating: 4.6,
    reviews: 892,
    availability: true,
    deliveryTime: '1-2 days'
  }
];

// Generate more products programmatically for each subcategory
const generateMoreProducts = (): Product[] => {
  const additionalProducts: Product[] = [];
  const subcategories = [
    'smartphones', 'laptops', 'tablets', 'desktop-computers', 'computer-accessories', 'mobile-accessories',
    'televisions', 'refrigerators', 'washing-machines', 'air-conditioners', 'kitchen-appliances', 'audio-systems',
    'mens-clothing', 'mens-shoes', 'mens-accessories', 'mens-watches', 'mens-bags', 'mens-grooming',
    'womens-clothing', 'womens-shoes', 'womens-accessories', 'womens-bags', 'jewelry', 'beauty-cosmetics',
    'home-decor', 'kitchen-dining', 'furniture', 'bedding-bath', 'garden-outdoor', 'pet-supplies',
    'skincare', 'makeup', 'health-supplements', 'personal-care', 'grocery', 'organic-natural'
  ];

  const productTemplates = [
    { name: 'Premium Product', price: 25999, originalPrice: 29999, rating: 4.5 },
    { name: 'Budget-Friendly Option', price: 8999, originalPrice: 12999, rating: 4.2 },
    { name: 'Luxury Edition', price: 45999, originalPrice: 52999, rating: 4.8 },
    { name: 'Value Pack', price: 15999, originalPrice: 19999, rating: 4.3 },
    { name: 'Professional Grade', price: 35999, originalPrice: 39999, rating: 4.7 }
  ];

  const images = [
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
    'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500',
    'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=500',
    'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500',
    'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500'
  ];

  subcategories.forEach(subcategory => {
    for (let i = 0; i < 25; i++) {
      const template = productTemplates[i % productTemplates.length];
      additionalProducts.push({
        id: `${subcategory}-${i + 100}`,
        name: `${template.name} ${i + 1}`,
        description: `High-quality product for ${subcategory.replace('-', ' ')} category`,
        price: template.price + (Math.random() * 10000),
        originalPrice: template.originalPrice + (Math.random() * 10000),
        image: images[i % images.length],
        category: subcategory.includes('mens') || subcategory.includes('womens') ? 'Fashion' : 'Electronics',
        subcategory,
        brand: ['Apple', 'Samsung', 'Sony', 'Nike', 'Adidas'][i % 5],
        rating: template.rating + (Math.random() * 0.5),
        reviews: Math.floor(Math.random() * 1000) + 100,
        availability: true,
        deliveryTime: ['1-2 days', '2-3 days', '3-5 days'][i % 3]
      });
    }
  });

  return additionalProducts;
};

// Combine base products with generated ones
export const allProducts = [...mockProducts, ...generateMoreProducts()];

export const mockCategories: Category[] = [
  {
    id: 'electronics',
    name: 'Electronics',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400',
    productCount: 156
  },
  {
    id: 'fashion',
    name: 'Fashion',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400',
    productCount: 245
  },
  {
    id: 'home',
    name: 'Home & Garden',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400',
    productCount: 89
  },
  {
    id: 'sports',
    name: 'Sports & Fitness',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
    productCount: 134
  }
];
