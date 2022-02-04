import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
// import TextArea from "@mui/material/TextArea";
// import TextMatric from "@mui/material/TextMatric";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Header from "./admin_components/Header";
import Footer from "../Components/Footer";
import CardMedia from "@mui/material/CardMedia";

const theme = createTheme();

export default function AddDoctor() {


  return (
    <div>
      <Header />
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 12,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              borderRadius: "10px",
              border: "5px solid #e2e2e2",
              padding: "20px",
              width: "150%",
            }}
          >
            <Typography component="h1" variant="h5">
              Add New Doctor
            </Typography>
            <Box
              component="form"
              noValidate
              // onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="Product_Name"
                    label="Product_Name"
                    name="Product_Name"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="Product_Price"
                    label="Product_Price"
                    type="Product_Price"
                    id="Product_Price"
                    autoComplete="Product_Price"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="Discounted_Price"
                    label="Discounted_Price"
                    type="Discounted_Price"
                    id="Discounted_Price"
                    autoComplete="Discounted_Price"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="Stock"
                    label="Stock"
                    type="Stock"
                    id="Stock"
                    autoComplete="Stock"
                  />
                </Grid>
                <Grid item xs={20}>
                  <TextareaAutosize
                    aria-label="minimum height"
                    minRows={12}
                    placeholder="  Description*"
                    style={{ width: "100%" }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <p>Click on the "Choose File" button to upload a file:</p>
                  <input style={{}} type="file" name="file" id="file" />
                </Grid>
              </Grid>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Add Product
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item></Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}
