import React from 'react';
import { Link } from 'react-router-dom';
import Carousel from '@/components/Carousel'; // Custom component
import ProductCard from '@/components/ProductCard'; // Custom component
import Footer from '@/components/layout/Footer'; // Custom component

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';

const placeholderSlides = [
  { id: 1, imageUrl: 'https://via.placeholder.com/1200x500?text=Hero+Image+1:+Shop+Our+Latest+Collection', altText: 'Slide 1', content: (
    <div className="text-center">
      <h2 className="text-4xl font-bold text-white mb-4">Explore Our New Arrivals</h2>
      <p className="text-lg text-gray-200 mb-6">Discover minimalist designs for modern living.</p>
      <Link to="/product-listing">
        <Button size="lg" variant="secondary">Shop Now</Button>
      </Link>
    </div>
  )},
  { id: 2, imageUrl: 'https://via.placeholder.com/1200x500?text=Hero+Image+2:+Special+Offers', altText: 'Slide 2', content: (
    <div className="text-center">
      <h2 className="text-4xl font-bold text-white mb-4">Limited Time Offers</h2>
      <p className="text-lg text-gray-200 mb-6">Get the best deals on selected items.</p>
      <Link to="/product-listing">
        <Button size="lg" variant="secondary">View Deals</Button>
      </Link>
    </div>
  )},
];

const placeholderProducts = [
  { id: 'prod1', name: 'Minimalist Desk Lamp', price: 75.00, imageUrl: 'https://via.placeholder.com/300x300?text=Desk+Lamp', description: 'Sleek and modern desk lamp to illuminate your workspace.' },
  { id: 'prod2', name: 'Ergonomic Office Chair', price: 299.99, imageUrl: 'https://via.placeholder.com/300x300?text=Office+Chair', description: 'Comfortable and supportive chair for long hours of work.' },
  { id: 'prod3', name: 'Wireless Mechanical Keyboard', price: 120.50, imageUrl: 'https://via.placeholder.com/300x300?text=Keyboard', description: 'Tactile and responsive keyboard for a better typing experience.' },
  { id: 'prod4', name: 'Ambient Light Bar', price: 45.00, imageUrl: 'https://via.placeholder.com/300x300?text=Light+Bar', description: 'Enhance your setup with customizable ambient lighting.' },
];

const Homepage: React.FC = () => {
  console.log('Homepage loaded');

  const handleAddToCart = (productId: string | number) => {
    console.log(`Added product ${productId} to cart from Homepage`);
    // Add to cart logic here (e.g., update state, call API)
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
          <Link to="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold sm:inline-block text-xl">MyStore</span>
          </Link>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Home
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/product-listing" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Shop
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              {/* Add more navigation items if needed */}
            </NavigationMenuList>
          </NavigationMenu>
          <div className="flex items-center gap-2">
            <Link to="/cart">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
                <span className="sr-only">Cart</span>
              </Button>
            </Link>
            {/* Add User/Account button if needed */}
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <section className="w-full">
          <Carousel slides={placeholderSlides} aspectRatio={1200/500} options={{loop: true}} autoplayOptions={{delay: 5000}} />
        </section>

        <section className="py-12 md:py-16 lg:py-20">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-10">
              Featured Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {placeholderProducts.map(product => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  imageUrl={product.imageUrl}
                  description={product.description}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
            <div className="text-center mt-12">
              <Link to="/product-listing">
                <Button size="lg" variant="outline">
                  View All Products
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Homepage;