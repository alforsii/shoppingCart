// import { useState } from "react";
// import { useQuery } from "react-query";
import { LinearProgress, Grid } from "@material-ui/core";
import { Item, ItemType } from "./Item";
import styled from "styled-components";
import { ShoppingCart } from "./ShoppingCart";
import { useEffect, useState } from "react";

const Wrapper = styled.div`
  /* display: flex; */
`;
export const Products = () => {
  const [cartItems, setCartItems] = useState<ItemType[]>([]);
  const [products, setProducts] = useState<ItemType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getProducts = async (): Promise<ItemType[] | null> => {
    try {
      const apiProducts = await fetch("https://fakestoreapi.com/products");
      const items = await apiProducts.json();
      setProducts(items);
      setLoading(false);
      return items;
    } catch (error) {
      console.log("🚀  error", error);
      setError("something went wrong");
      return null;
    }
  };
  const addItemToCart = (item: ItemType) => {
    let updatedCart = [];
    const isItemInCart = cartItems.some((i) => i.id === item.id);
    if (isItemInCart) {
      updatedCart = cartItems.map((i) =>
        i.id === item.id
          ? {
              ...i,
              qty: i.qty + 1,
              total: Number((i.total + item.price).toFixed(2)),
            }
          : i
      );
    } else {
      updatedCart = [...cartItems, { ...item, qty: 1, total: item.price }];
    }
    setCartItems(updatedCart);
  };

  const decreaseItem = (item: ItemType) => {
    let updatedCart = [];
    const isItemInCart = cartItems.some((i) => i.id === item.id);
    if (isItemInCart && item.qty > 0) {
      updatedCart = cartItems
        .map((i) =>
          i.id === item.id
            ? {
                ...i,
                qty: i.qty - 1,
                total: Number((i.total - item.price).toFixed(2)),
              }
            : i
        )
        .filter((i) => i.qty !== 0);
    } else {
      updatedCart = cartItems.filter((i) => i.id !== item.id);
    }
    setCartItems(updatedCart);
  };
  const increaseItem = (item: ItemType) => {
    addItemToCart(item);
  };

  const removeCartItem = (item: ItemType) => {
    setCartItems(cartItems.filter((i) => i.id !== item.id));
  };

  useEffect(() => {
    getProducts();
  }, []);

  // const { data, isLoading, error } = useQuery("products", getProducts);
  // console.log(data);
  if (loading) return <LinearProgress />;
  if (error) return <h4>{error}</h4>;
  return (
    <div>
      <ShoppingCart
        cartItems={cartItems}
        decreaseItem={decreaseItem}
        increaseItem={increaseItem}
        removeCartItem={removeCartItem}
      />
      <Wrapper>
        <Grid container spacing={3}>
          {products?.map((item) => (
            <Grid key={item.id} item xs={12} sm={4}>
              <Item item={item} addItemToCart={addItemToCart} />
            </Grid>
          ))}
        </Grid>
      </Wrapper>
    </div>
  );
};
