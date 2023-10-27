import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import CreateBook from './pages/CreateBook/CreateBook';
import DeleteBook from './pages/DeleteBook/DeleteBook';
import EditBook from './pages/EditBook/EditBook';
import ShowBook from './pages/ShowBook/ShowBook';

function App() {
  return (
    <Routes>
      <Route
        path='/'
        element={<Home />}
      />
      <Route
        path='/books/create'
        element={<CreateBook />}
      />
      <Route
        path='/books/details/:id'
        element={<ShowBook />}
      />
      <Route
        path='/books/edit/:id'
        element={<EditBook />}
      />
      <Route
        path='/books/delete/:id'
        element={<DeleteBook />}
      />
    </Routes>
  );
}

export default App;
