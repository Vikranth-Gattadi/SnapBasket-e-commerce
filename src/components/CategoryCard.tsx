
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Category } from '../types';

interface CategoryCardProps {
  category: Category;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <Link to={`/products?category=${category.id}`}>
      <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden">
        <div className="relative">
          <img
            src={category.image}
            alt={category.name}
            className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-colors duration-300"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <h3 className="text-lg font-semibold mb-1">{category.name}</h3>
              <p className="text sm text-gray-200">{category.productCount} products</p>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default CategoryCard;
