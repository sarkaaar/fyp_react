import GoogleIcon from '@mui/icons-material/Google';
import {
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import {
  collection, getDocs, query, where,
} from 'firebase/firestore';
import { TextField } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { auth, db } from '../../firebase-config';
import Header from './Components/Header';

export default function SignIn() {
  const navigate = useNavigate();

  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState();
  const [queryUser, setQueryUser] = useState();
  const [errorMessage, setErrorMessage] = useState('');

  // onAuthStateChanged(auth, (currentUser) => {
  //   setUser(currentUser);
  // });

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    if (user) {
      navigate('/');
    }

    // getRole();
  }, [user]);

  // Get Role of Current User

  const usersRef = collection(db, 'users');

  // Login Function
  const login = async () => {
    await signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        console.log(res);
        navigate('/');
      })
      .catch((err) => {
        console.log(err.code);
        setErrorMessage(err.code);
      });
  };

  // Logout Function
  // const logout = async () => {
  //   await signOut(auth);
  // };

  return (
    <>
      {/* <Header /> */}
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 p-10 bg-white">
          <div className="">
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Sign in to your account
            </h2>
          </div>
          <form
            className="mt-8 space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <TextField
                style={{ paddingBottom: '15px' }}
                label="Email"
                fullWidth
                required
                value={email}
                onChange={(e) => {
                  setemail(e.target.value);
                }}
                type="email"
              />

              <TextField
                label="Password"
                fullWidth
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type="password"
              />
              {errorMessage !== '' ? (
                <h1 className="text-red-600 font-bold ">{errorMessage}</h1>
              ) : (
                <></>
              )}
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
                  href="/sign_in"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Forgot your password?
                </a>
              </div>
            </div>
            <div>
              <button
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => {
                  login();
                }}
              >
                Sign in
              </button>
            </div>
            <div className="flex space-x-2">
              <p>New to Pet-Planet </p>
              <Link
                to="/sign_up"
                className="font-medium  text-indigo-600 hover:text-indigo-500"
              >
                Sign Up
              </Link>
            </div>
            <hr />
          </form>
          <div className="">
            <h2 className="w-6 m-auto">Or</h2>
            <button className="mt-4 py-2 px-4 w-full text-white bg-red-600 hover:bg-red-700 focus:ring-red-500 rounded-md">
              Sign in with
              {' '}
              <GoogleIcon />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
