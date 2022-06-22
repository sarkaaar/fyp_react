import { Link } from "react-router-dom";
export default function SearchCard(props) {
  return (
    <Link
      onClick={() => {
        window.location.reload();
      }}
      to={`/product/${props.obj.item.id}`}
    >
      <div className="bg-white flex w-full max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 m-2 justify-between items-center">
        <img
          src={props.obj.item.image[0]}
          alt="product"
          className="w-20 h-20"
        />
        <h1>{props.obj.item.name}</h1>
        <h1 className="w-32">Rs. {props.obj.item.salePrice}/=</h1>
      </div>
    </Link>
  );
}
  