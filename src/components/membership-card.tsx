import React, { useState, memo } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from './ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Crown, Gift, Star, Zap, Phone, Mail, Calendar, CreditCard, Sparkles, Check, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner@2.0.3';

export function MembershipCard() {
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    birthday: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });
  const [step, setStep] = useState(1);

  const membershipTiers = [
    {
      id: 'bronze',
      name: "Crispy Starter",
      price: "Free",
      monthlyPrice: "$0",
      points: "0-499 points",
      perks: [
        "5% discount on all orders",
        "Free birthday meal",
        "Member-only offers",
        "Basic customer support",
        "Points on every purchase"
      ],
      color: "from-gray-400 to-gray-600",
      icon: <Star className="w-8 h-8" />,
      popular: false
    },
    {
      id: 'gold',
      name: "Golden Member",
      price: "$9.99/month",
      monthlyPrice: "$9.99",
      points: "500-1999 points",
      perks: [
        "10% discount on all orders",
        "Free sides with every meal",
        "Priority customer support",
        "Early access to new items",
        "2x points on weekends",
        "Free delivery on orders $15+"
      ],
      color: "from-yellow-400 to-yellow-600",
      icon: <Crown className="w-8 h-8" />,
      popular: true
    },
    {
      id: 'platinum',
      name: "Platinum Elite",
      price: "$19.99/month",
      monthlyPrice: "$19.99",
      points: "2000+ points",
      perks: [
        "15% discount on all orders",
        "Free delivery always",
        "VIP events and tastings",
        "Personal concierge service",
        "3x points on all purchases",
        "Monthly surprise box",
        "Skip-the-line privileges",
        "Exclusive chef collaborations"
      ],
      color: "from-purple-400 to-purple-600",
      icon: <Sparkles className="w-8 h-8" />,
      popular: false
    }
  ];

  const benefits = [
    {
      icon: <Crown className="w-6 h-6" />,
      title: "VIP Access",
      description: "Exclusive early access to new menu items and seasonal specials",
      color: "text-yellow-500"
    },
    {
      icon: <Gift className="w-6 h-6" />,
      title: "Birthday Rewards",
      description: "Free meal on your birthday plus surprise gifts throughout the year",
      color: "text-purple-500"
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: "Double Points",
      description: "Earn 2x points on every purchase, redeem for free food and drinks",
      color: "text-blue-500"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Skip the Line",
      description: "Priority ordering and faster service at all locations",
      color: "text-green-500"
    }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleTierSelect = (tierId: string) => {
    setSelectedTier(tierId);
    setStep(2);
  };

  const handleSignup = () => {
    if (step === 2) {
      if (formData.name && formData.email) {
        setStep(3);
      } else {
        toast.error('Please fill in all required fields');
        return;
      }
    } else if (step === 3) {
      const selectedTierData = membershipTiers.find(t => t.id === selectedTier);
      if (selectedTierData?.price === "Free" || (formData.cardNumber && formData.expiryDate && formData.cvv)) {
        toast.success(`🎉 Welcome to CRISPY ELITE ${selectedTierData?.name}! Check your email for your digital membership card.`);
        setIsSignupOpen(false);
        setStep(1);
        setSelectedTier(null);
        setFormData({ name: '', email: '', phone: '', birthday: '', cardNumber: '', expiryDate: '', cvv: '' });
      } else {
        toast.error('Please fill in all payment details');
        return;
      }
    }
  };

  const selectedTierData = membershipTiers.find(t => t.id === selectedTier);

  return (
    <div className="bg-gradient-to-br from-black via-gray-900 to-red-900 relative overflow-hidden py-20">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-red-600/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-yellow-500/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <Crown className="w-12 h-12 text-yellow-500" />
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-400 via-red-500 to-purple-500 bg-clip-text text-transparent">
              CRISPY ELITE
            </h2>
            <motion.div
              animate={{ rotate: [360, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-12 h-12 text-purple-500" />
            </motion.div>
          </div>
          <p className="text-xl text-gray-300 mb-6">
            Join the most exclusive chicken loyalty program and unlock incredible rewards!
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 h-full">
                <CardContent className="p-6 text-center">
                  <motion.div 
                    className={`${benefit.color} mb-4 flex justify-center`}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {benefit.icon}
                  </motion.div>
                  <h3 className="font-bold text-white mb-2">{benefit.title}</h3>
                  <p className="text-gray-400 text-sm">{benefit.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Membership Tiers */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h3 className="text-3xl font-bold text-center text-white mb-8">Choose Your Membership Tier</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {membershipTiers.map((tier, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02, y: -5 }}
                className="relative"
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                    <Badge className="bg-red-600 text-white px-4 py-1 text-sm font-bold">
                      MOST POPULAR
                    </Badge>
                  </div>
                )}
                <Card className={`bg-gradient-to-br ${tier.color} text-white border-none h-full relative overflow-hidden ${tier.popular ? 'ring-2 ring-red-500' : ''}`}>
                  <CardContent className="p-6 relative z-10">
                    <div className="text-center mb-6">
                      <div className="flex justify-center mb-3">
                        {tier.icon}
                      </div>
                      <h4 className="text-2xl font-bold mb-2">{tier.name}</h4>
                      <div className="text-3xl font-bold mb-2">{tier.price}</div>
                      <Badge variant="secondary" className="bg-white/20 text-white">
                        {tier.points}
                      </Badge>
                    </div>
                    <ul className="space-y-3 mb-6">
                      {tier.perks.map((perk, perkIndex) => (
                        <li key={perkIndex} className="flex items-center gap-2 text-sm">
                          <Check className="w-4 h-4 text-green-300 flex-shrink-0" />
                          {perk}
                        </li>
                      ))}
                    </ul>
                    <Dialog open={isSignupOpen} onOpenChange={setIsSignupOpen}>
                      <DialogTrigger asChild>
                        <Button 
                          className="w-full bg-white text-black hover:bg-gray-100 font-bold py-3"
                          onClick={() => handleTierSelect(tier.id)}
                        >
                          Choose {tier.name}
                        </Button>
                      </DialogTrigger>
                    </Dialog>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Signup Modal */}
        <Dialog open={isSignupOpen} onOpenChange={setIsSignupOpen}>
          <DialogContent className="max-w-lg bg-gradient-to-br from-gray-900 to-black text-white border-gray-700">
            <DialogHeader>
              <DialogTitle className="text-center text-2xl font-bold bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent">
                Join CRISPY ELITE
              </DialogTitle>
              <DialogDescription className="text-center text-gray-400">
                {selectedTierData && `Signing up for ${selectedTierData.name} - ${selectedTierData.price}`}
              </DialogDescription>
            </DialogHeader>
            
            <AnimatePresence mode="wait">
              {step === 2 ? (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  className="space-y-4"
                >
                  <div>
                    <label className="text-sm font-medium text-gray-300 mb-2 block">Full Name *</label>
                    <Input
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Enter your full name"
                      className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-300 mb-2 block">Email Address *</label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="Enter your email"
                      className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-300 mb-2 block">Phone Number</label>
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="(555) 123-4567"
                      className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-300 mb-2 block">Birthday (for free meal!)</label>
                    <Input
                      type="date"
                      value={formData.birthday}
                      onChange={(e) => handleInputChange('birthday', e.target.value)}
                      className="bg-gray-800 border-gray-600 text-white"
                    />
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="outline"
                      onClick={() => {
                        setIsSignupOpen(false);
                        setStep(1);
                        setSelectedTier(null);
                      }}
                      className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-800"
                    >
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleSignup}
                      className="flex-1 bg-gradient-to-r from-red-600 to-purple-600 hover:from-red-700 hover:to-purple-700"
                    >
                      {selectedTierData?.price === "Free" ? "Join Free!" : "Continue to Payment"}
                    </Button>
                  </div>
                </motion.div>
              ) : step === 3 ? (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  className="space-y-4"
                >
                  <div className="bg-gray-800 rounded-lg p-4 mb-4">
                    <h4 className="font-bold text-white mb-2">Order Summary</h4>
                    <div className="flex justify-between text-sm text-gray-300">
                      <span>{selectedTierData?.name} Membership</span>
                      <span>{selectedTierData?.monthlyPrice}/month</span>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-300 mb-2 block">Card Number *</label>
                    <Input
                      value={formData.cardNumber}
                      onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                      placeholder="1234 5678 9012 3456"
                      className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-300 mb-2 block">Expiry Date *</label>
                      <Input
                        value={formData.expiryDate}
                        onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                        placeholder="MM/YY"
                        className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-300 mb-2 block">CVV *</label>
                      <Input
                        value={formData.cvv}
                        onChange={(e) => handleInputChange('cvv', e.target.value)}
                        placeholder="123"
                        className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                      />
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="outline"
                      onClick={() => setStep(2)}
                      className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-800"
                    >
                      Back
                    </Button>
                    <Button 
                      onClick={handleSignup}
                      className="flex-1 bg-gradient-to-r from-red-600 to-purple-600 hover:from-red-700 hover:to-purple-700"
                    >
                      <CreditCard className="w-4 h-4 mr-2" />
                      Complete Payment
                    </Button>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </DialogContent>
        </Dialog>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center bg-gradient-to-r from-red-600/20 to-purple-600/20 rounded-2xl p-8 backdrop-blur-sm border border-red-500/30"
        >
          <h3 className="text-2xl font-bold text-white mb-4">
            Ready to Join the Elite?
          </h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Don't miss out on exclusive rewards, VIP perks, and the ultimate chicken experience. 
            Join thousands of satisfied members today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div whileHover={{ scale: 1.05 }}>
              <Button 
                size="lg"
                className="bg-white text-black hover:bg-gray-100 px-8 py-3 font-bold"
                onClick={() => {
                  setSelectedTier('gold');
                  setIsSignupOpen(true);
                  setStep(2);
                }}
              >
                <Crown className="w-5 h-5 mr-2" />
                Start Free Trial
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Button 
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-black px-8 py-3 font-bold"
                onClick={() => toast.info('Coming soon! Download our mobile app for exclusive features.')}
              >
                <Phone className="w-5 h-5 mr-2" />
                Download App
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default memo(MembershipCard);