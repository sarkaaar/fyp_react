import * as React from "react";
import Header from "../Admin_Pages/admin_components/Header";

export default function Dashboard() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <div>
      <Header />
      <h1>this is the dashboard page`</h1>
    </div>
  );
}
