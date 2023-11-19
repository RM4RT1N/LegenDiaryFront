import React, { Component } from 'react';

class ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
    };
  }

  handleFileChange = (event) => {
    this.setState({
      selectedFile: event.target.files[0],
    });
  };

  // handleUpload = () => {
  //   const { selectedFile } = this.state;

  //   const formData = new FormData();
  //   formData.append('file', selectedFile);

  //   fetch('http://localhost:8080/images/upload', {
  //     method: 'POST',
  //     body: formData,
  //   })
  //     .then(response => response.json())
  //     .then(data => {
  //       console.log(data);
  //       // Handle success, e.g., show a success message to the user
  //     })
  //     .catch(error => {
  //       console.error('Error uploading image:', error);
  //       // Handle error, e.g., show an error message to the user
  //     });
  // };

  render() {
    return (
      <div>
        <input type="file" onChange={this.handleFileChange} />
        {/* <button onClick={this.handleUpload}>Upload Image</button> */}
      </div>
    );
  }
}

export default ImageUpload;
