import { Link } from "react-router-dom";
import Button from "../components/Button";

export default function NotFound() {
  return (
    <div>
      <h2>Page Not Found!</h2>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus
        in ducimus incidunt quod assumenda similique neque quaerat reprehenderit
        saepe veritatis nihil doloremque odit iste quis facere alias maiores
        placeat, temporibus repellendus eos eum provident aut obcaecati labore?
        Deserunt suscipit provident dolorem, laboriosam reprehenderit
        perferendis, at magnam dolores quo quas laborum!
      </p>
      <Link to="/">
        <Button primary>Home Page</Button>
      </Link>
    </div>
  );
}
