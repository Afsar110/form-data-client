import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Stack } from '@mui/material';
import 'tachyons';
import LinearProgress from '@mui/material/LinearProgress';
import { FileUploader } from "react-drag-drop-files";
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../firebase';
const fileTypes = ["JPG", "PNG", "JPEG"];
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 20,
  p: 4,
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
};


function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: 'flex', width: '100%', m:7, alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

export default function BannerModal({open, data, handleClose, handleUpdateClicked}) {
  const [banner, setBanner] = React.useState(null);
  const [uploadStatus, setUploadStatus] = React.useState(null);

  React.useEffect(()=> {
    if(data) {
      if(data.banner) {
        setBanner(data.banner);
      }
    }
  }, [data]);

  const handleSend = () => {
    handleUpdateClicked(banner);
  }

  const handleFileChange = (file) => {
    const storageRef = ref(storage, 'banners/'+Date.now()+file.name);
    const metadata = {
      contentType: file.type,
    };
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);

    uploadTask.on('state_changed', 
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        setUploadStatus(progress);
      }, 
          (error) => {
            console.log(error);
            setUploadStatus(null);
            console.log('Uploading failed');
            // Handle unsuccessful uploads
          }, 
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              console.log('File available at', downloadURL);
              setBanner(downloadURL);
            }).finally(()=> {
              setUploadStatus(null);
            });
          }
        )}

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
           Update Banner
          </Typography>
          {banner && (
            uploadStatus != null ? <LinearProgressWithLabel value={uploadStatus} /> :
          <img src={banner} style={{marginBottom: 10}} width="550" height="250" alt="banner"/>
        )}
          <FileUploader name="file" handleChange={handleFileChange} types={fileTypes} />
          
          <Stack  spacing={2} direction="row" className="justify-center mt3">
              <Button className='w-0.5 h-0.5 grow' size="small" variant="contained" color="success" onClick={handleSend} style={{width: "50px"}}>Save</Button>
              <Button className='w-0.5 h-0.5 grow' size="small" variant="contained" color="primary" onClick={handleClose} style={{width: "50px"}}>Close</Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
