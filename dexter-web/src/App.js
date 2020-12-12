import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';

import VideoSelect from './Inputs/videoSelect';
import QueryInputs from './Queries/queryInputs';
import Results from './Results/results';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  step: {
    marginleft: theme.spacing(2),
    marginRight: theme.spacing(2)
  },
  backButton: {
    marginRight: theme.spacing(1)
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    alignContent: "center"
  },
}));

function getSteps() {
  return ['Select a Video', 'Query for a Scene', 'View the Results'];
}

function getStepContent(stepIndex, setDisableNext, results, setResults) {
  switch (stepIndex) {
    case 0:
      return <VideoSelect setDisableNext={setDisableNext}/>;
    case 1:
      return <QueryInputs setDisableNext={setDisableNext} setResults={setResults}/>;
    case 2:
      return <Results results={results}/>;
    default:
      return 'Unknown stepIndex';
  }
}

function App() {
  const classes = useStyles();

  const [results, setResults] = React.useState([]);

  const [disableNext, setDisableNext] = React.useState(true);
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setDisableNext(true);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div>
      <CssBaseline />
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h4" color="inherit" noWrap>
            Dexter
          </Typography>
        </Toolbar>
      </AppBar>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Grid container justify="center">

        {activeStep === steps.length ? (
          <div>
            <Typography variant="h6" className={classes.instructions}>  </Typography>
            <Button variant="contained" color="primary" onClick={handleReset}>Start New Query</Button>
          </div>
        ) : (
            <div>
              <div className={classes.instructions}>
                {getStepContent(activeStep, setDisableNext, results, setResults)}
              </div>
              <div>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  className={classes.backButton}
                >
                  Back
                </Button>
                <Button 
                  disabled={disableNext && activeStep !== steps.length - 1}
                  variant="contained" 
                  color="primary" 
                  onClick={handleNext}
                >
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </div>
            </div>
          )}

      </Grid>
    </div>
  );
}

export default App;
