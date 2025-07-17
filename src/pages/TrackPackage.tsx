
import React, { useState } from 'react';
import { Search, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AIAssistant from '../components/AIAssistant';
import TrackingStatus, { TrackingInfo } from '../components/TrackingStatus';

// Mock tracking data
const mockTrackingData: { [key: string]: TrackingInfo } = {
  'ORD123456': {
    orderId: 'ORD123456',
    productName: 'Apple iPhone 15 Pro',
    status: 'shipped',
    estimatedDelivery: 'Tomorrow, Dec 28',
    currentLocation: 'Delhi Sorting Facility',
    trackingNumber: 'TRK789123456'
  },
  'ORD123457': {
    orderId: 'ORD123457',
    productName: 'Samsung Galaxy S24 Ultra',
    status: 'out-for-delivery',
    estimatedDelivery: 'Today by 6:00 PM',
    currentLocation: 'Local Delivery Hub',
    trackingNumber: 'TRK789123457'
  },
  'ORD123458': {
    orderId: 'ORD123458',
    productName: 'MacBook Air M3',
    status: 'delivered',
    estimatedDelivery: 'Delivered on Dec 25',
    currentLocation: 'Delivered to your doorstep',
    trackingNumber: 'TRK789123458'
  },
  'ORD123459': {
    orderId: 'ORD123459',
    productName: 'OnePlus 12',
    status: 'ordered',
    estimatedDelivery: 'Dec 30, 2024',
    trackingNumber: 'TRK789123459'
  }
};

const TrackPackage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [trackingInfo, setTrackingInfo] = useState<TrackingInfo | null>(null);
  const [notFound, setNotFound] = useState(false);

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    
    const tracking = mockTrackingData[searchQuery.toUpperCase()];
    
    if (tracking) {
      setTrackingInfo(tracking);
      setNotFound(false);
    } else {
      setTrackingInfo(null);
      setNotFound(true);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-6 md:py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-navy mb-2 md:mb-4">
              Track Your Package
            </h1>
            <p className="text-gray-600 text-base md:text-lg">
              Enter your order ID to track your package status
            </p>
          </div>

          {/* Search Section */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Package className="w-5 h-5 text-mint" />
                <span>Package Tracking</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                <Input
                  placeholder="Enter Order ID (e.g., ORD123456)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1"
                />
                <Button 
                  onClick={handleSearch}
                  className="bg-mint hover:bg-mint/90 text-white"
                >
                  <Search className="w-4 h-4 mr-2" />
                  Track Package
                </Button>
              </div>
              
              {/* Demo Order IDs */}
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800 font-medium mb-2">Demo Order IDs to try:</p>
                <div className="flex flex-wrap gap-2">
                  {Object.keys(mockTrackingData).map(orderId => (
                    <Button
                      key={orderId}
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSearchQuery(orderId);
                        setTrackingInfo(mockTrackingData[orderId]);
                        setNotFound(false);
                      }}
                      className="text-xs"
                    >
                      {orderId}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tracking Results */}
          {trackingInfo && (
            <div className="animate-fade-in">
              <TrackingStatus tracking={trackingInfo} />
            </div>
          )}

          {/* Not Found Message */}
          {notFound && (
            <Card className="animate-fade-in">
              <CardContent className="text-center py-12">
                <Package className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Order Not Found
                </h3>
                <p className="text-gray-600 mb-4">
                  We couldn't find an order with ID "{searchQuery}". 
                  Please check your order ID and try again.
                </p>
                <Button 
                  variant="outline"
                  onClick={() => {
                    setSearchQuery('');
                    setNotFound(false);
                  }}
                >
                  Try Again
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Help Section */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="text-lg">Need Help?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Where to find your Order ID?</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Check your order confirmation email</li>
                    <li>• Look in your account's order history</li>
                    <li>• Find it on your purchase receipt</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Tracking Status Guide</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• <strong>Order Placed:</strong> We've received your order</li>
                    <li>• <strong>Shipped:</strong> Package is in transit</li>
                    <li>• <strong>Out for Delivery:</strong> Package is on its way to you</li>
                    <li>• <strong>Delivered:</strong> Package has been delivered</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
      <AIAssistant />
    </div>
  );
};

export default TrackPackage;
