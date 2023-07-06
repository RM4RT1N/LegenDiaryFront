import React from 'react';
import './AddLegend2.css';
import { useFormik } from "formik";
import * as Yup from 'yup';


const AddLegend2 = ({ userID, latitude, longitude }) => {

    const formik = useFormik({
        initialValues: {
            description: '',
            name: '',
            urlImages: [''] // Tablica URL obrazków
          },
          validationSchema: Yup.object({
            name: Yup.string().min(3, "Tytuł musi mieć minimum 3 znaki").required("Pole Tytuł jest wymagane"),
            description: Yup.string().min(50, "Opis musi mieć conajmniej 50 znaków").required("Pole opis jest wymagane"),
            urlImages: Yup.array().of(
              Yup.string().url("Nieprawidłowy format URL obrazka")
            )
          }),
          onSubmit: (values) => {
            const data = {
              userId: userID,
              category_id: 1,
              latitude: latitude,
              longitude: longitude,
              description: values.description,
              name: values.name,
              imageUrls: values.urlImages
            }
            fetch("http://localhost:8081/api/add-legend",{
                method:"POST",
                headers:{
                    "Authorization":`Bearer ${localStorage.getItem("jwtToken")}`,
                    "Content-type":"application/json"
                },
                body:JSON.stringify(data)
            }).then((response)=>{
                if (response.ok){
                    window.location.reload()
                    
                }else {
                    console.log("Coś nie tak")
                }
            }).catch((error)=>{
                console.log(error.message, error)
            })

        }
    });


    return (
        <div align="center" className="wrapper">
            <h1>Dodaj legendę</h1>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <input
                        id={'name'}
                        name={'name'}
                        type={'text'}
                        placeholder={"Tytuł"}
                        className={"formAddTitle"}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name}
                    />
                    {formik.touched.name && formik.errors.name ? <p className={'errorMsg'}>{formik.errors.name}</p> : null}
                </div>
                <div>
                    <textarea
                        id={'description'}
                        name={'description'}
                        placeholder={"Opis legendy"}
                        className={"description"}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.description}
                    />
                    {formik.touched.description && formik.errors.description ? <p className={'errorMsg'}>{formik.errors.description}</p> : null}
                </div>
                <div>
  {formik.values.urlImages.map((url, index) => (
    <div key={index}>
      <input
        id={`urlImage-${index}`}
        name={`urlImages[${index}]`}
        type="text"
        placeholder="Link do zdjęcia"
        className="urlImage"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={url}
      />
      {formik.touched.urlImages && formik.errors.urlImages && formik.errors.urlImages[index] ? (
        <p className="errorMsg">{formik.errors.urlImages[index]}</p>
      ) : null}
    </div>
  ))}
</div>
<button
  type="button"
  onClick={() => formik.setFieldValue('urlImages', [...formik.values.urlImages, ''])}
>
  Dodaj obrazek
</button>
<button
  type="button"
  onClick={() =>
    formik.setFieldValue('urlImages', formik.values.urlImages.slice(0, -1))
  }
  disabled={formik.values.urlImages.length === 1}
>
  Usuń obrazek
</button>
                <label>Koordynaty:</label>
                <div>
                    <input
                        id={"latitude"}
                        name={"latitude"}
                        className={'cord'}
                        readOnly={true}
                        value={latitude}
                    />
                    <input
                        id={"longitude"}
                        name={"longitude"}
                        className={'cord'}
                        readOnly={true}
                        value={longitude}
                    />
                </div>
                <button className={"subButton"} type={"submit"}> Zapisz </button>
            </form>
        </div>
    );
};

export default AddLegend2;