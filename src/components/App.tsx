import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Todo, fetchTodos, deleteTodo } from '../actions';
import { StoreState } from '../reducers/index';

export const App = (): JSX.Element => {
  const dispatch = useDispatch();

  const [fetching, setFetching] = useState(false);

  const todos = useSelector((state: StoreState) => state.todos);

  const onButtonClick = async () => {
    setFetching(true);

    await dispatch(fetchTodos());

    setFetching(false);
  };

  const onDeleteTodo = (id: number) => {
    dispatch(deleteTodo(id));
  };

  const renderList = (): JSX.Element[] => {
    return todos.map((todo: Todo) => {
      return (
        <div key={todo.id} onClick={() => onDeleteTodo(todo.id)}>
          {todo.title}
        </div>
      );
    });
  };

  return (
    <div>
      <button onClick={onButtonClick}>Fetch</button>
      {fetching ? 'Loading...' : null}
      {renderList()}
    </div>
  );
};
