import { useEffect, useState } from 'react';



import {
  Button,
  Container,
  Heading,
  Input,
  FormControl,
  FormLabel,
  Box,
  FormErrorMessage,
  FormHelperText,
  Select,
   Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton
} from '@chakra-ui/react';



import axios, { Axios } from 'axios';



function HandleBankList({ getBankCode }: { getBankCode: (code: string) => void }) {
  const [banksList, setBanksList] = useState<{ code: string; name: string }[]>([]);
  const [selectedBankName, setSelectedBankName] = useState('');
  const [selectedBankCode, setSelectedBankCode] = useState('');

  
useEffect(()=>{
const handleBanksListFetch = async () =>{
  try {
   const response = await axios({
     method: "get",
     url: 'https://fluxipay.onrender.com/fetchbankslist',
     headers: { 'Content-Type': 'application/json' },
  });
 
     setBanksList(response.data.responseBody)
 
} catch (error) {
  console.log("error", error);
  
}
};

  handleBanksListFetch()
 
}, [])

 

  return (
  <>
     <FormControl mb={4} >
          <FormLabel>Recipient Bank</FormLabel>
          <Select placeholder='Select Recipient Bank' 

                     bgGradient="linear(to-r, #8114b0, #ff4d97,)"
                 
          color={"white"}
          value={selectedBankCode}
          onChange={e => {
            const code = e.target.value;
            setSelectedBankCode(code);
            const bank = banksList.find(b => b.code === code);
            setSelectedBankName(bank ? bank.name : '');
            console.log('Selected bank code:', code);
            getBankCode(code)
              
          }}
          required
          >
         {banksList.map((bank) => (
           <option
             key={bank.code}
             value={bank.code}
             style={{ color: 'black'}}
           >
             {bank.name}
           </option>
         ))}

          </Select>
 
      {selectedBankCode && (
        <p>You selected: {selectedBankName}</p>
      )}
        </FormControl>

        
  </>
  );
}

export default HandleBankList;