import Button from "../components/Button";

const PowerPreview = ({ power, onDelete }) => {
  const handleDelete = () => {
    onDelete(power._id);
  };

  return (
    <div className="flex text-white bg-gray-500 m-4 p-2">
      <div>{power.title}</div>
      <Button primary>Details</Button>
      <Button danger onClick={handleDelete}>
        Delete
      </Button>
    </div>
  );
};
export default PowerPreview;
