
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Package, Users, ShoppingCart, TrendingUp, Edit, Trash2, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { mockProducts } from '../data/mockData';
import { getProductRecommendations } from '../services/geminiService';

const Admin = () => {
  const [products, setProducts] = useState(mockProducts);
  const [aiInsight, setAiInsight] = useState('');
  const [isLoadingAI, setIsLoadingAI] = useState(false);

  const salesData = [
    { name: 'Jan', sales: 4000, orders: 24 },
    { name: 'Feb', sales: 3000, orders: 18 },
    { name: 'Mar', sales: 5000, orders: 32 },
    { name: 'Apr', sales: 4500, orders: 28 },
    { name: 'May', sales: 6000, orders: 40 },
    { name: 'Jun', sales: 5500, orders: 35 },
  ];

  const categoryData = [
    { name: 'Electronics', value: 45, color: '#002B5B' },
    { name: 'Fashion', value: 30, color: '#00B894' },
    { name: 'Home', value: 15, color: '#74B9FF' },
    { name: 'Sports', value: 10, color: '#FD79A8' },
  ];

  const getAIAnalytics = async (type: string) => {
    setIsLoadingAI(true);
    try {
      let query = '';
      if (type === 'inventory') {
        query = 'Analyze inventory levels and suggest which products might run out of stock soon based on sales trends.';
      } else if (type === 'trends') {
        query = 'What are the current e-commerce trends and which product categories are expected to grow?';
      } else if (type === 'optimization') {
        query = 'Suggest ways to optimize product listings and improve sales performance.';
      }
      
      const insight = await getProductRecommendations(query, 'admin analytics context');
      setAiInsight(insight);
    } catch (error) {
      setAiInsight('Unable to get AI insights at the moment.');
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
          <h1 className="text-3xl font-bold text-navy">Admin Dashboard</h1>
          <div className="flex space-x-4">
            <Button
              variant="outline"
              onClick={() => getAIAnalytics('inventory')}
              disabled={isLoadingAI}
              className="text-mint border-mint hover:bg-mint hover:text-white"
            >
              AI Inventory Analysis
            </Button>
            <Button
              variant="outline"
              onClick={() => getAIAnalytics('trends')}
              disabled={isLoadingAI}
              className="text-mint border-mint hover:bg-mint hover:text-white"
            >
              Market Trends
            </Button>
          </div>
        </div>

        {/* AI Insights */}
        {aiInsight && (
          <Card className="mb-8">
            <CardContent className="p-6">
              <h3 className="font-semibold text-navy mb-3">AI Analytics Insight</h3>
              <div className="p-4 bg-mint/10 rounded-lg">
                <p className="text-gray-700">{aiInsight}</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Total Orders</p>
                  <p className="text-2xl font-bold text-navy">1,247</p>
                  <p className="text-green-600 text-sm">+12% from last month</p>
                </div>
                <div className="w-12 h-12 bg-mint/10 rounded-lg flex items-center justify-center">
                  <ShoppingCart className="w-6 h-6 text-mint" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Total Sales</p>
                  <p className="text-2xl font-bold text-navy">₹2,85,000</p>
                  <p className="text-green-600 text-sm">+8% from last month</p>
                </div>
                <div className="w-12 h-12 bg-mint/10 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-mint" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Products</p>
                  <p className="text-2xl font-bold text-navy">{products.length}</p>
                  <p className="text-blue-600 text-sm">Active listings</p>
                </div>
                <div className="w-12 h-12 bg-mint/10 rounded-lg flex items-center justify-center">
                  <Package className="w-6 h-6 text-mint" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Customers</p>
                  <p className="text-2xl font-bold text-navy">892</p>
                  <p className="text-green-600 text-sm">+15% new users</p>
                </div>
                <div className="w-12 h-12 bg-mint/10 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-mint" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Sales Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Sales Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="sales" fill="#00B894" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Category Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Category Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Management Tabs */}
        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="products">Product Management</TabsTrigger>
            <TabsTrigger value="orders">Order Management</TabsTrigger>
            <TabsTrigger value="users">User Management</TabsTrigger>
          </TabsList>

          {/* Products Tab */}
          <TabsContent value="products">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Products</CardTitle>
                  <Button className="bg-mint hover:bg-mint/90">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Product
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {products.slice(0, 5).map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div>
                          <h3 className="font-semibold">{product.name}</h3>
                          <p className="text-gray-600 text-sm">{product.brand}</p>
                          <p className="font-bold text-mint">{formatPrice(product.price)}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded text-xs ${
                          product.availability
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {product.availability ? 'In Stock' : 'Out of Stock'}
                        </span>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { id: 'ORD001', customer: 'John Doe', total: 15999, status: 'Processing' },
                    { id: 'ORD002', customer: 'Jane Smith', total: 89999, status: 'Shipped' },
                    { id: 'ORD003', customer: 'Bob Johnson', total: 8999, status: 'Delivered' },
                  ].map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div>
                        <h3 className="font-semibold">#{order.id}</h3>
                        <p className="text-gray-600 text-sm">{order.customer}</p>
                        <p className="font-bold text-mint">{formatPrice(order.total)}</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Select defaultValue={order.status.toLowerCase()}>
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="processing">Processing</SelectItem>
                            <SelectItem value="shipped">Shipped</SelectItem>
                            <SelectItem value="delivered">Delivered</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { id: '1', name: 'John Doe', email: 'john@example.com', orders: 5, joined: '2024-01-15' },
                    { id: '2', name: 'Jane Smith', email: 'jane@example.com', orders: 12, joined: '2023-12-10' },
                    { id: '3', name: 'Bob Johnson', email: 'bob@example.com', orders: 3, joined: '2024-01-20' },
                  ].map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div>
                        <h3 className="font-semibold">{user.name}</h3>
                        <p className="text-gray-600 text-sm">{user.email}</p>
                        <p className="text-sm text-gray-500">Joined: {user.joined}</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="font-semibold">{user.orders} orders</p>
                          <p className="text-sm text-gray-500">Total orders</p>
                        </div>
                        <Button variant="outline" size="sm">
                          View Profile
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
};

export default Admin;
