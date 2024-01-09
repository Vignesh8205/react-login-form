import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { useFormik } from 'formik'
import Popup from './popup'
import axios from 'axios'
const validate=values=>{
  const error={};
  // console.log(values.firstname);
    if (!values.firstname) {
      error.firstname="*required"
    }else if (values.firstname.length>8) {
      error.firstname="*must be 8 character or less"
    }
    if (!values.laststname) {
      error.laststname="*required"
    }else if (values.laststname.length>8) {
      error.lastname="*must be 8 character or less"
    }
    if (!values.email) {
      error.email="*required"
    }else if (/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(values.email)) {
      // error.email="*invalid email address";
    }else{
      error.email="*invalid email address";
    }


    if (!values.password) {
      error.password="*required";
    }
    else  if (values.password.length>8) {
      error.password="*Maximum 8 character";
    }else if (values.password.length<4) {
      error.password="*minimum 5 character";
    }

    if (!values.confirmpassword) {
      error.confirmpassword="*reguired";
    } else if(values.password!==values.confirmpassword) {
      error.confirmpassword="*password must Match";
    }

    return error
}
function App() {
const  [bool,setbool]=useState(0);

 const formik=useFormik({
  initialValues : {
    firstname : '',
    laststname : '',
    email : '',
    password : '',
    confirmpassword : '',
  },
  validate,
  onSubmit:value=>{
    // alert(`hello ! ${value.firstname} are succesfully  signup`)
    if (bool) {
      setbool(0)
    }else{
      setbool(1)
      console.log(value);
      axios.post('http://localhost:3000/post',{_id:value.firstname,name:value.laststname,age:value.password,password:value.confirmpassword,email:value.email}).then(
        res=>console.log(res.data)
      )
    }
  }
 } 
 )
 
//  console.log(formik.errors);
//  console.log(formik.values);

  return (
    <>
     <div className='main'>
      <div className='signup-form'>
        <h2>Sign Up Here </h2>
        <form  onSubmit={formik.handleSubmit}>
          <input type="text" placeholder='User Id' />
          <input type="text" placeholder='First Name...' name='firstname'  autoComplete='off' onChange={formik.handleChange} value={formik.values.firstname} onBlur={formik.handleBlur}/>
              
              {
              formik.touched.firstname && formik.errors.firstname?<span>{formik.errors.firstname}</span>:null
              }

          <input type="text" placeholder='Last Name...' name='laststname'  autoComplete='off' onChange={formik.handleChange} value={formik.values.laststname} onBlur={formik.handleBlur} />
          
          {
          formik.touched.laststname&& formik.errors.laststname?<span>{formik.errors.laststname}</span>:null
          }

          <input type="text" placeholder='Email...' name='email'   autoComplete='off' onChange={formik.handleChange} value={formik.values.email} onBlur={formik.handleBlur}/>

          {
          formik.touched.email && formik.errors.email?<span>{formik.errors.email}</span>:null
          }

          <input type="password" placeholder='Password...' name='password'  autoComplete='off' onChange={formik.handleChange} value={formik.values.password} onBlur={formik.handleBlur}/>

          {
          formik.touched.password && formik.errors.password?<span>{formik.errors.password}</span>:null
          }

          <input type="password" placeholder='Confirm Password...' name='confirmpassword'  autoComplete='off' onChange={formik.handleChange} value={formik.values.confirmpassword} onBlur={formik.handleBlur} />

          {
          formik.touched.confirmpassword && formik.errors.confirmpassword?<span>{formik.errors.confirmpassword}</span>:null
          }

          <input type="submit" value="submit"   />
        </form>
      </div>
     </div>
     <div className='message'>
      {bool ? (<Popup onclick={formik.handleSubmit}/>):null}
     </div>
    </>
  )
}
export default App
