import React, { useState } from 'react';
import { Redirect } from "react-router-dom";
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

const addHouseToComparison = (id, title, compare) => {

    if (compare) {

        let houseList = JSON.parse(localStorage.getItem('houseComparison'));
        let newHouseList = [];
        houseList.forEach((house) => {
            if (house.id !== id) {
                newHouseList.push({ id: house.id, title: house.title });
            }
        })

        localStorage.setItem('houseComparison', JSON.stringify(newHouseList));
    } else {
        let houseList = JSON.parse(localStorage.getItem('houseComparison'));

        if (houseList === null) {
            houseList = [];
        }

        let newHouseList = [];
        houseList.forEach((house) => {
            if (house.id !== id && newHouseList.length < 3) {
                newHouseList.push({ id: house.id, title: house.title });
            }
        })

        if (newHouseList.length < 3) {
            newHouseList.push({ id: id, title: title });
        }

        localStorage.setItem('houseComparison', JSON.stringify(newHouseList));
    }


}

function HouseCard({ id, title, city, rooms, price, area, image }) {
    const classes = useStyles();

    const [favorite, setFavorite] = useState(false);
    const [compare, setCompare] = useState(false);
    const [redirect, setRedirect] = useState(false);

    if (image === undefined) {
        image = defaultImage;
    }

    let favoriteButton = favorite === true ? "red" : "";
    let compareButton = compare === true ? "#3f51b5" : "";

    if (redirect) { return <Redirect to="house-details" /> }
    return (
        <Card className={classes.root}>
            <CardActionArea onClick={() => { localStorage.setItem('currentHouse', JSON.stringify({ id: id })); setRedirect(true); }}>
                <CardMedia
                    className={classes.media}
                    image={image}
                    title={title}
                />
                <CardContent style={{ minHeight: "200px" }}>
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
                        style={{ color: favoriteButton }}
                    />
                </IconButton>
                <IconButton aria-label="add to favorites">
                    <CompareArrowsIcon
                        onClick={() => { setCompare(!compare); addHouseToComparison(id, title, compare) }}
                        style={{ color: compareButton }}
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