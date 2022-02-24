import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
export default function MediaControlCard() {
  const theme = useTheme();

  return (
    <Card
      sx={{ display: "flex", width: "80%" ,marginLeft:'auto', marginRight:'auto',marginBottom:'15px'}}
      style={{justifyContent:"space-between"}}
    >
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image="https://blogs.cdc.gov/publichealthmatters/wp-content/uploads/sites/6/2020/05/golden_retiver_cat_cropped-1024x458.jpg"
        alt="Live from space album cover"
      />
      <Box sx={{ display: "flex", flexDirection: "row", width: '80%',justifyItems: "space-between" }}
      >
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
            Dog Food
          </Typography>
        </CardContent>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
            12.00 $
          </Typography>
        </CardContent> 
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
            - 2 +
          </Typography>
        </CardContent>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
            24.00 $
          </Typography>
        </CardContent>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
            <DeleteOutlineIcon />
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
}
