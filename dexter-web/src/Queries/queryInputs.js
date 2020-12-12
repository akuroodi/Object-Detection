import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

export default function QueryInputs(props) {
    const [doneQuery, setDoneQuery] = React.useState(false);
    const [queryTime, setQueryTime] = React.useState(0);
    const [numResults, setNumResults] = React.useState(0);


    const handleQuery = () => {
        const queryStart = Date.now();

        props.setResults([
            {
                startTime: 2
            },
            {
                startTime: 10
            },
            {
                startTime: 20
            }
        ]);

        const queryTime = (Date.now() - queryStart);
        setQueryTime(queryTime);
        setNumResults(3);
        setDoneQuery(true);
        props.setDisableNext(false)
    }

    return (
        <div>
            <h1>Query Input</h1>

            {doneQuery ? (
                <Typography variant="h6" color="inherit" noWrap>
                    {"Found " + numResults + " results in " + queryTime + " ms"}
                </Typography>
            ) : (
                <Button onClick={handleQuery}> query </Button>
            )}

        </div>
    );
}