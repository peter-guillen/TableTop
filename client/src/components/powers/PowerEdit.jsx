import { useState } from "react";
import { Link, useParams } from "react-router-dom";

import Button from "../Button";

const PowerEdit = ({ onEdit }) => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
  });

  const handleEdit = () => {};

  return (
    <div>
      <form>
        <input name="title" value="" type="text" placeholder="title" />
        <input name="category" value="" type="text" placeholder="category" />
        <input
          name="description"
          value=""
          type="text"
          placeholder="description"
        />
      </form>
      <Link to="/">
        <Button primary>Home</Button>
      </Link>
    </div>
  );
};

export default PowerEdit;
