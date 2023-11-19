import React from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import './LoginActive.css'
export default function LoginActive(props){
    const formik = useFormik({
        initialValues:{
            email:'',
            password:''
        },
        validationSchema:Yup.object({
            email:Yup.string().email("Podaj prawidłowy email").min(3, 'Email musi mieć najmniej 3 znaki').required('Pole email jest wymagane'),
            password:Yup.string().required('Musisz podać hasło')
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
                    localStorage.setItem("jwtToken", accessToken)
                    window.location.reload()
                }))).catch((err =>{
                    console.log(err.message, err)
            }))

        }


    })
    return(
        <form className={`${props.active ? "login-form-active":"login-form-hidden"}`}  onSubmit={formik.handleSubmit}>
            <div className={'login-form-element'}>
                <input
                id={'email'}
                name={'email'}
                type={'email'}
                placeholder={'Email'}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email ? <p className={'errorMsg'}>{formik.errors.email}</p>:null}
            </div>
            <div className={'login-form-element'}>
                <input
                id={'password'}
                name={'password'}
                type={'password'}
                placeholder={'Password'}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password ? <p className={'errorMsg'}>{formik.errors.password}</p>:null}
            </div>

            <button className={'login-form-button'} type={'submit'}>Legend-in</button>
        </form>
    )
}