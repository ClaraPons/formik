import React from 'react'
import { useFormik } from 'formik'
import Input from './component/Input'
import * as Yup from 'yup'
import moment from 'moment'
import { useState } from 'react'

const App = () => {

  const [isSubmit, setisSubmit] = useState(false)

  const formik = useFormik({
    initialValues: {
      email: "",
      firstname: "",
      lastname: "",
      username: "",
      password: "",
      passwordConfirmation: "",
      birthdate: "", 
      profilGit: "",
    },
    onSubmit: values => {
      setTimeout(() => {
        formik.resetForm()
        setisSubmit(true)
        // console.log(isSubmit);
      }, 2000);
      formik.isSubmitting(false)
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .required("Email est requis"),
      firstname: Yup.string()
        .required("First name est requis"),
      lastname: Yup.string()
        .required('Last name est requis'),
      username: Yup.string()
        .required('Username est requis')
        .min(4, "Username est trop court"),
      password: Yup.string()
        .required("Password est requis")
        .min(8, "Password est trop court")
        .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/, "Password doit avoir au moins un charactère spécial"),
      passwordConfirmation: Yup.string()
        .required("Password Confirmation est requis")
        .oneOf([Yup.ref('password')], 'Password confirmation est différent de password'),
      birthdate: Yup.string()
        .required("Birthdate is required")
        .test("Birthdate", "Vous devez avoir plus de 18 ans",
          value => {
            return moment().diff(moment(value),'years') >= 18;
          }
        ),
      profilGit: Yup.string()
          .required("GitHub profil est requis")
    }), 
    validateOnChange: false
  })


  // console.log(isSubmit);

  return (
    <>
    <form onSubmit={formik.handleSubmit}>
      <Input type="email" label="Email" name="email" placeholder="Enter your email" value={formik.values.email} handleChange={formik.handleChange} error={formik.errors.email} disabled={formik.isSubmitting}/>
      <Input type="text" label="First Name" name="firstname" placeholder="Enter your first name" value={formik.values.firstname} handleChange={formik.handleChange} error={formik.errors.firstname} disabled={formik.isSubmitting}/>
      <Input type="text" label="Last Name" name="lastname" placeholder="Enter your last name" value={formik.values.lastname} handleChange={formik.handleChange} error={formik.errors.lastname} disabled={formik.isSubmitting}/>
      <Input type="text" label="User Name" name="username" placeholder="Enter your username" value={formik.values.username} handleChange={formik.handleChange} error={formik.errors.username} disabled={formik.isSubmitting}/>
      <Input type="password" label="Password" name="password" placeholder="Enter your password" value={formik.values.password} handleChange={formik.handleChange} error={formik.errors.password} disabled={formik.isSubmitting}/>
      <Input type="password" label="Confirmation Password" name="passwordConfirmation" placeholder="Repeat your password" value={formik.values.passwordConfirmation} handleChange={formik.handleChange} error={formik.errors.passwordConfirmation} disabled={formik.isSubmitting}/>
      <Input type="date" label="Birthdate" name="birthdate" placeholder="Enter your birthdate" value={formik.values.birthdate} handleChange={formik.handleChange} error={formik.errors.birthdate} disabled={formik.isSubmitting}/>
      <Input type="url" label="GitHub profil" name="profilGit" placeholder="Enter your GitHub profil" value={formik.values.profilGit} handleChange={formik.handleChange} error={formik.errors.profilGit} disabled={formik.isSubmitting}/>
      <button type='submit' disabled={formik.isSubmitting}>Submit</button>
    </form>
      {isSubmit && <p>Submit done !</p>}
    </>
  )
}

export default App