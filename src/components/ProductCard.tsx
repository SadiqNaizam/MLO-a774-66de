import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ShoppingCart } from 'lucide-react'; // Icon for add to cart

interface ProductCardProps {
  id: string | number;
  name: string;
  price: number;
  imageUrl: string;
  description?: string; // Optional short description
  onAddToCart: (id: string | number) => void;
  // Add onProductViewDetails if needed: (id: string | number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  imageUrl,
  description,
  onAddToCart,
}) => {
  console.log("Rendering ProductCard:", name, id);

  const handleAddToCart = () => {
    console.log("ProductCard: Add to cart clicked for", id);
    onAddToCart(id);
  };

  return (
    <Card className="w-full overflow-hidden transition-shadow duration-300 hover:shadow-lg bg-card text-card-foreground border-border/50">
      {/* <CardHeader className="p-0"> */}
        <AspectRatio ratio={1 / 1} className="bg-muted"> {/* Square aspect ratio for product images */}
          <img
            src={imageUrl || '/placeholder.svg'}
            alt={name}
            className="object-cover w-full h-full"
            onError={(e) => (e.currentTarget.src = '/placeholder.svg')}
          />
        </AspectRatio>
      {/* </CardHeader> */}
      <CardContent className="p-4 space-y-2">
        <CardTitle className="text-lg font-semibold line-clamp-2 h-[3.2rem]">{name}</CardTitle>
        {description && <p className="text-sm text-muted-foreground line-clamp-2 h-[2.5rem]">{description}</p>}
        <p className="text-xl font-bold text-primary">${price.toFixed(2)}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full" onClick={handleAddToCart} variant="outline">
          <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
        </Button>
        {/* Optionally, a "View Details" button could be added here */}
        {/* <Button variant="link" className="w-full mt-2">View Details</Button> */}
      </CardFooter>
    </Card>
  );
};
export default ProductCard;