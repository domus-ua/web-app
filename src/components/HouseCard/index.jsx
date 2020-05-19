import React, { useState } from 'react';
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
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';

import defaultImage from "assets/img/home/home.jpg";

const useStyles = makeStyles({
  root: {
    maxWidth: "100%",
    marginTop: "30px",
  },
  media: {
    height: 180,
  },
});

function HouseCard({ title, city, rooms, price, area, image}) {
  const classes = useStyles();
  
  const [favorite, setFavorite] = useState(false);
  const [compare, setCompare] = useState(false);

  if(image === undefined) {
    image = defaultImage;
  }

  let favoriteButton = favorite === true ? "red" : "";
  let compareButton = compare === true ? "#3f51b5" : "";

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={image}
          title={title}
        />
        <CardContent style={{minHeight: "200px"}}>
          <Typography gutterBottom variant="h5" component="h5">
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
          <FavoriteIcon
          onClick={() => setFavorite(!favorite)}
          style={{color: favoriteButton}}
          />
        </IconButton>
        <IconButton aria-label="add to favorites">
          <CompareArrowsIcon 
          onClick={() => setCompare(!compare)}
          style={{color: compareButton}}
          />
        </IconButton>
        <Button size="small" style={{ backgroundColor: "#3f51b5", color: "white" }}>
          Details
        </Button>
      </CardActions>
    </Card>
  );
}

export default HouseCard;