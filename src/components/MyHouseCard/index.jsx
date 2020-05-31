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
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import uris from "variables/uris";
import defaultImage from "assets/img/home/home.jpg";
import IconButton from "@material-ui/core/IconButton";
import { Modal } from "react-bootstrap";

const useStyles = makeStyles({
  root: {
    maxWidth: "100%",
    marginTop: "30px",
  },
  media: {
    height: 180,
  },
});

function delHouse(id) {
  fetch(uris.restApi.houses + "/" + id, {
    method: "DELETE",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    }
  })
    .then(response => {
      if (!response.ok) throw new Error(response.status);
      else {
        window.location.reload();
        return response.json();
      }
    })
    .catch(error => {
      console.log("Fetch error: " + error);
    })
}

function HouseCard({ id, title, city, rooms, price, area, image, rating }) {
  const classes = useStyles();

  const [redirect, setRedirect] = useState(false);
  const [deleteHouse, setDelete] = useState(false);
  const [editHouse, setEdit] = useState(false);

  if (image === undefined) {
    image = defaultImage;
  }

  if (redirect) { return <Redirect to="/house-details" /> }
  if (editHouse) { return <Redirect to="edit-house" /> }
  return (
    <Card className={classes.root}>
      <CardActionArea data-testid={"houseCard"}  onClick={() => { localStorage.setItem('currentHouse', JSON.stringify({ id: id})); setRedirect(true); }}>
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
        <IconButton aria-label="delete house" data-testid={"house-card" + id} onClick={() => setDelete(true)}>
          <DeleteIcon
          />
        </IconButton>
        <IconButton aria-label="edit house" data-testid={"edit" + title} onClick={() => { localStorage.setItem('currentHouse', JSON.stringify({ id: id })); setEdit(true); }}>
          <EditIcon
          />
        </IconButton>
      </CardActions>
      <Modal
        show={deleteHouse}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            <h3 id="delete-confirmation" style={{ color: "red" }}><i className="fas fa-trash"></i> Are you sure you want to delete this house?</h3>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="col-sm-12 text-center">
            <Button onClick={() => { delHouse(id); setDelete(false); }}>Yes</Button>
            <Button style={{ alignItems: "center", margin: "auto" }} onClick={() => setDelete(false)}>No</Button>
          </div>
        </Modal.Body>
      </Modal>
    </Card>



  );
}

export default HouseCard;
