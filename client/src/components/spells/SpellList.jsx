import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { SpellPreview } from "./SpellPreview";
import { LoadingSpinner } from "../LoadingSpinner";
import { Button } from "../Button";

export const SpellList = ({ spellList, onDelete, onReorder }) => {
  const [spellDetails, setSpellDetails] = useState(null);
  const fetchSpells = async () => {
    const response = await fetch("https://www.dnd5eapi.co/api/spells");
    const data = await response.json();
    setSpellDetails(data.results);
  };
  useEffect(() => {
    fetchSpells();
  }, []);

  if (!spellList || spellList.length === 0) {
    return <LoadingSpinner />;
  }

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedList = Array.from(spellList);
    const [movedItem] = reorderedList.splice(result.source.index, 1);
    reorderedList.splice(result.destination.index, 0, movedItem);

    // Call a function passed from the parent to update the order
    onReorder(reorderedList);
  };

  return (
    <div className="flex justify-center">
      <div className="w-3/4">
        <Link to="/spells/createSpell">
          <Button primary>Create new spell</Button>
        </Link>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="spellList">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {spellList.map((spell, index) => (
                  <Draggable
                    key={spell._id}
                    draggableId={spell._id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <SpellPreview spell={spell} onDelete={onDelete} />

                        <Link to={`/spell/${spell.index}`}>{spell.name}</Link>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        {/* <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="spellDetails">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {spellDetails &&
                spellDetails.map((spell, index) => (
                  <Draggable
                    key={spell._id}
                    draggableId={spell._id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <SpellPreview spell={spell} onDelete={onDelete} />
                      </div>
                    )}
                  </Draggable>
                ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext> */}
        <div>
          {spellDetails &&
            spellDetails.map((spell) => (
              <div
                key={spell.index}
                className="flex flex-row justify-between items-center text-white bg-gray-500 m-4 p-2 rounded-md"
              >
                <Link to={`/spell/${spell.index}`} className="flex flex-row">
                  <h2>{spell.name}</h2>
                </Link>
                <div className="flex flex-row items-center">
                  <p>Level: {spell.level}</p>
                  <SpellPreview spell={spell}></SpellPreview>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
