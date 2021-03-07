import axios from 'axios';
 
import React,{Component} from 'react';
 
class UploadImagePage extends Component {
  
    state = {
      // Initially, no file is selected
      selectedFile: null
    };
    
    // On file select (from the pop up)
    onFileChange = event => {
      // Update the state
      this.setState({ selectedFile: event.target.files[0] });
    };
    
    // On file upload (click the upload button)
    onFileUpload = () => {
      // Create an object of formData
      const formData = new FormData();
      // Update the formData object
      formData.append(
        "images",
        this.state.selectedFile,
        this.state.selectedFile.name
      );
        //console.log(JSON.Stringify(formData));
      // Details of the uploaded file
      console.log(this.state.selectedFile);
      // Request made to the backend api
      // Send formData object
      var userid;
      axios.post("http://localhost:5003/userdetails", { username:this.props.user })
      .then(function (response) {
        userid = response.data.userid;
        console.log(userid)
      axios.post(`http://localhost:5004/gdrive/upload/userid`, formData)
      .then(response =>{
      console.log(response.data.success[0].id)
      })
      .catch(function(error){
      console.log(error.message)
    });
  })
  .catch(function(error){
    console.log(error.message)
  });
    };
    
    // File content to be displayed after
    // file upload is complete
    fileData = () => {
      if (this.state.selectedFile) {
        return (
          <div>
            <h2>File Details:</h2>
<p>File Name: {this.state.selectedFile.name}</p>
<p>File Type: {this.state.selectedFile.type}</p>             
<p>Last Modified:{" "} {this.state.selectedFile.lastModifiedDate.toDateString()}</p>
          </div>
        );
      } else {
        return (
          <div><br /><h4>Choose before Pressing the Upload button</h4></div>
        );
      }
    };
    
    render() {
      return (
        <div>
            <h3>Upload your Image here !!</h3>
            <div>
                <input type="file" onChange={this.onFileChange} />
                <button onClick={this.onFileUpload}>Upload!</button>
            </div>{this.fileData()} </div>
      );}}
 
  export default UploadImagePage;