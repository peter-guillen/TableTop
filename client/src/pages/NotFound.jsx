import { Link } from "react-router-dom";
import Button from "../components/Button";

export default function NotFound() {
  return (
    <div>
      <h2>Page Not Found!</h2>
      <p>
        Well this page can't be found. You may want to try looking elsewhere or
        for something else. There is a good chance that one of Writhers minions
        might have had something to doing with it's dissapearance. "Allegedly".
      </p>
      <Link to="/">
        <Button primary>Home Page</Button>
      </Link>
    </div>
  );
}
