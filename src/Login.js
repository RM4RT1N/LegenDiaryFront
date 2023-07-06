import React from 'react';
import './NavigationForm.css';
import {useFormik} from 'formik';
import * as Yup from 'yup';

export default function Login(){
    const regex=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    const formik = useFormik({
        initialValues:{
            email:'',
            password:''
        },
        validationSchema:Yup.object({
            email:Yup.string().email("Podaj prawidłowy email").min(3, 'Email musi mieć najmniej 3 znaki').required('Pole email jest wymagane'),
            password:Yup.string().required('Musisz podać hasło').
            min(8, "Hasło musi mieć conajmniej 8 znaków").
            matches(regex,{message:'Stwórz silniejsze hasło'}),
        }),
        onSubmit:(values)=>{
            const data = {
                username: values.email,
                password: values.password
            }
            fetch("http://localhost:8081/api/auth/login",{
                method:"POST",
                headers:{
                    "Content-type":"application/json"
                },
                body:JSON.stringify(data)
            }).then((response => response.json()
                .then(data => {
                    const accessToken = data.accessToken
                    if (data.accessToken===undefined){
                        formik.setFieldError("email", "Nieprawidłowe dane!")
                        formik.setFieldError("password", "Nieprawidłowe dane!")
                    }else {
                        localStorage.setItem("jwtToken", accessToken)
                        window.location.reload()
                    }
                }))).catch((err =>{
                    console.log(err.message, err)
            }))

        }


    })
    return(
        <form className={"login-form"}  onSubmit={formik.handleSubmit}>
            <div className={'form-element'}>
                <input
                id={'email'}
                name={'email'}
                type={'email'}
                placeholder={'Email'}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
            />
                {formik.touched.email && formik.errors.email ? <p className={'errorMsg'}>{formik.errors.email}</p>:null}</div>
            <div className={'form-element'}>
                <input
                id={'password'}
                name={'password'}
                type={'password'}
                placeholder={'Password'}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
            />
                {formik.touched.password && formik.errors.password ? <p className={'errorMsg'}>{formik.errors.password}</p>:null}</div>

            <button className={'form-button'} type={'submit'}>Legend-in</button>
        </form>
    )
}