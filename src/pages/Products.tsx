
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import AIAssistant from '../components/AIAssistant';
import { useApp } from '../context/AppContext';
import { allProducts } from '../data/mockData';
import { getProductRecommendations } from '../services/geminiService';

const Products = () => {
  const { state, dispatch } = useApp();
  const [searchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState(allProducts);
  const [sortBy, setSortBy] = useState('name');
  const [priceRange, setPriceRange] = useState([0, 200000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [aiRecommendation, setAiRecommendation] = useState('');
  const [isLoadingAI, setIsLoadingAI] = useState(false);

  const subcategoryParam = searchParams.get('subcategory');
  const categoryParam = searchParams.get('category');

  useEffect(() => {
    dispatch({ type: 'SET_PRODUCTS', payload: allProducts });
  }, [dispatch]);

  useEffect(() => {
    let filtered = allProducts;

    // Filter by subcategory if specified in URL
    if (subcategoryParam) {
      filtered = filtered.filter(product => product.subcategory === subcategoryParam);
    }

    // Filter by category if specified in URL
    if (categoryParam) {
      filtered = filtered.filter(product => product.category.toLowerCase().includes(categoryParam.toLowerCase()));
    }

    // Filter by search query
    if (state.searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(state.searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(product => selectedCategories.includes(product.category));
    }

    // Filter by brand
    if (selectedBrands.length > 0) {
      filtered = filtered.filter(product => selectedBrands.includes(product.brand));
    }

    // Filter by price range
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
      default:
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    setFilteredProducts(filtered);
  }, [state.searchQuery, selectedCategories, selectedBrands, priceRange, sortBy, subcategoryParam, categoryParam]);

  const brands = [...new Set(allProducts.map(p => p.brand))];
  const categories = [...new Set(allProducts.map(p => p.category))];

  const handleBrandChange = (brand: string, checked: boolean) => {
    if (checked) {
      setSelectedBrands([...selectedBrands, brand]);
    } else {
      setSelectedBrands(selectedBrands.filter(b => b !== brand));
    }
  };

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, category]);
    } else {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    }
  };

  const getAIRecommendation = async () => {
    setIsLoadingAI(true);
    try {
      const context = subcategoryParam ? `for ${subcategoryParam.replace('-', ' ')} category` : `from our available categories: ${categories.join(', ')}`;
      const query = `Suggest top-rated products under ₹50,000 ${context}. Focus on value for money and customer satisfaction.`;
      const recommendation = await getProductRecommendations(query);
      setAiRecommendation(recommendation);
    } catch (error) {
      setAiRecommendation('Unable to get AI recommendations at the moment. Please try again later.');
    } finally {
      setIsLoadingAI(false);
    }
  };

  const getPageTitle = () => {
    if (subcategoryParam) {
      return subcategoryParam.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
    }
    if (categoryParam) {
      return categoryParam.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
    }
    return 'All Products';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold">Filters</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="lg:hidden"
                    onClick={() => setShowFilters(false)}
                  >
                    ✕
                  </Button>
                </div>

                {/* AI Recommendations */}
                <div className="mb-6 p-4 bg-gradient-to-r from-mint/10 to-navy/10 rounded-lg border border-mint/20">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-navy">🤖 AI Recommendations</h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={getAIRecommendation}
                      disabled={isLoadingAI}
                      className="text-mint hover:text-mint/80 text-xs"
                    >
                      {isLoadingAI ? '🔄 Loading...' : '✨ Get Suggestions'}
                    </Button>
                  </div>
                  {aiRecommendation && (
                    <p className="text-sm text-gray-700 bg-white p-3 rounded border-l-4 border-mint">{aiRecommendation}</p>
                  )}
                </div>

                {/* Categories */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Categories</h4>
                  <div className="space-y-2">
                    {categories.map(category => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox
                          id={`category-${category}`}
                          checked={selectedCategories.includes(category)}
                          onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                        />
                        <label htmlFor={`category-${category}`} className="text-sm">
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Brands */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Brands</h4>
                  <div className="space-y-2">
                    {brands.map(brand => (
                      <div key={brand} className="flex items-center space-x-2">
                        <Checkbox
                          id={`brand-${brand}`}
                          checked={selectedBrands.includes(brand)}
                          onCheckedChange={(checked) => handleBrandChange(brand, checked as boolean)}
                        />
                        <label htmlFor={`brand-${brand}`} className="text-sm">
                          {brand}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Price Range</h4>
                  <div className="space-y-2">
                    <div className="flex space-x-2">
                      <Input
                        type="number"
                        placeholder="Min"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                      />
                      <Input
                        type="number"
                        placeholder="Max"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 200000])}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div>
                <h1 className="text-2xl font-bold text-navy mb-2">{getPageTitle()}</h1>
                <p className="text-gray-600">
                  Showing {filteredProducts.length} of {allProducts.length} products
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="lg:hidden"
                  onClick={() => setShowFilters(true)}
                >
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  Filters
                </Button>
                
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Name A-Z</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your filters or search terms
                </p>
                <Button
                  onClick={() => {
                    setSelectedBrands([]);
                    setSelectedCategories([]);
                    setPriceRange([0, 200000]);
                    dispatch({ type: 'SET_SEARCH_QUERY', payload: '' });
                  }}
                  className="bg-mint hover:bg-mint/90"
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
      <AIAssistant />
    </div>
  );
};

export default Products;
