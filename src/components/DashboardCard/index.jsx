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

function DashboardCard({ title, description, href, image }) {
    const classes = useStyles();

    const [redirect, setRedirect] = useState(false);

    if(image === undefined) 
        image = defaultImage;

    if(redirect) return <Redirect to={href} />
    return (
        <Card className={classes.root}>
            <CardActionArea onClick={() => setRedirect(true)}>
                <CardMedia
                    className={classes.media}
                    image={image}
                    title={title}
                />
                <CardContent style={{ minHeight: "120px" }}>
                    <Typography gutterBottom variant="h5" component="h5">
                        {title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {description}
                    </Typography>

                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default DashboardCard;