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
  
const view = () => {
    const [userData, setUserData] = useState<Property[]>([]);
        console.log(userData,'userdata')
  const router = useRouter()
  const {query} = router
  const userId = query.userid
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/${userId}`);
        console.log(response,'viewdatatat')
        setUserData(response.data);
      } catch (error) {
        console.log('Error infetching data:', error);
      }
    };

    const handleView = (id: string) => {
        router.push({
          pathname:'/view',
          query:{
            userid:id
          }
        })
      };
    
      const handleEdit = (id: string) => {
        router.push({
          pathname:`/edit`,
          query:{
            userid:id
          }
        })
      };
    
  const handleDelete = async(id:string) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/${id}`);
      fetchData(); 
    } catch (error) {
      console.log('Error in deleting property:', error);
    }
  }
    useEffect(() => {
      fetchData();
    }, []);
  return (
    <div className="table-container">
    <h1>Your Property</h1> 
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
     
        <tr>
          <td data-label="Name">{userData.name}</td>
          <td data-label="Price">{userData.price}</td>
          <td data-label="Location">{userData.location}</td>
          <td data-label="Description">{userData.description}</td>
          <td data-label="Actions">
          <button className='button' onClick={() => handleView(userData._id)}>View</button>
            <button  className='button' onClick={() => handleEdit(userData._id)}>Edit</button>
            <button className='button' onClick={() => handleDelete(userData._id)}>Delete</button>
            </td>
        </tr>
      
    </tbody>
  </table>
</div>
  )
}

export default view