import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '@/components/ProductCard'; // Custom component
import Footer from '@/components/layout/Footer'; // Custom component

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from '@/components/ui/button';
import { ShoppingCart, Search } from 'lucide-react';

const allProducts = [
  { id: 'plp1', name: 'Elegant Smartwatch', price: 199.99, imageUrl: 'https://via.placeholder.com/300x300?text=Smartwatch', category: 'Electronics' },
  { id: 'plp2', name: 'Noise-Cancelling Headphones', price: 149.50, imageUrl: 'https://via.placeholder.com/300x300?text=Headphones', category: 'Electronics' },
  { id: 'plp3', name: 'Modern Art Print', price: 39.00, imageUrl: 'https://via.placeholder.com/300x300?text=Art+Print', category: 'Home Decor' },
  { id: 'plp4', name: 'Organic Cotton T-Shirt', price: 25.00, imageUrl: 'https://via.placeholder.com/300x300?text=T-Shirt', category: 'Apparel' },
  { id: 'plp5', name: 'Stainless Steel Water Bottle', price: 18.00, imageUrl: 'https://via.placeholder.com/300x300?text=Water+Bottle', category: 'Accessories' },
  { id: 'plp6', name: 'Leather Wallet', price: 55.00, imageUrl: 'https://via.placeholder.com/300x300?text=Wallet', category: 'Accessories' },
  { id: 'plp7', name: 'Ceramic Coffee Mug Set', price: 30.00, imageUrl: 'https://via.placeholder.com/300x300?text=Mug+Set', category: 'Home Goods' },
  { id: 'plp8', name: 'Yoga Mat', price: 22.00, imageUrl: 'https://via.placeholder.com/300x300?text=Yoga+Mat', category: 'Fitness' },
];

const PRODUCTS_PER_PAGE = 8; // Or whatever number you prefer

const ProductListingPage: React.FC = () => {
  console.log('ProductListingPage loaded');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('name-asc');
  const [currentPage, setCurrentPage] = useState(1);

  const handleAddToCart = (productId: string | number) => {
    console.log(`Added product ${productId} to cart from ProductListingPage`);
    // Add to cart logic here
  };

  const filteredAndSortedProducts = allProducts
    .filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      switch (sortOption) {
        case 'price-asc': return a.price - b.price;
        case 'price-desc': return b.price - a.price;
        case 'name-asc': return a.name.localeCompare(b.name);
        case 'name-desc': return b.name.localeCompare(a.name);
        default: return 0;
      }
    });

  const totalPages = Math.ceil(filteredAndSortedProducts.length / PRODUCTS_PER_PAGE);
  const currentProducts = filteredAndSortedProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

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
        <section className="mb-8">
          <h1 className="text-4xl font-bold mb-6 text-center">Our Products</h1>
          <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-between p-4 bg-muted/50 rounded-lg border border-border/40">
            <div className="relative w-full md:w-1/3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-10 w-full"
                value={searchTerm}
                onChange={(e) => {setSearchTerm(e.target.value); setCurrentPage(1);}}
              />
            </div>
            <Select value={sortOption} onValueChange={(value) => {setSortOption(value); setCurrentPage(1);}}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                <SelectItem value="price-asc">Price (Low to High)</SelectItem>
                <SelectItem value="price-desc">Price (High to Low)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </section>

        {currentProducts.length > 0 ? (
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {currentProducts.map(product => (
               <Link to={`/product/${product.id}`} key={product.id} className="block">
                <ProductCard
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  imageUrl={product.imageUrl}
                  onAddToCart={(e) => {
                    e.stopPropagation(); // Prevent navigation when clicking add to cart
                    handleAddToCart(product.id);
                  }}
                />
               </Link>
            ))}
          </section>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground">No products found matching your criteria.</p>
          </div>
        )}

        {totalPages > 1 && (
          <section className="mt-12 flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" onClick={(e) => { e.preventDefault(); setCurrentPage(p => Math.max(1, p - 1)); }} aria-disabled={currentPage === 1} />
                </PaginationItem>
                {[...Array(totalPages)].map((_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink href="#" isActive={currentPage === i + 1} onClick={(e) => { e.preventDefault(); setCurrentPage(i + 1); }}>
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                {/* Add Ellipsis if many pages */}
                <PaginationItem>
                  <PaginationNext href="#" onClick={(e) => { e.preventDefault(); setCurrentPage(p => Math.min(totalPages, p + 1)); }} aria-disabled={currentPage === totalPages}/>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ProductListingPage;