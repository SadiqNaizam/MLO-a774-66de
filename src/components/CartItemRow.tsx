import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from 'lucide-react'; // Icon for remove
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface CartItem {
  id: string | number;
  name: string;
  imageUrl: string;
  price: number;
  quantity: number;
  // Potentially color, size, or other variants
}

interface CartItemRowProps {
  item: CartItem;
  onQuantityChange: (itemId: string | number, newQuantity: number) => void;
  onRemoveItem: (itemId: string | number) => void;
  className?: string;
}

const CartItemRow: React.FC<CartItemRowProps> = ({
  item,
  onQuantityChange,
  onRemoveItem,
  className = "",
}) => {
  console.log("Rendering CartItemRow for item:", item.id, item.name);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (!isNaN(newQuantity) && newQuantity >= 0) { // Allow 0 for removal, or handle removal separately
      console.log("CartItemRow: Quantity changed for", item.id, "to", newQuantity);
      onQuantityChange(item.id, newQuantity);
    }
  };

  const handleRemove = () => {
    console.log("CartItemRow: Remove clicked for", item.id);
    onRemoveItem(item.id);
  };

  // This component might be rendered as a div in a flex/grid layout, or as a <tr> in a <table>.
  // For flexibility, using divs and Tailwind for table-like layout.
  return (
    <div className={`flex items-center gap-4 py-4 border-b border-border/50 ${className}`}>
      <div className="w-20 h-20 flex-shrink-0 bg-muted rounded">
        <AspectRatio ratio={1/1}>
          <img
            src={item.imageUrl || '/placeholder.svg'}
            alt={item.name}
            className="object-cover w-full h-full rounded"
            onError={(e) => (e.currentTarget.src = '/placeholder.svg')}
          />
        </AspectRatio>
      </div>
      <div className="flex-grow">
        <h3 className="font-medium text-foreground">{item.name}</h3>
        {/* Potentially add variant info here */}
        <p className="text-sm text-muted-foreground">Price: ${item.price.toFixed(2)}</p>
      </div>
      <div className="w-24">
        <Input
          type="number"
          min="0" // Or 1 if 0 means remove
          value={item.quantity}
          onChange={handleQuantityChange}
          className="text-center h-9"
          aria-label={`Quantity for ${item.name}`}
        />
      </div>
      <div className="w-24 text-right font-medium text-foreground">
        ${(item.price * item.quantity).toFixed(2)}
      </div>
      <div>
        <Button variant="ghost" size="icon" onClick={handleRemove} aria-label={`Remove ${item.name} from cart`}>
          <X className="h-5 w-5 text-muted-foreground hover:text-destructive" />
        </Button>
      </div>
    </div>
  );
};
export default CartItemRow;