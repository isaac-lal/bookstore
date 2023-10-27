import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../../components/Loader/Loader';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import './Home.css';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5555/books')
      .then(res => {
        setBooks(res.data.data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className='wrapper'>
      <div className='container'>
        <h1 className='header'>Books List</h1>
        <Link to='/books/create'>
          <MdOutlineAddBox className='add-icon' />
        </Link>
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <table className='books-table'>
          <thead>
            <tr>
              <th className='books-table__categories'>Number</th>
              <th className='books-table__categories'>Title</th>
              <th className='books-table__categories'>Author</th>
              <th className='books-table__categories hidden'>Publish Year</th>
              <th className='books-table__categories hidden'>Operations</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => (
              <tr
                key={book._id}
                className='books-table__right'>
                <td className='books-table__results'>{index + 1}</td>
                <td className='books-table__results'>{book.title}</td>
                <td className='books-table__results hidden'>{book.author}</td>
                <td className='books-table__results hidden'>{book.publishYear}</td>
                <td className='books-table__results'>
                  <div className='books-table__route'>
                    <Link to={`/books/details/${books._id}`}>
                      <BsInfoCircle className='books-table__info-icon' />
                    </Link>
                    <Link to={`/books/edit/${books._id}`}>
                      <AiOutlineEdit className='books-table__edit-icon' />
                    </Link>
                    <Link to={`/books/delete/${books._id}`}>
                      <MdOutlineDelete className='books-table__delete-icon' />
                    </Link>
                    
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Home;
