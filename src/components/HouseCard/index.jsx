import React, { useState } from 'react';
import { Redirect } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';

import { Button as ModalButton, Modal } from "react-bootstrap";

import defaultImage from "assets/img/home/home.jpg";

import uris from "variables/uris";

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

const fetchFavorite = (houseId, favorite) => {

    if (!favorite) {
        fetch(uris.restApi.wishlist, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ houseId: houseId, locatarioId: JSON.parse(localStorage.getItem('authUser')).id })
        })
            .then(response => {
                if (!response.ok) throw new Error(response.status);
                else return response;

            })
            .then(data => {
            })
            .catch(error => {
                console.log("Fetch error: " + error);
            })
    } else {

        fetch(uris.restApi.wishlist, {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ houseId: houseId, locatarioId: JSON.parse(localStorage.getItem('authUser')).id })
        })
            .then(response => {
                if (!response.ok || response.status !== 204) throw new Error(response.status);
                else return response;

            })
            .then(data => {
            })
            .catch(error => {
                console.log("Fetch error: " + error);
            })
    }
}

function HouseCard({ id, title, city, rooms, price, area, image, rating, isFavorite }) {
    const classes = useStyles();

    const [favorite, setFavorite] = useState(isFavorite === true ? true : false);
    const [compare, setCompare] = useState(false);
    const [redirect, setRedirect] = useState(false);

    const [modalOpen, setModalOpen] = useState(false);

    const authUser = JSON.parse(localStorage.getItem('authUser'));

    if (image === undefined) {
        image = defaultImage;
    }

    let favoriteButton = favorite === true ? "red" : "";
    let compareButton = compare === true ? "#3f51b5" : "";

    if (redirect) { return <Redirect to="/house-details" /> }
    return (
        <>
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
                            <i className="fas fa-star"></i> {rating}
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
                    {authUser !== null &&
                        <IconButton aria-label="add to favorites">
                            <FavoriteIcon
                                data-testid={"favorite-house" + id}
                                onClick={() => { setFavorite(!favorite); fetchFavorite(id, favorite); setModalOpen(true); }}
                                style={{ color: favoriteButton }}
                            />
                        </IconButton>
                    }
                    <IconButton aria-label="add to favorites">
                        <CompareArrowsIcon
                            data-testid={"house-card" + id}
                            onClick={() => { setCompare(!compare); addHouseToComparison(id, title); }}
                            style={{ color: compareButton }}
                        />
                    </IconButton>
                </CardActions>
            </Card>
            <Modal
                show={modalOpen}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <i class="fas fa-heart"></i> House {favorite === true ? "added to" : "removed from"} favorites!
</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <ModalButton onClick={() => { setModalOpen(false); }} data-testid="close-favorites">Close</ModalButton>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default HouseCard;