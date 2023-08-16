import { ColumnType, TaskI } from '@/types/typings';
import { PlusCircleIcon } from '@heroicons/react/20/solid';
import React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import TaskCard from './TaskCard';

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
                <h2 className="flex justify-between font-bold text-xl p-2">
                  {idToColumnTitle[id]}
                  <span className="text-gray-500 bg-gray-200 rounded-full px-2 py-2 text-sm font-normal">
                    {tasks.length}
                  </span>
                </h2>

                <div className="space-y-2">
                  {tasks.map((task, index) => (
                    <Draggable key={index} draggableId={task.$id} index={index}>
                      {(provided) => (
                        <TaskCard
                          task={task}
                          index={index}
                          id={id}
                          innerRef={provided.innerRef}
                          draggableProps={provided.draggableProps}
                          dragHandleProps={provided.dragHandleProps}
                        />
                      )}
                    </Draggable>
                  ))}

                  {provided.placeholder}

                  <div className="flex items-end justify-end p-2">
                    <button className="text-green-500 hover:text-orange-600">
                      <PlusCircleIcon className="w-10 h-10 text-gray-400" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
}
