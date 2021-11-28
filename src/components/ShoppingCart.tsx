import { ShoppingCartOutlined } from "@material-ui/icons";
import { Badge, IconButton } from "@material-ui/core";
import React, { useState } from "react";
import { ItemType } from "./Item";
import { ShoppingList } from "./ShoppingList";

export const ShoppingCart: React.FC<{
  cartItems: ItemType[];
  increaseItem: (item: ItemType) => void;
  decreaseItem: (item: ItemType) => void;
  removeCartItem: (item: ItemType) => void;
}> = ({ cartItems, increaseItem, decreaseItem, removeCartItem }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <IconButton onClick={() => setOpen(true)}>
        <Badge
          badgeContent={cartItems.reduce((a, b) => a + b.qty, 0)}
          color="error"
        >
          <ShoppingCartOutlined />
        </Badge>
      </IconButton>
      <ShoppingList
        cartItems={cartItems}
        open={open}
        setOpen={setOpen}
        decreaseItem={decreaseItem}
        increaseItem={increaseItem}
        removeCartItem={removeCartItem}
      />
    </>
  );
};
