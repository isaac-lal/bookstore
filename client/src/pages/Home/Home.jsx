import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../../components/Spinner/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import './Home.css'

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
      ): (
        <table className='books-table'>
          <thead>
            <tr>
              <th className='books-table__head'></th>
            </tr>
          </thead>
          <tbody>

          </tbody>
        </table>
      )}
    </div>
  );
};


export default Home;
