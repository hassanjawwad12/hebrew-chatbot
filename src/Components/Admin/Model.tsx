import React from 'react';
import { VStack, Text, Input, Textarea, HStack, Button, useToast } from '@chakra-ui/react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const Model: React.FC = () => {
    const toast = useToast()

    const [gptModel, setGptModel] = React.useState<string>('')
    const [systemPrompt, setSystemPrompt] = React.useState<string>('')
  
    React.useEffect(() => {
        const fetchModel = async () => {
            try {
                const response = await axios.get(`${API_URL}/getGPTModel`);
                setGptModel(response.data);
            } catch (error) {
                console.error(error);
                toast({
                    title: 'Error',
                    description: 'An error occured while fetching the model.',
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                    position: 'top-right'
                });
            }
        };

        const fetchPrompt = async () => {
            try {
                const response = await axios.get(`${API_URL}/getGPTPrompt`);
                setSystemPrompt(response.data);
            } catch (error) {
                console.error(error);
                toast({
                    title: 'Error',
                    description: 'An error occured while fetching the model.',
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                    position: 'top-right'
                });
            }
        };
        console.log('fetching model and prompt');
        fetchModel();
        fetchPrompt();
        console.log('model and prompt fetched successfully');
        console.log('model:', gptModel);
        console.log('prompt:', systemPrompt);
    }, []);
    

    const handleSystemPrompt = async () => {

         // system prompt 
        try {
            const response = await axios.post(`${API_URL}/insertPrompt`, {
                prompt: systemPrompt,
            });
            console.log(response.data);
            toast({
                title: 'System Prompt Set',
                description: 'The system prompt has been set successfully.',
                status: 'success',
                duration: 9000,
                isClosable: true,
                position: 'top-right'
            });
        } catch (error) {
            console.error(error);
            toast({
                title: 'Error',
                description: 'An error occured while setting the system prompt.',
                status: 'error',
                duration: 9000,
                isClosable: true,
                position: 'top-right'
            });
        }

        //Set Model
        try {
            const response = await axios.post(`${API_URL}/setModel`, {
                gpt_model: gptModel,
            });
            console.log(response.data);
            toast({
                title: 'Model Set',
                description: 'The Model has been set successfully.',
                status: 'success',
                duration: 9000,
                isClosable: true,
                position: 'top-right'
            });
        } catch (error) {
            console.error(error);
            toast({
                title: 'Error',
                description: 'An error occured while setting the model.',
                status: 'error',
                duration: 9000,
                isClosable: true,
                position: 'top-right'
            });
        }
    };


    return (
        <>
            <VStack height={'full'} width={['100%', '100%']} align={'flex-start'} p={4} gap={4} rounded={'12'}>
                <Text fontWeight={'700'} fontSize={['md', 'md']}>Select Model</Text>
                <Input
                    type='text'
                    border={'1px solid #A9A9A9'} width={'90%'} value={gptModel}
                    placeholder="Enter Model Name"
                    onChange={(e) => setGptModel(e.target.value)} />
                <Text
                    fontWeight={'700'} fontSize={['md', 'md']}>Enter Custom System Prompt</Text>
                <Textarea
                    value={systemPrompt}
                    onChange={(e) => setSystemPrompt(e.target.value)}
                    placeholder='System Prompt'
                    size='lg'
                    width={'90%'}
                    resize='vertical'
                    minH="200px"
                    border={'1px solid #A9A9A9'}
                />
            </VStack>
            <HStack width={['90%', '70%']} align={'flex-start'} ml={4} gap={6} mt={6}>
                <Button border={'1px solid black'} color='black' bg={'white'} width={'20%'}>Cancel</Button>
                <Button
                    _hover={{
                        bg: "blue.500",
                        color: "white",
                    }}

                    onClick={handleSystemPrompt} bg='black' color={'white'} width={'20%'}>Save</Button>
            </HStack>
        </>
    );
};
