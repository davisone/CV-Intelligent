'use client'

import React, { useId } from 'react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical } from 'lucide-react'
import { cn } from '@/lib/utils/helpers'

export interface DragHandleProps {
  attributes: ReturnType<typeof useSortable>['attributes']
  listeners: ReturnType<typeof useSortable>['listeners']
}

interface SortableItemProps {
  id: string
  children: (dragHandleProps: DragHandleProps) => React.ReactNode
  direction?: 'vertical' | 'horizontal'
}

function SortableItem({ id, children, direction = 'vertical' }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id })

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 1 : 0,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'relative',
        isDragging && 'shadow-lg scale-[1.02]',
        direction === 'horizontal' && 'inline-block'
      )}
    >
      {children({ attributes, listeners })}
    </div>
  )
}

interface SortableListProps<T> {
  items: T[]
  onReorder: (items: T[]) => void
  renderItem: (item: T, dragHandleProps: DragHandleProps) => React.ReactNode
  keyExtractor: (item: T) => string
  direction?: 'vertical' | 'horizontal'
  className?: string
}

export function SortableList<T>({
  items,
  onReorder,
  renderItem,
  keyExtractor,
  direction = 'vertical',
  className,
}: SortableListProps<T>) {
  const dndId = useId()
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex((item) => keyExtractor(item) === active.id)
      const newIndex = items.findIndex((item) => keyExtractor(item) === over.id)

      if (oldIndex !== -1 && newIndex !== -1) {
        const newItems = arrayMove(items, oldIndex, newIndex)
        onReorder(newItems)
      }
    }
  }

  const itemIds = items.map(keyExtractor)

  return (
    <DndContext
      id={dndId}
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={itemIds}
        strategy={
          direction === 'vertical'
            ? verticalListSortingStrategy
            : horizontalListSortingStrategy
        }
      >
        <div
          className={cn(
            direction === 'vertical' ? 'space-y-4' : 'flex flex-wrap gap-2',
            className
          )}
        >
          {items.map((item) => (
            <SortableItem
              key={keyExtractor(item)}
              id={keyExtractor(item)}
              direction={direction}
            >
              {(dragHandleProps) => renderItem(item, dragHandleProps)}
            </SortableItem>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  )
}

// Composant DragHandle réutilisable
interface DragHandleComponentProps {
  dragHandleProps: DragHandleProps
  className?: string
}

export function DragHandle({ dragHandleProps, className }: DragHandleComponentProps) {
  return (
    <button
      type="button"
      className={cn(
        'cursor-grab active:cursor-grabbing p-1 text-gray-400 hover:text-gray-600 touch-none',
        className
      )}
      {...dragHandleProps.attributes}
      {...dragHandleProps.listeners}
    >
      <GripVertical className="w-4 h-4" />
    </button>
  )
}
