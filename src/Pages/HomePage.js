import * as React from "react";
import Header from "../Components/Header";
import Grid from "@mui/material/Grid";
import MediaCard from "../Components/MediaCard";
import TextField from "@mui/material/TextField";
import { Button } from "@material-ui/core";

export default function HomePage() {
  return (
    <div
      style={{
        height: "330px",
        backgroundImage: "url(./0)",
      }}
    >
      <Header />

      <div>
        <h1
          style={{
            padding: 25,
            maxWidth: "auto",
            justifySelf: "center",
            margin: "auto",
            marginTop: 50,
            textAlign: "center",
            fontWeight: "bold",
            color: "#3f51b5",
            fontSize: 72,
          }}
        >
          Welcome to
          <span
            style={{
              background: "#3f51b5",
              color: "white",
              padding: 5,
              borderRadius: 15,
            }}
          >
            PET-PLANET
          </span>
        </h1>
      </div>
      <div>
        <Grid container spacing={3} style={{ margin: "100px" }}>
          <Grid item xs="auto">
            <MediaCard />
          </Grid>
          <Grid item xs="auto">
            <MediaCard />
          </Grid>
          <Grid item xs="auto">
            <MediaCard />
          </Grid>
          <Grid item xs="auto">
            <MediaCard />
          </Grid>
          <Grid item xs="auto">
            <MediaCard />
          </Grid>
          <Grid item xs="auto">
            <MediaCard />
          </Grid>
        </Grid>
      </div>
      {/* demos */}
      {/* Update user info */}
      <div
        style={{
          border: "1px solid black",
          // height: "100%",
          width: "50%",
          padding: "20px",
          borderRadius: "10px",
          margin: "auto",
          marginBottom: "50px",
        }}
      >
        <h1>Update User Info </h1>
        <div style={{ minWidth: "300px" }}>
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Name"
            type="text"
            id="password"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Email"
            type="text"
            id="password"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Phone #"
            type="text"
            id="password"
          />
          <div style={{ display: "flex", justifyContent: "end" }}>
            <Button
              variant="contained"
              style={{
                width: "100px",
                margin: "10px",
                background: "#00579c",
                color: "white`",
              }}
            >
              Save
            </Button>
            <Button
              variant="contained"
              style={{
                width: "100px",
                margin: "10px",
                background: "#d30000",
                color: "white`",
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
      {/* update password */}
      <div
        style={{
          border: "1px solid black",
          // height: "100%",
          width: "50%",
          padding: "20px",
          borderRadius: "10px",
          margin: "auto",
          marginBottom: "50px",
        }}
      >
        <h1>Update Password </h1>
        <div style={{ minWidth: "300px" }}>
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Current Password"
            type="password"
            id="password"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="New Password"
            type="password"
            id="password"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Confirm New Password"
            type="password"
            id="password"
          />
          <div style={{ display: "flex", justifyContent: "end" }}>
            <Button
              variant="contained"
              style={{
                width: "100px",
                margin: "10px",
                background: "#00579c",
                color: "white`",
              }}
            >
              Save
            </Button>
            <Button
              variant="contained"
              style={{
                width: "100px",
                margin: "10px",
                background: "#d30000",
                color: "white`",
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
      <h1 className="text-3xl font-bold underline" >Hello world!</h1>
    </div>
  );
}
