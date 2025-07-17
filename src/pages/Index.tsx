
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, Star, ShoppingCart, Sparkles, Search, MessageCircle, Bot, Zap, Users, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import CategoryCard from '../components/CategoryCard';
import AIAssistant from '../components/AIAssistant';
import { useApp } from '../context/AppContext';
import { allProducts, mockCategories } from '../data/mockData';

const Index = () => {
  const { state, dispatch } = useApp();
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);

  useEffect(() => {
    dispatch({ type: 'SET_PRODUCTS', payload: allProducts });
  }, [dispatch]);

  const featuredProducts = allProducts.slice(0, 4);

  const handleAIAssistantClick = () => {
    setIsAIAssistantOpen(true);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section - Improved Mobile Responsiveness */}
      <section className="relative bg-gradient-to-br from-navy via-navy/90 to-mint overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200')] bg-cover bg-center opacity-10"></div>
        <div className="relative container mx-auto px-4 py-12 md:py-20">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 animate-fade-in">
              Smart Shopping with 
              <span className="text-mint animate-pulse-enhanced"> AI Power</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-6 md:mb-8 animate-fade-in leading-relaxed">
              Discover amazing products with our AI-powered recommendations. 
              Shop smarter, faster, and better with SnapBasket.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in">
              <Link to="/products">
                <Button className="w-full sm:w-auto bg-mint hover:bg-mint/90 text-white px-6 md:px-8 py-3 text-base md:text-lg hover-lift">
                  Start Shopping
                  <ShoppingCart className="ml-2 w-4 h-4 md:w-5 md:h-5" />
                </Button>
              </Link>
              <Button 
                variant="outline" 
                className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-navy px-6 md:px-8 py-3 text-base md:text-lg hover-glow"
                onClick={handleAIAssistantClick}
              >
                Try AI Assistant
                <Sparkles className="ml-2 w-4 h-4 md:w-5 md:h-5 animate-bounce-enhanced" />
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="w-5 h-5 md:w-6 md:h-6 text-white" />
        </div>
      </section>

      {/* Enhanced AI Features Section - Improved Mobile Layout */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 relative overflow-hidden">
        {/* Background elements - Hidden on mobile for better performance */}
        <div className="absolute inset-0 hidden md:block">
          <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse opacity-20"></div>
          <div className="absolute top-20 right-20 w-24 h-24 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full animate-bounce opacity-20"></div>
          <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full animate-pulse opacity-30"></div>
          <div className="absolute top-1/2 right-1/3 w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-bounce opacity-25"></div>
          <div className="absolute bottom-10 right-10 w-28 h-28 bg-gradient-to-r from-red-400 to-pink-400 rounded-full animate-pulse opacity-20"></div>
          <div className="absolute top-1/3 left-1/3 w-12 h-12 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full animate-bounce opacity-30"></div>
        </div>
        
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white px-4 md:px-8 py-2 md:py-3 rounded-full mb-4 md:mb-6 animate-scale-in shadow-2xl">
              <Bot className="w-5 h-5 md:w-6 md:h-6 animate-bounce-enhanced" />
              <span className="font-bold text-sm md:text-lg">Powered by Gemini 1.5 Flash</span>
              <Sparkles className="w-4 h-4 md:w-5 md:h-5 animate-pulse" />
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent mb-4 md:mb-6 animate-fade-in">
              🤖 AI-Powered Shopping Experience
            </h2>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto animate-fade-in leading-relaxed px-4">
              Experience the future of e-commerce with our intelligent features designed to make your shopping effortless and enjoyable.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-10">
            <Card className="text-center p-6 md:p-8 hover:shadow-2xl transition-all duration-700 hover:-translate-y-6 bg-gradient-to-br from-white via-purple-50 to-pink-50 border-4 border-transparent hover:border-purple-300 animate-scale-in group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400/10 via-pink-400/10 to-purple-400/10 animate-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardContent className="space-y-4 md:space-y-6 relative z-10">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto shadow-2xl group-hover:animate-bounce-enhanced transform group-hover:scale-110 transition-transform duration-300">
                  <Sparkles className="w-10 h-10 md:w-12 md:h-12 text-white animate-pulse" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">🎯 Smart Recommendations</h3>
                <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                  Get personalized product suggestions based on your preferences and shopping history using advanced AI.
                </p>
                <div className="flex justify-center space-x-1 mt-4 md:mt-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 md:w-5 md:h-5 text-yellow-400 fill-current animate-pulse" style={{animationDelay: `${i * 0.2}s`}} />
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6 md:p-8 hover:shadow-2xl transition-all duration-700 hover:-translate-y-6 bg-gradient-to-br from-white via-blue-50 to-cyan-50 border-4 border-transparent hover:border-blue-300 animate-scale-in group relative overflow-hidden" style={{animationDelay: '0.2s'}}>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 via-cyan-400/10 to-blue-400/10 animate-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardContent className="space-y-4 md:space-y-6 relative z-10">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-600 rounded-full flex items-center justify-center mx-auto shadow-2xl group-hover:animate-bounce-enhanced transform group-hover:scale-110 transition-transform duration-300">
                  <Search className="w-10 h-10 md:w-12 md:h-12 text-white animate-pulse" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">🔍 Natural Language Search</h3>
                <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                  Search products using everyday language like "affordable smartphones for students" and get accurate results.
                </p>
                <div className="bg-gradient-to-r from-blue-100 to-cyan-100 rounded-xl p-3 md:p-4 text-gray-800 italic font-medium border-2 border-blue-200 text-sm md:text-base">
                  "Show me gaming laptops under ₹60k"
                </div>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6 md:p-8 hover:shadow-2xl transition-all duration-700 hover:-translate-y-6 bg-gradient-to-br from-white via-green-50 to-emerald-50 border-4 border-transparent hover:border-green-300 animate-scale-in group relative overflow-hidden" style={{animationDelay: '0.4s'}}>
              <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 via-emerald-400/10 to-green-400/10 animate-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardContent className="space-y-4 md:space-y-6 relative z-10">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 rounded-full flex items-center justify-center mx-auto shadow-2xl group-hover:animate-bounce-enhanced transform group-hover:scale-110 transition-transform duration-300">
                  <MessageCircle className="w-10 h-10 md:w-12 md:h-12 text-white animate-pulse" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">💬 24/7 AI Support</h3>
                <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                  Get instant help with product queries, order tracking, and shopping assistance from our AI chatbot.
                </p>
                <div className="flex items-center justify-center space-x-3">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                  </div>
                  <span className="text-green-600 font-bold text-sm md:text-lg">Always Online</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced AI Stats Section - Mobile Responsive */}
          <div className="mt-12 md:mt-20 bg-gradient-to-r from-purple-600 via-pink-500 via-orange-500 via-yellow-500 via-green-500 via-blue-500 to-indigo-600 rounded-3xl p-6 md:p-10 text-white animate-gradient shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 hidden md:block">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-4 h-4 bg-white/20 rounded-full animate-bounce"
                  style={{
                    left: `${20 + i * 15}%`,
                    top: `${10 + (i % 2) * 80}%`,
                    animationDelay: `${i * 0.5}s`,
                    animationDuration: `${2 + i * 0.3}s`
                  }}
                ></div>
              ))}
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10 text-center relative z-10">
              <div className="animate-scale-in transform hover:scale-110 transition-transform duration-300">
                <div className="flex items-center justify-center mb-3 md:mb-4">
                  <div className="p-3 md:p-4 bg-white/20 rounded-full backdrop-blur-sm">
                    <TrendingUp className="w-8 h-8 md:w-10 md:h-10 animate-bounce-enhanced" />
                  </div>
                </div>
                <span className="text-2xl md:text-4xl font-bold block mb-1 md:mb-2">98%</span>
                <p className="text-white/90 font-medium text-sm md:text-lg">Accuracy Rate</p>
              </div>
              <div className="animate-scale-in transform hover:scale-110 transition-transform duration-300" style={{animationDelay: '0.2s'}}>
                <div className="flex items-center justify-center mb-3 md:mb-4">
                  <div className="p-3 md:p-4 bg-white/20 rounded-full backdrop-blur-sm">
                    <Users className="w-8 h-8 md:w-10 md:h-10 animate-bounce-enhanced" />
                  </div>
                </div>
                <span className="text-2xl md:text-4xl font-bold block mb-1 md:mb-2">50K+</span>
                <p className="text-white/90 font-medium text-sm md:text-lg">Happy Users</p>
              </div>
              <div className="animate-scale-in transform hover:scale-110 transition-transform duration-300" style={{animationDelay: '0.4s'}}>
                <div className="flex items-center justify-center mb-3 md:mb-4">
                  <div className="p-3 md:p-4 bg-white/20 rounded-full backdrop-blur-sm">
                    <Zap className="w-8 h-8 md:w-10 md:h-10 animate-bounce-enhanced" />
                  </div>
                </div>
                <span className="text-2xl md:text-4xl font-bold block mb-1 md:mb-2">0.5s</span>
                <p className="text-white/90 font-medium text-sm md:text-lg">Response Time</p>
              </div>
              <div className="animate-scale-in transform hover:scale-110 transition-transform duration-300" style={{animationDelay: '0.6s'}}>
                <div className="flex items-center justify-center mb-3 md:mb-4">
                  <div className="p-3 md:p-4 bg-white/20 rounded-full backdrop-blur-sm">
                    <Bot className="w-8 h-8 md:w-10 md:h-10 animate-bounce-enhanced" />
                  </div>
                </div>
                <span className="text-2xl md:text-4xl font-bold block mb-1 md:mb-2">24/7</span>
                <p className="text-white/90 font-medium text-sm md:text-lg">AI Support</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section - Mobile Responsive */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-navy mb-4">
              Popular Categories
            </h2>
            <p className="text-gray-600 text-base md:text-lg">
              Explore our wide range of product categories
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {mockCategories.map((category, index) => (
              <div key={category.id} style={{animationDelay: `${index * 0.1}s`}} className="animate-fade-in">
                <CategoryCard category={category} />
              </div>
            ))}
          </div>
          
          <div className="text-center mt-6 md:mt-8">
            <Link to="/categories">
              <Button className="w-full sm:w-auto bg-gradient-to-r from-navy to-mint hover:from-navy/90 hover:to-mint/90 text-white px-6 md:px-8 py-3 hover-lift">
                View All Categories
                <ArrowDown className="ml-2 w-4 h-4 md:w-5 md:h-5 rotate-[-90deg]" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products - Mobile Responsive */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between mb-8 md:mb-12">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <h2 className="text-2xl md:text-3xl font-bold text-navy mb-2 md:mb-4">
                Featured Products
              </h2>
              <p className="text-gray-600 text-base md:text-lg">
                Handpicked products just for you
              </p>
            </div>
            <Link to="/products">
              <Button variant="outline" className="w-full sm:w-auto border-navy text-navy hover:bg-navy hover:text-white hover-lift">
                View All Products
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {featuredProducts.map((product, index) => (
              <div key={product.id} style={{animationDelay: `${index * 0.1}s`}} className="animate-fade-in">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Mobile Responsive */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-navy via-mint to-navy animate-gradient">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 animate-scale-in">
            Ready to Transform Your Shopping Experience?
          </h2>
          <p className="text-gray-200 mb-6 md:mb-8 max-w-2xl mx-auto animate-fade-in text-base md:text-lg leading-relaxed">
            Join thousands of happy customers who are already enjoying smarter shopping with our AI-powered platform.
          </p>
          <Link to="/products">
            <Button className="w-full sm:w-auto bg-white text-navy hover:bg-gray-100 px-6 md:px-8 py-3 text-base md:text-lg font-semibold hover-lift animate-scale-in">
              Start Shopping Now
              <Sparkles className="ml-2 w-4 h-4 md:w-5 md:h-5" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
      <AIAssistant isOpen={isAIAssistantOpen} onClose={() => setIsAIAssistantOpen(false)} />
    </div>
  );
};

export default Index;
