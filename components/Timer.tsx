import { Box, Button } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

export const Timer = ({
  maxTime,
  setTime,
}: {
  maxTime: number;
  time: number;
  setTime: Function;
}) => {
  const [state, setState] = useState({
    time: 0,
    minutes: 0,
    seconds: 0,
  });

  const timeout = setTimeout(() => {
    if (state.time === maxTime) {
      return;
    }
    setState({
      time: state.time + 1,
      minutes: Math.floor((state.time + 1) / 60),
      seconds: state.time - Math.floor((state.time + 1) / 60) * 60 + 1,
    });
    setTime(state.time);
  }, 1000);

  const resetTimer = () => {
    setState({
      time: 0,
      minutes: 0,
      seconds: 0,
    });
    setTime(0);
  };

  return (
    <>
      {state.time !== maxTime ? (
        <Box fontSize={25} py={4}>
          {state.minutes}:{String(state.seconds).padStart(2, '0')}
        </Box>
      ) : (
        <Box fontSize={25} py={4}>
          <Button onClick={resetTimer} color='blackAlpha.800'>
            Reset simulation
          </Button>
        </Box>
      )}
    </>
  );
};
