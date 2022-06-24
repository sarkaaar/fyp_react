import { Link, useNavigate } from "react-router-dom";
export default function SearchCard(props) {
  let navigate = useNavigate();

  const navigateToProduct = () => {
    props.removeSearchProduct();
    navigate(`/product/${props.obj.item.id}`);
  }
  return (
    <div onClick={navigateToProduct} className="bg-white flex w-full max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 m-2 justify-between items-center cursor-pointer">
        <img
          src={props.obj.item.image[0]}
          alt="product"
          className="w-20 h-20"
        />
        <h1>{props.obj.item.name}</h1>
        <h1 className="w-32">Rs. {props.obj.item.salePrice}/=</h1>
      </div>
  );
}
