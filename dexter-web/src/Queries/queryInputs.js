import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';

import { queryES, objsToRes } from './queryHandlers';

const sampleQuery = {
    "query": {
        "bool": {
            "must": [
                { "match": { "objects.class": "truck" } },
                { "match": { "objects.class": "person" } }
            ]
        }
    }
};

export default function QueryInputs(props) {
    const [isFetching, setIsFetching] = React.useState(false);
    const [doneQuery, setDoneQuery] = React.useState(false);
    const [queryTime, setQueryTime] = React.useState(0);
    const [numResults, setNumResults] = React.useState(0);


    const handleQuery = () => {
        const queryStart = Date.now();
        const resultObjs = queryES(sampleQuery);
        const queryTime = (Date.now() - queryStart);

        objsToRes(resultObjs, 30).then(results => {
            console.log(results);

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
            <h1>Query Input</h1>


            {isFetching ? (
                <LinearProgress />
            ) : (doneQuery ? (
                <Typography variant="h6" color="inherit" noWrap>
                    {"Found " + numResults + " results in " + queryTime + " ms"}
                </Typography>
            ) : (
                    <Button onClick={handleQuery}> query </Button>
                ))}

        </div>
    );
}