
import React, { useState } from 'react';
import { User, Package, Heart, MapPin, Settings, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AIAssistant from '../components/AIAssistant';
import { getShoppingAssistance } from '../services/geminiService';

const Profile = () => {
  const [aiHelp, setAiHelp] = useState('');
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const [userInfo, setUserInfo] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+91 9876543210',
  });

  const mockOrders = [
    {
      id: 'ORD001',
      date: '2024-01-15',
      status: 'Delivered',
      total: 15999,
      items: ['Samsung Galaxy Buds2 Pro'],
    },
    {
      id: 'ORD002',
      date: '2024-01-10',
      status: 'Shipped',
      total: 89999,
      items: ['Apple iPhone 15 Pro'],
    },
  ];

  const getAIHelp = async (type: string) => {
    setIsLoadingAI(true);
    try {
      let query = '';
      if (type === 'orders') {
        query = 'How can I track my orders and what do different order statuses mean?';
      } else if (type === 'returns') {
        query = 'What is the return policy and how do I return an item?';
      } else if (type === 'account') {
        query = 'How do I manage my account settings and keep my profile secure?';
      }
      
      const help = await getShoppingAssistance(query);
      setAiHelp(help);
    } catch (error) {
      setAiHelp('Unable to get AI assistance at the moment.');
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-navy">My Account</h1>
          <div className="flex items-center space-x-2 text-gray-600">
            <User className="w-5 h-5" />
            <span>Welcome, {userInfo.firstName}!</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* AI Help Panel */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h3 className="font-semibold text-navy mb-4">AI Help Center</h3>
                <div className="space-y-2 mb-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => getAIHelp('orders')}
                    disabled={isLoadingAI}
                    className="w-full justify-start text-left"
                  >
                    Track Orders
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => getAIHelp('returns')}
                    disabled={isLoadingAI}
                    className="w-full justify-start text-left"
                  >
                    Return Items
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => getAIHelp('account')}
                    disabled={isLoadingAI}
                    className="w-full justify-start text-left"
                  >
                    Account Help
                  </Button>
                </div>
                {aiHelp && (
                  <div className="p-3 bg-mint/10 rounded-lg">
                    <p className="text-sm text-gray-700">{aiHelp}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="orders" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="orders" className="flex items-center space-x-2">
                  <Package className="w-4 h-4" />
                  <span>Orders</span>
                </TabsTrigger>
                <TabsTrigger value="profile" className="flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>Profile</span>
                </TabsTrigger>
                <TabsTrigger value="addresses" className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>Addresses</span>
                </TabsTrigger>
                <TabsTrigger value="wishlist" className="flex items-center space-x-2">
                  <Heart className="w-4 h-4" />
                  <span>Wishlist</span>
                </TabsTrigger>
              </TabsList>

              {/* Orders Tab */}
              <TabsContent value="orders">
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Order History</h2>
                  {mockOrders.map((order) => (
                    <Card key={order.id}>
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
                          <div>
                            <h3 className="font-semibold">Order #{order.id}</h3>
                            <p className="text-gray-600">Placed on {order.date}</p>
                            <p className="text-sm text-gray-500">
                              Items: {order.items.join(', ')}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">{formatPrice(order.total)}</p>
                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                              order.status === 'Delivered' 
                                ? 'bg-green-100 text-green-800'
                                : order.status === 'Shipped'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {order.status}
                            </span>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              Track Order
                            </Button>
                            <Button variant="outline" size="sm">
                              <Download className="w-4 h-4 mr-1" />
                              Invoice
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Profile Tab */}
              <TabsContent value="profile">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-6">Personal Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          value={userInfo.firstName}
                          onChange={(e) => setUserInfo({...userInfo, firstName: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          value={userInfo.lastName}
                          onChange={(e) => setUserInfo({...userInfo, lastName: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={userInfo.email}
                          onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          value={userInfo.phone}
                          onChange={(e) => setUserInfo({...userInfo, phone: e.target.value})}
                        />
                      </div>
                    </div>
                    <Button className="mt-6 bg-mint hover:bg-mint/90">
                      Update Profile
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Addresses Tab */}
              <TabsContent value="addresses">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Saved Addresses</h2>
                    <Button className="bg-mint hover:bg-mint/90">
                      Add New Address
                    </Button>
                  </div>
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">Home</h3>
                          <p className="text-gray-600 mt-1">
                            123 Main Street<br />
                            Mumbai, Maharashtra 400001<br />
                            India
                          </p>
                          <span className="inline-block mt-2 px-2 py-1 bg-mint/10 text-mint text-xs rounded">
                            Default
                          </span>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                          <Button variant="outline" size="sm">
                            Delete
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Wishlist Tab */}
              <TabsContent value="wishlist">
                <div className="text-center py-12">
                  <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Your wishlist is empty</h3>
                  <p className="text-gray-600 mb-6">
                    Save items you love for later by adding them to your wishlist.
                  </p>
                  <Button className="bg-mint hover:bg-mint/90">
                    Start Shopping
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      <Footer />
      <AIAssistant />
    </div>
  );
};

export default Profile;
