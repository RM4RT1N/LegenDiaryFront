import React from 'react';
import './Edit2.css';
import { useFormik } from "formik";
import * as Yup from 'yup';

const Edit2 = ({ userID, latitude, longitude, userData, visible, legendId, images, editToggleSidebar }) => {
  const legend = userData.places.find(legend => legend.id === legendId);
  const imagesLegend = images.filter(image => image.place_id === legendId);
  const formik = useFormik({
    initialValues: {
      description: legend ? legend.description : '',
      name: legend ? legend.name : '',
      urlImages: imagesLegend ? [...imagesLegend] : ['']
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
      fetch("http://localhost:8081/api/edit-legend", {
        method: "PATCH",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`,
          "Content-type": "application/json"
        },
        body: JSON.stringify(data)
      }).then((response) => {
        if (response.ok) {
          window.location.reload();
        } else {
          console.log("Coś nie tak");
        }
      }).catch((error) => {
        console.log(error.message, error);
      });
    }
  });

  React.useEffect(() => {
    formik.setValues({
      ...formik.values,
      description: legend ? legend.description : '',
      name: legend ? legend.name : '',
      urlImages: imagesLegend ? [...imagesLegend] : ['']
    });
  }, [legend]);

  const handleRemoveImage = (index) => {
    const updatedImages = [...formik.values.urlImages];
    updatedImages.splice(index, 1);
    formik.setValues({
      ...formik.values,
      urlImages: updatedImages
    });
  };

  return (
    <div className={visible ? 'sidebar visible' : 'sidebar'}>
        <div className="navAdd">
        <img src={require("./nav1.png")} alt="Logo" width="50" height="50" />
        <button className='editSidebarCloseBtn' onClick={editToggleSidebar}>X</button>
        </div>
      <div align="center" className="wrapper">
      
        <h1>Popraw legendę</h1>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Tytuł"
              className="formAddTitle"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name ? <p className="errorMsg">{formik.errors.name}</p> : null}
          </div>
          <div>
            <textarea
              id="description"
              name="description"
              placeholder="Opis legendy"
              className="description"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
            />
            {formik.touched.description && formik.errors.description ? <p className="errorMsg">{formik.errors.description}</p> : null}
          </div>

          {formik.values.urlImages.map((image, index) => (
            <div key={index}>
              <img width="150" height="150" src={image.imageUrl} alt="Image" />
              <button onClick={() => handleRemoveImage(index)}>X</button>
            </div>
          ))}
          <label>Koordynaty:</label>
          <div>
            <input
              id="latitude"
              name="latitude"
              className="cord"
              readOnly={true}
              value={latitude}
            />
            <input
              id="longitude"
              name="longitude"
              className="cord"
              readOnly={true}
              value={longitude}
            />
          </div>
          <button className="subButton" type="submit"> Zapisz </button>
        </form>
      </div>
    </div>
  );
};

export default Edit2;