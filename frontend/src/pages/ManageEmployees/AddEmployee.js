import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {Formik } from 'formik';
// import { signupSchema } from './SignupSchema';
import axios from 'axios';
import { UserContext } from '../../components/Context/userContext';
import './AddEmployee.css'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card';


const initialValues={
  username: "",
  email: "",
  password: "",
  phone: "",
  companyName: "",
  position: "",
  addedBy: "",
  file: null,
};


function AddEmployee() {  




    const navgiate = useNavigate();
    const {currentUser, setCurrentUser} = useContext(UserContext);
    const [imgUrl, setImgUrl] = useState('');
    const [added, setAdded] = useState();

    const handleImageSubmit = async (event) => {
      const preset_key = process.env.REACT_APP_PRESETKEY;
      const cloud_name = process.env.REACT_APP_CLOUDNAME;
      
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', preset_key);
      formData.append('cloud_name', cloud_name);
      const instance = axios.create();
      try {
        await instance.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, formData) 
        .then(response =>{
          const url = response.data.secure_url;
          setImgUrl(url);
        })
        .catch(err => console.log(err));
      } catch (error) {
        console.error(error);
      }
    }

    useEffect(() => {
        setAdded(currentUser.username)    
    }, [currentUser, setCurrentUser]);

    return (
      <div style={{display:'flex'}}>
      <Card style={{width:'fit-content', padding: '20px', marginLeft: '20px'}}>
    <Formik
    initialValues= {initialValues}
    // validationSchema= {signupSchema}
    
    onSubmit = { (values) =>{
      axios.post('http://localhost:4000/addemployee', {
        username: values.username,
        companyName: values.companyName,
        email: values.email,
        username: values.username,
        password: values.password,
        position: values.position,
        phone: values.phone,
        addedBy: added,
        imageUrl: imgUrl,
    })
    navgiate('/dashboard');
    }}>

    
{({values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue}) => (
     <form className='addEmpForm' onSubmit={handleSubmit}>
      <div>
     <div className='name-block'>
          <label htmlFor="username">Name</label>
          <br />
          <input type='text'
              autoComplete='off'
              name='username'
              id='username'
              placeholder='Name' 
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
              />
              {errors.name && touched.name ? (<p className='form-error'>{errors.name}</p>):null}
      </div>
      <div className='email-block'>
          <label htmlFor='email'>Email</label>
          <br />
          <input type='email'
              autoComplete='off'
              name='email'
              id='email'
              placeholder='Email'
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
               />
              {errors.email && touched.email ? (<p className='form-error'>{errors.email}</p>):null}
      </div>
      <div className='password-block'>
          <label htmlFor='password'>Password</label>
          <br />
          <input type='password'
              autoComplete='off'
              name='password'
              id='password'
              placeholder='Password' 
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              />
            {errors.password && touched.password ? (<p className='form-error'>{errors.password}</p>):null}

      </div>


      <div className='confirm-block'>
          <label htmlFor='companyName'>Company Name</label>
          <br />
          <input type='text'
              autoComplete='off'
              name='companyName'
              id='companyName'
              placeholder='Company Name'
              value={values.companyName}
              onChange={handleChange}
              onBlur={handleBlur}
               />
            {errors.confirm_password && touched.confirm_password ?
            (<p className='form-error'>{errors.confirm_password}</p>):null}
        </div>

        </div>


<div>
        <div className='confirm-block'>
          <label htmlFor='position'>Position</label>
          <br />
          <input type='text'
              autoComplete='off'
              name='position'
              id='position'
              placeholder='Position'
              value={values.position}
              onChange={handleChange}
              onBlur={handleBlur}
               />
            {errors.confirm_password && touched.confirm_password ?
            (<p className='form-error'>{errors.confirm_password}</p>):null}
        </div>

        <div className='phone-block'>
          <label htmlFor='phone'>Phone Number</label>
          <br />
          <input type='text'
              autoComplete='off'
              name='phone'
              id='phone'
              placeholder='03---------------'
              value={values.phone}
              onChange={handleChange}
              onBlur={handleBlur}
               />
            {errors.confirm_password && touched.confirm_password ?
            (<p className='form-error'>{errors.confirm_password}</p>):null}
        </div>


        <div className='image-block'>
          <label htmlFor='file'>Upload Image</label>
          <br />
          <input className='choose-file' type='file'
              name='file'
              onChange={handleImageSubmit}
              onBlur={handleBlur}
               />
        </div>

        <div>
            <br />
          <Button variant='outline-primary' type='submit'>Add Employee</Button>
      </div>


      </div>
     </form>
    )}
    </Formik>
    </Card>
    <img src='https://www.nicepng.com/png/detail/355-3559564_file-add-employee-image-icon.png'
    width='600'
    height='600'
    />
    </div>
  );
};

export default AddEmployee;