import ProfessionPreview from "./ProfessionPreview";
import { Link } from "react-router-dom";

import Button from "./Button";

const ProfessionList = ({ professionList, onDelete }) => {
  return (
    <div>
      <Link to={`/professions/createProfession`}>
        <Button primary>Create a Profession!</Button>
      </Link>
      <div>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut labore
        pariatur consectetur, aspernatur voluptas dicta eos sapiente deserunt
        quod nihil ea itaque incidunt numquam, minus tempora harum recusandae,
        quae inventore asperiores! Beatae aperiam numquam, vel aliquid ratione,
        blanditiis ipsum, ipsam laboriosam eligendi molestiae laborum. Commodi,
        esse necessitatibus dicta, distinctio expedita enim magnam facere quis
        tempore eveniet quaerat odit minima! Sit animi rem vitae ipsam, atque ex
        impedit temporibus quisquam rerum voluptatibus at nisi corrupti.
        Quibusdam debitis dolorem labore illum est quisquam, ratione incidunt
        sit aliquam excepturi laborum eius, animi tempore corrupti reiciendis.
        In minima vitae vero ratione at facere! Quidem!
      </div>

      <div className="grid grid-cols-3">
        {professionList.map((profession) => (
          <div key={profession._id}>
            <ProfessionPreview profession={profession} onDelete={onDelete} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfessionList;
