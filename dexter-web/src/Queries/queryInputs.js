import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';

import Inputs from './inputs';

import { queryES, objsToRes } from './queryHandlers';
import getESquery from './interpreter';


export default function QueryInputs(props) {
    const [isFetching, setIsFetching] = React.useState(false);
    const [doneQuery, setDoneQuery] = React.useState(false);
    const [queryTime, setQueryTime] = React.useState(0);
    const [numResults, setNumResults] = React.useState(0);

    const [query, setQuery] = React.useState({});

    const handleQuery = () => {
        console.log(query);
        const ESquery = getESquery(query);
        console.log(ESquery);

        const queryStart = Date.now();
        const resultObjs = queryES(props.selectedVideo, ESquery);
        const queryTime = (Date.now() - queryStart);

        objsToRes(resultObjs, 30).then(results => {
            console.log(results);
            if (results == null) return;

            props.setResults(results);

            setQueryTime(queryTime);
            setNumResults(results.length);
            setDoneQuery(true);
            setIsFetching(false);
            props.setDisableNext(false)
        });
    }

    return (
        <div>
            <h1>Query Inputs</h1>
            <Inputs setQuery={setQuery}/>

            {isFetching ? (
                <LinearProgress />
            ) : (doneQuery ? (
                <Typography variant="h6" color="inherit" noWrap>
                    {"Found " + numResults + " results in " + queryTime + " ms"}
                </Typography>
            ) : (
                <Button variant="outlined" onClick={handleQuery}> RUN </Button>
            ))}

        </div>
    );
}