import React from 'react';
import { VStack, Text, Spacer, Box, Input, HStack } from '@chakra-ui/react';
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
} from '@chakra-ui/react'
import { Footer } from './Footer'
import { createClient, SupabaseClient } from '@supabase/supabase-js';

//connecting to supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY as string;
const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);


type AccordionItem = {
    title: string;
    content: string;
};

export const FAQ: React.FC = () => {

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


    const accordionItems: AccordionItem[] = [
        {
            title: "Lorem ipsum",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod"
        },
        {
            title: "Lorem ipsum",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        },
        {
            title: "Lorem ipsum",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        },
        {
            title: "Lorem ipsum",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        }
    ];

    return (
        <>
            <VStack width={['100%', '100%']} height="100vh" align='center' p={['0', '0', '0', '4']} bg="#00000066" >
                <VStack width={['full', 'full', 'full', '720px']} height={['100%', '100%', '100%', '95%']} bg='white' borderRadius={['0', '0', '0', '20']} >
                    <VStack bg={selectedColor} width={'full'} px={2} align={'center'} py={4} paddingX={4} position={'relative'} borderTopRadius={['0', '0', '0', '20']} >
                        <Text fontSize={30} fontWeight={700} color={'white'}>Help</Text>
                        <Spacer />
                        <HStack borderRadius={12} width={'70%'} bg={'white'}>
                            <Input borderRadius={12} border={'1px solid white'} type='text' py={4} placeholder='Search for help' width={'90%'} />
                            <Text > 🔍  </Text>
                        </HStack>
                    </VStack>
                    <VStack width={'100%'} align={'flex-start'} height={['80vh', '80vh', '80vh', '66vh']} >
                        <Text p={2} fontWeight={600} fontSize={20} >20 collections</Text>
                        <Accordion width={'full'} p={2} allowToggle>
                            {accordionItems.map((item, index) => (
                                <AccordionItem key={index}>
                                    <h2>
                                        <AccordionButton >
                                            <Box as='span' flex='1' textAlign='left' fontWeight={600} py={3} fontSize={16}>
                                                {item.title}
                                            </Box>
                                            <AccordionIcon />
                                        </AccordionButton>
                                    </h2>
                                    <AccordionPanel pb={4} fontWeight={400} fontSize={16}>
                                        {item.content}
                                    </AccordionPanel>
                                </AccordionItem>
                            ))}
                        </Accordion>
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

