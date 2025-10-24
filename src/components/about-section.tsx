import React from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Award, Clock, Heart, Users } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function AboutSection() {
  const values = [
    {
      icon: <Award className="w-8 h-8 text-red-600" />,
      title: 'Quality First',
      description: 'We use only the finest ingredients and time-tested recipes to ensure every bite is perfect.',
    },
    {
      icon: <Clock className="w-8 h-8 text-red-600" />,
      title: 'Always Fresh',
      description: 'Our food is prepared fresh daily with no shortcuts, ensuring the best taste and quality.',
    },
    {
      icon: <Heart className="w-8 h-8 text-red-600" />,
      title: 'Made with Love',
      description: 'Every meal is crafted with passion and care by our experienced culinary team.',
    },
    {
      icon: <Users className="w-8 h-8 text-red-600" />,
      title: 'Community Focused',
      description: 'We believe in giving back to the communities that have supported us throughout the years.',
    },
  ];

  const stats = [
    { number: '50+', label: 'Locations Worldwide' },
    { number: '25', label: 'Years of Excellence' },
    { number: '1M+', label: 'Happy Customers' },
    { number: '500+', label: 'Team Members' },
  ];

  return (
    <div className="relative">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Main About Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <Badge className="bg-red-600 text-white mb-4">Our Story</Badge>
            <h2 className="text-4xl font-bold text-black mb-6">
              Bringing You the World's Best Fried Chicken Since 1998
            </h2>
            <p className="text-gray-600 text-lg mb-6">
              What started as a small family restaurant has grown into a beloved brand known for its 
              signature blend of 11 herbs and spices. Our commitment to quality, freshness, and 
              exceptional taste has made us a household name.
            </p>
            <p className="text-gray-600 text-lg mb-8">
              From our secret recipe passed down through generations to our modern kitchen techniques, 
              we combine tradition with innovation to serve you the most delicious fried chicken experience.
            </p>
            
            {/* Statistics */}
            <div className="grid grid-cols-2 gap-6">
              {stats.slice(0, 2).map((stat, index) => (
                <div key={index} className="text-center bg-white p-4 rounded-lg shadow">
                  <div className="text-3xl font-bold text-red-600 mb-2">{stat.number}</div>
                  <div className="text-gray-600 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute top-4 left-4 w-full h-full bg-red-600 rounded-2xl -z-10"></div>
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1654922207993-2952fec328ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxyZXN0YXVyYW50JTIwa2l0Y2hlbiUyMGNvb2tpbmd8ZW58MXx8fHwxNzU3MTY1Mzc0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Restaurant kitchen cooking"
              className="w-full h-96 object-cover rounded-2xl shadow-xl"
            />
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-black mb-4">Our Core Values</h3>
            <p className="text-xl text-gray-600">What makes us different</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">
                    {value.icon}
                  </div>
                  <h4 className="font-bold text-xl text-black mb-3">{value.title}</h4>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Full Stats Section */}
        <div className="bg-black text-white rounded-2xl p-8">
          <h3 className="text-3xl font-bold text-center mb-8">Our Achievements</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-red-500 mb-2">{stat.number}</div>
                <div className="text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}