import * as React from "react";
import { Link } from "react-router-dom";

export default function MediaCard(obj) {
  return (
    <div className="bg-white mx-2 rounded-lg hover:drop-shadow-2xl h-72 w-52 xl:h-72 xl:w-56 2xl:h-96 2xl:w-64">
      <Link to={`/product/${obj.obj.id}`}>
        <img
          src={
            obj.obj.image ? (
              obj.obj.image
            ) : (
              <div className="flex h-full w-full items-center justify-center rounded border border-gray-200 object-cover object-center lg:w-1/2">
                <div className="h-40 w-40 animate-spin rounded-full border-t-4 border-b-4 border-blue-900" />
              </div>
            )
          }
          alt="img"
          className="w-full xl:h-44 2xl:h-52 h-44"
        />

        <div style={{ padding: "6px" }}>
          <h1 className="xl:text-large h-12  2xl:h-20 2xl:text-2xl">
            {obj.obj.name.slice(0, 25)}
            ...
          </h1>
          <h1 className="xl:text-md  text-gray-400 h-6">
            {obj.obj.description.slice(0, 15)}
            ...
          </h1>
          <h2
            className="font-bold text-indigo-600 xl:text-xl 2xl:text-2xl"
            // variant="h5"
          >
            Rs. {obj.obj.salePrice ? obj.obj.salePrice : "N/A"}
          </h2>
        </div>
      </Link>
    </div>
  );
}
