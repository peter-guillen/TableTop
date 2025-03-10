import { ProfessionPreview } from "./ProfessionPreview";

import { LoadingSpinner } from "../LoadingSpinner";

interface ProfessionListProps {
  professionList: Profession[];
  onDelete: (id: string) => Promise<void>;
}

interface Profession {
  _id: string;
  title: string;
}
export const ProfessionList: React.FC<ProfessionListProps> = ({
  professionList,
  onDelete,
}) => {
  if (!professionList || professionList.length === 0) {
    return <LoadingSpinner />;
  }
  return (
    <div>
      <header className={"bg-gray-600"}>
        <h2 className={"text-4xl text-center"}>Professions</h2>
        <p className="p-5 pt-0 m-5">
          This is a list of professions, the directory if you will. Roles that
          each class can function as. The roles that are included are healers,
          tanks, dps and much more. Lorem ipsum dolor, sit amet consectetur
          adipisicing elit. Autem quas, laboriosam quod repudiandae at animi,
          sunt cumque id obcaecati eos nesciunt, vero veritatis non ea
          aspernatur consequuntur illo dolor doloribus sint iste quaerat est?
          Quia officiis praesentium dolores enim distinctio reprehenderit sit
          magni iusto et? Illum nemo excepturi libero animi?
        </p>
      </header>

      <div className="grid grid-cols-3">
        {professionList &&
          professionList.map((profession) => (
            <div key={profession._id}>
              <ProfessionPreview profession={profession} onDelete={onDelete} />
            </div>
          ))}
      </div>
    </div>
  );
};
