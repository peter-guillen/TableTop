import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { SpellPreview } from "./SpellPreview";
import { SpellApiDnd } from "./SpellApiDnd";
import { LoadingSpinner } from "../LoadingSpinner";
import { Button } from "../Button";

export const SpellList = ({ spellList, onDelete, onReorder }) => {
  if (!spellList || spellList.length === 0) {
    return <LoadingSpinner />;
  }

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedList = Array.from(spellList);
    const [movedItem] = reorderedList.splice(result.source.index, 1);
    reorderedList.splice(result.destination.index, 0, movedItem);

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
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};
