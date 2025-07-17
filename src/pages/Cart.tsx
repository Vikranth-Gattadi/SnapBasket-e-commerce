
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AIAssistant from '../components/AIAssistant';
import { useApp } from '../context/AppContext';
import { toast } from '@/hooks/use-toast';
import { getShoppingAssistance } from '../services/geminiService';

const Cart = () => {
  const { state, dispatch } = useApp();
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [aiSuggestion, setAiSuggestion] = useState('');
  const [isLoadingAI, setIsLoadingAI] = useState(false);

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity === 0) {
      dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
      toast({
        title: 'Item removed',
        description: 'Item has been removed from your cart.',
      });
    } else {
      dispatch({ type: 'UPDATE_CART_QUANTITY', payload: { productId, quantity: newQuantity } });
    }
  };

  const removeItem = (productId: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
    toast({
      title: 'Item removed',
      description: 'Item has been removed from your cart.',
    });
  };

  const applyCoupon = () => {
    // Mock coupon logic
    if (couponCode.toLowerCase() === 'save10') {
      setDiscount(0.1);
      toast({
        title: 'Coupon applied!',
        description: '10% discount applied to your order.',
      });
    } else if (couponCode.toLowerCase() === 'welcome20') {
      setDiscount(0.2);
      toast({
        title: 'Coupon applied!',
        description: '20% discount applied to your order.',
      });
    } else {
      toast({
        title: 'Invalid coupon',
        description: 'Please check your coupon code and try again.',
        variant: 'destructive',
      });
    }
  };

  const getAISuggestions = async () => {
    setIsLoadingAI(true);
    try {
      const query = `I have these items in my cart: ${state.cart.map(item => `${item.product.name} (${item.quantity}x)`).join(', ')}. Suggest bundle offers, alternatives, or complementary products.`;
      const suggestion = await getShoppingAssistance(query, state.cart);
      setAiSuggestion(suggestion);
    } catch (error) {
      setAiSuggestion('Unable to get suggestions at the moment.');
    } finally {
      setIsLoadingAI(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const subtotal = state.cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  const discountAmount = subtotal * discount;
  const deliveryFee = subtotal > 50000 ? 0 : 100;
  const total = subtotal - discountAmount + deliveryFee;

  if (state.cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-12 h-12 text-gray-400" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Link to="/products">
              <Button className="bg-mint hover:bg-mint/90 px-8">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
        <AIAssistant />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-navy">Shopping Cart</h1>
          <span className="text-gray-600">{state.cart.length} items</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {state.cart.map((item) => (
              <Card key={item.product.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full sm:w-24 h-32 sm:h-24 object-cover rounded-lg"
                    />
                    
                    <div className="flex-1 space-y-2">
                      <h3 className="font-semibold text-gray-900">
                        <Link 
                          to={`/product/${item.product.id}`}
                          className="hover:text-navy transition-colors"
                        >
                          {item.product.name}
                        </Link>
                      </h3>
                      <p className="text-gray-600 text-sm">{item.product.description}</p>
                      <p className="text-lg font-bold text-gray-900">
                        {formatPrice(item.product.price)}
                      </p>
                    </div>

                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start space-y-0 sm:space-y-4">
                      <div className="flex items-center border rounded-lg">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="px-3"
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="px-4 py-2 border-x">{item.quantity}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="px-3"
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.product.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            {/* AI Suggestions */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-navy">AI Suggestions</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={getAISuggestions}
                    disabled={isLoadingAI}
                    className="text-mint border-mint hover:bg-mint hover:text-white"
                  >
                    {isLoadingAI ? 'Loading...' : 'Get Ideas'}
                  </Button>
                </div>
                {aiSuggestion ? (
                  <div className="p-3 bg-mint/10 rounded-lg">
                    <p className="text-sm text-gray-700">{aiSuggestion}</p>
                  </div>
                ) : (
                  <p className="text-sm text-gray-600">
                    Get AI-powered suggestions for bundle offers and complementary products.
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Coupon Code */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Apply Coupon</h3>
                <div className="flex space-x-2">
                  <Input
                    placeholder="Enter coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                  />
                  <Button onClick={applyCoupon} variant="outline">
                    <Tag className="w-4 h-4 mr-2" />
                    Apply
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Try: SAVE10 or WELCOME20
                </p>
              </CardContent>
            </Card>

            {/* Order Summary */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Order Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount ({(discount * 100).toFixed(0)}%)</span>
                      <span>-{formatPrice(discountAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span>{deliveryFee === 0 ? 'FREE' : formatPrice(deliveryFee)}</span>
                  </div>
                  <hr className="my-2" />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>
                
                <Link to="/checkout">
                  <Button className="w-full mt-6 bg-navy hover:bg-navy/90 text-white py-3">
                    Proceed to Checkout
                  </Button>
                </Link>
                
                <Link to="/products">
                  <Button variant="outline" className="w-full mt-2">
                    Continue Shopping
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
      <AIAssistant />
    </div>
  );
};

export default Cart;
