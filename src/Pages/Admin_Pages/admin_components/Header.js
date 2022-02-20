export default function Header() {
  return (
    <div>
      <div className="flex p-2 px-8 justify-around">
        <a
          href={"/admin/dashboard"}
          className="font-medium text-gray-500 hover:text-gray-900"
        >
          DASHBOARD
        </a>
        <a
          href={"/admin/sign_in"}
          className="font-medium text-gray-500 hover:text-gray-900"
        >
          LOGIN
        </a>
        <a
          href={"/admin/inventory"}
          className="font-medium text-gray-500 hover:text-gray-900"
        >
          INVENTORY
        </a>
        <a
          href={"/admin/addProducts"}
          className="font-medium text-gray-500 hover:text-gray-900"
        >
          ADD PRODUCTS
        </a>
        <a
          href={"/admin/orders"}
          className="font-medium text-gray-500 hover:text-gray-900"
        >
          ORDERS
        </a>
        <a
          href={"/admin/addDoctor"}
          className="font-medium text-gray-500 hover:text-gray-900"
        >
          ADD DOCTORS
        </a>
        <a
          href={"/admin/viewDoctor"}
          className="font-medium text-gray-500 hover:text-gray-900"
        >
          VIEW DOCTORS
        </a>
        <a
          href={"/admin/categories"}
          className="font-medium text-gray-500 hover:text-gray-900"
        >
          CATEGORIES
        </a>
      </div>
      <hr />
    </div>
  );
}
