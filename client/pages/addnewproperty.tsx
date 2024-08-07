import React, { useState } from 'react';
import axios from 'axios';
import styles from '../src/app/styles/addnew.module.scss';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

const AddNewProperty = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();

  const submitUserDetails = async (data: any) => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}`, data);
      console.log(response, "getting res");
    } catch (error) {
      console.log(error);
    }
  };

  const handleBackBtn = () => {
    router.push('/viewall');
  };

  return (
    <div className={styles.container}>
      <button onClick={handleBackBtn} className={styles.backButton}>Back to Home</button>
      <h1>Add New Property</h1>
      <form onSubmit={handleSubmit(submitUserDetails)}>
        <label className={styles.label}>Name</label>
        <input className={styles.input} {...register('name', { required: true })} type="text" />
        {errors.name && (<p role="alert" className={styles.error}>Name is required</p>)}

        <label className={styles.label}>Price</label>
        <input className={styles.input} {...register('price', { required: true })} type="text" />
        {errors.price && (<p role="alert" className={styles.error}>Price is required</p>)}

        <label className={styles.label}>Location</label>
        <input className={styles.input} {...register('location', { required: true })} type="text" />
        {errors.location && (<p role="alert" className={styles.error}>Location is required</p>)}

        <label className={styles.label}>Description</label>
        <textarea className={styles.textarea} {...register('description', { required: true })}></textarea>
        {errors.description && (<p role="alert" className={styles.error}>Description is required</p>)}

        <button className={styles.submitButton} type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddNewProperty;
