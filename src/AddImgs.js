import React, { useState } from 'react';
import { useFormik } from "formik";
import * as Yup from 'yup';
import './AddImgs.css'

const AddImgs = ({legendId, title, toggle}) => {
  const [showAddImgs, setShowAddImgs] = useState(true);

  const handleButtonClick = () => {
    setShowAddImgs(false);
  };

  const formik = useFormik({
    initialValues: {
        urlImages: [''] // Tablica URL obrazków
      },
      validationSchema: Yup.object({
        urlImages: Yup.array().of(
          Yup.string().url("Nieprawidłowy format URL obrazka")
        )
      }),
      onSubmit: (values) => {
        const data = {
          imageUrls: values.urlImages
        }
        fetch(`http://localhost:8081/api/edit-legend/${legendId}/add-images`,{
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
  <div className="add-imgs" style={{ display: showAddImgs ? 'block' : 'none' }}>
    <div className="add-imgs-content">
      <h3>Add Images to:<br/>{title}</h3><br/>
      <form onSubmit={formik.handleSubmit}>
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
        <br/>
        <br/>
        <button className={"subButton"} type={"submit"}> Zapisz </button>
      </form>
    </div>
    <button className='add-imgs-close-btn' onClick={toggle}/>
  </div>
);
};

export default AddImgs;
