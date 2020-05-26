import React, { useState } from 'react';
import { Redirect } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

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

function HouseCard({id, title, city, rooms, price, area, image}) {
  const classes = useStyles();

  const [redirect, setRedirect] = useState(false);

  if(image === undefined) {
    image = defaultImage;
  }

  if(redirect) { return <Redirect to="house-details" />}
  return (
    <Card className={classes.root}>
      <CardActionArea onClick={ () => {localStorage.setItem('currentHouse', JSON.stringify({id: id})); setRedirect(true);}}>
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
        <Button style={{backgroundColor: "#3f51b5", color: "white" }}>
          Details
        </Button>
      </CardActions>
    </Card>
  );
}

export default HouseCard;
