import { Box, Button, Container, HStack, Text } from '@chakra-ui/react';
import { Timer } from '@components/Timer';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import demo from '@data/demo.json';
import { abridgeKey } from '@config/demo';

const NUM_SIGNERS = 9;
const THRESHOLD = 6;

const MAX_TIME = 10;

const Vault: NextPage = () => {
  const [time, setTime] = useState(0);

  const [ATSPRstate, setATSPRState] = useState();
  const [ATSState, setATSState] = useState();

  const demo_length = demo.length;

  const emitEvent = (entry: any) => {
    const ats = entry.ats;
    const atspr = entry.atspr;
    console.log('emit Event', entry.time);
    setATSPRState(atspr);
    setATSState(ats);
  };

  const processEntry = (entry: any, index: number) => {
    emitEvent(entry);

    index++;
    if (index === demo_length) {
      return;
    }

    const nextEntry = demo[index];
    if (nextEntry == null) {
      return;
    }

    const timeDiff = nextEntry.time - entry.time;
    setTimeout(processEntry, timeDiff * 1000, nextEntry, index);
  };

  useEffect(() => {
    if (time === 0) {
      processEntry(demo[0], 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time]);

  return (
    <>
      <Container textAlign='center' py={10} px={10} maxW='1200px'>
        <Text as='h1'>The Vault</Text>
        <Text>
          We have {NUM_SIGNERS} signers in this group. With a threshold set to{' '}
          {THRESHOLD}.
        </Text>
        <Text>Accountable Threshold Signatures</Text>
        <HStack gap={4} pt={2}>
          <Box width='100%'>
            <Box
              background='gray.700'
              height='400px'
              width='100%'
              borderRadius={4}
              p={4}
              justifyContent='space-between'
            >
              <Text as='h3'>without proactive refresh</Text>
              {ATSState &&
                ATSState.pks.map((pk: string, idx: number) => (
                  <Box
                    key={idx}
                    mx={1}
                    my={1}
                    p={0.5}
                    borderRadius={4}
                    background={pk.secure ? 'green.300' : 'red.400'}
                  >
                    <Text>{abridgeKey(pk.key)}</Text>
                  </Box>
                ))}
              <Text>Quorum public key: </Text>
              <Text>Collective private key: </Text>
            </Box>
          </Box>
          <Box width='100%'>
            <Box
              background='gray.700'
              height='400px'
              width='100%'
              p={4}
              justifyContent='space-between'
            >
              <Text as='h3'>with proactive refresh</Text>
              {ATSPRstate &&
                ATSPRstate.pks.map((pk: string, idx: number) => (
                  <Box
                    key={idx}
                    mx={1}
                    my={1}
                    p={0.5}
                    borderRadius={4}
                    background={pk.secure ? 'green.300' : 'red.400'}
                  >
                    <Text>{abridgeKey(pk.key)}</Text>
                  </Box>
                ))}
              <Text>Quorum public key: </Text>
              <Text>Collective private key: </Text>
            </Box>
          </Box>
        </HStack>
        <Timer maxTime={MAX_TIME} time={time} setTime={setTime} />
        {/* <Button color="black" onClick={resetTime}>Reset</Button> */}
      </Container>
    </>
  );
};
export default Vault;
