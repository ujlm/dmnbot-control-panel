import React, {useState} from "react";
import { FileUploader } from "react-drag-drop-files";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import htmlEntities from "../helpers/htmlentities";
import './../styles/progressbar.css';

// Usage in parent:
// <FileUpload type="audio" />
// Send data to parent: https://stackoverflow.com/questions/63431820/passing-data-child-to-parent-functional-components-in-reactjs

const FileUpload = ({setFileData}) => {
  const [progress, setProgress] = useState(0);
  const [disabled, setDisabled] = useState(false);

  // Todo: proper file type validation
  let fileTypes = ["dmn", "xml"];

    const upload = (file) => {
      setDisabled(true);
        const storage = getStorage();

        // Create the file metadata
        /** @type {any} */
        let metadata = {
          contentType: 'text/xml'
        };
        
        // Upload file and metadata to the object 'images/mountains.jpg'
        // Todo: upload 1 song or 1 song and 1 image and do proper naming
        const originalFileName = htmlEntities(file.name);
        let extension = originalFileName.split(".").at(-1);
        let fileName = originalFileName.replace(/\s/g, "_");
        fileName = fileName.replace(" ", "_");
        fileName = fileName.split(".")[0] + '_' + Date.now().toString();
        fileName += "." + extension;

        const storageRef = ref(storage, "models/" + fileName);
        const uploadTask = uploadBytesResumable(storageRef, file, metadata);
        
        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on('state_changed',
          (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            setProgress(progress.toFixed(0));
          }, 
          (error) => {
            console.log(error);
          }, 
          () => {
            // Upload completed successfully, now get the download URL
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              const fileData = {
                url: downloadURL,
                name: originalFileName,
                type: file.type
              }
             setFileData(fileData);
            });
          }
        );
    }

    return (
      <>
      <section className='optionGroup'>
      <h4>Upload DMN model</h4>
      <span className="info">&nbsp; &nbsp; (Max size: 2MB)</span>
      <span className="check-done">&#10003;</span>
      <form type="multipart/form-data" className="centermargin">
            <FileUploader disabled={disabled} handleChange={upload} name="file" maxSize="2" />
            <br/>
            <div className="progress progress-striped progress-90">
              <div className="progress-bar progress-bar-green" style={{width: progress + "%"}}>
                <span>{progress}% Complete </span>
              </div>
            </div>
        </form>
      </section>
      </>
    );
}

export default FileUpload;