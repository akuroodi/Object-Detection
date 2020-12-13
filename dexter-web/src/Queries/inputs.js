import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export default function Inputs(props) {
    const classes = useStyles();

    const [target, setTarget] = React.useState("");

    const targetComponent = (
        <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-helper-label">Target</InputLabel>
            <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
            >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                <MenuItem value={"Object Class"}>Object Class</MenuItem>
                <MenuItem value={"Time"}>Time</MenuItem>
                <MenuItem value={"Frame"}>Frame</MenuItem>
            </Select>
            <FormHelperText>Query Target</FormHelperText>
        </FormControl>
    );

    return (
        <div>
            {targetComponent}
        </div>
    );
}