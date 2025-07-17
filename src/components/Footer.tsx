
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-navy text-white mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-mint to-white rounded-lg flex items-center justify-center">
                <ShoppingCart className="w-5 h-5 text-navy" />
              </div>
              <span className="text-xl font-bold">SnapBasket</span>
            </div>
            <p className="text-gray-300 text-sm">
              Your smart shopping companion with AI-powered recommendations and seamless experience.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/" className="block text-gray-300 hover:text-mint transition-colors text-sm">
                Home
              </Link>
              <Link to="/products" className="block text-gray-300 hover:text-mint transition-colors text-sm">
                Products
              </Link>
              <Link to="/categories" className="block text-gray-300 hover:text-mint transition-colors text-sm">
                Categories
              </Link>
              <Link to="/cart" className="block text-gray-300 hover:text-mint transition-colors text-sm">
                Cart
              </Link>
            </div>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Customer Service</h3>
            <div className="space-y-2">
              <Link to="/help" className="block text-gray-300 hover:text-mint transition-colors text-sm">
                Help Center
              </Link>
              <Link to="/returns" className="block text-gray-300 hover:text-mint transition-colors text-sm">
                Returns & Refunds
              </Link>
              <Link to="/shipping" className="block text-gray-300 hover:text-mint transition-colors text-sm">
                Shipping Info
              </Link>
              <Link to="/contact" className="block text-gray-300 hover:text-mint transition-colors text-sm">
                Contact Us
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <Mail className="w-4 h-4" />
                <span>support@snapbasket.com</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <Phone className="w-4 h-4" />
                <span>+91 1800-123-4567</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <MapPin className="w-4 h-4" />
                <span>Mumbai, India</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 SnapBasket. All rights reserved. | Privacy Policy | Terms of Service
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
