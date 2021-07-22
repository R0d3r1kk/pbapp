import './App.css';

import {
  Avatar,
  Backdrop,
  CircularProgress,
  Container,
  FormControl,
  IconButton,
  ImageList,
  ImageListItem,
  InputLabel,
  ListSubheader,
  MenuItem,
  Select,
  Snackbar
} from '@material-ui/core';
import React, { useEffect, useState } from "react";
import { createUser, getUsers, updateUser } from './helpers/ApiHelper';

import { Add } from '@material-ui/icons';
import Formdialog from './components/formdialog'
import MuiAlert from '@material-ui/lab/Alert'
import User from './components/user.js';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function App(props) {

  const [users, setUsers] = useState([])
  const [pages, setPages] = useState([])
  const [totalxpage, setTotalxPage] = useState([])

  const [page, setPage] = useState('1')
  const [total, setTotal] = useState('1')
  const [perpage, setPerPage] = useState('1')
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackopen, setSnackOpen] = useState(false);
  const [severity, setSeverity] = useState('info');
  const [snackmsg, setSnackMsg] = useState('');
  const [usercreated, setUserCreated] = useState({});
  
  useEffect(() => {
        setLoading(true)
        getUsers(page)
        .then(response => {
          //console.log(response);
          setPages(fillArray(response.total_pages));
          setTotal(response.total)
          setPerPage(response.per_page)
          setTotalxPage(fillArray(response.per_page))
          setUsers(response.data)
          setLoading(false)
          showAlert(total + " Users", "info")
        }).catch(function(error) {
          console.log(error);
          setSnackMsg()
          showAlert("Error requesting users", "error")
          setLoading(false)
      });
      
  // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, [page, total]); 


  const showAlert = (msg, severity) =>{
    setSnackMsg(msg)
    setSeverity(severity)
    setSnackOpen(true)
  }

  const fillArray = (count) => {
    let array = [...Array(count)]
    for(let i = 0; i < count; i++){
      array[i] = i + 1;
    }
    return array;
  }

  const handlePageChange = (event) => {
    setLoading(true)
    getUsers(page)
        .then(response => {
          setUsers(response.data)
          setLoading(false)
          showAlert("Page " + page, "success")
        }).catch(function(error) {
          console.log(error);
          showAlert("Error requesting users for page " + page , "error")
          setLoading(false)
      });
    setPage(event.target.value);
  };

  const handleMaxChange = (event) => {
    setLoading(true)
    getUsers(page, event.target.value)
        .then(response => {
          setUsers(response.data)
          setLoading(false)
          showAlert("Max users changed to " + event.target.value, "success")
        }).catch(function(error) {
          console.log(error);
          showAlert("Error requesting users with filters", "error")
          setLoading(false)
      });
    setPerPage(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSnackClose = () => {
    setSnackOpen(false);
  };

  const handleOnCreate = (name, email) => {
    setLoading(true)
    createUser(name, email)
    .then(response => {
        setUserCreated(response)
        setLoading(false)
        showAlert("User created", "success")
    }).catch(function(error) {
      console.log(error);
      showAlert("Error creating user", "error")
      setLoading(false)
  });
    setOpen(false);
  };

  return (
    <Container className="root">
      <ImageList className="imageList" >
        <ImageListItem key="Subheader" cols={2} style={{ height: 'auto' }}>
          <ListSubheader  className="listTitle" component="div">Users</ListSubheader>
          <FormControl>
            <InputLabel id="select-page-label" className="slctLabel">Page</InputLabel>
            <Select
            className="slctpages"
              labelId="select-page-label"
              id="slctPage"
              value={page}
              onChange={handlePageChange}
            >
              {pages.map((v) => (
                      <MenuItem key={v} value={v}>
                        {v}
                      </MenuItem>
                    ))}
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel id="select-maxUsers-label" className="slctLabel">Max</InputLabel>
            <Select
              className="slctpages"
              labelId="select-maxUsers-label"
              id="slctMaxUsers"
              value={perpage}
              onChange={handleMaxChange}
            >
              {totalxpage.map((v) => (
                      <MenuItem key={v} value={v}>
                        {v}
                      </MenuItem>
                    ))}
            </Select>
          </FormControl>
          <FormControl className="btnAdd">
          <Avatar variant="square" >
            <IconButton onClick={handleClickOpen}>
              <Add color="error"/>
            </IconButton>
          </Avatar>
          <Formdialog 
            title="New User"
            isnew={true}
            open={open} 
            onClose={handleClose} 
            onCreate={handleOnCreate}
            {...props}/>
          </FormControl>
          <Snackbar open={snackopen} autoHideDuration={3000} onClose={handleSnackClose}>
            <Alert onClose={handleSnackClose} severity={severity}>
              {snackmsg}
            </Alert>
          </Snackbar>

        <Backdrop  open={loading} className="loader">
            <CircularProgress color="inherit" />
          </Backdrop>
        </ImageListItem>
      {users.map((item) => (
       <User 
          key={item.id}
          userid={item.id}
          avatar={item.avatar}
          name={item.first_name + " " + item.last_name}
          email={item.email}
       />
      ))}
      <ImageListItem key="Subfooter" cols={2} style={{ height: 'auto' }}>
          <ListSubheader className="listFooter" component="div">Total: {total}</ListSubheader>
        </ImageListItem>
    </ImageList>
  </Container>
  );
}

export default App;
