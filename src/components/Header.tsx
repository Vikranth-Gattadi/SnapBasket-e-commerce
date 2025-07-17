
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X, LogOut, UserCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { state, dispatch } = useApp();
  const { user, signOut } = useAuth();
  const location = useLocation();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({ type: 'SET_SEARCH_QUERY', payload: searchQuery });
    if (location.pathname !== '/products') {
      window.location.href = '/products';
    }
  };

  const cartItemsCount = state.cart.reduce((total, item) => total + item.quantity, 0);

  const handleSignOut = async () => {
    await signOut();
    window.location.href = '/';
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-navy to-mint rounded-lg flex items-center justify-center">
              <ShoppingCart className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-navy">SnapBasket</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-navy transition-colors font-medium">
              Home
            </Link>
            <Link to="/products" className="text-gray-700 hover:text-navy transition-colors font-medium">
              Products
            </Link>
            <Link to="/categories" className="text-gray-700 hover:text-navy transition-colors font-medium">
              Categories
            </Link>
          </nav>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden lg:flex items-center space-x-2 flex-1 max-w-md mx-8">
            <div className="relative flex-1">
              <Input
                type="text"
                placeholder="Search products with natural language..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mint focus:border-transparent"
              />
              <Button
                type="submit"
                size="sm"
                className="absolute right-1 top-1 bg-mint hover:bg-mint/90"
              >
                <Search className="w-4 h-4" />
              </Button>
            </div>
          </form>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            {/* Mobile Search */}
            <Button variant="ghost" size="sm" className="md:hidden">
              <Search className="w-5 h-5" />
            </Button>

            {/* Cart */}
            <Link to="/cart">
              <Button variant="ghost" size="sm" className="relative">
                <ShoppingCart className="w-5 h-5" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-mint text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* User Menu */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                    <UserCircle className="w-5 h-5" />
                    <span className="hidden md:block">
                      {user.user_metadata?.first_name || user.email?.split('@')[0] || 'User'}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-white shadow-lg">
                  <div className="px-2 py-1.5 text-sm text-gray-600">
                    {user.email}
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="flex items-center space-x-2 cursor-pointer">
                      <User className="w-4 h-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/orders" className="flex items-center space-x-2 cursor-pointer">
                      <ShoppingCart className="w-4 h-4" />
                      <span>Orders</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="flex items-center space-x-2 cursor-pointer text-red-600">
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/auth">
                <Button className="bg-gradient-to-r from-navy to-mint hover:from-navy/90 hover:to-mint/90 text-white">
                  <User className="w-4 h-4 mr-2" />
                  Sign In
                </Button>
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-gray-200 animate-fade-in">
            <nav className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-gray-700 hover:text-navy transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/products"
                className="text-gray-700 hover:text-navy transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
              <Link
                to="/categories"
                className="text-gray-700 hover:text-navy transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Categories
              </Link>
              <form onSubmit={handleSearch} className="flex space-x-2">
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" size="sm" className="bg-mint hover:bg-mint/90">
                  <Search className="w-4 h-4" />
                </Button>
              </form>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
