const TestComp = () => {
  const dataTable = [
    [
      { id: 1, secretData: "secretOne" },
      { title: "One", body: "Head-Body" },
    ],
    [
      { id: 2, otherSecret: "secretTwo" },
      { title: "Two", body: "Head-Body" },
    ],
    { details: "Details about something." },
    {
      functionObj: [
        function d6() {
          Math.floor(Math.random() * 6) + 1;
        },
        function d12() {
          Math.floor(Math.random() * 12) + 1;
        },
        function d20() {
          Math.floor(Math.random() * 20) + 1;
        },
      ],
    },
  ];

  return (
    <>
      <h2>{dataTable[0].title}</h2>
      <p></p>
    </>
  );
};

export default TestComp;
