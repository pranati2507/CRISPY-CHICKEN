import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { MapPin, Navigation, Phone, Clock, Star, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner@2.0.3';

interface Store {
  id: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  hours: string;
  features: string[];
  distance: string;
  x: number; // X position percentage on map
  y: number; // Y position percentage on map
  rating: number;
  isOpen: boolean;
}

interface InteractiveMapProps {
  selectedCity: string;
}

export function InteractiveMap({ selectedCity }: InteractiveMapProps) {
  const [selectedStore, setSelectedStore] = useState<string | null>(null);
  const [hoveredStore, setHoveredStore] = useState<string | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  const stores: Store[] = [
    {
      id: '1',
      name: 'Downtown Location',
      address: '123 Main Street, Downtown',
      city: 'new-york',
      phone: '(555) 123-4567',
      hours: 'Mon-Sun: 10:00 AM - 11:00 PM',
      features: ['Drive-Thru', '24/7 Delivery', 'Dine-in'],
      distance: '2.1 miles',
      x: 25,
      y: 40,
      rating: 4.8,
      isOpen: true,
    },
    {
      id: '2',
      name: 'Mall Food Court',
      address: '456 Shopping Center, Mall Level 2',
      city: 'new-york',
      phone: '(555) 234-5678',
      hours: 'Mon-Sun: 10:00 AM - 10:00 PM',
      features: ['Dine-in', 'Takeaway'],
      distance: '3.8 miles',
      x: 70,
      y: 30,
      rating: 4.6,
      isOpen: true,
    },
    {
      id: '3',
      name: 'Airport Terminal',
      address: '789 Airport Blvd, Terminal A',
      city: 'los-angeles',
      phone: '(555) 345-6789',
      hours: '24/7 Open',
      features: ['Takeaway', 'Quick Service'],
      distance: '12.5 miles',
      x: 60,
      y: 70,
      rating: 4.4,
      isOpen: true,
    },
    {
      id: '4',
      name: 'University District',
      address: '321 College Ave, Near Campus',
      city: 'chicago',
      phone: '(555) 456-7890',
      hours: 'Mon-Sun: 9:00 AM - 12:00 AM',
      features: ['Student Discounts', 'Late Night', 'Delivery'],
      distance: '5.2 miles',
      x: 40,
      y: 20,
      rating: 4.7,
      isOpen: true,
    },
    {
      id: '5',
      name: 'Highway Rest Stop',
      address: '654 Highway 101, Exit 45',
      city: 'los-angeles',
      phone: '(555) 567-8901',
      hours: 'Mon-Sun: 6:00 AM - 11:00 PM',
      features: ['Drive-Thru', 'Parking', '24/7 Delivery'],
      distance: '18.7 miles',
      x: 80,
      y: 60,
      rating: 4.3,
      isOpen: false,
    },
    {
      id: '6',
      name: 'Business District',
      address: '987 Corporate Plaza, Suite 101',
      city: 'chicago',
      phone: '(555) 678-9012',
      hours: 'Mon-Fri: 7:00 AM - 9:00 PM, Sat-Sun: 10:00 AM - 8:00 PM',
      features: ['Catering', 'Corporate Orders', 'Dine-in'],
      distance: '7.3 miles',
      x: 15,
      y: 75,
      rating: 4.9,
      isOpen: true,
    },
  ];

  const filteredStores = selectedCity === 'all' 
    ? stores 
    : stores.filter(store => store.city === selectedCity);

  const handleDirections = (store: Store) => {
    const encodedAddress = encodeURIComponent(store.address);
    const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`;
    window.open(directionsUrl, '_blank');
    toast.success(`Opening directions to ${store.name}!`);
  };

  const handleCall = (store: Store) => {
    window.open(`tel:${store.phone}`);
    toast.success(`Calling ${store.name}...`);
  };

  return (
    <div className="w-full h-96 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl relative overflow-hidden border-2 border-slate-700">
      {/* Map Background with Grid */}
      <div className="absolute inset-0">
        <div className="w-full h-full opacity-20">
          {/* Grid Pattern */}
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        
        {/* Roads/Streets */}
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-0 w-full h-1 bg-gradient-to-r from-transparent via-slate-600 to-transparent"></div>
          <div className="absolute top-2/3 left-0 w-full h-1 bg-gradient-to-r from-transparent via-slate-600 to-transparent"></div>
          <div className="absolute left-1/4 top-0 w-1 h-full bg-gradient-to-b from-transparent via-slate-600 to-transparent"></div>
          <div className="absolute left-3/4 top-0 w-1 h-full bg-gradient-to-b from-transparent via-slate-600 to-transparent"></div>
        </div>
      </div>

      {/* Map Legend */}
      <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm rounded-lg p-3 text-white">
        <h3 className="text-sm font-bold mb-2">Interactive Store Map</h3>
        <div className="flex items-center gap-2 text-xs mb-1">
          <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
          <span>Open Now</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
          <span>Closed</span>
        </div>
      </div>

      {/* Store Pins */}
      {filteredStores.map((store) => (
        <motion.div
          key={store.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
          style={{ left: `${store.x}%`, top: `${store.y}%` }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: Math.random() * 0.5, type: "spring", stiffness: 200 }}
          whileHover={{ scale: 1.2, zIndex: 20 }}
          onClick={() => setSelectedStore(selectedStore === store.id ? null : store.id)}
          onMouseEnter={() => setHoveredStore(store.id)}
          onMouseLeave={() => setHoveredStore(null)}
        >
          {/* Pin Shadow */}
          <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-6 h-2 bg-black/30 rounded-full blur-sm"></div>
          
          {/* Store Pin */}
          <motion.div
            className={`relative w-8 h-8 rounded-full border-3 border-white shadow-lg flex items-center justify-center ${
              store.isOpen 
                ? 'bg-red-600' 
                : 'bg-gray-500'
            }`}
            animate={store.isOpen ? {
              boxShadow: [
                "0 0 0px rgba(220, 38, 38, 0.5)",
                "0 0 20px rgba(220, 38, 38, 0.8)",
                "0 0 0px rgba(220, 38, 38, 0.5)"
              ]
            } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <MapPin className="w-4 h-4 text-white" />
            
            {/* Rating Badge */}
            <motion.div
              className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: hoveredStore === store.id ? 1 : 0 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {store.rating}
            </motion.div>
          </motion.div>

          {/* Hover Tooltip */}
          <AnimatePresence>
            {hoveredStore === store.id && (
              <motion.div
                className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-black/90 text-white p-2 rounded-lg text-xs whitespace-nowrap"
                initial={{ opacity: 0, y: 10, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.8 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="font-bold">{store.name}</div>
                <div className="text-gray-300">{store.distance}</div>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-black/90"></div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}

      {/* Store Details Popup */}
      <AnimatePresence>
        {selectedStore && (
          <motion.div
            className="absolute bottom-4 left-4 right-4 z-30"
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            {(() => {
              const store = stores.find(s => s.id === selectedStore);
              return store ? (
                <Card className="bg-white/95 backdrop-blur-sm shadow-2xl">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-bold text-lg text-black flex items-center gap-2">
                          {store.name}
                          {store.isOpen && <Zap className="w-4 h-4 text-green-500" />}
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="text-sm text-gray-600">{store.rating}</span>
                          </div>
                        </h4>
                        <p className="text-gray-600 text-sm">{store.address}</p>
                      </div>
                      <Badge 
                        variant={store.isOpen ? "default" : "secondary"} 
                        className={store.isOpen ? "bg-green-500" : "bg-gray-500"}
                      >
                        {store.isOpen ? "Open" : "Closed"}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone className="w-4 h-4 text-red-600" />
                        <span>{store.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4 text-red-600" />
                        <span>{store.hours}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {store.features.map((feature, index) => (
                        <Badge key={index} variant="outline" className="text-xs border-red-600 text-red-600">
                          {feature}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1 border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
                        onClick={() => handleDirections(store)}
                      >
                        <Navigation className="w-4 h-4 mr-1" />
                        Directions
                      </Button>
                      <Button 
                        size="sm" 
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                        onClick={() => handleCall(store)}
                      >
                        <Phone className="w-4 h-4 mr-1" />
                        Call
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : null;
            })()}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Zoom Controls */}
      <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm rounded-lg p-2">
        <div className="flex flex-col gap-1">
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 w-8 h-8 p-0">+</Button>
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 w-8 h-8 p-0">-</Button>
        </div>
      </div>
    </div>
  );
}