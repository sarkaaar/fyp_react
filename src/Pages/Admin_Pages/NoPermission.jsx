import { Link } from 'react-router-dom';

export default function NoPermission() {
  return (
    <>
      <h1>You dont have any permission to view this page</h1>
      <Link to="/">GOTO HOMEPAGE</Link>
    </>
  );
}
