
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Product } from '../types';
import { useApp } from '../context/AppContext';
import { toast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { dispatch } = useApp();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch({ type: 'ADD_TO_CART', payload: product });
    toast({
      title: 'Added to cart',
      description: `${product.name} has been added to your cart.`,
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden">
      <Link to={`/product/${product.id}`}>
        <div className="relative overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {product.originalPrice && (
            <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
              {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
            </div>
          )}
        </div>
      </Link>

      <CardContent className="p-4">
        <div className="space-y-2">
          <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-navy transition-colors">
            <Link to={`/product/${product.id}`}>{product.name}</Link>
          </h3>
          
          <div className="flex items-center space-x-1">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating) 
                      ? 'text-yellow-400 fill-current' 
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">
              {product.rating} ({product.reviews})
            </span>
          </div>

          <div className="flex items-baseline space-x-2">
            <span className="text-lg font-bold text-gray-900">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          <p className="text-sm text-gray-600 line-clamp-2">
            {product.description}
          </p>

          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-gray-500">
              {product.availability ? `Delivery: ${product.deliveryTime}` : 'Out of stock'}
            </span>
            <Button
              onClick={handleAddToCart}
              disabled={!product.availability}
              className="bg-mint hover:bg-mint/90 text-white px-4 py-2 text-sm"
            >
              <ShoppingCart className="w-4 h-4 mr-1" />
              Add to Cart
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
