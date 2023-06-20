import React from 'react';
import {useFormik} from "formik";
import "./NavigationForm.css"
import * as Yup from 'yup'


export default function Register(){
    const regex=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    const formik=useFormik({
        initialValues:{
            email:'',
            password:'',
            repeatPassword:'',
            userType:''

        },
        validationSchema:Yup.object({
            email:Yup.string().email("Podaj prawidłowy email").min(3, 'Email musi mieć najmniej 3 znaki').
            required('Pole email jest wymagane'),
            password:Yup.string().required('Musisz podać hasło').
            min(8, "Hasło musi mieć conajmniej 8 znaków").
            matches(regex,{message:'Stwórz silniejsze hasło'}),
            repeatPassword:Yup.string().
                oneOf([Yup.ref("password"),null],"Passwords must match"). required("Musisz potwierdzić hasło")
        }),
        onSubmit:(values)=>{
            const data = {
                email: values.email,
                password: values.password,
                role:values.userType
            }
            console.log(data)
            fetch('http://localhost:8081/user',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                },
                body:JSON.stringify(data),
            })
                .then((response) =>{
                    if (response.ok){
                        console.log(JSON.stringify(data))
                    }else {
                        console.log("something went wrong")
                    }
                }).catch((err) =>{
                        console.error(err.message, err)
                    })
        }
    })

    return(
        <form className={"register-form"}  onSubmit={formik.handleSubmit}>
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
                {formik.touched.email && formik.errors.email ? <p className={'errorMsg'}>{formik.errors.email}</p>:null}
            </div>
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
                {formik.touched.password && formik.errors.password ? <p className={'errorMsg'}>{formik.errors.password}</p>:null}
            </div>
            <div className={'form-element'}>
                <input
                    id={'repeatPassword'}
                    name={'repeatPassword'}
                    type={'password'}
                    placeholder={'Repeat Password'}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.repeatPassword}
                />
                {formik.touched.repeatPassword && formik.errors.repeatPassword ? <p className={'errorMsg'}>{formik.errors.repeatPassword}</p>:null}
            </div>
            <div>
                <select
                    className={'form-element'}
                    name="userType"
                    id="userType"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.userType}
                >
                    <option value="1">Użytkownik prywatny</option>
                    <option value="2">Firma</option>
                </select>
                {formik.touched.userType && formik.errors.userType ? (
                    <p className={'errorMsg'}>{formik.errors.userType}</p>
                ) : null}
            </div>
            <button className={'form-button'} type={'submit'}>Legend-ister</button>
        </form>
    )
}

