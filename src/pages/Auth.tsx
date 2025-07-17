
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, ShoppingCart, Sparkles, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    confirmPassword: ''
  });
  const [passwordStrength, setPasswordStrength] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate('/');
      }
    };
    checkAuth();
  }, [navigate]);

  useEffect(() => {
    // Calculate password strength
    const calculateStrength = (password: string) => {
      let strength = 0;
      if (password.length >= 8) strength += 25;
      if (/[A-Z]/.test(password)) strength += 25;
      if (/[a-z]/.test(password)) strength += 25;
      if (/[0-9]/.test(password)) strength += 25;
      return strength;
    };
    setPasswordStrength(calculateStrength(formData.password));
  }, [formData.password]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isLogin) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password
        });

        if (error) throw error;

        toast({
          title: "Welcome back!",
          description: "You have successfully logged in.",
        });
        navigate('/');
      } else {
        if (formData.password !== formData.confirmPassword) {
          toast({
            title: "Password mismatch",
            description: "Please make sure your passwords match.",
            variant: "destructive"
          });
          return;
        }

        const { data, error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            emailRedirectTo: `${window.location.origin}/`,
            data: {
              first_name: formData.firstName,
              last_name: formData.lastName
            }
          }
        });

        if (error) throw error;

        toast({
          title: "Account created!",
          description: "Please check your email to verify your account.",
        });
      }
    } catch (error: any) {
      toast({
        title: "Authentication failed",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 25) return 'bg-red-500';
    if (passwordStrength <= 50) return 'bg-orange-500';
    if (passwordStrength <= 75) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength <= 25) return 'Weak';
    if (passwordStrength <= 50) return 'Fair';
    if (passwordStrength <= 75) return 'Good';
    return 'Strong';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy via-mint/20 to-navy flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -left-4 w-72 h-72 bg-mint/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-4 -right-4 w-96 h-96 bg-navy/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Floating Icons */}
      <div className="absolute inset-0 pointer-events-none">
        <ShoppingCart className="absolute top-20 left-20 w-8 h-8 text-mint/30 animate-bounce delay-300" />
        <Sparkles className="absolute top-32 right-32 w-6 h-6 text-white/40 animate-pulse delay-700" />
        <User className="absolute bottom-32 left-32 w-7 h-7 text-mint/20 animate-bounce delay-1000" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-mint to-navy rounded-xl flex items-center justify-center shadow-lg">
              <ShoppingCart className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white">SnapBasket</h1>
          </div>
          <p className="text-white/80">Your Smart Shopping Companion</p>
        </div>

        {/* Auth Card */}
        <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl animate-scale-in">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-bold text-navy">
              {isLogin ? 'Welcome Back!' : 'Create Account'}
            </CardTitle>
            <p className="text-gray-600">
              {isLogin ? 'Sign in to continue shopping' : 'Join thousands of happy customers'}
            </p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Fields for Signup */}
              {!isLogin && (
                <div className="grid grid-cols-2 gap-4 animate-fade-in">
                  <div>
                    <Label htmlFor="firstName" className="text-navy font-medium">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="mt-1 border-gray-300 focus:border-mint focus:ring-mint/20"
                      required={!isLogin}
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-navy font-medium">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="mt-1 border-gray-300 focus:border-mint focus:ring-mint/20"
                      required={!isLogin}
                      placeholder="Doe"
                    />
                  </div>
                </div>
              )}

              {/* Email Field */}
              <div>
                <Label htmlFor="email" className="text-navy font-medium">Email Address</Label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="pl-10 border-gray-300 focus:border-mint focus:ring-mint/20"
                    required
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <Label htmlFor="password" className="text-navy font-medium">Password</Label>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleInputChange}
                    className="pl-10 pr-10 border-gray-300 focus:border-mint focus:ring-mint/20"
                    required
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>

                {/* Password Strength Indicator */}
                {!isLogin && formData.password && (
                  <div className="mt-2 animate-fade-in">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Password strength:</span>
                      <span className={`font-medium ${
                        passwordStrength <= 25 ? 'text-red-500' :
                        passwordStrength <= 50 ? 'text-orange-500' :
                        passwordStrength <= 75 ? 'text-yellow-500' : 'text-green-500'
                      }`}>
                        {getPasswordStrengthText()}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                        style={{ width: `${passwordStrength}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password for Signup */}
              {!isLogin && (
                <div className="animate-fade-in">
                  <Label htmlFor="confirmPassword" className="text-navy font-medium">Confirm Password</Label>
                  <div className="relative mt-1">
                    <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="pl-10 border-gray-300 focus:border-mint focus:ring-mint/20"
                      required={!isLogin}
                      placeholder="••••••••"
                    />
                    {formData.confirmPassword && (
                      <div className="absolute right-3 top-3">
                        {formData.password === formData.confirmPassword ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-500" />
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-navy to-mint hover:from-navy/90 hover:to-mint/90 text-white font-semibold py-3 rounded-lg shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>{isLogin ? 'Signing in...' : 'Creating account...'}</span>
                  </div>
                ) : (
                  <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                )}
              </Button>
            </form>

            {/* Switch Mode */}
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
              </p>
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-mint hover:text-mint/80 font-semibold transition-colors hover:underline"
              >
                {isLogin ? 'Create Account' : 'Sign In'}
              </button>
            </div>

            {/* Back to Home */}
            <div className="mt-4 text-center">
              <Link 
                to="/" 
                className="text-gray-500 hover:text-navy text-sm transition-colors"
              >
                ← Back to Home
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
