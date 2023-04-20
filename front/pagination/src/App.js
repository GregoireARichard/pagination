import React, { useState, useEffect } from 'react';
import { Table, Pagination } from 'react-bootstrap';
import axios from 'axios';

function App() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'http://localhost:8000/pagination/?page=2&limit=3&order=desc&sortAttr=title',
      );
      setData(result.data);
    };
    fetchData();
  }, []);
  const handlePageChange = (page) => setCurrentPage(page);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);


  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Post ID</th>
            <th>Title</th>
            <th>Body</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item) => (
            <tr key={item.id}>
              <td>{item.userId}</td>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{item.body}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination
        className="justify-content-center"
        itemsPerPage={itemsPerPage}
        totalItems={data.length}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </>
  );
}

export default App;
