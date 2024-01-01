import React, { useEffect, useState } from 'react';
import { MdClose } from 'react-icons/md';
import axios from 'axios';
import './App.css';

axios.defaults.baseURL = 'http://localhost:8080/';

function App() {
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
  });
  const [dataList, setDataList] = useState([]);

  const handleInputChange = (e) => {
    const { value, name } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/create', formData);
      console.log(response);
      if (response.data.success) {
        setIsAdding(false);
        // Alert when form submission is successful
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Error in handleFormSubmit:', error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get('/');
      console.log(response);
      if (response.data.success) {
        setDataList(response.data.data);
      }
    } catch (error) {
      console.error('Error in fetchData:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="container">
        <button className="btn btn-add" onClick={() => setIsAdding(true)}>
          ADD
        </button>

        {isAdding && (
          <div className="addContainer">
            <form onSubmit={handleFormSubmit}>
              <div className="close-btn" onClick={() => setIsAdding(false)}>
                <MdClose />
              </div>
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" onChange={handleInputChange} name="name" />

              <label htmlFor="email">Email:</label>
              <input type="email" id="email" onChange={handleInputChange} name="email" />

              <label htmlFor="mobile">Mobile:</label>
              <input type="number" onChange={handleInputChange} id="mobile" name="mobile" />

              <button className="btn" type="submit">
                Submit
              </button>
            </form>
          </div>
        )}

        <div className="tableContainer">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email id</th>
                <th>Mobile</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {dataList.map((el) => (
                <tr key={el.id}>
                  <td>{el.name}</td>
                  <td>{el.email}</td>
                  <td>{el.mobile}</td>
                  <td>
                    <button className="btn-edit">Edit</button>
                    <button className="btn-delete">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default App;



