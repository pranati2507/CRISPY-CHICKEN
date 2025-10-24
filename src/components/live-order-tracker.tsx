import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Clock, CheckCircle, Package, Truck } from 'lucide-react';

interface LiveOrderTrackerProps {
  isVisible: boolean;
  cartItemsCount: number;
  onClose: () => void;
}

type OrderStatus = 'preparing' | 'ready' | 'out-for-delivery' | 'delivered';

interface OrderStage {
  id: OrderStatus;
  title: string;
  description: string;
  icon: React.ReactNode;
  duration: number; // in seconds
}

export function LiveOrderTracker({ isVisible, cartItemsCount, onClose }: LiveOrderTrackerProps) {
  const [currentStage, setCurrentStage] = useState<OrderStatus>('preparing');
  const [timeElapsed, setTimeElapsed] = useState(0);

  const orderStages: OrderStage[] = [
    {
      id: 'preparing',
      title: 'Order Received',
      description: 'Our chefs are preparing your delicious meal',
      icon: <Clock className="w-5 h-5" />,
      duration: 8
    },
    {
      id: 'ready',
      title: 'Order Ready',
      description: 'Your order is ready for pickup/delivery',
      icon: <CheckCircle className="w-5 h-5" />,
      duration: 3
    },
    {
      id: 'out-for-delivery',
      title: 'Out for Delivery',
      description: 'Your order is on its way to you',
      icon: <Truck className="w-5 h-5" />,
      duration: 10
    },
    {
      id: 'delivered',
      title: 'Delivered',
      description: 'Enjoy your meal!',
      icon: <Package className="w-5 h-5" />,
      duration: 0
    }
  ];

  useEffect(() => {
    if (!isVisible) return;

    const timer = setInterval(() => {
      setTimeElapsed(prev => {
        const newTime = prev + 1;
        const currentStageData = orderStages.find(stage => stage.id === currentStage);
        
        if (currentStageData && newTime >= currentStageData.duration) {
          const currentIndex = orderStages.findIndex(stage => stage.id === currentStage);
          if (currentIndex < orderStages.length - 1) {
            setCurrentStage(orderStages[currentIndex + 1].id);
            return 0;
          }
        }
        
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isVisible, currentStage]);

  useEffect(() => {
    if (currentStage === 'delivered') {
      const timeout = setTimeout(() => {
        onClose();
        setCurrentStage('preparing');
        setTimeElapsed(0);
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, [currentStage, onClose]);

  if (!isVisible) return null;

  const currentStageData = orderStages.find(stage => stage.id === currentStage);
  const progress = currentStageData ? (timeElapsed / currentStageData.duration) * 100 : 0;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        className="fixed bottom-4 right-4 z-50 max-w-sm"
      >
        <Card className="bg-white shadow-2xl border-2 border-red-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="text-red-600"
                >
                  {currentStageData?.icon}
                </motion.div>
                <h3 className="font-bold text-lg">Live Order Tracking</h3>
              </div>
              <Badge className="bg-red-600 text-white">
                {cartItemsCount} items
              </Badge>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{currentStageData?.title}</span>
                  <span className="text-sm text-gray-500">
                    {currentStage !== 'delivered' ? `${timeElapsed}s` : '✓'}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{currentStageData?.description}</p>
                
                {currentStage !== 'delivered' && (
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      className="bg-red-600 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(progress, 100)}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                )}
              </div>

              {/* Order stages timeline */}
              <div className="flex justify-between items-center pt-4 border-t">
                {orderStages.map((stage, index) => {
                  const isActive = stage.id === currentStage;
                  const isCompleted = orderStages.findIndex(s => s.id === currentStage) > index;
                  
                  return (
                    <motion.div
                      key={stage.id}
                      className={`flex flex-col items-center ${
                        isActive ? 'text-red-600' : isCompleted ? 'text-green-600' : 'text-gray-400'
                      }`}
                      animate={{ scale: isActive ? 1.1 : 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.div
                        className={`w-3 h-3 rounded-full ${
                          isActive ? 'bg-red-600' : isCompleted ? 'bg-green-600' : 'bg-gray-300'
                        }`}
                        animate={{ 
                          scale: isActive ? [1, 1.3, 1] : 1,
                          backgroundColor: isActive ? ['#DC2626', '#EF4444', '#DC2626'] : undefined
                        }}
                        transition={{ 
                          duration: isActive ? 1 : 0,
                          repeat: isActive ? Infinity : 0
                        }}
                      />
                      <span className="text-xs mt-1 hidden sm:block">
                        {stage.title.split(' ')[0]}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {currentStage === 'delivered' && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center pt-4"
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 0.5, repeat: 3 }}
                  className="text-4xl mb-2"
                >
                  🎉
                </motion.div>
                <p className="text-green-600 font-medium">Order Delivered Successfully!</p>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
}