import React from "react";
import styled from "styled-components";

// import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { IconButton, Badge } from "@material-ui/core";

import { PlusCircle, DashCircle, Trash } from "@styled-icons/bootstrap";
import { ItemType } from "./Item";

const StyledMenu = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25%;
`;
const StyledSubMenu = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const ShoppingList: React.FC<{
  cartItems: ItemType[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
  increaseItem: (item: ItemType) => void;
  decreaseItem: (item: ItemType) => void;
  removeCartItem: (item: ItemType) => void;
}> = ({
  setOpen,
  open,
  cartItems,
  decreaseItem,
  increaseItem,
  removeCartItem,
}) => {
  return (
    <div>
      <Drawer anchor={"top"} open={open} onClose={() => setOpen(false)}>
        <List style={{ overflow: "scroll" }}>
          {cartItems.length
            ? cartItems.map((item, index) => (
                <ListItem key={index}>
                  <ListItemText secondary={`${index + 1}. ${item.title}`} />

                  <StyledMenu>
                    <StyledSubMenu>
                      <IconButton onClick={() => decreaseItem(item)}>
                        <DashCircle size={20} />
                      </IconButton>
                      <ListItemText>{`${item.qty}`}</ListItemText>
                      <IconButton onClick={() => increaseItem(item)}>
                        <PlusCircle size={20} />
                      </IconButton>
                    </StyledSubMenu>

                    {/* <ListItemText> */}
                    <Badge
                      // color="secondary"

                      badgeContent={item.total.toString().split(".")[1]}
                      showZero
                    >
                      <span style={{ color: "green", fontSize: 14 }}>$</span>
                      <span style={{ padding: "1px" }}>
                        {item.total.toString().split(".")[0]}
                      </span>
                    </Badge>
                    {/* </ListItemText> */}
                    <IconButton onClick={() => removeCartItem(item)}>
                      <Trash size={20} color="red" />
                    </IconButton>
                  </StyledMenu>
                </ListItem>
              ))
            : null}
        </List>
        <Divider />
        <List>
          <ListItem>
            {cartItems.length ? (
              <>
                <ListItemText>
                  {/* {`Total: `}
                  <span style={{ color: "green", fontSize: 14 }}>$</span>
                  {`${Number(
                    cartItems.reduce((a, b) => a + b.total, 0).toFixed(2)
                  )}`} */}
                  <Badge
                    // color="secondary"

                    badgeContent={`${Number(
                      cartItems
                        .reduce((a, b) => a + b.total, 0)
                        .toString()
                        .split(".")[1]
                    )}`}
                    showZero
                  >
                    {`Total: `}
                    <span style={{ color: "green", fontSize: 14 }}>$</span>
                    <span style={{ padding: "1px" }}>
                      {`${Number(
                        cartItems
                          .reduce((a, b) => a + b.total, 0)
                          .toString()
                          .split(".")[0]
                      )}`}
                    </span>
                  </Badge>
                </ListItemText>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setOpen(false)}
                >
                  Proceed to checkout
                </Button>
              </>
            ) : (
              <ListItemText primary={`You have no items in you cart :(`} />
            )}
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
};
