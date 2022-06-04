import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Stack } from '@mui/material';
import Dropdown from './Dropdown';
import 'tachyons';
import TextField from '@mui/material/TextField';

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

export default function MRActionModal({open, data, handleClose, handleSendClicked}) {
  const [MRactionSelect, setMRActionSelect] = React.useState(1);
  const [to, setTo] = React.useState("");
  const [MRItems, setMRItems] = React.useState([]);
  const [toError, setToError] = React.useState(false);

  React.useEffect(()=> {
    if(data) {
      if(data.to) {
      setTo(data.to);
      }
      if (data.items) {
        setMRItems(data.items)
      }
    }
  }, [data]);
  const handleMRActionChange = (event) => {
    setMRActionSelect(event.target.value);
  };
  const handleSend = () => {
    if(to.length < 10) {
      setToError(true)
      alert("Plese enter valid number");
      return;
    }
    setToError(false)
   handleSendClicked({actionSelect: MRactionSelect, to})
  }
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
           Mester Message Action!
          </Typography>
         
          <Dropdown
      actionSelect={MRactionSelect}
      handleActionChange={handleMRActionChange}
      items={MRItems}
      />
          <TextField error={toError} type="tel" value={to} sx={{'& input': {height:'50px'}}} onChange={event => setTo(event.target.value)} id="outlined-to" label="To" variant="outlined" size='medium' />
          <Stack  spacing={2} direction="row" className="justify-center mt3">
              <Button className='w-0.5 h-0.5 grow' size="small" variant="contained" color="success" onClick={handleSend} style={{width: "50px"}}>Send</Button>
              <Button className='w-0.5 h-0.5 grow' size="small" variant="contained" color="primary" onClick={handleClose} style={{width: "50px"}}>Cancel</Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
