import React, { useState, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import { useNavigate } from 'react-router-dom';
import './AddLegend2.css';

mapboxgl.accessToken = process.env.REACT_APP_MAP_API_KEY;
const AddLegend2 = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [longitude, setLongitude] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

<<<<<<< Updated upstream
  const handleMapMove = (map, marker) => {
    const lng = map.getCenter().lng.toFixed(4);
    const lat = map.getCenter().lat.toFixed(4);
    setLongitude(lng);
    setLatitude(lat);
    marker.setLngLat([lng, lat]);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: title,
      description: description,
      longitude: longitude,
      latitude: latitude,
      category_id: 1,
    };
=======
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
>>>>>>> Stashed changes

    fetch('http://localhost:8081/api/add-legend', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          if (onSubmit) {
            onSubmit();
          }
          navigate('/');
          window.location.reload(); // Odświeżenie strony po kliknięciu "Submit"
        } else {
          console.log('not ok');
        }
      })
      .catch((error) => {
        console.error('Błąd podczas wysyłania danych do API:', error);
      });
  };

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/navigation-night-v1',
      center: [18, 52.2],
      zoom: 5,
    });

<<<<<<< Updated upstream
    const marker = new mapboxgl.Marker({
      color: 'red',
      draggable: true,
    })
      .setLngLat([18, 52])
      .addTo(map);

    map.on('move', function (event) {
      handleMapMove(map, marker);
    });

    return () => map.remove();
  }, []);

  return (
    <div align= "center" className="wrapper">
      <h1>Dodaj legendę</h1>
        <form onSubmit={handleSubmit}>
        <div >
          <label  className="label" htmlFor="title">Tytuł:</label>
          
          <input className="formAddTitle" type="text" id="title" value={title} onChange={handleTitleChange} /><br />
          
          <label className="label" htmlFor="description">Opis legendy:</label>
          
          <textarea className="description" type="text" id="description" value={description} onChange={handleDescriptionChange} />
          
=======

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
                <br/>
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
>>>>>>> Stashed changes
        </div>

        <div className="addMapLegend" id="map" style={{ width: '400px', height: '400px' }}></div>
        <p>Współrzędne: {longitude}, {latitude}</p>
        <button className="subButton" type="submit">Dodaj</button>
      </form>
    </div>
  );
};

export default AddLegend2;