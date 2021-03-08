import axios from 'axios';
 
import React,{Component} from 'react';
 
class UploadImagePage extends Component {
  
    state = { selectedFile: null };
    
    // On file select (from the pop up)
    onFileChange = event => { this.setState({ selectedFile: event.target.files }) }
    
    // On file upload (click the upload button)
    onFileUpload = () => {
      // Create an object of formData
      const formData = new FormData();
      // Update the formData object
      for(var x = 0; x<this.state.selectedFile.length; x++)
      {
        formData.append('images', this.state.selectedFile[x])
        console.log(this.state.selectedFile); // Details of the uploaded file
      }
      // Request made to the backend api- Send formData object
      var userid;
      axios.post("http://localhost:5003/userdetails", { username:this.props.user })
      .then(function (response) {
        userid = response.data.userid;
        console.log("user id is" + userid)
      axios.post(`http://localhost:5004/gdrive/upload/userid`, formData)
      .then(response =>{
          for(var x = 0; x<response.data.success.length; x++)
            console.log(response.data.success[x].id)
      })
      .catch(function(error){
        console.log(error.message)
      });
      })
      .catch(function(error){
        console.log(error.message)
      });
      };
    
    // File content to be displayed after file upload is complete
    fileData = () => {
      if (this.state.selectedFile) 
      {
        const getFileContent =  selectedfiles => {
    let content = [];
    for(var x = 0; x<this.state.selectedFile.length; x++)
    {
      const item = selectedfiles[x];
      content.push(<p>Selected File {x}: File Name: {item.name} File Type: {item.type}</p>);
    }
    return content;
    };
    return <ul>{getFileContent(this.state.selectedFile)}</ul>;
}
else {
        return (
          <div><br /> <p style = {{color:'yellow'}} >Choose images before Pressing the Upload button</p></div>
        );
      }
    };

    
    render() {
      return (
        <div>
            <h3>Upload your Image here !!</h3>
            <input type="file" multiple onChange={this.onFileChange} />
                <button style = {{color:'black'}} onClick={this.onFileUpload}>Upload!</button>
            {this.fileData()} 
        </div>
      );}}
 
  export default UploadImagePage;