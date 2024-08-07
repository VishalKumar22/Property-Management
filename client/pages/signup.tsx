import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import styles from "../src/app/styles/signup.module.scss"
import { useRouter } from 'next/router';

const CreateUser = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter()

  const submitUserDetails = async (data: any) => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/signup`, data);
      const newUserId = response.data.Data._id;
    //   localStorage.setItem('userId', newUserId);
    if(data)
      router.push("/login")
      setUserId(newUserId); 
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <h1>SignUp</h1>
      <form onSubmit={handleSubmit(submitUserDetails)}>
        <label className={styles.label}>UserName</label>
        <input className={styles.input} {...register('username', { required: true })} type="text" />
        {errors.username?.type === 'required' && (<p role="alert">UserName is required</p>)}

        <label className={styles.label}>Email</label>
        <input className={styles.input} {...register('email', { required: true })} type="email" />
        {errors.email?.type === 'required' && (<p role="alert">Email is required</p>)}

        <label className={styles.label}>Password</label>
        <input className={styles.input} {...register('password', { required: true })} type="password" />
        {errors.password?.type === 'required' && (<p role="alert">Password is required</p>)}

        <label className={styles.label}>PhoneNumber</label>
        <input className={styles.input} {...register('phoneNumber', { required: true })} type="text" />
        {errors.phoneNumber?.type === 'required' && (<p role="alert">PhoneNumber is required</p>)}

        <button className={styles.btn} type="submit">
          SignUp
        </button>
      </form>

    </div>
  );
};

export default CreateUser;
