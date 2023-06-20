import React from 'react';
import './NavigationForm.css';
import {useFormik} from 'formik';
import * as Yup from 'yup';
export default function Login(){
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
            console.log(values)// will provide HTTP request here
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