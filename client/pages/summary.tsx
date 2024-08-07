import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

interface Property {
  name: string;
  price: string;
  location: string;
  description: string;
  _id:string;
}

const summary = () => {
  const [userData, setUserData] = useState<Property[]>([]);
  console.log(userData,'userdata')
const router = useRouter()
  const fetchData = async () => {
    try {

      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}`);
      console.log(response,'asdfjasdf')
      setUserData(response.data);
    } catch (error) {
      console.log('Error infetching data:', error);
    }
  };
    const handleAddNew = () => {
        router.push("/addnewproperty")
    }
  useEffect(() => {
    fetchData();
  }, []);
  const aggregatedData = async() => {
    try {
      
    } catch (error) {
      console.log(error)
    }
  }

  const handleView = (id: string) => {
    router.push({
      pathname:'/view',
      query:{
        userid:id
      }
    })
  };

  const handleEdit = (id: string) => {
    // router.push(`/edit/${id}`);
    router.push({
      pathname:`/edit`,
      query:{
        userid:id
      }
    })
  };

  const handleStats = () => {
    router.push("/summary")
  }

  const handleDelete = async(id:string) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/${id}`);
      fetchData(); 
    } catch (error) {
      console.log('Error in deleting property:', error);
    }
  }
  return (
    <div className="table-container">
    <h1>PropertyTable</h1>
    <button className= "button" onClick={handleAddNew}>Add New Property</button>    
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Price</th>
        <th>Location</th>
        <th>Description</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {userData.map((property, index) => (
        <tr key={index}>
          <td data-label="Name">{property.name}</td>
          <td data-label="Price">{property.price}</td>
          <td data-label="Location">{property.location}</td>
          <td data-label="Description">{property.description}</td>
          <td data-label="Actions">
          <button className = "button" onClick={() => handleView(property._id)}>View</button>
            <button className = "button" onClick={() => handleEdit(property._id)}>Edit</button>
            <button className = "button"  onClick={() => handleDelete(property._id)}>Delete</button>
            <button className = "button"  onClick={handleStats}>View Summary</button>
            </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
  )
}

export default summary