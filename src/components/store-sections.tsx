import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { MapPin, Building, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { motion } from 'motion/react';

export function StoreSections() {
  const [locationRequest, setLocationRequest] = useState({ name: '', email: '', city: '', details: '' });
  const [franchiseInquiry, setFranchiseInquiry] = useState({ name: '', email: '', phone: '', location: '', investment: '' });

  const handleLocationRequest = () => {
    if (locationRequest.name && locationRequest.email && locationRequest.city) {
      toast.success('Location request submitted! We\'ll review and get back to you within 5 business days.');
      setLocationRequest({ name: '', email: '', city: '', details: '' });
    } else {
      toast.error('Please fill in all required fields');
    }
  };

  const handleFranchiseInquiry = () => {
    if (franchiseInquiry.name && franchiseInquiry.email && franchiseInquiry.phone) {
      toast.success('Franchise inquiry submitted! Our team will contact you within 48 hours.');
      setFranchiseInquiry({ name: '', email: '', phone: '', location: '', investment: '' });
    } else {
      toast.error('Please fill in all required fields');
    }
  };

  const faqs = [
    {
      question: "What are your store hours?",
      answer: "Most of our stores are open from 10:00 AM to 11:00 PM daily. However, hours may vary by location. Please check the specific store hours on our store locator or call your local restaurant."
    },
    {
      question: "Do you offer delivery?",
      answer: "Yes! We offer delivery through our website, mobile app, and third-party delivery services. Delivery is free on orders over $25, otherwise there's a $2.99 delivery fee."
    },
    {
      question: "Can I place a large catering order?",
      answer: "Absolutely! We offer catering services for groups of 10 or more. Please call your local store at least 24 hours in advance to place a catering order. We offer special platters and family meal deals."
    },
    {
      question: "Do you have vegetarian options?",
      answer: "Yes, we offer several vegetarian options including our veggie burger, salads, sides like coleslaw and fries, and various desserts. Please note that some items may be prepared in shared equipment."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept cash, credit/debit cards (Visa, Mastercard, Amex), UPI payments (PayTM, PhonePe, Google Pay), digital wallets (PayPal, Apple Pay), and cash on delivery for online orders."
    },
    {
      question: "How can I track my order?",
      answer: "You can track your order in real-time through our website or mobile app using your order number. You'll also receive SMS updates on your order status from preparation to delivery."
    },
    {
      question: "Do you offer nutritional information?",
      answer: "Yes, we provide detailed nutritional information for all our menu items including calories, allergens, and ingredients. This information is available on our website and in-store upon request."
    },
    {
      question: "How do I join your membership program?",
      answer: "You can join our CRISPY ELITE membership program through our website or mobile app. We offer Bronze (free), Gold ($9.99/month), Platinum ($19.99/month), and Elite (invitation only) tiers with increasing benefits."
    },
    {
      question: "What is your refund policy?",
      answer: "We offer full refunds for cancelled orders and issues with food quality. Refunds are processed within 2-3 business days to your original payment method. For any order issues, please contact us immediately."
    },
    {
      question: "Can I customize my order?",
      answer: "Yes! We offer customization options like choosing spice levels, removing ingredients, and adding extras. Special requests can be made when ordering online, through our app, or by speaking with our staff in-store."
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
      {/* Can't Find Location */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200 hover:shadow-lg transition-shadow">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-red-900 mb-2">Can't Find Your Location?</h3>
            <p className="text-red-700 mb-4">
              Request a new Crispy Chicken location in your area and we'll consider it for future expansion.
            </p>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-red-600 hover:bg-red-700 text-white">
                  Request New Location
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Request New Location</DialogTitle>
                  <DialogDescription>
                    Tell us where you'd like to see a new Crispy Chicken restaurant.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <Input
                    placeholder="Your Name *"
                    value={locationRequest.name}
                    onChange={(e) => setLocationRequest({ ...locationRequest, name: e.target.value })}
                  />
                  <Input
                    placeholder="Email Address *"
                    type="email"
                    value={locationRequest.email}
                    onChange={(e) => setLocationRequest({ ...locationRequest, email: e.target.value })}
                  />
                  <Input
                    placeholder="Requested City *"
                    value={locationRequest.city}
                    onChange={(e) => setLocationRequest({ ...locationRequest, city: e.target.value })}
                  />
                  <Textarea
                    placeholder="Additional details about the requested location"
                    value={locationRequest.details}
                    onChange={(e) => setLocationRequest({ ...locationRequest, details: e.target.value })}
                  />
                  <Button onClick={handleLocationRequest} className="w-full bg-red-600 hover:bg-red-700">
                    Submit Request
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </motion.div>

      {/* Franchise Opportunities */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        viewport={{ once: true }}
      >
        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200 hover:shadow-lg transition-shadow">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Building className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-yellow-900 mb-2">Franchise Opportunities</h3>
            <p className="text-yellow-700 mb-4">
              Join our growing family! Learn about franchise opportunities and start your own Crispy Chicken restaurant.
            </p>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-yellow-600 hover:bg-yellow-700 text-white">
                  Learn More
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Franchise Inquiry</DialogTitle>
                  <DialogDescription>
                    Start your journey to owning a Crispy Chicken franchise.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="bg-yellow-50 p-4 rounded-lg mb-4">
                    <h4 className="font-bold text-yellow-900 mb-2">Franchise Benefits:</h4>
                    <ul className="text-sm text-yellow-800 space-y-1">
                      <li>• Proven business model</li>
                      <li>• Complete training program</li>
                      <li>• Marketing support</li>
                      <li>• Site selection assistance</li>
                      <li>• Ongoing operational support</li>
                    </ul>
                  </div>
                  <Input
                    placeholder="Your Name *"
                    value={franchiseInquiry.name}
                    onChange={(e) => setFranchiseInquiry({ ...franchiseInquiry, name: e.target.value })}
                  />
                  <Input
                    placeholder="Email Address *"
                    type="email"
                    value={franchiseInquiry.email}
                    onChange={(e) => setFranchiseInquiry({ ...franchiseInquiry, email: e.target.value })}
                  />
                  <Input
                    placeholder="Phone Number *"
                    value={franchiseInquiry.phone}
                    onChange={(e) => setFranchiseInquiry({ ...franchiseInquiry, phone: e.target.value })}
                  />
                  <Input
                    placeholder="Preferred Location"
                    value={franchiseInquiry.location}
                    onChange={(e) => setFranchiseInquiry({ ...franchiseInquiry, location: e.target.value })}
                  />
                  <Input
                    placeholder="Investment Capability"
                    value={franchiseInquiry.investment}
                    onChange={(e) => setFranchiseInquiry({ ...franchiseInquiry, investment: e.target.value })}
                  />
                  <Button onClick={handleFranchiseInquiry} className="w-full bg-yellow-600 hover:bg-yellow-700">
                    Submit Inquiry
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </motion.div>

      {/* FAQs */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:shadow-lg transition-shadow">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <HelpCircle className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-blue-900 mb-2">Frequently Asked Questions</h3>
            <p className="text-blue-700 mb-4">
              Find answers to common questions about our menu, services, and policies.
            </p>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  View FAQs
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Frequently Asked Questions</DialogTitle>
                  <DialogDescription>
                    Find answers to common questions about our food, service, and policies.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq, index) => (
                      <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-left">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent>
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                  
                  <div className="bg-blue-50 p-4 rounded-lg mt-6">
                    <h4 className="font-bold text-blue-900 mb-2">Still have questions?</h4>
                    <p className="text-blue-800 text-sm mb-3">
                      Contact our customer support team for personalized assistance.
                    </p>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        className="bg-blue-600 hover:bg-blue-700"
                        onClick={() => toast.info('Opening chatbot...')}
                      >
                        Live Chat
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => toast.info('Calling (555) 123-HELP...')}
                      >
                        Call Support
                      </Button>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}