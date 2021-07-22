import './user.css'

import {
    Backdrop,
    CircularProgress,
    ImageListItem,
    ImageListItemBar,
    Snackbar
} from '@material-ui/core';
import React, { useEffect, useState } from "react";
import {createUser, updateUser} from '../helpers/ApiHelper'

import EditIcon from '@material-ui/icons/Edit';
import FormDialog from './formdialog';
import IconButton from '@material-ui/core/IconButton';
import MuiAlert from '@material-ui/lab/Alert'

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

function User(props){
    const [open, setOpen] = useState(false);
    const [update, setUpdate] = useState(false);
    const [title, setTitle] = useState("");
    const [loading, setLoading] = useState(false);
    const [snackopen, setSnackOpen] = useState(false);
    const [severity, setSeverity] = useState('info');
    const [snackmsg, setSnackMsg] = useState('');
    const [user, setUser] = useState({});

    const handleClickOpen = () => {
        setTitle("Modify User");
        setUpdate(false);
        setOpen(true);
    };

    const handleDetailOpen = () => {
        setTitle("User Detail")
        setUpdate(true);
        setOpen(true);
    };
    
    const handleClose = () => {
    setOpen(false);
    };

    const handleSnackClose = () => {
        setSnackOpen(false);
      };

    const showAlert = (msg, severity) =>{
        setSnackMsg(msg)
        setSeverity(severity)
        setSnackOpen(true)
      }
      
    const handleOnUpdate = (id, name, email) => {
        setLoading(true)
        updateUser(id, name, email)
        .then(response => {
            setUser(response)
            setSnackOpen(true)
            setLoading(false)
            showAlert("User updated", "success")
        }).catch(function(error) {
          console.log(error);
          showAlert("Error updating user", "error")
          setLoading(false)
      });
        setOpen(false);
      };
    
    const handleOnCreate = (name, email) => {
        setLoading(true)
        createUser(name, email)
        .then(response => {
            setUser(response)
            setSnackOpen(true)
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
        <ImageListItem 
            key={props.key}  
            className="listitem" 
            {...props}
            >
            <img src={props.avatar} alt={props.name} loading="lazy" onClick={handleDetailOpen}/>
            <ImageListItemBar
            title={props.name}
            position="top"
            actionIcon={
                <IconButton className="icon" onClick={handleClickOpen}>
                    <EditIcon />
                </IconButton>
            }
            actionPosition="left"
            className="titleBar"
            />
        <FormDialog 
            title={title}
            open={open} 
            isnew={props.isnew}
            onClose={handleClose} 
            onUpdate={handleOnUpdate}
            onCreate={handleOnCreate}
            userid={props.userid}
            name={props.name}
            src={props.avatar}
            email={props.email}
            update={update}
            {...props}/>
             <Snackbar open={snackopen} autoHideDuration={3000} onClose={handleSnackClose}>
                <Alert onClose={handleSnackClose} severity={severity}>
                {snackmsg}
                </Alert>
            </Snackbar>

            <Backdrop  open={loading} className="loader">
                <CircularProgress color="inherit" />
            </Backdrop>
        </ImageListItem>
      );
}

export default User;