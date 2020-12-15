import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
// import Typography from '@material-ui/core/Typography';

import objectClasses from './objectClasses';


const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const defaultTarget = {
    relation: "INCLUDE",
    objClass: "",
    property: "",
    equality: "=",
    value: ""
};

export default function Inputs(props) {
    const classes = useStyles();

    const [targets, setTargets] = React.useState([Object.assign({}, defaultTarget)]);
    const [limit, setLimit] = React.useState("");
    const [orderby, setOrderBy] = React.useState("");
    const [order, setOrder] = React.useState("");

    const objClassItems = objectClasses().map((objClass, i) => (
        <MenuItem key={i} value={objClass}>{objClass}</MenuItem>
    ));

    const numberItems = (num) => ([...Array(num).keys()].map((val) =>
        <MenuItem key={val} value={val}>{val}</MenuItem>
    ));

    const relationComponent = (i) => (
        <FormControl key={i} className={classes.formControl}>
            <InputLabel id="demo-simple-select-helper-label">Relation</InputLabel>
            <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={targets[i].relation}
                onChange={(e) => setTargets((pre) => {
                    let next = [...pre];
                    next[i].relation = e.target.value
                    return next;
                })}
            >
                {/* <MenuItem value=""><em>None</em></MenuItem> */}
                <MenuItem value={"INCLUDE"}>Include</MenuItem>
                <MenuItem value={"EXCLUDE"}>Exclude</MenuItem>
            </Select>
            <FormHelperText></FormHelperText>
        </FormControl>
    );

    // const emptyComponent = (
    //     <FormControl className={classes.formControl} disabled>
    //         <InputLabel id="demo-simple-select-helper-label"></InputLabel>
    //         <Select
    //             labelId="demo-simple-select-helper-label"
    //             id="demo-simple-select-helper"
    //             value=""
    //         >
    //             <MenuItem value=""><em>None</em></MenuItem>
    //         </Select>
    //         <FormHelperText></FormHelperText>
    //     </FormControl>
    // );

    const targetComponent = (i) => (
        <div key={i}>
            {/* {i > 0 ? relationComponent(i) : emptyComponent} */}
            {relationComponent(i)}
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-helper-label">Class</InputLabel>
                <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={targets[i].objClass}
                    onChange={(e) => setTargets((pre) => {
                        let next = [...pre];
                        next[i].objClass = e.target.value
                        return next;
                    })}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {objClassItems}
                </Select>
                <FormHelperText>Object Class</FormHelperText>
            </FormControl>

            <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-helper-label"></InputLabel>
                <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={"WITH"}
                // onChange={}
                >
                    <MenuItem value="WITH">
                        <em>With</em>
                    </MenuItem>
                </Select>
            </FormControl>

            <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-helper-label">Property</InputLabel>
                <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={targets[i].property}
                    onChange={(e) => setTargets((pre) => {
                        let next = [...pre];
                        next[i].property = e.target.value
                        return next;
                    })}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value="COUNTS">Counts</MenuItem>
                </Select>
                <FormHelperText>Class Property</FormHelperText>
            </FormControl>

            <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-helper-label"></InputLabel>
                <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={targets[i].equality}
                    onChange={(e) => setTargets((pre) => {
                        let next = [...pre];
                        next[i].equality = e.target.value
                        return next;
                    })}
                >
                    <MenuItem value=""><em>None</em></MenuItem>
                    <MenuItem value="=">=</MenuItem>
                    <MenuItem value="gte">{">="}</MenuItem>
                    <MenuItem value="lte">{"<="}</MenuItem>
                    <MenuItem value="gt">{">"}</MenuItem>
                    <MenuItem value="lt">{"<"}</MenuItem>
                </Select>
            </FormControl>

            <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-helper-label">Value</InputLabel>
                <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={targets[i].property ? targets[i].value : ""}
                    onChange={(e) => setTargets((pre) => {
                        let next = [...pre];
                        next[i].value = e.target.value
                        return next;
                    })}
                >
                    <MenuItem value={""}><em>None</em></MenuItem>
                    {numberItems(31)}
                </Select>
                <FormHelperText>Property Value</FormHelperText>
            </FormControl>
        </div>
    );

    const limitComponent = (
        <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-helper-label">Limit</InputLabel>
            <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={limit}
                onChange={(e) => setLimit(e.target.value)}
            >
                <MenuItem value={""}><em>None</em></MenuItem>
                {numberItems(31)}
            </Select>
            <FormHelperText>Number of Results</FormHelperText>
        </FormControl>
    );

    const orderbyComponent = (
        <div>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-helper-label">Order By</InputLabel>
                <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={orderby}
                    onChange={(e) => setOrderBy(e.target.value)}
                >
                    <MenuItem value={""}><em>None</em></MenuItem>
                    <MenuItem value={"SCORE"}>Score</MenuItem>
                    <MenuItem value={"DISTANCE"}>Distance</MenuItem>
                </Select>
                <FormHelperText>Order of Results</FormHelperText>
            </FormControl>

            <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-helper-label">Order</InputLabel>
                <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={order}
                    onChange={(e) => setOrder(e.target.value)}
                >
                    <MenuItem value={""}><em>None</em></MenuItem>
                    <MenuItem value={"asc"}>ASC</MenuItem>
                    <MenuItem value={"desc"}>DESC</MenuItem>
                </Select>
                <FormHelperText>Order of Results</FormHelperText>
            </FormControl>


        </div>
    );

    useEffect(() => {
        // Update rawQuery
        props.setQuery({ targets: targets, limit: limit, orderby: orderby , order: order});
        // eslint-disable-next-line
    }, [targets, limit, orderby, order]);

    const handleAdd = () => {
        setTargets((pre) => ([...pre, Object.assign({}, defaultTarget)]));
    }

    const handleDelete = () => {
        setTargets((pre) => {
            let next = [...pre];
            next.pop();
            return next;
        });
    }

    return (
        <div>
            <Button variant="outlined" onClick={handleAdd}> Add </Button>
            <Button
                variant="outlined"
                onClick={handleDelete}
                disabled={targets.length <= 1}
            >
                Delete
            </Button>
            {targets.map((target, i) => targetComponent(i))}
            
            <Divider />
            {orderbyComponent}
            {limitComponent}
        </div>
    );
}