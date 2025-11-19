import { useEffect, useState } from 'react';
import {
  Button,
  Container,
  Heading,
  Input,
  FormControl,
  FormLabel,
  Box,
  Text,
  VStack,
  HStack,
  Card,
  CardBody,
  useColorModeValue,
  Divider,
  Flex,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton
} from '@chakra-ui/react';

import { LunoKitProvider, ConnectButton } from '@luno-kit/ui';
import {
  createConfig,
  polkadot,
  paseo,
  polkadotjsConnector,
  subwalletConnector,
  talismanConnector,
  polkagateConnector,
  walletConnectConnector,
  novaConnector,
  useApi,
  useSendTransaction,
  useStatus,
} from '@luno-kit/react';


import '@luno-kit/ui/styles.css';
import { PASSETHUB } from './networks.ts';
import axios from 'axios';
import HandleBankList from './components/receipientBankSelection.tsx';

const connectors = [
  polkadotjsConnector(),
  subwalletConnector(),
  talismanConnector(),
  polkagateConnector(),
  walletConnectConnector({ projectId: import.meta.env.VITE_WALLET_CONNECT_ID }),
  novaConnector({ projectId: import.meta.env.VITE_WALLET_CONNECT_ID }),
];

const config = createConfig({
  appName: 'Fluxipay',
  chains: [paseo, polkadot],
  connectors,
  autoConnect: true,
});



function Connection() {
  const [recipientBankAccount, setRecipientBankAccount] = useState('');
  const [amount, setAmount] = useState('');
  const [amountToReceiveResponse, setAmountToReceiveResponse] = useState('');
  const [selectedBankCode, setSelectedBankCode] = useState<string>();
  const { api } = useApi();
  const { sendTransactionAsync, isPending } = useSendTransaction();
  const status = useStatus();
  const [swapResponse, setSwapResponse] = useState<string>();


  

  useEffect(() => {
    const timeout = setTimeout(() => {
      try {
        axios({
          method: 'get',
          url: 'https://fluxipay.onrender.com/transfer/calculateamount',
          params: { amount },
          headers: { 'Content-Type': 'application/json' },
        })
          .then((response) => {
            setAmountToReceiveResponse(response.data.amountToReceiveInNaira);
          })
          .catch((error) => console.log('error', error));
      } catch (error) {
        console.log('error', error);
      }
    }, 1000);
    return () => clearTimeout(timeout);
  }, [amount]);

  const getBankCode = async (code: string) => {
    setSelectedBankCode(code);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
       if (!api) {
    console.error("API not ready");
    return;
  }
      const transferExtrinsic = api.tx.balances.transferKeepAlive(
        '1eAZspUsqMru9QYgp5UYri8AZs2PErgQr24MTnTjcebJexN',
        BigInt(Math.floor(Number(amount) * Math.pow(10, PASSETHUB.decimals)))
      );

      const receipt = await sendTransactionAsync({ extrinsic: transferExtrinsic });
      if (receipt.status === 'success') {
        axios({
          method: 'post',
          url: 'https://fluxipay.onrender.com/transfer',
          data: {
            recipientBankAccount,
            amount,
            selectedBankCode,
          },
          headers: { 'Content-Type': 'application/json' },
        }).then((response) => {
          console.log(response);
          
        setSwapResponse(`You have successfully swappped ${amount} USDC for ${Number(amountToReceiveResponse).toFixed(2)} Naira`)
        });
      } else {
      console.log("error");
      
       
      }
    } catch (error) {
 console.log("error");
 
    }
  };

  const cardBg = useColorModeValue('#ecd1f8ff', '#ecd1f8ff');
  const inputBg = useColorModeValue('white', 'gray.700');

  return (
    <Container maxW="lg">
      <VStack spacing={6}>
        <Heading bgClip="text" bgGradient="linear(to-r, #8114b0, #ff4d97, #f7ff3c)" textAlign="center" fontWeight="extrabold">
          Fluxipay
        </Heading>

        <Card w="100%" bg={cardBg} boxShadow="lg" borderRadius="2xl" p={4}>
          <CardBody>
            <form onSubmit={handleSubmit}>
            
              <Box>
                <Text fontWeight="medium" mb={2}>
                  From PAS(USDC and others to come when we are live) 
                </Text>
                <HStack>
                  <Input
                    color={'white'}
                    type="number"
               
                    placeholder="Enter amount"
                    value={(amount)}
                    onChange={(e) => { setAmount(e.target.value); 
                      setSwapResponse(""); }}
                       _placeholder={{ color: "white", opacity: 10 }} 
                     bgGradient="linear(to-r, #8114b0, #ff4d97,)"
                  />
                </HStack>
              
        <p>Swapping fee: 3%</p>
              </Box>

              <Flex alignItems="center" justify="center" >
                <Divider bgGradient="linear(to-r, #8114b0, #ff4d97)" />
                <Text mx={2} color="gray.400" bgClip={"text"}   bgGradient="linear(to-r, #8114b0)">
                  ↓
                </Text>
                <Divider />
              </Flex>

              {/* To Naira Bank */}
              <Box mb={4}>
                <Text fontWeight="medium" mb={2}>
                  To (Nigerian Bank)
                </Text>
                <HandleBankList getBankCode={getBankCode} />

                <FormControl mt={3}>
                  <FormLabel fontSize="sm">Recipient Bank Account</FormLabel>
                  <Input
                    bg={inputBg}
                    placeholder="Enter Bank Account Number"
                    type="number"
                        bgGradient="linear(to-r, #8114b0, #ff4d97,)"
                     _placeholder={{ color: "white", opacity: 10 }} 
                     color="white"
                    value={recipientBankAccount}
                    onChange={(e) => setRecipientBankAccount(e.target.value)}
                  />
                </FormControl>
              </Box>

              {/* Amount to Receive */}
              {Number(amountToReceiveResponse) > 0 && (
                <Box
                  bg="blue.50"
                  borderRadius="md"
                  p={3}
                  color="white"
                  textAlign="center"
                  border="1px solid"
                  borderColor="blue.100"
                  mb={3}
                  bgGradient="linear(to-r, #8114b0, #ff4d97)"
                >
                  {swapResponse ? (
                    <Text fontSize="sm">{swapResponse}</Text>
                  ) : (
                    <>
                      <Text fontSize="sm">You will receive approximately </Text>
                      <Heading size="md">  # {Number(amountToReceiveResponse).toFixed(2)} Naira</Heading>
                    </>
                  )}
                </Box>
              )}

              <Button
                type="submit"
                bgGradient="linear(to-r, #8114b0, #ff4d97, #f7ff3c)"
                w="full"
                size="lg"
                borderRadius="xl"
                isLoading={isPending}
                color={"white"}
                 _hover={{ bg: '#8114b0' }} 
              >
                Swap 
              </Button>
            </form>
          </CardBody>
        </Card>
      </VStack>
    </Container>
  );
}

function App() {
  return (
    <LunoKitProvider config={config} >
      <Box textAlign="center" py={6} >
        <ConnectButton showBalance={true} />
      </Box>
      <Connection  />
    </LunoKitProvider>
  );
}

export default App;
