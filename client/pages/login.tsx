import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import styles from "../src/app/styles/signup.module.scss"
import { useRouter } from 'next/router';

const login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [userData, setuserData] = useState<string | null>(null);
    const router = useRouter()
    const submitUserDetails = async(data: any) => {
        try {
            const response:any = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/login`,data)
            console.log(response,'response from login')
            if(response){
                setuserData(response)
                router.push("/viewall")
            }
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div className={styles.container}>
    <h1>Login</h1>
    <form onSubmit={handleSubmit(submitUserDetails)}>
     

      <label className={styles.label}>Email</label>
      <input className={styles.input} {...register('email', { required: true })} type="email" />
      {errors.email?.type === 'required' && (<p role="alert">Email is required</p>)}

      <label className={styles.label}>Password</label>
      <input className={styles.input} {...register('password', { required: true })} type="password" />
      {errors.password?.type === 'required' && (<p role="alert">Password is required</p>)}

      <button className={styles.btn} type="submit">
        Login
      </button>
    </form>

  </div>
  )
}

export default login