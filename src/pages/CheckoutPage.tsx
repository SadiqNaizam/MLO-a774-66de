import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Added useNavigate
import Footer from '@/components/layout/Footer'; // Custom component

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart } from 'lucide-react';
// For form handling, you would typically use react-hook-form and zod
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import * as z from 'zod';

// Placeholder for form schema if using zod
// const checkoutSchema = z.object({ ... });

const CheckoutPage: React.FC = () => {
  console.log('CheckoutPage loaded');
  const navigate = useNavigate(); // For redirecting after order

  // Placeholder cart summary data, in a real app this would come from state/context
  const orderSummary = {
    subtotal: 224.50,
    shipping: 5.00,
    tax: 18.36,
    total: 247.86,
    items: [
      { id: 'prod1', name: 'Minimalist Desk Lamp', quantity: 1, price: 75.00 },
      { id: 'plp2', name: 'Noise-Cancelling Headphones', quantity: 1, price: 149.50 }, // Corrected quantity from cart example if it was 2
    ]
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Form submitted. Order placed (simulated).');
    // Process payment, save order, etc.
    // For this example, we'll just navigate to a conceptual order confirmation
    alert('Order placed successfully! (Simulated)'); // Replace with actual Sonner/Toast notification
    navigate('/order-confirmation'); // Or back to homepage, or a dedicated confirmation page
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
          <Link to="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold sm:inline-block text-xl">MyStore</span>
          </Link>
          {/* Minimal navigation on checkout, or just logo */}
           <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem><Link to="/product-listing" legacyBehavior passHref><NavigationMenuLink className={navigationMenuTriggerStyle()}>Continue Shopping</NavigationMenuLink></Link></NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <div className="flex items-center gap-2">
            <Link to="/cart"><Button variant="ghost" size="icon"><ShoppingCart className="h-5 w-5" /><span className="sr-only">Cart</span></Button></Link>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Checkout</h1>
        
        <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card className="border-border/60">
              <CardHeader>
                <CardTitle>Shipping Information</CardTitle>
                <CardDescription>Enter your shipping address.</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input id="fullName" placeholder="John Doe" required />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="john.doe@example.com" required />
                </div>
                <div className="md:col-span-2 space-y-1.5">
                  <Label htmlFor="address">Street Address</Label>
                  <Input id="address" placeholder="123 Main St" required />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" placeholder="Anytown" required />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="state">State / Province</Label>
                  <Input id="state" placeholder="CA" required />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="zip">ZIP / Postal Code</Label>
                  <Input id="zip" placeholder="90210" required />
                </div>
                <div className="md:col-span-2 space-y-1.5">
                  <Label htmlFor="country">Country</Label>
                  <Select defaultValue="us" required>
                    <SelectTrigger id="country">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="ca">Canada</SelectItem>
                      <SelectItem value="gb">United Kingdom</SelectItem>
                      {/* Add more countries */}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/60">
              <CardHeader>
                <CardTitle>Payment Details</CardTitle>
                <CardDescription>Enter your payment information. (This is a mock form)</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input id="cardNumber" placeholder="•••• •••• •••• ••••" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="expiryDate">Expiry Date</Label>
                    <Input id="expiryDate" placeholder="MM/YY" required />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="cvc">CVC</Label>
                    <Input id="cvc" placeholder="•••" required />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-24 border-border/60">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {orderSummary.items.map(item => (
                  <div key={item.id} className="flex justify-between text-sm text-muted-foreground">
                    <span>{item.name} (x{item.quantity})</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="border-t border-border/40 pt-3 mt-3 space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${orderSummary.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>${orderSummary.shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (Estimated)</span>
                    <span>${orderSummary.tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg border-t border-border/40 pt-3 mt-2">
                    <span>Total</span>
                    <span>${orderSummary.total.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" size="lg" className="w-full">
                  Place Order
                </Button>
              </CardFooter>
            </Card>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default CheckoutPage;