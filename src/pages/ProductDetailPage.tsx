import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Carousel from '@/components/Carousel'; // Custom component
import Footer from '@/components/layout/Footer'; // Custom component

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ShoppingCart, Minus, Plus } from 'lucide-react';

// Mock product data - in a real app, this would come from an API
const mockProducts: Record<string, any> = {
  'plp1': { id: 'plp1', name: 'Elegant Smartwatch', price: 199.99, category: 'Electronics', description: 'A very elegant smartwatch with many features. Long battery life and beautiful display.', images: [{id:1, imageUrl:'https://via.placeholder.com/600x400?text=Smartwatch+View+1', altText:'Smartwatch Main'}, {id:2, imageUrl:'https://via.placeholder.com/600x400?text=Smartwatch+View+2', altText:'Smartwatch Side'}, {id:3, imageUrl:'https://via.placeholder.com/600x400?text=Smartwatch+View+3', altText:'Smartwatch Screen'}], details: 'Processor: XYZ, RAM: 2GB, Storage: 16GB', specifications: 'Material: Stainless Steel, Water Resistance: 5ATM' },
  // Add other products from ProductListingPage here for mock data consistency
  'prod1': { id: 'prod1', name: 'Minimalist Desk Lamp', price: 75.00, category: 'Home Office', description: 'Sleek and modern desk lamp. Provides excellent, adjustable illumination for your workspace. Energy efficient LED.', images: [{id:1, imageUrl:'https://via.placeholder.com/600x400?text=Desk+Lamp+Main', altText:'Desk Lamp Main'}, {id:2, imageUrl:'https://via.placeholder.com/600x400?text=Desk+Lamp+Detail', altText:'Desk Lamp Detail'}], details: 'Material: Aluminum, Light Source: LED, Wattage: 10W', specifications: 'Dimensions: 15x5x20 inches, Weight: 2 lbs, Colors: Black, White, Silver' },
};


const ProductDetailPage: React.FC = () => {
  console.log('ProductDetailPage loaded');
  const { productId } = useParams<{ productId: string }>();
  const [quantity, setQuantity] = useState(1);

  // In a real app, fetch product details based on productId
  const product = productId ? mockProducts[productId] : null;

  if (!product) {
    // It's good practice to navigate to a NotFound page or show an error
    return <div className="text-center py-20 text-xl">Product not found. <Link to="/product-listing" className="text-primary hover:underline">Go to shop</Link></div>;
  }
  
  const handleQuantityChange = (change: number) => {
    setQuantity(prev => Math.max(1, prev + change));
  };

  const handleAddToCart = () => {
    console.log(`Added ${quantity} of product ${product.id} (${product.name}) to cart.`);
    // Add to cart logic here
  };

  const carouselSlides = product.images.map((img: any, index: number) => ({
    id: `${product.id}-img-${index}`,
    imageUrl: img.imageUrl,
    altText: img.altText || product.name,
  }));

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
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>Home</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/product-listing" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>Shop</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <div className="flex items-center gap-2">
            <Link to="/cart">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
                <span className="sr-only">Cart</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild><Link to="/product-listing">Products</Link></BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{product.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          <div className="w-full">
             <Carousel slides={carouselSlides} aspectRatio={1} options={{loop: false}} />
             {/* If you want thumbnails, you'd add them here */}
          </div>

          <div className="space-y-6">
            {product.category && <Badge variant="outline">{product.category}</Badge>}
            <h1 className="text-3xl md:text-4xl font-bold">{product.name}</h1>
            <p className="text-3xl font-semibold text-primary">${product.price.toFixed(2)}</p>
            <p className="text-muted-foreground text-sm leading-relaxed">{product.description}</p>
            
            <div className="flex items-center gap-4">
              <label htmlFor="quantity" className="font-medium">Quantity:</label>
              <div className="flex items-center border border-border rounded-md">
                <Button variant="ghost" size="icon" onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1}>
                  <Minus className="h-4 w-4" />
                </Button>
                <Input
                  id="quantity"
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 h-9 text-center border-0 focus-visible:ring-0"
                  min="1"
                />
                <Button variant="ghost" size="icon" onClick={() => handleQuantityChange(1)}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Button size="lg" className="w-full md:w-auto" onClick={handleAddToCart}>
              <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
            </Button>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="details">
                <AccordionTrigger>Product Details</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  {product.details || "No additional details available."}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="specifications">
                <AccordionTrigger>Specifications</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                 {product.specifications || "No specifications available."}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="shipping">
                <AccordionTrigger>Shipping & Returns</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  Standard shipping takes 3-5 business days. Returns accepted within 30 days.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
        {/* Related Products Section could be added here */}
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetailPage;