import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Step from '@material-ui/core/Step';
import Stepper from '@material-ui/core/Stepper';

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function BroadcastDialog(props) {
    const classes = useStyles();
    const { onClose, open, currentDict, setUrl, handlePlay, currentItemList, language } = props;
    const [activeStep, setActiveStep] = useState(0);
    const steps = currentItemList;

    const handleClose = () => {
        setUrl('');
        setActiveStep(0);
        onClose();
    };

    const getStepContent = (step, script) => {
        if (script.describe.trim() !== '') {
            return script.describe;
        } else {
            return ``;
        }
    };

    const handleNext = (index) => {
        if (index + 1 < steps.length) {
            // 第一层：排除最后一个元素的点击
            let next_script = steps[index + 1]['text'].trim();
            handlePlay(next_script, language);
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = (index) => {
        let back_script = steps[index - 1]['text'].trim();
        if (back_script !== '') {
            handlePlay(back_script, language);
        }
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        let reset_script = steps[0]['text'].trim();
        if (reset_script !== '') {
            handlePlay(reset_script, language);
        }
        setActiveStep(0);
    };

    const handleJumpTo = (index) => {
        if (activeStep !== index) {
            setActiveStep(index);
        }
        let reset_script = steps[index]['text'].trim();
        if (reset_script !== '') {
            handlePlay(reset_script, language);
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
                        {currentDict.title}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container>
                <div className={classes.root}>
                    <Stepper activeStep={activeStep} orientation="vertical">
                        {steps.map((label, index) => (
                            <Step key={index}>
                                <StepLabel onClick={() => { handleJumpTo(index) }}>{label.text}</StepLabel>
                                <StepContent>
                                    <Typography>{getStepContent(index, label)}</Typography>
                                    <div className={classes.actionsContainer}>
                                        <div>
                                            <Button
                                                disabled={activeStep === 0}
                                                onClick={() => { handleBack(index) }}
                                                className={classes.button}
                                            >
                                                Back
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => { handleNext(index) }}
                                                className={classes.button}
                                            >
                                                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                            </Button>
                                        </div>
                                    </div>
                                </StepContent>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length && (
                        <Paper square elevation={0} className={classes.resetContainer}>
                            <Typography>All the sounds have been played !</Typography>
                            <Button onClick={handleReset} className={classes.button}>
                                Reset
                            </Button>
                        </Paper>
                    )}
                </div>
            </Container>
        </Dialog>
    );
}

export default BroadcastDialog;