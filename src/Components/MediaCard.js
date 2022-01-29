import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";

export default function MediaCard() {
  return (
    <Card sx={{ maxWidth: 400, maxHeight: 450 }}>
      <CardMedia
        component="img"
        height="140"
        image={"https://bfs-group.eu/wp/wp-content/uploads/Petfood.jpg"}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Dog Food
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          12.00 $
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions style={{display:"flex",justifyContent:"center"}}>
        <Button size="large">
          <ShoppingCartIcon/>
        </Button>
        <Button size="large">
          <ShareIcon />
        </Button>
        <Button size="large">
          <FavoriteBorderIcon />
        </Button>
      </CardActions>
    </Card>
  );
}
