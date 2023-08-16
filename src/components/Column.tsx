import { ColumnType, TaskI } from '@/types/typings';
import React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';

interface Props {
  id: ColumnType;
  tasks: TaskI[];
  index: number;
}

const idToColumnTitle: {
  [key in ColumnType]: string;
} = {
  plan: 'Plan',
  inprocess: 'In Progress',
  completed: 'Completed',
};

export default function Column({ id, tasks, index }: Props) {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {/* render droppable in the column */}
          <Droppable droppableId={index.toString()} type="card">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={`pb-2 p-2 rounded-2xl shadow-sm ${
                  snapshot.isDraggingOver ? 'bg-sky-300' : 'bg-grey-50'
                }`}
              >
                <h2>{idToColumnTitle[id]}</h2>
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
}
