
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Grid3X3 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AIAssistant from '../components/AIAssistant';

interface SubCategory {
  id: string;
  name: string;
  image: string;
  productCount: number;
  description: string;
}

interface Category {
  id: string;
  name: string;
  image: string;
  productCount: number;
  subcategories: SubCategory[];
}

const categories: Category[] = [
  {
    id: 'mobiles-computers',
    name: 'Mobiles, Computers',
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400',
    productCount: 2500,
    subcategories: [
      { 
        id: 'smartphones', 
        name: 'Smartphones', 
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300', 
        productCount: 850,
        description: 'Latest smartphones with advanced features and high-performance processors'
      },
      { 
        id: 'laptops', 
        name: 'Laptops', 
        image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300', 
        productCount: 420,
        description: 'High-performance laptops for work, gaming, and creative tasks'
      },
      { 
        id: 'tablets', 
        name: 'Tablets', 
        image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300', 
        productCount: 180,
        description: 'Portable tablets perfect for entertainment and productivity'
      },
      { 
        id: 'desktop-computers', 
        name: 'Desktop Computers', 
        image: 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=300', 
        productCount: 250,
        description: 'Powerful desktop computers for professional and gaming use'
      },
      { 
        id: 'computer-accessories', 
        name: 'Computer Accessories', 
        image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300', 
        productCount: 680,
        description: 'Essential accessories including keyboards, mice, and monitors'
      },
      { 
        id: 'mobile-accessories', 
        name: 'Mobile Accessories', 
        image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=300', 
        productCount: 120,
        description: 'Protective cases, chargers, and mobile enhancement accessories'
      }
    ]
  },
  {
    id: 'tv-appliances-electronics',
    name: 'TV, Appliances, Electronics',
    image: 'https://images.unsplash.com/photo-1567690187548-f07b1d7bf5a9?w=400',
    productCount: 1800,
    subcategories: [
      { 
        id: 'televisions', 
        name: 'Televisions', 
        image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=300', 
        productCount: 320,
        description: 'Smart TVs with 4K resolution and streaming capabilities'
      },
      { 
        id: 'refrigerators', 
        name: 'Refrigerators', 
        image: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=300', 
        productCount: 180,
        description: 'Energy-efficient refrigerators with advanced cooling technology'
      },
      { 
        id: 'washing-machines', 
        name: 'Washing Machines', 
        image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300', 
        productCount: 150,
        description: 'Automatic washing machines with multiple wash programs'
      },
      { 
        id: 'air-conditioners', 
        name: 'Air Conditioners', 
        image: 'https://images.unsplash.com/photo-1634712282287-14ed57b9cc89?w=300', 
        productCount: 95,
        description: 'Energy-efficient air conditioners for optimal climate control'
      },
      { 
        id: 'kitchen-appliances', 
        name: 'Kitchen Appliances', 
        image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300', 
        productCount: 780,
        description: 'Modern kitchen appliances for convenient cooking and food preparation'
      },
      { 
        id: 'audio-systems', 
        name: 'Audio Systems', 
        image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=300', 
        productCount: 275,
        description: 'High-quality speakers, headphones, and sound systems'
      }
    ]
  },
  {
    id: 'mens-fashion',
    name: "Men's Fashion",
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    productCount: 3200,
    subcategories: [
      { 
        id: 'mens-clothing', 
        name: 'Clothing', 
        image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=300', 
        productCount: 1200,
        description: 'Trendy shirts, pants, jackets, and formal wear for men'
      },
      { 
        id: 'mens-shoes', 
        name: 'Shoes & Footwear', 
        image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300', 
        productCount: 680,
        description: 'Comfortable and stylish shoes for every occasion'
      },
      { 
        id: 'mens-accessories', 
        name: 'Accessories', 
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300', 
        productCount: 450,
        description: 'Belts, ties, sunglasses, and other fashion accessories'
      },
      { 
        id: 'mens-watches', 
        name: 'Watches', 
        image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=300', 
        productCount: 320,
        description: 'Classic and modern watches for style and functionality'
      },
      { 
        id: 'mens-bags', 
        name: 'Bags & Wallets', 
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300', 
        productCount: 380,
        description: 'Leather bags, backpacks, and premium wallets'
      },
      { 
        id: 'mens-grooming', 
        name: 'Grooming', 
        image: 'https://images.unsplash.com/photo-1595113316349-9fa4eb24f884?w=300', 
        productCount: 170,
        description: 'Skincare, haircare, and grooming essentials for men'
      }
    ]
  },
  {
    id: 'womens-fashion',
    name: "Women's Fashion",
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400',
    productCount: 4100,
    subcategories: [
      { 
        id: 'womens-clothing', 
        name: 'Clothing', 
        image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=300', 
        productCount: 1800,
        description: 'Latest fashion trends in dresses, tops, and ethnic wear'
      },
      { 
        id: 'womens-shoes', 
        name: 'Shoes & Footwear', 
        image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=300', 
        productCount: 750,
        description: 'Elegant heels, comfortable flats, and trendy sneakers'
      },
      { 
        id: 'womens-accessories', 
        name: 'Accessories', 
        image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300', 
        productCount: 680,
        description: 'Scarves, sunglasses, hair accessories, and more'
      },
      { 
        id: 'womens-bags', 
        name: 'Bags & Purses', 
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300', 
        productCount: 420,
        description: 'Designer handbags, purses, and travel bags'
      },
      { 
        id: 'jewelry', 
        name: 'Jewelry', 
        image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300', 
        productCount: 320,
        description: 'Elegant necklaces, earrings, rings, and bracelets'
      },
      { 
        id: 'beauty-cosmetics', 
        name: 'Beauty & Cosmetics', 
        image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300', 
        productCount: 130,
        description: 'Makeup, skincare, and beauty enhancement products'
      }
    ]
  },
  {
    id: 'home-kitchen-pets',
    name: 'Home, Kitchen, Pets',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400',
    productCount: 2800,
    subcategories: [
      { 
        id: 'home-decor', 
        name: 'Home Decor', 
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300', 
        productCount: 920,
        description: 'Beautiful decorative items to enhance your living space'
      },
      { 
        id: 'kitchen-dining', 
        name: 'Kitchen & Dining', 
        image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300', 
        productCount: 680,
        description: 'Cookware, utensils, and dining essentials'
      },
      { 
        id: 'furniture', 
        name: 'Furniture', 
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300', 
        productCount: 450,
        description: 'Comfortable and stylish furniture for every room'
      },
      { 
        id: 'bedding-bath', 
        name: 'Bedding & Bath', 
        image: 'https://images.unsplash.com/photo-1631889993959-41b4e9c6e3c5?w=300', 
        productCount: 380,
        description: 'Comfortable bedding and luxurious bath accessories'
      },
      { 
        id: 'garden-outdoor', 
        name: 'Garden & Outdoor', 
        image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=300', 
        productCount: 250,
        description: 'Gardening tools and outdoor living essentials'
      },
      { 
        id: 'pet-supplies', 
        name: 'Pet Supplies', 
        image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=300', 
        productCount: 120,
        description: 'Everything your furry friends need for a happy life'
      }
    ]
  },
  {
    id: 'beauty-health-grocery',
    name: 'Beauty, Health, Grocery',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400',
    productCount: 1900,
    subcategories: [
      { 
        id: 'skincare', 
        name: 'Skincare', 
        image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300', 
        productCount: 420,
        description: 'Premium skincare products for healthy, glowing skin'
      },
      { 
        id: 'makeup', 
        name: 'Makeup', 
        image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=300', 
        productCount: 380,
        description: 'Professional makeup products and beauty tools'
      },
      { 
        id: 'health-supplements', 
        name: 'Health & Supplements', 
        image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300', 
        productCount: 320,
        description: 'Vitamins, minerals, and health supplements'
      },
      { 
        id: 'personal-care', 
        name: 'Personal Care', 
        image: 'https://images.unsplash.com/photo-1595113316349-9fa4eb24f884?w=300', 
        productCount: 280,
        description: 'Daily essentials for personal hygiene and care'
      },
      { 
        id: 'grocery', 
        name: 'Grocery & Food', 
        image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=300', 
        productCount: 350,
        description: 'Fresh groceries and packaged food items'
      },
      { 
        id: 'organic-natural', 
        name: 'Organic & Natural', 
        image: 'https://images.unsplash.com/photo-1609501676725-7186f12c4d4f?w=300', 
        productCount: 150,
        description: 'Organic and natural products for a healthy lifestyle'
      }
    ]
  }
];

