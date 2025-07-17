
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ShoppingCart, Heart, Share2, Plus, Minus, Truck, Shield, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AIAssistant from '../components/AIAssistant';
import { useApp } from '../context/AppContext';
import { mockProducts } from '../data/mockData';
import { Product } from '../types';
import { toast } from '@/hooks/use-toast';
import { getProductRecommendations } from '../services/geminiService';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { dispatch } = useApp();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [aiRecommendation, setAiRecommendation] = useState('');
  const [isLoadingAI, setIsLoadingAI] = useState(false);

  useEffect(() => {
    const foundProduct = mockProducts.find(p => p.id === id);
    if (foundProduct) {
      setProduct(foundProduct);
      getAIProductAnalysis(foundProduct);
    }
  }, [id]);

  const getAIProductAnalysis = async (product: Product) => {
    setIsLoadingAI(true);
    try {
      const query = `Analyze this product: ${product.name} - ${product.description}. Price: ₹${product.price}. Compare with similar products and give buying advice. Is this good value for money?`;
      const recommendation = await getProductRecommendations(query);
      setAiRecommendation(recommendation);
    } catch (error) {
      setAiRecommendation('Unable to get AI analysis at the moment.');
    } finally {
      setIsLoadingAI(false);
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h1>
            <Link to="/products">
              <Button className="bg-mint hover:bg-mint/90">
                Browse Products
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch({ type: 'ADD_TO_CART', payload: product });
    }
    toast({
      title: 'Added to cart',
      description: `${quantity}x ${product.name} added to your cart.`,
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const images = [product.image, product.image, product.image]; // Mock multiple images

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-600 mb-8">
          <Link to="/" className="hover:text-navy">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/products" className="hover:text-navy">Products</Link>
          <span className="mx-2">/</span>
          <span className="text-navy">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg border">
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex space-x-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-lg border-2 overflow-hidden ${
                    selectedImage === index ? 'border-mint' : 'border-gray-200'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <p className="text-gray-600 mb-4">{product.description}</p>
              
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating) 
                          ? 'text-yellow-400 fill-current' 
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-600">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              <div className="flex items-baseline space-x-4 mb-6">
                <span className="text-3xl font-bold text-gray-900">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-gray-500 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                    <span className="px-2 py-1 bg-red-100 text-red-800 text-sm font-semibold rounded">
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Quantity:</span>
              <div className="flex items-center border rounded-lg">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="px-4 py-2 border-x">{quantity}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={handleAddToCart}
                className="flex-1 bg-mint hover:bg-mint/90 text-white py-3"
                disabled={!product.availability}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>
              <Button
                className="flex-1 bg-navy hover:bg-navy/90 text-white py-3"
                disabled={!product.availability}
              >
                Buy Now
              </Button>
              <Button variant="outline" size="icon" className="p-3">
                <Heart className="w-5 h-5" />
              </Button>
              <Button variant="outline" size="icon" className="p-3">
                <Share2 className="w-5 h-5" />
              </Button>
            </div>

            {/* Delivery Info */}
            <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Truck className="w-5 h-5 text-mint" />
                <span className="text-sm">
                  <strong>Delivery:</strong> {product.deliveryTime}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Shield className="w-5 h-5 text-mint" />
                <span className="text-sm">
                  <strong>Warranty:</strong> 1 Year Brand Warranty
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <RotateCcw className="w-5 h-5 text-mint" />
                <span className="text-sm">
                  <strong>Returns:</strong> 7 Days Return Policy
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <Tabs defaultValue="description" className="mb-12">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          
          <TabsContent value="description" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <p className="text-gray-700 leading-relaxed">
                  {product.description}
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="specifications" className="mt-6">
            <Card>
              <CardContent className="p-6">
                {product.specifications ? (
                  <div className="space-y-3">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-2 border-b border-gray-100 last:border-b-0">
                        <span className="font-medium text-gray-700">{key}</span>
                        <span className="text-gray-600">{value}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">No specifications available.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reviews" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <div className="text-center py-8">
                  <p className="text-gray-600 mb-4">Be the first to review this product!</p>
                  <Button className="bg-mint hover:bg-mint/90">
                    Write a Review
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* AI Recommendations */}
        <Card className="mb-12">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-navy">AI Product Analysis</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => getAIProductAnalysis(product)}
                disabled={isLoadingAI}
                className="text-mint border-mint hover:bg-mint hover:text-white"
              >
                {isLoadingAI ? 'Analyzing...' : 'Refresh Analysis'}
              </Button>
            </div>
            {aiRecommendation ? (
              <div className="p-4 bg-mint/10 rounded-lg">
                <p className="text-gray-700">{aiRecommendation}</p>
              </div>
            ) : (
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-600">AI analysis will appear here...</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Footer />
      <AIAssistant />
    </div>
  );
};

export default ProductDetail;
