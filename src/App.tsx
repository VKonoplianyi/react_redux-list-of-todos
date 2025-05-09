import React, { useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { getTodos } from './api';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './app/store';
import { setTodos } from './features/todos';

export const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const todos = useSelector((state: RootState) => state.todos);

  useEffect(() => {
    getTodos().then(fetchedTodos => {
      dispatch(setTodos(fetchedTodos));
    });
  }, [dispatch]);

  return (
    <React.Fragment>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter />
            </div>

            <div className="block">
              {!todos.length ? <Loader /> : <TodoList />}
            </div>
          </div>
        </div>
      </div>

      <TodoModal />
    </React.Fragment>
  );
};
