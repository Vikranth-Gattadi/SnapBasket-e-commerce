
import React, { useState } from 'react';
import { CreditCard, MapPin, Truck, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AIAssistant from '../components/AIAssistant';
import { useApp } from '../context/AppContext';
import { toast } from '@/hooks/use-toast';
import { getShoppingAssistance } from '../services/geminiService';

const Checkout = () => {
  const { state, dispatch } = useApp();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [aiHelp, setAiHelp] = useState('');
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const getAIAssistance = async (type: string) => {
    setIsLoadingAI(true);
    try {
      let query = '';
      if (type === 'address') {
        query = 'Help me understand address format for online shopping in India. What details are important?';
      } else if (type === 'payment') {
        query = 'Explain different payment options available for online shopping. Which is most secure?';
      }
      
      const help = await getShoppingAssistance(query);
      setAiHelp(help);
    } catch (error) {
      setAiHelp('Unable to get AI assistance at the moment.');
    } finally {
      setIsLoadingAI(false);
    }
  };

  const handlePlaceOrder = () => {
    // Validate form
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'state', 'pincode'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (missingFields.length > 0) {
      toast({
        title: 'Please fill all required fields',
        description: 'Complete your shipping information to continue.',
        variant: 'destructive',
      });
      return;
    }

    // Mock order placement
    toast({
      title: 'Order placed successfully!',
      description: 'Thank you for your purchase. You will receive a confirmation email shortly.',
    });
    
    dispatch({ type: 'CLEAR_CART' });
    // In a real app, you would redirect to order confirmation page
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const subtotal = state.cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  const deliveryFee = subtotal > 50000 ? 0 : 100;
  const total = subtotal + deliveryFee;

  if (state.cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
            <p className="text-gray-600 mb-8">Add some items to your cart to proceed with checkout.</p>
            <Button className="bg-mint hover:bg-mint/90">
              Continue Shopping
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-navy mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Information */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-mint" />
                    Shipping Information
                  </h2>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => getAIAssistance('address')}
                    disabled={isLoadingAI}
                    className="text-mint border-mint hover:bg-mint hover:text-white"
                  >
                    Need Help?
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="address">Address *</Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State *</Label>
                    <Input
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="pincode">PIN Code *</Label>
                    <Input
                      id="pincode"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Information */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold flex items-center">
                    <CreditCard className="w-5 h-5 mr-2 text-mint" />
                    Payment Information
                  </h2>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => getAIAssistance('payment')}
                    disabled={isLoadingAI}
                    className="text-mint border-mint hover:bg-mint hover:text-white"
                  >
                    Payment Help
                  </Button>
                </div>

                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="mb-6">
                  <div className="flex items-center space-x-2 p-3 border rounded-lg">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card">Credit/Debit Card</Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg">
                    <RadioGroupItem value="upi" id="upi" />
                    <Label htmlFor="upi">UPI Payment</Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg">
                    <RadioGroupItem value="wallet" id="wallet" />
                    <Label htmlFor="wallet">Digital Wallet</Label>
                  </div>
                </RadioGroup>

                {paymentMethod === 'card' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <Label htmlFor="nameOnCard">Name on Card</Label>
                      <Input
                        id="nameOnCard"
                        name="nameOnCard"
                        value={formData.nameOnCard}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        name="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="expiryDate">Expiry Date</Label>
                      <Input
                        id="expiryDate"
                        name="expiryDate"
                        placeholder="MM/YY"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        name="cvv"
                        placeholder="123"
                        value={formData.cvv}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                )}

                {paymentMethod === 'upi' && (
                  <div>
                    <Label htmlFor="upiId">UPI ID</Label>
                    <Input id="upiId" placeholder="yourname@paytm" />
                  </div>
                )}

                {paymentMethod === 'wallet' && (
                  <div className="text-center py-4">
                    <p className="text-gray-600">You will be redirected to your wallet provider</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* AI Help Section */}
            {aiHelp && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-navy mb-3">AI Assistant</h3>
                  <div className="p-4 bg-mint/10 rounded-lg">
                    <p className="text-gray-700">{aiHelp}</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Order Summary</h3>
                
                <div className="space-y-3 mb-4">
                  {state.cart.map((item) => (
                    <div key={item.product.id} className="flex justify-between text-sm">
                      <span>{item.product.name} × {item.quantity}</span>
                      <span>{formatPrice(item.product.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 pt-4 border-t">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery</span>
                    <span>{deliveryFee === 0 ? 'FREE' : formatPrice(deliveryFee)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-2 border-t">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Shield className="w-4 h-4 text-mint" />
                    <span>Secure SSL encrypted checkout</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Truck className="w-4 h-4 text-mint" />
                    <span>Free delivery on orders above ₹50,000</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button
              onClick={handlePlaceOrder}
              className="w-full bg-navy hover:bg-navy/90 text-white py-3 text-lg"
            >
              Place Order - {formatPrice(total)}
            </Button>
          </div>
        </div>
      </div>

      <Footer />
      <AIAssistant />
    </div>
  );
};

export default Checkout;
