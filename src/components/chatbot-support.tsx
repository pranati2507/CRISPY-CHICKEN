import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader } from './ui/card';
import { MessageCircle, Send, X, User, Bot, Phone, Clock, MapPin, CreditCard, Package, Star, Headphones } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner@2.0.3';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  quickReplies?: string[];
}

interface KnowledgeItem {
  keywords: string[];
  response: string;
  quickReplies?: string[];
}

export function ChatbotSupport() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isConnectedToHuman, setIsConnectedToHuman] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Comprehensive Knowledge Base for Food Restaurant
  const knowledgeBase: KnowledgeItem[] = [
    {
      keywords: ['menu', 'food', 'items', 'what do you have', 'price', 'cost', 'chicken', 'burger', 'combo'],
      response: "🍗 **Our Complete Menu & Pricing:**\n\n**🔥 SIGNATURE CHICKEN:**\n• Original Recipe (2pc) - $8.99\n• Spicy Nashville Hot (2pc) - $9.99\n• Crispy Tenders (4pc) - $7.99\n• Wings (8pc) - $12.99\n\n**🍔 BURGERS & SANDWICHES:**\n• Classic Chicken Burger - $6.99\n• Zinger Spicy Burger - $8.99\n• Chicken Club Sandwich - $9.99\n\n**🎯 COMBO MEALS:**\n• Regular Combo - $12.99\n• Family Feast (serves 4) - $29.99\n• Big Box Combo - $16.99\n\n**🍟 SIDES & DRINKS:**\n• Fries (Regular/Large) - $2.99/$4.99\n• Coleslaw - $3.99\n• Soft Drinks - $1.99-$3.99\n\nAll items made fresh to order! Any specific item you'd like to know more about?",
      quickReplies: ['Order Chicken', 'Combo Deals', 'Nutritional Info', 'Current Offers']
    },
    {
      keywords: ['order', 'place order', 'how to order', 'ordering', 'delivery', 'pickup'],
      response: "📱 **Easy Ways to Order:**\n\n**🚗 DELIVERY (Free on $25+):**\n• Order through our website\n• Call us: (555) 123-FOOD\n• Delivery time: 25-35 minutes\n• Track your order in real-time\n\n**🏪 PICKUP:**\n• Order ahead online\n• Call and we'll have it ready\n• Average wait: 10-15 minutes\n• Curbside pickup available\n\n**🍽️ DINE-IN:**\n• Walk-ins welcome\n• Table service available\n• Family-friendly atmosphere\n\n**💳 PAYMENT OPTIONS:**\n• Credit/Debit Cards\n• UPI (PayTM, PhonePe, GPay)\n• Digital Wallets\n• Cash on Delivery\n\nReady to place an order? I can help guide you through it!",
      quickReplies: ['Start Order', 'Delivery Areas', 'Track Order', 'Call Restaurant']
    },
    {
      keywords: ['location', 'address', 'where', 'store', 'branch', 'hours', 'timing', 'open', 'close'],
      response: "📍 **Our Restaurant Locations:**\n\n**🏢 DOWNTOWN LOCATION:**\n📍 123 Main Street, Downtown\n🕐 Hours: 10:00 AM - 11:00 PM (Daily)\n📞 Phone: (555) 123-4567\n\n**🏬 MALL PLAZA:**\n📍 456 Shopping Avenue, Mall Plaza\n🕐 Hours: 11:00 AM - 10:00 PM (Daily)\n📞 Phone: (555) 234-5678\n\n**🏘️ WESTSIDE BRANCH:**\n📍 789 West Boulevard, Westside\n🕐 Hours: 10:30 AM - 11:30 PM (Daily)\n📞 Phone: (555) 345-6789\n\n**🚚 DELIVERY COVERAGE:**\n• 5-mile radius from each location\n• Free delivery on orders $25+\n• Delivery fee: $2.99 (under $25)\n\nWhich location is closest to you?",
      quickReplies: ['Find Nearest', 'Get Directions', 'Delivery Areas', 'Store Hours']
    },
    {
      keywords: ['track', 'order status', 'where is my order', 'delivery time', 'eta', 'tracking'],
      response: "📦 **Order Tracking & Status:**\n\nTo track your order, I'll need your:\n• Order number (from confirmation email/SMS)\n• Phone number used for the order\n\n**📊 ORDER STAGES:**\n✅ Order Received\n👨‍🍳 Preparing Your Food\n📦 Ready for Pickup/Delivery\n🚗 Out for Delivery\n✅ Delivered\n\n**⏱️ ESTIMATED TIMES:**\n• Preparation: 15-20 minutes\n• Delivery: 25-35 minutes total\n• Pickup: 10-15 minutes\n\n**🚨 ORDER ISSUES?**\n• Delayed orders: We'll update you via SMS\n• Missing items: Full refund/replacement\n• Quality issues: Free replacement meal\n\nProvide your order number and I'll check the status for you!",
      quickReplies: ['Check Status', 'Report Issue', 'Delivery Time', 'Contact Driver']
    },
    {
      keywords: ['offers', 'deals', 'discount', 'coupon', 'promo', 'special', 'sale', 'cheap'],
      response: "🔥 **Current Offers & Deals:**\n\n**⚡ LIMITED TIME SPECIALS:**\n🎯 50% OFF Family Feast Combo\n   Code: FAMILY50 | Valid till Dec 31\n\n🍟 FREE Large Fries with any Burger\n   Code: FREEFRIES | Valid till Dec 25\n\n⭐ Buy 2 Get 1 FREE Chicken Wings\n   Code: WINGS3 | Valid till Dec 20\n\n**💎 MEMBERSHIP PERKS:**\n🥇 Gold Members: 15% off all orders\n💎 Platinum: 20% off + free delivery\n👑 Elite: 25% off + exclusive menu\n\n**📱 APP EXCLUSIVE:**\n• First order: 20% off (Code: WELCOME20)\n• Birthday month: Free dessert\n• Refer friends: $5 credit each\n\n**🎂 SPECIAL OCCASIONS:**\n• Student discount: 10% off with valid ID\n• Senior citizens: 15% off (60+)\n\nWhich offer would you like to use today?",
      quickReplies: ['Apply FAMILY50', 'Join Membership', 'Student Discount', 'Download App']
    },
    {
      keywords: ['payment', 'pay', 'bill', 'card', 'upi', 'cash', 'refund', 'money'],
      response: "💳 **Payment & Billing Information:**\n\n**💰 ACCEPTED PAYMENTS:**\n🏦 Credit/Debit Cards (Visa, Mastercard, Amex)\n📱 UPI (PayTM, PhonePe, Google Pay, BHIM)\n💻 Digital Wallets (PayPal, Apple Pay)\n💵 Cash on Delivery\n\n**📋 BILL BREAKDOWN:**\n• Food Cost: As per menu\n• GST: 18% (as per government rates)\n• Service Charge: 5% (dine-in only)\n• Packaging: $1.50 (delivery/pickup)\n• Delivery: FREE on $25+ / $2.99 below\n\n**🔄 REFUND POLICY:**\n• Cancelled orders: Full refund in 2-3 days\n• Order issues: Immediate refund/replacement\n• Payment failures: Amount auto-refunded\n• Refund method: Same as payment method\n\n**🔒 SECURITY:**\n• SSL encrypted payments\n• No card details stored\n• PCI DSS compliant\n\nAny payment concerns or issues?",
      quickReplies: ['Payment Failed', 'Refund Status', 'Bill Complaint', 'Security Info']
    },
    {
      keywords: ['nutrition', 'calories', 'healthy', 'diet', 'allergen', 'vegan', 'vegetarian', 'ingredients'],
      response: "🥗 **Nutritional & Dietary Information:**\n\n**📊 NUTRITIONAL FACTS (per serving):**\n🍗 Original Chicken (1pc): 320 calories, 19g protein\n🔥 Spicy Nashville (1pc): 340 calories, 20g protein\n🍔 Chicken Burger: 480 calories, 25g protein\n🍟 Regular Fries: 280 calories, 4g protein\n\n**🌱 DIETARY OPTIONS:**\n✅ Vegetarian: Veggie Burger, Salads, Sides\n✅ Grilled Options: Available for all chicken items\n✅ Lighter Menu: Grilled chicken, salads\n⚠️ Vegan: Limited options (fries, some salads)\n\n**⚠️ ALLERGEN INFORMATION:**\n• Contains: Wheat, Dairy, Eggs, Soy\n• May contain: Nuts, Sesame\n• Gluten-free: Very limited options\n• Please inform us of severe allergies\n\n**💡 HEALTHIER CHOICES:**\n• Choose grilled over fried\n• Opt for salad instead of fries\n• Select water or diet drinks\n• Remove sauce to reduce calories\n\nNeed specific nutritional details for any item?",
      quickReplies: ['Calorie Chart', 'Allergen List', 'Healthy Options', 'Ingredient Info']
    },
    {
      keywords: ['complaint', 'problem', 'issue', 'wrong order', 'cold food', 'late', 'quality', 'bad'],
      response: "😔 **I'm truly sorry about your experience!**\n\nYour satisfaction is our top priority. Let me resolve this immediately:\n\n**🔧 IMMEDIATE SOLUTIONS:**\n• Fresh replacement meal (no charge)\n• Full refund if preferred\n• Priority delivery for next order\n• Discount voucher for future orders\n\n**📝 TO RESOLVE YOUR ISSUE:**\n1. Order number or phone number\n2. What exactly went wrong?\n3. Would you prefer replacement or refund?\n\n**⚡ QUICK ACTIONS:**\n• Food quality issues → Fresh meal sent immediately\n• Wrong order → Correct order + refund difference\n• Late delivery → Next order priority + discount\n• Missing items → Items delivered + compensation\n\n**🆙 ESCALATION:**\n• Speak with restaurant manager\n• Regional customer care: (555) 100-HELP\n• Email: complaints@crispychicken.com\n\n**💝 MAKING IT RIGHT:**\nWe'll ensure this never happens again and make your next experience exceptional!\n\nWhat specific issue occurred? I'm here to fix it right now!",
      quickReplies: ['Wrong Order', 'Food Quality', 'Late Delivery', 'Speak to Manager', 'Get Refund']
    },
    {
      keywords: ['human', 'agent', 'representative', 'manager', 'speak', 'talk', 'call'],
      response: "👨‍💼 **Connecting you to our Customer Service Team...**\n\nI understand you'd like to speak with a human representative. Let me transfer you immediately!\n\n**📞 DIRECT CONTACT OPTIONS:**\n• Customer Service: (555) 123-HELP\n• Manager Hotline: (555) 100-MANAGER\n• Email: support@crispychicken.com\n\n**⏰ SUPPORT HOURS:**\n• Phone Support: 9 AM - 11 PM (Daily)\n• Email Support: 24/7 (Response within 2 hours)\n• Live Chat: 24/7\n\n**🔄 I'M CONNECTING YOU NOW...**\nPlease hold while I transfer your chat to our customer service team. Average wait time: 1-2 minutes.\n\nA human agent will take over this conversation shortly to provide personalized assistance with your specific needs.",
      quickReplies: ['Wait for Agent', 'Call Instead', 'Email Support', 'Continue with Bot']
    },
    {
      keywords: ['franchise', 'business', 'partnership', 'investment', 'open store'],
      response: "🏢 **Franchise & Business Opportunities:**\n\n**🤝 FRANCHISE PROGRAM:**\n• Investment: $150,000 - $300,000\n• Franchise fee: $45,000\n• Royalty: 6% of gross sales\n• Marketing fee: 3% of gross sales\n\n**📋 REQUIREMENTS:**\n• Minimum 1,500 sq ft location\n• High-traffic area preferred\n• Food service experience (preferred)\n• Strong financial background\n\n**💼 WHAT WE PROVIDE:**\n• Complete training program (4 weeks)\n• Site selection assistance\n• Marketing & promotional support\n• Operations manual & ongoing support\n• Equipment specifications\n\n**📞 NEXT STEPS:**\n• Franchise inquiry: franchise@crispychicken.com\n• Call: (555) 200-FRANCHISE\n• Download franchise kit from our website\n• Schedule discovery meeting\n\nInterested in bringing Crispy Chicken to your area?",
      quickReplies: ['Get Franchise Kit', 'Investment Details', 'Call Franchise Team', 'Requirements']
    }
  ];

  const findBestMatch = useCallback((userInput: string): { response: string; quickReplies?: string[] } => {
    const lowercaseInput = userInput.toLowerCase();
    
    // Find the best matching knowledge item
    for (const item of knowledgeBase) {
      for (const keyword of item.keywords) {
        if (lowercaseInput.includes(keyword.toLowerCase())) {
          return {
            response: item.response,
            quickReplies: item.quickReplies
          };
        }
      }
    }
    
    // Fallback response
    return {
      response: "🤖 **I'm here to help!** I can assist you with:\n\n🍗 Menu items and pricing\n📱 Placing and tracking orders\n📍 Store locations and hours\n🎁 Current offers and deals\n💳 Payment and billing questions\n🥗 Nutritional information\n🛠️ Order issues and complaints\n👨‍💼 Connect to human support\n\nWhat would you like to know about?",
      quickReplies: ['View Menu', 'Place Order', 'Track Order', 'Current Offers', 'Store Locations', 'Speak to Human']
    };
  }, []);

  const sendMessage = useCallback((text: string, isQuickReply = false) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Handle human connection
    if (text.toLowerCase().includes('speak to human') || 
        text.toLowerCase().includes('human agent') || 
        text.toLowerCase().includes('wait for agent')) {
      setTimeout(() => {
        const connectingMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: "🔄 **Connecting to human support...**\n\nPlease wait while I connect you to our customer service team.",
          isBot: true,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, connectingMessage]);
        setIsTyping(false);
        
        setTimeout(() => {
          const agentMessage: Message = {
            id: (Date.now() + 2).toString(),
            text: "👋 **Hi! I'm Sarah from Crispy Chicken Customer Service.**\n\nI can see your conversation history and I'm here to provide personalized assistance. How can I help you today?\n\n📞 **Need immediate help?** Call: (555) 123-HELP\n💬 **Or continue chatting here** - I'm ready to solve any issues!",
            isBot: true,
            timestamp: new Date(),
            quickReplies: ['Order Issue', 'Billing Question', 'Complaint', 'General Inquiry', 'Call Instead']
          };
          setMessages(prev => [...prev, agentMessage]);
          setIsConnectedToHuman(true);
        }, 3000);
      }, 1000);
      return;
    }

    // Generate bot response
    setTimeout(() => {
      const match = findBestMatch(text);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: match.response,
        isBot: true,
        timestamp: new Date(),
        quickReplies: match.quickReplies
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, isConnectedToHuman ? 500 : 1500);
  }, [findBestMatch, isConnectedToHuman]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        id: 'welcome',
        text: "👋 **Welcome to Crispy Chicken Support!**\n\nI'm your AI assistant, ready to help 24/7 with:\n\n🍗 **Menu & Ordering** - Browse items, place orders, track delivery\n📍 **Locations & Hours** - Find stores, get directions, check timings\n🎁 **Deals & Offers** - Current promotions, membership benefits\n💳 **Payment & Billing** - Payment options, refunds, bill queries\n🛠️ **Support** - Order issues, complaints, technical help\n\n**How can I assist you today?**",
        isBot: true,
        timestamp: new Date(),
        quickReplies: ['View Menu', 'Place Order', 'Current Offers', 'Store Locations', 'Track Order', 'Need Help']
      };
      setTimeout(() => {
        setMessages([welcomeMessage]);
      }, 500);
    }
  }, [isOpen]);

  return (
    <>
      {/* Chat Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 300 }}
      >
        <Button
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 rounded-full bg-red-600 hover:bg-red-700 text-white shadow-2xl hover:shadow-3xl transition-all duration-300"
          size="lg"
        >
          <MessageCircle className="w-8 h-8" />
        </Button>
        
        {/* Notification Badge */}
        <motion.div
          className="absolute -top-2 -right-2"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
            <span className="text-xs font-bold text-white">!</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Chat Interface - Positioned properly */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-6 right-6 w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <CardHeader className="bg-gradient-to-r from-red-600 to-red-700 text-white p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Bot className="w-8 h-8" />
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Crispy Support</h3>
                    <p className="text-red-100 text-sm">
                      {isConnectedToHuman ? '👨‍💼 Human Agent • Online' : '🤖 AI Assistant • Always Available'}
                    </p>
                  </div>
                </div>
                <Button
                  onClick={() => setIsOpen(false)}
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-red-800 w-8 h-8 p-0"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </CardHeader>

            {/* Messages */}
            <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={`max-w-[85%] ${message.isBot ? 'order-2' : ''}`}>
                    {message.isBot && (
                      <div className="flex items-center gap-2 mb-1 order-1">
                        <Bot className="w-4 h-4 text-red-600" />
                        <span className="text-xs text-gray-500">
                          {isConnectedToHuman ? 'Customer Service' : 'AI Assistant'}
                        </span>
                      </div>
                    )}
                    
                    <div
                      className={`p-3 rounded-2xl ${
                        message.isBot
                          ? 'bg-gray-100 text-gray-800'
                          : 'bg-red-600 text-white'
                      }`}
                    >
                      <div className="whitespace-pre-line text-sm leading-relaxed">
                        {message.text.split('**').map((part, index) => 
                          index % 2 === 1 ? <strong key={index}>{part}</strong> : part
                        )}
                      </div>
                    </div>

                    {/* Quick Replies */}
                    {message.quickReplies && message.quickReplies.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {message.quickReplies.map((reply, index) => (
                          <Button
                            key={index}
                            onClick={() => sendMessage(reply, true)}
                            variant="outline"
                            size="sm"
                            className="text-xs h-8 bg-white border-red-200 text-red-600 hover:bg-red-50"
                          >
                            {reply}
                          </Button>
                        ))}
                      </div>
                    )}

                    <div className="text-xs text-gray-400 mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-gray-100 p-3 rounded-2xl">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </CardContent>

            {/* Input */}
            <div className="p-4 border-t bg-gray-50">
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage(inputValue)}
                  placeholder="Type your message..."
                  className="flex-1 border-gray-300 focus:border-red-500"
                  disabled={isTyping}
                />
                <Button
                  onClick={() => sendMessage(inputValue)}
                  disabled={!inputValue.trim() || isTyping}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="flex items-center justify-center gap-4 mt-2 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  24/7 Support
                </span>
                <span className="flex items-center gap-1">
                  <Phone className="w-3 h-3" />
                  (555) 123-HELP
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}