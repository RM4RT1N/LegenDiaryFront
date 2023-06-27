import React from 'react';
import './AddLegend2.css';
import {useFormik} from 'formik';
import * as Yup from 'yup';


export default function AddLegend2() {
  const formik = useFormik({
    initialValues: {}
  })





  return (
      <div className="wrapper">


          <div>
            <label className="label" htmlFor="title">Tytuł:</label>
            <label className="label" htmlFor="description">Opis legendy:</label>
            <div className="addMapLegend" id="cords" style={{width: '400px', height: '400px'}}></div>
          </div>
      </div>
  );
};


