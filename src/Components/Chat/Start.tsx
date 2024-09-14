import React from 'react';
import { VStack, Text, HStack, Box, Spacer } from '@chakra-ui/react';
import { ChatIcon, ArrowForwardIcon, Icon } from '@chakra-ui/icons'
import { useNavigate } from 'react-router-dom';
import { Footer } from './Footer'
import { createClient, SupabaseClient } from '@supabase/supabase-js';

//connecting to supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY as string;
const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);


export const Start: React.FC = () => {

    const [selectedColor, setSelectedColor] = React.useState<string>("");

    React.useEffect(() => {
        const fetchColor = async () => {
            try {
                const { data, error } = await supabase
                    .from('Themes')
                    .select('color')
                    .match({ id: 5 });

                if (error) {
                    throw error;
                } else if (data && data[0] && data[0].color) {
                    setSelectedColor(data[0].color);
                    console.log(data[0].color);
                }
            } catch (error) {
                console.error('Error fetching color:', error);
            }
        };

        fetchColor();
    }, []);


    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/botchat');
    };

    return (
        <>
            <VStack width={['100%', '100%']} height="100vh" align='center' p={['0', '0', '0', '4']} bg="#00000066" >
                <VStack width={['full', 'full', 'full', '720px']} height={['100%', '100%', '100%', '95%']} bg='white' borderRadius={['0', '0', '0', '20']} >
                    <HStack bg={selectedColor} width={'full'} justifyContent={'center'} align={'center'} p={4} borderTopRadius={['0','0','0', '20']} >
                        <Text py={4} fontSize={20} fontWeight={700} color={'white'}>Messages </Text>
                    </HStack>
                    <VStack align={'center'} justifyContent={'center'} height={['80vh', '80vh', '76vh', '66vh',]}  >
                        <Spacer />
                        <ChatIcon color={'black'} fontSize={40} />
                        <Text fontSize={16} fontWeight={600}> No messages</Text>
                        <Text fontWeight={400}> Lorem ipsum dolor sit amet, consectetur</Text>
                        <Spacer />
                        <HStack cursor={'pointer'} onClick={handleClick} alignContent={'center'} p={4} w="100%" h="55px" bg="black" borderRadius={10} >
                            <Text color={'white'} >Send us a message</Text>
                            <Spacer />
                            <Icon as={ArrowForwardIcon} color={'white'} fontSize={30} />
                        </HStack>
                    </VStack>
                    <Box
                        w="100%"
                        h="0.5px"
                        bg="gray.300"
                    />
                    <Footer />
                </VStack>
            </VStack>
        </>
    );
};

