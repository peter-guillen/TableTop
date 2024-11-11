import React, { useState } from "react";
import { Link } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import PowerPreview from "./PowerPreview";
import LoadingSpinner from "../LoadingSpinner";
import Button from "../Button";

const PowerList = ({ powerList, onDelete, onReorder }) => {
  if (!powerList || powerList.length === 0) {
    return <LoadingSpinner />;
  }

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedList = Array.from(powerList);
    const [movedItem] = reorderedList.splice(result.source.index, 1);
    reorderedList.splice(result.destination.index, 0, movedItem);

    // Call a function passed from the parent to update the order
    onReorder(reorderedList);
  };

  return (
    <div>
      <Link to="/powers/createPower">
        <Button primary>Create new power</Button>
      </Link>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="powerList">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {powerList.map((power, index) => (
                <Draggable
                  key={power._id}
                  draggableId={power._id}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <PowerPreview power={power} onDelete={onDelete} />
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
  );
};

export default PowerList;
