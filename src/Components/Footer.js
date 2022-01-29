// import * as React from "react";
// import AppBar from "@mui/material/AppBar";
// import Toolbar from "@mui/material/Toolbar";
// import Typography from "@mui/material/Typography";

// import { Container } from "@mui/material";

// export default function Footer() {
//   return (
//     <div style={{ position: "absolute", bottom: 0, width: "100%" }}>
//       <AppBar position="static">
//         <Toolbar>
//           <Typography variant="h6" color="inherit">
//             Home
//           </Typography>
//         </Toolbar>
//         <Toolbar>
//           <Typography variant="h6" color="inherit">
//             About Us
//           </Typography>
//         </Toolbar>
//         <Toolbar>
//           <Typography variant="h6" color="inherit">
//             Contact Us
//           </Typography>
//         </Toolbar>

//       </AppBar>

//       <Container maxWidth="sm">
//         <Typography variant="h6" color="inherit" noWrap></Typography>
//       </Container>
//     </div>
//   );
// }

import React from "react";
import {
  Box,
  Container,
  Row,
  Column,
  FooterLink,
  Heading,
} from "./Footer_Styles";

const Footer = () => {
  return (
    <Box>
      <Container>
        <Row>
          <Column>
            <Heading>About Us</Heading>
            <FooterLink href="#">Aim</FooterLink>
            <FooterLink href="#">Vision</FooterLink>
          </Column>
          <Column>
            <Heading>Services</Heading>
            <FooterLink href="#">Store</FooterLink>
            <FooterLink href="#">Maps</FooterLink>
            <FooterLink href="#">Appointments</FooterLink>
          </Column>
          <Column>
            <Heading>Contact Us</Heading>
            <FooterLink href="#">Email</FooterLink>
            <FooterLink href="#">Conatct</FooterLink>
            <FooterLink href="#">CUI Lahore</FooterLink>
          </Column>
          <Column>
            <Heading>Social Media</Heading>
            <FooterLink href="#">
              <i className="fab fa-facebook-f">
                <span style={{ marginLeft: "10px" }}>Facebook</span>
              </i>
            </FooterLink>
            <FooterLink href="#">
              <i className="fab fa-instagram">
                <span style={{ marginLeft: "10px" }}>Instagram</span>
              </i>
            </FooterLink>
            <FooterLink href="#">
              <i className="fab fa-twitter">
                <span style={{ marginLeft: "10px" }}>Twitter</span>
              </i>
            </FooterLink>
            <FooterLink href="#">
              <i className="fab fa-youtube">
                <span style={{ marginLeft: "10px" }}>Youtube</span>
              </i>
            </FooterLink>
          </Column>
        </Row>
      </Container>
    </Box>
  );
};
export default Footer;
