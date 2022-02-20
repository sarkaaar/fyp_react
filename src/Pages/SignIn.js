// import * as React from "react";
// import Avatar from "@mui/material/Avatar";
// import Button from "@mui/material/Button";
// import TextField from "@mui/material/TextField";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
// import Link from "@mui/material/Link";
// import Grid from "@mui/material/Grid";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// import Typography from "@mui/material/Typography";
import Header from "../Components/Header";

import { LockClosedIcon } from "@heroicons/react/solid";

export default function Example() {
  return (
    <>
      <Header />

      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Sign in to your account
            </h2>
          </div>
          <form className="mt-8 space-y-6" action="#" method="POST">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className=" rounded-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  // placeholder="Email address"
                />
              </div>
              <div className="mt-4">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className=" rounded-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  // placeholder="Password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign in
              </button>
            </div>
            <div className="">
              <h2>
                ----------------------------------Or Continue
                With---------------------------------
              </h2>
              <button className="w-36 py-2 px-4  text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Click
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

// export default function SignIn() {
//   return (
//     
//     // <div>
//     //   <Header />
//     //   <div style={{width:"400px",margin:"auto",marginTop:"50px"}}>
//     //     <div
//     //       style={{
//     //         marginTop: "48px",
//     //         display: "flex",
//     //         flexDirection: "column",
//     //         alignItems: "center",
//     //       }}
//     //     >
//     //       <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
//     //         <LockOutlinedIcon />
//     //       </Avatar>
//     //       <Typography component="h1" variant="h5">
//     //         Andar Mar!
//     //       </Typography>
//     //       <div

//     //       >
//     //         <TextField
//     //           margin="normal"
//     //           required
//     //           fullWidth
//     //           id="email"
//     //           label="Email Address"
//     //           name="email"
//     //           autoComplete="email"
//     //           autoFocus
//     //         />
//     //         <TextField
//     //           margin="normal"
//     //           required
//     //           fullWidth
//     //           name="password"
//     //           label="Password"
//     //           type="password"
//     //           id="password"
//     //           autoComplete="current-password"
//     //         />
//     //         <FormControlLabel
//     //           control={<Checkbox value="remember" color="primary" />}
//     //           label="Remember me"
//     //         />
//     //         <Button
//     //           type="submit"
//     //           fullWidth
//     //           variant="contained"
//     //           sx={{ mt: 3, mb: 2 }}
//     //         >
//     //           Sign In
//     //         </Button>
//     //         <Grid container>
//     //           <Grid item xs>
//     //             <Link href="#" variant="body2">
//     //               Forgot password?
//     //             </Link>
//     //           </Grid>
//     //           <Grid item>
//     //             <Link href="sign_up" variant="body2">
//     //               {"Don't have an account? Sign Up"}
//     //             </Link>
//     //           </Grid>
//     //         </Grid>
//     //       </div>
//     //     </div>
//     //   </div>

//     // </div>
//   );
// }
