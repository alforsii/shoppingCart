import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

export interface ItemType {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
  rating: {
    rate: number;
    count: number;
  };
  qty: number;
  total: number;
}

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export const Item: React.FC<{
  item: ItemType;
  addItemToCart: (item: ItemType) => void;
}> = ({ item, addItemToCart }) => {
  const classes = useStyles();
  const [collapseText, setCollapseText] = useState(false);
  return (
    <Card className={classes.root} elevation={3}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={item.image}
          title={item.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="h6">
            {item.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {!collapseText ? (
              <>
                {item.description.slice(0, 100) + "..."}
                <strong onClick={() => setCollapseText(true)}>see more</strong>
              </>
            ) : (
              <>
                {item.description + ". "}
                <strong onClick={() => setCollapseText(false)}>see less</strong>
              </>
            )}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          size="small"
          color="primary"
          onClick={() => addItemToCart(item)}
        >
          Add
        </Button>
        <p>${item.price}</p>
      </CardActions>
    </Card>
  );
};
