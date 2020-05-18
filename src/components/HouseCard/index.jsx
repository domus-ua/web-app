import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

import defaultImage from "assets/img/home/home.jpg";

const useStyles = makeStyles({
  root: {
    maxWidth: "100%",
  },
  media: {
    height: 180,
  },
});

function HouseCard({ title, city, rooms, price, area, image}) {
  const classes = useStyles();
  
  if(image === undefined) {
    image = defaultImage;
  }

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={image}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h3">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            <strong>City:</strong> {city}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            <strong>Rooms:</strong> {rooms}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            <strong>Price:</strong> {price} €
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            <strong>Habitable area:</strong> {area}m2
          </Typography>

        </CardContent>
      </CardActionArea>
      <CardActions>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="add to favorites">
          <ShoppingCartIcon />
        </IconButton>
        <Button size="small" style={{ backgroundColor: "#3f51b5", color: "white" }}>
          Details
        </Button>
      </CardActions>
    </Card>
  );
}

export default HouseCard;