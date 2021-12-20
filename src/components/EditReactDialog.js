import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Fab from '@material-ui/core/Fab';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import LanguageSelection from '../components/LanguageSelection.js';

import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    absolute: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(3),
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function EditReactDialog(props) {
    const classes = useStyles();
    const { onClose, open, currentDict, language, setLanguage } = props;
    const [subDisabled, setSubDisabled] = useState(true);
    const [deleteDisabled, setDeleteDisabled] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);

    const handleClose = () => {
        onClose(false);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleClickOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleSave = () => {
        let titleValue = document.getElementById('script-title').value;
        let contentValue = document.getElementById('script-content').value;
        setSubDisabled(true);
        if (currentDict.id) {
            axios.put('/api/1.0/script', {
                id: currentDict.id,
                title: titleValue,
                script: contentValue,
                language: language,
            }).then(function (response) {
                onClose(true);
            }).catch(function (error) {
                console.log(error)
                setSubDisabled(false);
            });
        } else {
            axios.post('/api/1.0/script', {
                title: titleValue,
                script: contentValue,
                language: language,
            }).then(function (response) {
                onClose(true);
            }).catch(function (error) {
                console.log(error)
                setSubDisabled(false);
            });
        }
    };

    const handleDelete = () => {
        if (currentDict.id) {
            setDeleteDisabled(true);
            axios.delete('/api/1.0/script', {
                data: { id: currentDict.id },
            }).then(function (response) {
                onClose(true);
                setDeleteDisabled(false);
            }).catch(function (error) {
                console.log(error)
                setDeleteDisabled(false);
            });
        }
    };

    const handleTextFieldChange = (e) => {
        let titleValue = document.getElementById('script-title').value;
        let contentValue = document.getElementById('script-content').value;
        if (titleValue.trim() !== '' && contentValue.trim() !== '') {
            setSubDisabled(false);
        } else {
            setSubDisabled(true);
        }
    };

    return (
        <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Edit Script
                    </Typography>
                    {currentDict.id ? (
                        <IconButton aria-label="delete" color="secondary" onClick={handleClickOpenDialog} disabled={deleteDisabled}>
                            <DeleteIcon />
                        </IconButton>
                    ) : null}
                </Toolbar>
            </AppBar>
            <Container>
                <form noValidate autoComplete="off">
                    <p />
                    <TextField id="script-title" label="Script Title" defaultValue={currentDict.title} onChange={handleTextFieldChange} fullWidth />
                    <p />
                    <LanguageSelection language={language} setLanguage={setLanguage} />
                    <p />
                    <TextField id="script-content" label="Script Content (Enter Wrap)" defaultValue={currentDict.script} onChange={handleTextFieldChange} multiline fullWidth />
                </form>
            </Container>
            <Fab color="primary" className={classes.absolute} onClick={handleSave} disabled={subDisabled}>
                <SaveIcon />
            </Fab>
            <Dialog open={openDialog} onClose={handleCloseDialog} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Please confirm whether you want to delete this script?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary" autoFocus>
                        Cancel
                    </Button>
                    <Button onClick={handleDelete} color="secondary">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Dialog>
    );
}

export default EditReactDialog;
