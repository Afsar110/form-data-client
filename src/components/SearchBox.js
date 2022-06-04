import { IconButton, Stack, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

const SearchBox = (props) => {
    return (
    <Stack spacing={2} direction="row" className="justify-center">
        <TextField value={props.text} onChange={(event) => props.updateText(event.target.value)}   id="outlined-basic" label="Search"  type="search" variant="outlined" />
        <IconButton onClick={props.search}  aria-label="search">
        <SearchIcon />
        </IconButton>
    </Stack>
    )
}

export default SearchBox;