import { useState, useEffect } from "react";

export const WeaponPage = () => {
  //   const [dndData, setDndData] = useState([]);
  //   const getDnDStuff = async () => {
  //     const response = await fetch("https://www.dnd5eapi.co/api/", {
  //       method: "GET",
  //       headers: { "Content-Type": "application/json" },
  //     });
  //     const data = await response.json();
  //     setDndData(data);
  //     console.log(data);
  //   };

  //   useEffect(() => {
  //     const getData = () => {
  //       const data = getDnDStuff();
  //       setDndData(data);
  //     };
  //     getData();
  //   }, []);

  //   console.log(dndData);

  //   return (
  //     <div>
  //       <div>Weapons</div>
  //       <div>Something...</div>
  //       <div>Something...</div>
  //       <div>Something...</div>
  //     </div>
  //   );
  // };

  // -------------------------------- API OBJECT ---------------------------------------
  // -------------------------------- API OBJECT ---------------------------------------
  // -------------------------------- API OBJECT ---------------------------------------
  // -------------------------------- API OBJECT ---------------------------------------
  // -------------------------------- API OBJECT ---------------------------------------

  //   const [resources, setResources] = useState([]);

  //   const fetchApiOverview = async () => {
  //     const response = await fetch("https://www.dnd5eapi.co/api/");
  //     const data = await response.json();
  //     setResources(Object.entries(data)); // Convert the object to an array of key-value pairs
  //   };

  //   useEffect(() => {
  //     fetchApiOverview();
  //   }, []);

  //   return (
  //     <div>
  //       <h1>DnD Resources</h1>
  //       <ul>
  //         {resources.map(([key, value]) => (
  //           <li key={key}>
  //             {key}: <a href={`https://www.dnd5eapi.co${value}`}>{value}</a>
  //           </li>
  //         ))}
  //       </ul>
  //     </div>
  //   );
  // };

  // -------------------------------- API FIGHTER ---------------------------------------
  // -------------------------------- API FIGHTER ---------------------------------------
  // -------------------------------- API FIGHTER ---------------------------------------
  // -------------------------------- API FIGHTER ---------------------------------------
  // -------------------------------- API FIGHTER ---------------------------------------

  const [classDetails, setClassDetails] = useState(null);

  const fetchClassDetails = async () => {
    const response = await fetch("https://www.dnd5eapi.co/api/classes");
    const data = await response.json();
    setClassDetails(data);
  };

  useEffect(() => {
    fetchClassDetails();
  }, []);

  const fetchEquipmentDetails = async () => {
    const response = await fetch(
      "https://www.dnd5eapi.co/api/equipment-categories/"
    );
    const data = await response.json();
    setClassDetails(data);
    console.log(data);
  };

  useEffect(() => {
    fetchEquipmentDetails();
  }, []);

  return (
    <div>
      {/* <div>
        {classDetails && (
          <>
            <h1>{classDetails.name}</h1>
            <p>Hit Die: {classDetails.hit_die}</p>
            <h2>Proficiencies:</h2>
            <ul>
              {classDetails.proficiencies.map((prof) => (
                <li key={prof.index}>{prof.name}</li>
              ))}
            </ul>
          </>
        )}
      </div> */}

      <div></div>
    </div>
  );
};