const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const selectedCategoryData = categories.find(cat => cat.id === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-6 md:py-8">
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-navy mb-2 md:mb-4">Shop by Category</h1>
          <p className="text-gray-600 text-base md:text-lg">Discover products across all categories</p>
        </div>

        {!selectedCategory ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {categories.map((category) => (
              <Card 
                key={category.id} 
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer overflow-hidden"
                onClick={() => setSelectedCategory(category.id)}
              >
                <div className="relative">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-40 md:h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-3 md:bottom-4 left-3 md:left-4 text-white">
                    <h3 className="text-lg md:text-xl font-bold mb-1">{category.name}</h3>
                    <p className="text-sm text-gray-200">{category.productCount}+ products</p>
                  </div>
                  <div className="absolute top-3 md:top-4 right-3 md:right-4 bg-mint text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 md:mb-8">
              <div className="mb-4 md:mb-0">
                <h2 className="text-xl md:text-2xl font-bold text-navy mb-2">{selectedCategoryData?.name}</h2>
                <p className="text-gray-600 text-sm md:text-base">Choose from {selectedCategoryData?.subcategories.length} subcategories</p>
              </div>
              <Button
                variant="outline"
                onClick={() => setSelectedCategory(null)}
                className="w-full md:w-auto border-navy text-navy hover:bg-navy hover:text-white"
              >
                Back to Categories
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {selectedCategoryData?.subcategories.map((subcategory) => (
                <Link 
                  key={subcategory.id} 
                  to={`/products?subcategory=${subcategory.id}`}
                >
                  <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden h-full">
                    <div className="relative">
                      <img
                        src={subcategory.image}
                        alt={subcategory.name}
                        className="w-full h-32 md:h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                    </div>
                    <CardContent className="p-3 md:p-4">
                      <h3 className="text-base md:text-lg font-semibold text-navy mb-1 md:mb-2">{subcategory.name}</h3>
                      <p className="text-xs md:text-sm text-gray-500 mb-2">{subcategory.productCount} products</p>
                      <p className="text-xs md:text-sm text-gray-600 line-clamp-2">{subcategory.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
      <AIAssistant />
    </div>
  );
};

export default Categories;
