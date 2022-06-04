import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import { visuallyHidden } from '@mui/utils';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import ViewModal from './ViewModal';
import ActionModal from './ActionModal';
import DeleteModal from './DeleteModal';

const MAX_MESSAGE_SIZE = 50;
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Name',
  },
  {
    id: 'date',
    numeric: false,
    disablePadding: false,
    label: 'Date',
  },
  {
    id: 'number',
    numeric: false,
    disablePadding: false,
    label: 'Number',
  },
  
  {
    id: 'from',
    numeric: false,
    disablePadding: false,
    label: 'From',
  },
  {
    id: 'message',
    numeric: false,
    disablePadding: false,
    label: 'Message',
    width: "500px"
  },
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, numSelected, rowCount} =
    props;


  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            width={headCell.width}
            key={headCell.id}
            align={ headCell.id === 'message' ? 'left' :'center'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
          >
              {headCell.label}
           
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >

        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <></>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTable(props) {

    const [data,setData] = React.useState([]);
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('date');
  const [selected, setSelected] = React.useState([]);
  const [selectedData, setSelectedData] = React.useState({});
  const [isViewModelOpen, setIsViewModalOpen] = React.useState(false);
  const [isActionModlOpen, setIsActionModlOpen] = React.useState(false);
  const [isDeleteModlOpen, setIsDeleteModlOpen] = React.useState(false);
  const [page, setPage] = React.useState(0);

  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  React.useEffect(()=> {
    setData(props.data);
  },[props.data])
  //action
  const handleActionClick = (row) => {
        setSelectedData(row);
       setIsActionModlOpen(true);
  }
  //delete
  const handleDeleteClick = (row) => {
    setSelectedData(row);
    setIsDeleteModlOpen(true);
}

const handleDeleteConfirm = () => {
    console.log(selectedData);
    if(props.delete) {
      props.delete(selectedData);
    }
    setIsDeleteModlOpen(false);
}

const handleSendClicked = (data) => {
  console.log(selectedData);
  console.log(data);
  setIsActionModlOpen(false);
}

  const handleViewMoreClick = (row) => {
    setSelectedData(row);
    setIsViewModalOpen(true);
  }
  
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = data.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty data.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  return (
    <Box sx={{ width: '100%' }}>
        <ViewModal open={isViewModelOpen} data={selectedData} handleOpen={()=>setIsViewModalOpen(true)} handleClose = {()=> setIsViewModalOpen(false)}></ViewModal>
        <ActionModal open={isActionModlOpen} data={selectedData} handleOpen={()=> setIsActionModlOpen(true)} handleSendClicked={handleSendClicked} handleClose = {()=>  setIsActionModlOpen(false)}></ActionModal>
        <DeleteModal open={isDeleteModlOpen} handleDeleteConfirm={handleDeleteConfirm} handleClose = {()=>  setIsDeleteModlOpen(false)}></DeleteModal>
      <Paper sx={{ width: '100%', mb: 2 }}>
        {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={'medium'}
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              rowCount={data.length}
            />
            <TableBody>
              {data.sort(getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      tabIndex={-1}
                      key={row.id}
                    >
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                        align="center"
                      >
                        {row.name || 'N/A'}
                      </TableCell>
                      <TableCell align="center">{!isNaN(row.date) ? (new Date(parseInt(row.date))).toLocaleString(): 'N/A'}</TableCell>
                      <TableCell align="center">{row.id}</TableCell>
                      <TableCell align="center">{row.address}</TableCell>
                      <TableCell align="center">
                        <Stack spacing={2} direction="row" className="justify-between">
                            {
                            row.body.length > MAX_MESSAGE_SIZE
                                ? row.body.slice(0, MAX_MESSAGE_SIZE) + "..."
                                : row.body
                            }
                            {
                                row.body.length > MAX_MESSAGE_SIZE
                                    ? <Button
                                    className='ma3 grow'
                                        size="small" variant="text"
                                        onClick={() => handleViewMoreClick(row)}>
                                            view more
                                        </Button>
                                        
                                    : <></>
                            }
                        </Stack>
                                  
                          </TableCell>
                          {/* <TableCell align="left">{row.status}</TableCell>
                      <TableCell align="left">
                        <Stack  spacing={2} direction="row" className="justify-center ">
                            <Button className='w-0.5 h-0.5 grow' size="small" variant="contained" color="success" onClick={()=>handleActionClick(row)} style={{width: "50px"}}>Action</Button>
                            <Button className='w-0.5 h-0.5 grow' size="small" variant="contained" color="error" onClick={()=>handleDeleteClick(row)} style={{width: "50px"}}>Delete</Button>
                        </Stack>
                      </TableCell> */}
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[8, 10, 25]}
          component="div"
          count={props.count || 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
