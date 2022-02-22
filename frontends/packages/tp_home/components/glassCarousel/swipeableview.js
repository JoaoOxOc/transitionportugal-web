import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

import { SwipeableViewStyles as styles } from './swipeableview.style';

import useBannerData from '../../hooks/useBannerData';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

function SwipeableTextMobileStepper() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const {data,loading,error} = useBannerData('https://localhost:4000');
  //const maxSteps = data.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      { data != null &&
      <>
      <Paper
        square
        elevation={0}
        sx={{
          display: 'flex',
          alignItems: 'center',
          height: 50,
          pl: 2,
          background: 'transparent !important',
        }}
      >
        <Typography sx={styles.SwipeableTitle}>{data[activeStep].label}</Typography>
      </Paper>
      <AutoPlaySwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        interval={5000}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {data.map((step, index) => (
          <div key={step.label}>
            <div style={{paddingTop: '5px'}}>
              {data[activeStep].paragraphs?.map((paragraph, i) => (
                <Typography sx={styles.SwipeableText} key={i}>{paragraph}</Typography>
              ))}
            </div>
            {Math.abs(activeStep - index) <= 2 && step.imgPath ? (
              <Box
                component="img"
                sx={{
                  height: 150,
                  display: 'block',
                  maxWidth: 300,
                  overflow: 'hidden',
                  width: '100%',
                  margin: '0 auto'
                }}
                src={step.imgPath}
                alt={step.label}
              />
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
        steps={data.length}
        position="static"
        activeStep={activeStep}
        sx={styles.SwipeableSteppers}
        // nextButton={
        //   <Button
        //     size="small"
        //     onClick={handleNext}
        //     disabled={activeStep === maxSteps - 1}
        //   >
        //     Next
        //     {theme.direction === 'rtl' ? (
        //       <KeyboardArrowLeft />
        //     ) : (
        //       <KeyboardArrowRight />
        //     )}
        //   </Button>
        // }
        // backButton={
        //   <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
        //     {theme.direction === 'rtl' ? (
        //       <KeyboardArrowRight />
        //     ) : (
        //       <KeyboardArrowLeft />
        //     )}
        //     Back
        //   </Button>
        // }
      />
      </>
      }
    </Box>
  );
}

export default SwipeableTextMobileStepper;