import { Link } from "react-router-dom";
import { Button } from "../components/Button";

export function NotFound() {
  return (
    <div>
      <h2>Page Not Found!</h2>
      <p>
        Sorry, we could not locate what you searched for. Try looking elsewhere.
      </p>
      <Link to="/">
        <Button primary>Home Page</Button>
      </Link>
    </div>
  );
}
