import React, { useState, useCallback, useMemo } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from './ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Separator } from './ui/separator';
import { Minus, Plus, X, ShoppingBag, CreditCard, Wallet, DollarSign, QrCode, Copy, Check, Shield, Clock } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { ImageWithFallback } from './figma/ImageWithFallback';
import type { MenuItem } from './menu-section';

export interface CartItem extends MenuItem {
  quantity: number;
}

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
}

export function Cart({ 
  isOpen, 
  onClose, 
  items, 
  onUpdateQuantity, 
  onRemoveItem, 
  onCheckout 
}: CartProps) {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [selectedWallet, setSelectedWallet] = useState('');
  const [activeTab, setActiveTab] = useState('cart');
  const [upiId, setUpiId] = useState('');
  const [isUpiVerified, setIsUpiVerified] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const calculations = useMemo(() => {
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const gst = subtotal * 0.18;
    const serviceCharge = subtotal * 0.05;
    const packagingFee = 1.50;
    const delivery = subtotal > 25 ? 0 : 2.99;
    const discount = 0;
    const total = subtotal + gst + serviceCharge + packagingFee + delivery - discount;
    
    return { subtotal, gst, serviceCharge, packagingFee, delivery, discount, total };
  }, [items]);

  const { subtotal, gst, serviceCharge, packagingFee, delivery, discount, total } = calculations;

  const handleProceedToPayment = useCallback(() => {
    setActiveTab('payment');
  }, []);

  const handleVerifyUPI = useCallback(() => {
    if (!upiId) {
      toast.error('Please enter a valid UPI ID');
      return;
    }
    setIsProcessing(true);
    setTimeout(() => {
      setIsUpiVerified(true);
      setIsProcessing(false);
      toast.success('UPI ID verified successfully!');
    }, 2000);
  }, [upiId]);

  const handlePlaceOrder = useCallback(() => {
    setIsProcessing(true);
    
    let message = '';
    if (paymentMethod === 'cod') {
      message = `Order placed! Total: $${total.toFixed(2)} - Pay with cash on delivery`;
    } else if (paymentMethod === 'wallet') {
      message = `Payment successful via ${selectedWallet}! Total: $${total.toFixed(2)}`;
    } else {
      message = `Payment processed successfully! Total: $${total.toFixed(2)}`;
    }
    
    setTimeout(() => {
      toast.success(message);
      onCheckout();
      setActiveTab('cart');
      setSelectedWallet('');
      setUpiId('');
      setIsUpiVerified(false);
      setIsProcessing(false);
    }, 2000);
  }, [paymentMethod, selectedWallet, total, onCheckout]);

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg p-0 flex flex-col h-full">
        <SheetHeader className="px-6 py-4 border-b bg-white shrink-0">
          <SheetTitle className="flex items-center gap-2 text-2xl">
            <ShoppingBag className="w-6 h-6 text-red-600" />
            Your Order
          </SheetTitle>
          <SheetDescription>
            Review your items and complete your payment securely.
          </SheetDescription>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex items-center justify-center text-center px-6 py-4">
            <div>
              <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
              <p className="text-gray-500 mb-6">Add some delicious items to get started!</p>
              <Button onClick={onClose} className="bg-red-600 hover:bg-red-700 text-white">
                Continue Shopping
              </Button>
            </div>
          </div>
        ) : (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col h-full flex-1 min-h-0">
            <TabsList className="grid w-full grid-cols-2 mx-6 mt-4 shrink-0">
              <TabsTrigger value="cart">Cart ({items.length})</TabsTrigger>
              <TabsTrigger value="payment">Payment</TabsTrigger>
            </TabsList>

            <TabsContent value="cart" className="flex-1 flex flex-col m-0 min-h-0">
              {/* Scrollable Cart Items */}
              <div className="flex-1 overflow-y-auto px-6 py-4">
                <div className="space-y-4">
                  {items.map((item) => (
                    <Card key={item.id} className="border border-gray-200">
                      <CardContent className="p-4">
                        <div className="flex gap-4">
                          <ImageWithFallback
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex-1 min-w-0">
                                <h4 className="font-medium text-black truncate">{item.name}</h4>
                                <div className="flex gap-2 mt-1">
                                  {item.isPopular && (
                                    <Badge className="bg-red-600 text-white text-xs">Popular</Badge>
                                  )}
                                  {item.isSpicy && (
                                    <Badge className="bg-orange-500 text-white text-xs">🌶️</Badge>
                                  )}
                                </div>
                              </div>
                              <Button
                                onClick={() => onRemoveItem(item.id)}
                                variant="ghost"
                                size="sm"
                                className="text-gray-400 hover:text-red-600 flex-shrink-0"
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-red-600">${item.price.toFixed(2)}</span>
                              <div className="flex items-center gap-2">
                                <Button
                                  onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                                  variant="outline"
                                  size="sm"
                                  className="w-8 h-8 p-0"
                                >
                                  <Minus className="w-3 h-3" />
                                </Button>
                                <span className="w-8 text-center font-medium">{item.quantity}</span>
                                <Button
                                  onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                  variant="outline"
                                  size="sm"
                                  className="w-8 h-8 p-0"
                                >
                                  <Plus className="w-3 h-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Fixed Bill Summary and Proceed Button */}
              <div className="bg-white border-t px-6 py-4 shrink-0">
                <Card className="border border-gray-200 mb-4">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Bill Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>GST (18%)</span>
                        <span>${gst.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Service Charge (5%)</span>
                        <span>${serviceCharge.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Packaging Fee</span>
                        <span>${packagingFee.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Delivery</span>
                        <span>{delivery === 0 ? 'FREE' : `$${delivery.toFixed(2)}`}</span>
                      </div>
                      {discount > 0 && (
                        <div className="flex justify-between text-green-600">
                          <span>Discount</span>
                          <span>-${discount.toFixed(2)}</span>
                        </div>
                      )}
                      <Separator className="my-2" />
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total Amount</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Button 
                  onClick={handleProceedToPayment}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 text-lg"
                >
                  Proceed to Payment
                </Button>
                
                <p className="text-xs text-gray-500 text-center mt-2">
                  <Shield className="w-3 h-3 inline mr-1" />
                  100% secure payment protected by SSL encryption
                </p>
              </div>
            </TabsContent>

            <TabsContent value="payment" className="flex-1 flex flex-col m-0 min-h-0">
              {/* Scrollable Payment Content */}
              <div className="flex-1 overflow-y-auto px-6 py-4">
                {/* Payment Method Selection */}
                <Card className="mb-4">
                  <CardHeader>
                    <CardTitle className="text-lg">Select Payment Method</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                          <RadioGroupItem value="card" id="card" />
                          <Label htmlFor="card" className="flex items-center gap-3 flex-1 cursor-pointer">
                            <CreditCard className="w-5 h-5 text-blue-600" />
                            <div>
                              <div className="font-medium">Credit/Debit Card</div>
                              <div className="text-sm text-gray-500">Visa, Mastercard, Amex</div>
                            </div>
                          </Label>
                        </div>
                        
                        <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                          <RadioGroupItem value="wallet" id="wallet" />
                          <Label htmlFor="wallet" className="flex items-center gap-3 flex-1 cursor-pointer">
                            <Wallet className="w-5 h-5 text-purple-600" />
                            <div>
                              <div className="font-medium">UPI & Digital Wallets</div>
                              <div className="text-sm text-gray-500">PayPal, Apple Pay, Google Pay, UPI</div>
                            </div>
                          </Label>
                        </div>
                        
                        <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                          <RadioGroupItem value="cod" id="cod" />
                          <Label htmlFor="cod" className="flex items-center gap-3 flex-1 cursor-pointer">
                            <DollarSign className="w-5 h-5 text-green-600" />
                            <div>
                              <div className="font-medium">Cash on Delivery</div>
                              <div className="text-sm text-gray-500">Pay when order arrives</div>
                            </div>
                          </Label>
                        </div>
                      </div>
                    </RadioGroup>
                  </CardContent>
                </Card>

                {/* Payment Details */}
                {paymentMethod === 'card' && (
                  <Card className="mb-4">
                    <CardHeader>
                      <CardTitle className="text-lg">Card Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Input placeholder="Card Number" className="h-12" />
                      <div className="grid grid-cols-2 gap-4">
                        <Input placeholder="MM/YY" className="h-12" />
                        <Input placeholder="CVV" className="h-12" />
                      </div>
                      <Input placeholder="Cardholder Name" className="h-12" />
                    </CardContent>
                  </Card>
                )}

                {paymentMethod === 'wallet' && (
                  <Card className="mb-4">
                    <CardHeader>
                      <CardTitle className="text-lg">Choose Your Wallet</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <RadioGroup value={selectedWallet} onValueChange={setSelectedWallet}>
                        <div className="space-y-3">
                          <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                            <RadioGroupItem value="upi" id="upi" />
                            <Label htmlFor="upi" className="flex items-center gap-3 flex-1 cursor-pointer">
                              <QrCode className="w-5 h-5 text-blue-600" />
                              <div>
                                <div className="font-medium">UPI Payment</div>
                                <div className="text-sm text-gray-500">Pay using UPI ID or QR Code</div>
                              </div>
                            </Label>
                          </div>
                          <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                            <RadioGroupItem value="paypal" id="paypal" />
                            <Label htmlFor="paypal" className="flex items-center gap-3 flex-1 cursor-pointer">
                              <span className="text-xl">💳</span>
                              <div>
                                <div className="font-medium">PayPal</div>
                                <div className="text-sm text-gray-500">Pay with your PayPal account</div>
                              </div>
                            </Label>
                          </div>
                          <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                            <RadioGroupItem value="apple" id="apple" />
                            <Label htmlFor="apple" className="flex items-center gap-3 flex-1 cursor-pointer">
                              <span className="text-xl">🍎</span>
                              <div>
                                <div className="font-medium">Apple Pay</div>
                                <div className="text-sm text-gray-500">Use Touch ID or Face ID</div>
                              </div>
                            </Label>
                          </div>
                          <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                            <RadioGroupItem value="google" id="google" />
                            <Label htmlFor="google" className="flex items-center gap-3 flex-1 cursor-pointer">
                              <span className="text-xl">🔴</span>
                              <div>
                                <div className="font-medium">Google Pay</div>
                                <div className="text-sm text-gray-500">Pay with Google Pay</div>
                              </div>
                            </Label>
                          </div>
                        </div>
                      </RadioGroup>

                      {selectedWallet === 'upi' && (
                        <div className="mt-4">
                          <div className="bg-blue-50 p-4 rounded-lg mb-4">
                            <QrCode className="w-24 h-24 mx-auto mb-4 text-blue-600" />
                            <p className="text-center font-medium">Scan QR Code to Pay</p>
                            <p className="text-center text-sm text-gray-600">Amount: ${total.toFixed(2)}</p>
                          </div>
                          <div className="space-y-3">
                            <Label htmlFor="upi-input" className="text-sm font-medium">Or enter your UPI ID</Label>
                            <Input 
                              id="upi-input"
                              placeholder="yourname@paytm"
                              value={upiId}
                              onChange={(e) => setUpiId(e.target.value)}
                              className="h-12"
                            />
                            {!isUpiVerified ? (
                              <Button 
                                onClick={handleVerifyUPI}
                                disabled={!upiId || isProcessing}
                                className="w-full bg-blue-600 hover:bg-blue-700"
                              >
                                {isProcessing ? (
                                  <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                                    Verifying...
                                  </>
                                ) : (
                                  'Verify UPI ID'
                                )}
                              </Button>
                            ) : (
                              <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                                <Check className="w-5 h-5 text-green-600" />
                                <span className="text-green-700 font-medium">UPI ID Verified Successfully</span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}

                {paymentMethod === 'cod' && (
                  <Card className="mb-4 border-green-200 bg-green-50">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <DollarSign className="w-6 h-6 text-green-600" />
                        <h4 className="font-medium text-green-800">Cash on Delivery</h4>
                      </div>
                      <p className="text-sm text-green-700 mb-4">
                        Pay with cash when your order is delivered to your doorstep.
                      </p>
                      <div className="bg-green-100 rounded-lg p-4">
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-green-800">Amount to pay:</span>
                          <span className="font-bold text-lg text-green-800">${total.toFixed(2)}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Order Summary */}
                <Card className="border border-gray-200 mb-6">
                  <CardHeader>
                    <CardTitle className="text-lg">Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Taxes & Charges</span>
                        <span>${(gst + serviceCharge + packagingFee).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Delivery</span>
                        <span>{delivery === 0 ? 'FREE' : `$${delivery.toFixed(2)}`}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Fixed Payment Action Button */}
              <div className="bg-white border-t px-6 py-4 shrink-0">
                <div className="space-y-3">
                  <Button 
                    onClick={handlePlaceOrder}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 text-lg"
                    disabled={
                      isProcessing || 
                      (paymentMethod === 'wallet' && !selectedWallet) ||
                      (paymentMethod === 'wallet' && selectedWallet === 'upi' && !isUpiVerified)
                    }
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Processing...
                      </>
                    ) : (
                      `Pay $${total.toFixed(2)}`
                    )}
                  </Button>
                  
                  <Button 
                    onClick={() => setActiveTab('cart')}
                    variant="outline"
                    className="w-full"
                  >
                    Back to Cart
                  </Button>
                  
                  <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                    <Shield className="w-3 h-3" />
                    <span>Your payment information is secure and encrypted</span>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        )}
      </SheetContent>
    </Sheet>
  );
}