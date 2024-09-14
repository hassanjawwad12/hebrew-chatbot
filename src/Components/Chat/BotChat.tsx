import React, { useState } from 'react';
import { VStack, Text, Spacer, HStack, Image, Box, Input, useToast, Flex, Button,Icon } from '@chakra-ui/react';
import { Upload } from './Upload';
import axios from 'axios';
import { BeatLoader } from "react-spinners";
import { SupabaseClient } from '../Reusable/Supabase';
import { useNavigate } from 'react-router-dom';
import { IoArrowBackOutline } from "react-icons/io5";
import './dir.css'

const API_URL = import.meta.env.VITE_API_URL;

interface Message {
  query: string;
  role: 'user' | 'assistant';
}

export const BotChat: React.FC = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [uuid, setUuid] = React.useState<string>('');


  const [userUpload, setUserUpload] = useState<boolean>(() => {
    // Check if there's a value in localStorage
    const storedValue = localStorage.getItem('userUpload');
    // If there's a value, parse it and return it; otherwise, return false
    return storedValue ? JSON.parse(storedValue) : false;
  });

  React.useEffect(() => {
    localStorage.setItem('userUpload', JSON.stringify(userUpload));
  }, [userUpload]);


  //this is for the chatpage direction
  const [isRtl, setIsRtl] = useState<boolean>(false);
  const toast = useToast();
  const [color, setColor] = useState<string>('');
  const [color2, setColor2] = useState<string>('');
  const [color3, setColor3] = useState<string>('');
  const [color4, setColor4] = useState<string>('');
  const [color5, setColor5] = useState<string>('');

  //getting the direction from supabase 

  React.useEffect(() => {
    // Fetch the data from Supabase
    const fetchData = async () => {
      try {
        const { data, error } = await SupabaseClient
          .from('direction')
          .select('is_rtl')
          .eq('id', 1)
          .single();

        if (error) {
          throw error;
        }

        if (data) {
          setIsRtl(data.is_rtl);
          console.log('Direction:', data.is_rtl);
        }
      } catch (error) {
        console.error('Error fetching table direction:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once on mount



  //getting the colors from supabase 
  const getColorFromSupabase = async (id: number) => {
    try {
      const { data, error } = await SupabaseClient
        .from('Themes')
        .select('color') // Only select the 'color' column
        .eq('id', id) // Filter for the specific ID
        .single(); // Fetch only the first matching record (assuming unique IDs)

      if (error) {
        console.error('Error fetching color:', error);
        return null;
      }
      if (data) {
        return data.color;

      } else {
        console.warn(`Color for ID ${id} not found`);
        return null;
      }
    } catch (error) {
      console.error('Unexpected error fetching color:', error);
      return null;
    }
  };

  //setting in app the colors from supabase

  React.useEffect(() => {
    const fetchColors = async () => {
      const color1 = await getColorFromSupabase(1);
      const color2 = await getColorFromSupabase(2);
      const color3 = await getColorFromSupabase(3);
      const color4 = await getColorFromSupabase(4);
      const color5 = await getColorFromSupabase(5);
      console.log(color1, color2, color3, color4, color5);
      setColor(color1);
      setColor2(color2);
      setColor3(color3);
      setColor4(color4);
      setColor5(color5);
    };
    fetchColors();
  }
    , []);

    const handleClick = () => {
      navigate('/');
  };
  


  const handleSendClick = async () => {
    if (userUpload === false) {
      toast({
        title: 'No file selected',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
    else {
      if (!inputValue || isLoading) return; // Do nothing if inputValue is empty or currently loading

      const newMessage: Message = { query: inputValue, role: 'user' };
      setMessages((prevMessages) => [...prevMessages, newMessage]); // Add user message to UI
      console.log('UUID:', uuid);
      console.log('Input Value:', inputValue);

      try {
        setIsLoading(true);

        const response = await axios.post<{ data: string }, any>(
          `${API_URL}/startChat`,
          {
            query: inputValue,
            uuid: uuid,
          }
        ); // Call the function to get AI response
        console.log('Response:', response.data);

        const newAssistantMessage: Message = { query: response.data as string, role: 'assistant' };
        setMessages((prevMessages) => [...prevMessages, newAssistantMessage]); // Add AI response to UI

        setInputValue(''); // Clear input value after sending
      } catch (error) {
        console.error('Error generating response:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };


  return (

    <div className={isRtl ? 'rtl' : ''}>
      <VStack width={['100%', '100%']} height="100vh" align='center' p={['0', '0', '0', '4']} bg="#00000066" >
        <VStack width={['full', 'full', 'full', '720px']} height={['100%', '100%', '100%', '95%']} bg='white' borderRadius={['0', '0', '0', '20']} >
          <VStack bg={color5} height={'30vh'} align={'center'} width={'full'} px={2} py={4} paddingX={4} position={'relative'} borderTopRadius={['0', '0', '0', '20']} >
            <Icon cursor={'pointer'} w={10} h={10} as={IoArrowBackOutline} onClick={handleClick} position={'absolute'} top={2} left={2} color={'white'} />
            <Text color={'white'} fontWeight={'700'} fontSize={['lg', '20px']} >Company</Text>
            <Spacer />
            <Image src='people.png' alt="profile" width={170} height={'auto'} />
            <Spacer />
            <Text pb={1} width={['100%', '70%']} color={'#FFFFFF'} textAlign={'center'} fontWeight={'400'} fontSize={['lg', '16px']} >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</Text>
          </VStack>
          <VStack overflowY={'auto'} spacing={4} width={'100%'} align="stretch" height={['60vh', '60vh', '70vh', '50vh']} >
            {messages.map((message, index) => (
              <Flex
                width={"100%"}
                px={4}
                py={2}
                key={index}
                direction={
                  message.role === "assistant" ? "row" : "row-reverse"
                } // Reverse the direction if it's from the assistant
              >
                <HStack
                  bg={message.role === "assistant" ? color4 : color2}
                  rounded={"2xl"}
                  px={3}
                  py={3}
                  border={"1px solid  #626262"}
                  align={"center"}
                  ml={message.role === "assistant" ? 2 : 0}
                  mr={message.role === "user" ? 2 : 0}
                >
                  <Text
                    fontSize={["sm", "md"]}
                    pr={2}
                    pl={2}
                    color={
                      message.role === "user"
                        ? color
                        : color3
                    }
                  >
                    {message.query}
                  </Text>
                </HStack>
              </Flex>
            ))}
          </VStack>
          <Box
            mt={2}
            w="100%"
            h="0.5px"
            bg="gray.300"
          />
          <HStack px={4} py={1} align={'center'} width={'90%'} justifyContent={'space-between'} >
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && isLoading === false) {
                  handleSendClick();
                }
              }}
              color={'#100B05'}
              placeholder="Type a message"
              border='none'
            />
            <Spacer />
            <Button
              colorScheme="blue"
              fontWeight="bold"
              fontSize={["md", "md"]}
              color="#FFFFFF"
              bg="#182139"
              borderRadius="10px"
              px={["4", "4"]}
              isLoading={isLoading}
              spinner={<BeatLoader size={8} color="white" />}
              onClick={handleSendClick}
              disabled={isLoading}
            >
              Send
            </Button>
            <Upload uuid={uuid} setUuid={setUuid} setUserUpload={setUserUpload} />
          </HStack>
        </VStack>
      </VStack>
    </div>
  );
};
