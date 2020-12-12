import React from 'react'
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core/styles';

import VideoLayer from './videoLayer';

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: "80%",
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));



export default function Results(props) {
    const classes = useStyles();

    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);

    const [startTime, setStartTime] = React.useState(0);

    const handleOpen = (startTime) => {
        setStartTime(startTime);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const resultButtons = props.results.map((result, i) => {
        return (
            <div key={i}>
                <Button variant="contained"
                    onClick={(e) => handleOpen(result.startTime)}
                >
                    {new Date(result.startTime * 1000).toISOString().substr(11, 8)}
                </Button>
            </div>
        );
    });


    const body = (
        <div style={modalStyle} className={classes.paper}>
            <h2 id="simple-modal-title">Text in a modal</h2>
            <p id="simple-modal-description">
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </p>
            <VideoLayer videoUrl={props.videoUrl} startTime={startTime} />
        </div>
    );

    return (
        <div>
            {resultButtons}
            <Modal
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <Fade in={open}>
                    {body}
                </Fade>
            </Modal>
        </div>
    );

}