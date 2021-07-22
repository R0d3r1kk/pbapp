import {Avatar, Badge} from '@material-ui/core'
import { useEffect, useState } from "react";

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import React from 'react';
import TextField from '@material-ui/core/TextField';

export default function FormDialog(props) {
    const [selectedFile, setSelectedFile] = useState();
    const [inputKey, setInputKey] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);

    const changeHandler = (event) => {
		setSelectedFile(URL.createObjectURL(event.target.files[0]));
		setIsFilePicked(true);
	};

    const cleanPreview = () => {
        if(isFilePicked){
            setInputKey("inputfile2")
            setSelectedFile("")
            setIsFilePicked(false)
        }
    }
    
  return (
    <div>
      <Dialog 
      open={props.open} 
      onClose={props.onClose} 
      aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{props.title}</DialogTitle>
        <DialogContent>
            <Badge 
                badgeContent={isFilePicked ? "X" : props.userid} 
                color="error" 
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                onClick={cleanPreview}
            >
            {
                props.isnew ?
                <input key={inputKey} type="file" name="file" onChange={changeHandler} /> :
                !props.isnew && !props.update && <input key={inputKey} type="file" name="file" onChange={changeHandler} /> 
            }
                <Avatar alt={props.name} src={isFilePicked ? selectedFile : props.src ? props.src : selectedFile} />
            </Badge>
            <TextField
                disabled={props.update}
                margin="dense"
                id="name"
                label="Name"
                type="text"
                value={props.name}
                fullWidth
                required
            />
            <TextField
                disabled={props.update}
                margin="dense"
                id="email"
                label="Email Address"
                type="email"
                value={props.email}
                fullWidth
                required
            />
        </DialogContent>
        <DialogActions>
            {props.isnew &&
                <Button onClick={(name, email) => props.onCreate(props.name, props.email)} color="secondary">
                    Create
                </Button>
            }
            {!props.update && !props.isnew &&
                <Button onClick={(id, name, email) => props.onUpdate(props.userid, props.name, props.email)} color="secondary">
                    Update
                </Button>
            }
            <Button onClick={props.onClose} color="primary">
                Cancel
            </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}