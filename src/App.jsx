import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const initialTodos = JSON.parse(localStorage.getItem('todos')) || [
  {id: 1, text: "Aprender React.js"},
  {id: 2, text: "Aprender JS"},
  {id: 3, text: "Aprender Vue.js"},
]

const App = () => {
  const [todo, setTodo] = useState(initialTodos);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todo))
  }, [todo])
  

  const handleDragEnd = result => {
    if (!result.destination) return
    
    const startIndex = result.source.index;
    const endIndex = result.destination.index;

    const copyArray = [...todo]
    const [reorderItem] = copyArray.splice(startIndex, 1)
    
    copyArray.splice(endIndex, 0, reorderItem)
    
    setTodo(copyArray)
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <h1>Todo app</h1>
      <Droppable droppableId="todos">
        {(droppableProvider) => (
          <ul
            ref={droppableProvider.innerRef}
            {...droppableProvider.droppableProps}
          >
            {todo.map((todo, index) => (
              <Draggable index={index} key={todo.id} draggableId={`${todo.id}`}>
                {(draggableProvider) => 
                <li ref={draggableProvider.innerRef}
                  {...draggableProvider.dragHandleProps}
                  {...draggableProvider.draggableProps}
                >{todo.text}</li>}
              </Draggable>
            ))}
            {droppableProvider.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default App;
