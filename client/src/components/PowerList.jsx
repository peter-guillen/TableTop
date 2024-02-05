const PowerList = ({ powersList, onDelete }) => {
  const handleDelete = (id) => {
    console.log(id);
    onDelete(id);
  };

  const powers = powersList.map((p) => {
    return (
      <div onClick={() => handleDelete(p._id)} key={p._id}>
        {p.title}
      </div>
    );
  });

  return <div>{powers}</div>;
};

export default PowerList;
