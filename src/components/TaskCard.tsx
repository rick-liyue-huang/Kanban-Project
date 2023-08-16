import { ColumnType, TaskI } from '@/types/typings';
import { XCircleIcon } from '@heroicons/react/20/solid';
import React from 'react';
import {
  DraggableProvidedDraggableProps,
  DraggableProvidedDragHandleProps,
} from 'react-beautiful-dnd';

interface Props {
  task: TaskI;
  index: number;
  id: ColumnType;
  innerRef: (element: HTMLElement | null) => void;
  draggableProps: DraggableProvidedDraggableProps;
  dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
}

export default function TaskCard({
  task,
  index,
  id,
  innerRef,
  dragHandleProps,
  draggableProps,
}: Props) {
  return (
    <div
      className="bg-white rounded-md space-y-2 drop-shadow-md"
      {...draggableProps}
      {...dragHandleProps}
      ref={innerRef}
    >
      <div className="flex justify-between items-center p-5">
        <p>{task.title}</p>
        <button className="text-red-500 hover:text-red-700">
          <XCircleIcon className="ml-5 h-8 w-8" />
        </button>
      </div>

      {/* add image */}
    </div>
  );
}
