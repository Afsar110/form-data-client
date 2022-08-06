import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Stack } from '@mui/material';
import { HexColorPicker } from "react-colorful";
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

export default function ThemeModal({open, data, handleClose, handleUpdateClicked}) {
  const [color, setColor] = React.useState("#aabbcc");

  React.useEffect(()=> {
    if(data) {
      if(data.color) {
        setColor(data.color);
      }
    }
  }, [data]);

  const handleSend = () => {
    if (/^#[0-9A-F]{6}$/i.test(color)) {
      handleUpdateClicked(color)
    } else {
      alert ('Please enter a valid color code');
    }
  }
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="theme-modal-title"
        aria-describedby="theme-modal-description"
      >
        <Box sx={style}>
          <Typography id="theme-modal-title" variant="h6" component="h2"> Pick a color for your Website</Typography>
          <HexColorPicker color={color} onChange={setColor} />
          <Stack  spacing={2} direction="row" className="justify-center mt3">
          <TextField type="tel" value={color} onChange={e=> setColor(e.target.value)} sx={{'& input': {height:'50px', width: '100px'}}}  id="outlined-color-box" label="Color" variant="outlined" size='medium' />
          <Box sx={{width: '70px', height: '50px', background: color}}/>
          </Stack>
          <Stack  spacing={2} direction="row" className="justify-center mt3">
              <Button className='w-0.5 h-0.5 grow' size="small" variant="contained" color="success" onClick={handleSend} style={{width: "50px"}}>Change</Button>
              <Button className='w-0.5 h-0.5 grow' size="small" variant="contained" color="error" onClick={handleClose} style={{width: "50px"}}>Cancel</Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
