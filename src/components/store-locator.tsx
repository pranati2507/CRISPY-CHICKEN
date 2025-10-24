import React, { useState, memo } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { MapPin, Phone, Clock, Navigation, Search, Filter, Building, HelpCircle } from 'lucide-react';
import { InteractiveMap } from './interactive-map';
import { StoreSections } from './store-sections';
import { motion } from 'motion/react';
import { toast } from 'sonner@2.0.3';

export function StoreLocator() {
  const [selectedCity, setSelectedCity] = useState('all');
  const [selectedStore, setSelectedStore] = useState<string | null>(null);

  const stores = [
    {
      id: '1',
      name: 'Downtown Location',
      address: '123 Main Street, Downtown',
      city: 'new-york',
      phone: '(555) 123-4567',
      hours: 'Mon-Sun: 10:00 AM - 11:00 PM',
      features: ['Drive-Thru', '24/7 Delivery', 'Dine-in'],
      distance: '2.1 miles',
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
    },
  ];

  const cities = [
    { id: 'all', name: 'All Locations' },
    { id: 'new-york', name: 'New York' },
    { id: 'los-angeles', name: 'Los Angeles' },
    { id: 'chicago', name: 'Chicago' },
  ];

  const filteredStores = selectedCity === 'all' 
    ? stores 
    : stores.filter(store => store.city === selectedCity);

  const handleDirections = (store: any) => {
    const encodedAddress = encodeURIComponent(store.address);
    const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`;
    window.open(directionsUrl, '_blank');
    toast.success(`Opening directions to ${store.name}!`);
  };

  const handleCall = (phone: string, name: string) => {
    window.open(`tel:${phone}`);
    toast.success(`Calling ${name}...`);
  };



  return (
    <div className="relative">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-black mb-4">Find a Store Near You</h2>
          <p className="text-xl text-gray-600">Over 50 locations nationwide</p>
        </div>

        {/* City Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {cities.map((city) => (
            <Button
              key={city.id}
              onClick={() => setSelectedCity(city.id)}
              variant={selectedCity === city.id ? "default" : "outline"}
              className={`${
                selectedCity === city.id
                  ? 'bg-red-600 hover:bg-red-700 text-white'
                  : 'border-red-600 text-red-600 hover:bg-red-600 hover:text-white'
              } px-6 py-3 font-medium transition-all duration-200`}
            >
              {city.name}
            </Button>
          ))}
        </div>

        {/* Store Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredStores.map((store) => (
            <Card key={store.id} className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-bold text-xl text-black">{store.name}</h3>
                  <Badge variant="outline" className="text-red-600 border-red-600">
                    {store.distance}
                  </Badge>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">{store.address}</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-red-600 flex-shrink-0" />
                    <span className="text-gray-600">{store.phone}</span>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">{store.hours}</span>
                  </div>
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {store.features.map((feature, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
                    onClick={() => handleDirections(store)}
                  >
                    <Navigation className="w-4 h-4 mr-2" />
                    Directions
                  </Button>
                  <Button 
                    size="sm" 
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                    onClick={() => handleCall(store.phone, store.name)}
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Call
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Enhanced Interactive Map */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-6">
            <h3 className="text-3xl font-bold text-black mb-2">Interactive Store Map</h3>
            <p className="text-gray-600">Click on store pins to view details and get directions</p>
          </div>
          <InteractiveMap selectedCity={selectedCity} />
        </motion.div>

        {/* Interactive Store Sections */}
        <StoreSections />

      </div>
    </div>
  );
}

export default memo(StoreLocator);