import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import DialogTitle from '@material-ui/core/DialogTitle';

function FillingDialog(props) {
    const { onClose, open, fillList, onSave } = props;
    const [fillDict, setFillDict] = useState({});

    const handleClose = () => {
        onClose();
    };

    const handleSave = () => {
        onSave(fillDict);
    };

    const handleTextFieldChange = (e) => {
        let valDict = {};
        for (var i = 0; i < fillList.length; i++) {
            let value = document.getElementById(fillList[i]).value;
            if (value.trim() === '') {
                valDict[fillList[i]] = fillList[i];
            } else {
                valDict[fillList[i]] = value;
            }
        }
        setFillDict(valDict);
    };

    return (
        <Dialog open={open} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Parameters</DialogTitle>
            <DialogContent>
                {fillList.map((item) => (
                    <TextField
                        autoFocus
                        key={item}
                        margin="dense"
                        label={item}
                        fullWidth
                        id={item}
                        onChange={handleTextFieldChange}
                    />
                ))}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSave} color="primary">
                    Start
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default FillingDialog;