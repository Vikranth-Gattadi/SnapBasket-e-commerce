
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Circle, Truck, Package, MapPin, Clock } from 'lucide-react';

export interface TrackingInfo {
  orderId: string;
  productName: string;
  status: 'ordered' | 'shipped' | 'out-for-delivery' | 'delivered';
  estimatedDelivery: string;
  currentLocation?: string;
  trackingNumber?: string;
}

interface TrackingStatusProps {
  tracking: TrackingInfo;
}

const TrackingStatus: React.FC<TrackingStatusProps> = ({ tracking }) => {
  const steps = [
    { 
      id: 'ordered', 
      label: 'Order Placed', 
      icon: Package,
      description: 'Your order has been confirmed'
    },
    { 
      id: 'shipped', 
      label: 'Shipped', 
      icon: Truck,
      description: 'Your package is on its way'
    },
    { 
      id: 'out-for-delivery', 
      label: 'Out for Delivery', 
      icon: MapPin,
      description: 'Package is out for delivery'
    },
    { 
      id: 'delivered', 
      label: 'Delivered', 
      icon: CheckCircle,
      description: 'Package has been delivered'
    }
  ];

  const currentStepIndex = steps.findIndex(step => step.id === tracking.status);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ordered': return 'bg-blue-500';
      case 'shipped': return 'bg-yellow-500';
      case 'out-for-delivery': return 'bg-orange-500';
      case 'delivered': return 'bg-green-500';
      default: return 'bg-gray-300';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ordered': return <Badge className="bg-blue-500 hover:bg-blue-600">Order Placed</Badge>;
      case 'shipped': return <Badge className="bg-yellow-500 hover:bg-yellow-600">Shipped</Badge>;
      case 'out-for-delivery': return <Badge className="bg-orange-500 hover:bg-orange-600">Out for Delivery</Badge>;
      case 'delivered': return <Badge className="bg-green-500 hover:bg-green-600">Delivered</Badge>;
      default: return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <CardTitle className="text-lg md:text-xl">{tracking.productName}</CardTitle>
            <p className="text-sm text-gray-600">Order ID: {tracking.orderId}</p>
            {tracking.trackingNumber && (
              <p className="text-sm text-gray-600">Tracking: {tracking.trackingNumber}</p>
            )}
          </div>
          {getStatusBadge(tracking.status)}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Progress Bar */}
        <div className="relative">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isCompleted = index <= currentStepIndex;
              const isCurrent = index === currentStepIndex;
              
              return (
                <div key={step.id} className="flex flex-col items-center relative z-10">
                  <div className={`
                    w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300
                    ${isCompleted 
                      ? `${getStatusColor(tracking.status)} border-transparent text-white` 
                      : 'bg-gray-100 border-gray-300 text-gray-400'
                    }
                    ${isCurrent ? 'ring-4 ring-opacity-30 ring-blue-500' : ''}
                  `}>
                    <Icon className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <span className={`
                    text-xs md:text-sm mt-2 text-center max-w-20 leading-tight
                    ${isCompleted ? 'text-gray-900 font-medium' : 'text-gray-500'}
                  `}>
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
          
          {/* Progress Line */}
          <div className="absolute top-5 md:top-6 left-5 md:left-6 right-5 md:right-6 h-0.5 bg-gray-200 -z-10">
            <div 
              className={`h-full ${getStatusColor(tracking.status)} transition-all duration-500`}
              style={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
            />
          </div>
        </div>

        {/* Current Status Details */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className={`w-8 h-8 rounded-full ${getStatusColor(tracking.status)} flex items-center justify-center`}>
              <Clock className="w-4 h-4 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">
                {steps[currentStepIndex]?.label}
              </h4>
              <p className="text-sm text-gray-600">
                {steps[currentStepIndex]?.description}
              </p>
            </div>
          </div>
          
          {tracking.currentLocation && (
            <div className="mt-3 text-sm text-gray-600">
              <strong>Current Location:</strong> {tracking.currentLocation}
            </div>
          )}
          
          <div className="mt-3 text-sm text-gray-600">
            <strong>Estimated Delivery:</strong> {tracking.estimatedDelivery}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrackingStatus;
