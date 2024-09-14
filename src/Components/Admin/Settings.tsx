import React from 'react';
import { VStack, Text, HStack, Image, Box } from '@chakra-ui/react';
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
} from '@chakra-ui/react'
import { Theme } from './Theme';
import { Model } from './Model';

interface ChildComponentProps {
    color: string;
    setColor: (color: string) => void;
    color2: string;
    setColor2: (color2: string) => void;
    color3: string;
    setColor3: (color3: string) => void;
    color4: string;
    setColor4: (color4: string) => void;
    color5: string;
    setColor5: (color5: string) => void;

}

export const Settings: React.FC<ChildComponentProps> = ({ color, setColor, color2, setColor2, color3, setColor3, color4, setColor4, color5, setColor5 }) => {

    return (
        <VStack width={['100%', '50%']} height="100vh" align='center' justifyContent='center' >
            <VStack width={'full'} p={2} gap={4} >
                <Accordion allowToggle width={['99%', '70%']}>
                    <AccordionItem>
                        <h2>
                            <AccordionButton mt={4}>
                                <Box as='span' flex='1' textAlign='left'>
                                    <HStack width={'70%'} align={'flex-start'}>
                                        <Image src="brush.png" alt="profile" />
                                        <Text fontWeight={'700'} alignSelf={'start'} fontSize={['xl', 'xl']} >Chat Bot Theme Settings</Text>
                                    </HStack>
                                    <Text fontWeight={'400'}> Customize your chat interface to optimize AI performance and personalize your experience.</Text>
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                            <Theme color={color} setColor={setColor} color2={color2} setColor2={setColor2} color3={color3} setColor3={setColor3}
                                color4={color4} setColor4={setColor4} color5={color5} setColor5={setColor5} />
                        </AccordionPanel>
                    </AccordionItem>
                    <AccordionItem >
                        <h2>
                            <AccordionButton mt={4}>
                                <Box as='span' flex='1' textAlign='left'>
                                    <HStack width={'70%'} align={'flex-start'}>
                                        <Image src="rocket.png" alt="profile" />
                                        <Text fontWeight={'700'} alignSelf={'start'} fontSize={['xl', 'xl']} >Customize Your AI Model</Text>
                                    </HStack>
                                    <Text> Adjust settings to tailor your AI model for optimal performance and personalized results</Text>
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                            <Model />
                        </AccordionPanel>
                    </AccordionItem>
                </Accordion>        
            </VStack>
        </VStack>
    );
};

