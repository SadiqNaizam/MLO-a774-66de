import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CartItemRow from '@/components/CartItemRow'; // Custom component
import Footer from '@/components/layout/Footer'; // Custom component

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart, Trash2 } from 'lucide-react';

interface CartItem {
  id: string | number;
  name: string;
  imageUrl: string;
  price: number;
  quantity: number;
}

const initialCartItems: CartItem[] = [
  { id: 'prod1', name: 'Minimalist Desk Lamp', imageUrl: 'https://via.placeholder.com/80x80?text=Lamp', price: 75.00, quantity: 1 },
  { id: 'plp2', name: 'Noise-Cancelling Headphones', imageUrl: 'https://via.placeholder.com/80x80?text=Headphones', price: 149.50, quantity: 2 },
];

const CartPage: React.FC = () => {
  console.log('CartPage loaded');
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
  const [discountCode, setDiscountCode] = useState('');

  const handleQuantityChange = (itemId: string | number, newQuantity: number) => {
    setCartItems(items =>
      items.map(item => (item.id === itemId ? { ...item, quantity: newQuantity } : item)).filter(item => item.quantity > 0) // Remove if quantity is 0
    );
    console.log(`Quantity for item ${itemId} changed to ${newQuantity}`);
  };

  const handleRemoveItem = (itemId: string | number) => {
    setCartItems(items => items.filter(item => item.id !== itemId));
    console.log(`Item ${itemId} removed from cart`);
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  // Discount logic would go here, for now, let's assume a fixed discount for a specific code
  const discountAmount = discountCode === 'SUMMER10' ? subtotal * 0.1 : 0;
  const total = subtotal - discountAmount;

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col min-h-screen bg-background text-foreground">
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
             <Link to="/" className="mr-6 flex items-center space-x-2">
                <span className="font-bold sm:inline-block text-xl">MyStore</span>
             </Link>
             <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem><Link to="/" legacyBehavior passHref><NavigationMenuLink className={navigationMenuTriggerStyle()}>Home</NavigationMenuLink></Link></NavigationMenuItem>
                  <NavigationMenuItem><Link to="/product-listing" legacyBehavior passHref><NavigationMenuLink className={navigationMenuTriggerStyle()}>Shop</NavigationMenuLink></Link></NavigationMenuItem>
                </NavigationMenuList>
             </NavigationMenu>
             <div className="flex items-center gap-2">
                <Link to="/cart"><Button variant="ghost" size="icon"><ShoppingCart className="h-5 w-5" /><span className="sr-only">Cart</span></Button></Link>
             </div>
          </div>
        </header>
        <main className="flex-grow container mx-auto px-4 py-12 flex flex-col items-center justify-center">
          <ShoppingCart className="w-24 h-24 text-muted-foreground mb-6" />
          <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-muted-foreground mb-8">Looks like you haven't added anything to your cart yet.</p>
          <Link to="/product-listing">
            <Button size="lg">Continue Shopping</Button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
          <Link to="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold sm:inline-block text-xl">MyStore</span>
          </Link>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem><Link to="/" legacyBehavior passHref><NavigationMenuLink className={navigationMenuTriggerStyle()}>Home</NavigationMenuLink></Link></NavigationMenuItem>
              <NavigationMenuItem><Link to="/product-listing" legacyBehavior passHref><NavigationMenuLink className={navigationMenuTriggerStyle()}>Shop</NavigationMenuLink></Link></NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <div className="flex items-center gap-2">
            <Link to="/cart"><Button variant="ghost" size="icon"><ShoppingCart className="h-5 w-5" /><span className="sr-only">Cart</span></Button></Link>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Your Shopping Cart</h1>
        
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* For smaller screens, CartItemRow's flex layout is fine. For larger, Table is an option */}
            {/* Using div-based CartItemRow as it's more flexible for different screen sizes */}
            <div className="space-y-4 divide-y divide-border/40">
              <div className="hidden md:flex items-center gap-4 py-2 font-medium text-muted-foreground px-2">
                <div className="w-20 flex-shrink-0"></div> {/* Image Spacer */}
                <div className="flex-grow">Product</div>
                <div className="w-24 text-center">Quantity</div>
                <div className="w-24 text-right">Total</div>
                <div className="w-10 text-right"></div> {/* Remove button Spacer */}
              </div>
              {cartItems.map(item => (
                <CartItemRow
                  key={item.id}
                  item={item}
                  onQuantityChange={handleQuantityChange}
                  onRemoveItem={handleRemoveItem}
                />
              ))}
            </div>
            {/* Alternative using ShadCN Table for larger screens, CartItemRow would need to be adapted or used as TableRow */}
            {/* <Table className="hidden lg:table">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Image</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead>Remove</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cartItems.map(item => (
                  <TableRow key={item.id}>
                    <TableCell><img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded" /></TableCell>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>
                      <Input type="number" value={item.quantity} onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))} className="w-20 h-9" min="1"/>
                    </TableCell>
                    <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                    <TableCell className="text-right">${(item.price * item.quantity).toFixed(2)}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" onClick={() => handleRemoveItem(item.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table> */}
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-24 border-border/60"> {/* Sticky summary card */}
              <CardHeader>
                <CardTitle className="text-2xl">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {/* Discount Code Input */}
                <div className="flex gap-2">
                  <Input 
                    type="text" 
                    placeholder="Discount code" 
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                  />
                  <Button variant="outline" onClick={() => console.log("Apply discount:", discountCode)}>Apply</Button>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-lg border-t border-border/40 pt-4">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Link to="/checkout" className="w-full">
                  <Button size="lg" className="w-full">
                    Proceed to Checkout
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CartPage;