import * as React from 'react';
import { IconButton } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import { Link } from 'react-router-dom';

export default function MediaCard(obj) {
  return (
    <div className="hover:drop-shadow-2xl bg-white  xl:w-56 xl:h-80 2xl:w-64 2xl:h-96">
      <Link to={`/product/${obj.obj.id}`}>
        <img
          src={
            obj.obj.image ? obj.obj.image : 'https://source.unsplash.com/random'
          }
          alt="img"
          className="w-full xl:h-44 2xl:h-52"
        />

        <div style={{ padding: '6px' }}>
          <h1 className="2xl:text-2xl xl:text-large  2xl:h-20 h-12">
            {obj.obj.name.slice(0, 25)}
            ...
          </h1>
          <h2
            className="2xl:text-2xl xl:text-xl text-indigo-600 font-bold"
          // variant="h5"
          >
            Rs.
            {' '}
            {obj.obj.salePrice ? obj.obj.salePrice : 'N/A'}
          </h2>
        </div>
        <hr className="w-10/12 m-auto" />

        {/* Buttons */}
        {/* <div className="flex justify-around">
          <IconButton size="large">
            <ShoppingCartIcon />
          </IconButton>
          <IconButton size="large">
            <ShareIcon />
          </IconButton>
          <IconButton size="large">
            <FavoriteBorderIcon />
          </IconButton>
        </div> */}
      </Link>
    </div>
  );
}
