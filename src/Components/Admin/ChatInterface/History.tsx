import React from 'react';
import { VStack, Text, Spacer,Image, Box } from '@chakra-ui/react';
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
} from '@chakra-ui/react'


interface ChildComponentProps {
    color5: string;
}

type AccordionItem = {
    title: string;
    content: string;
};

export const History: React.FC<ChildComponentProps> = ({ color5 }) => {

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
            <VStack bg={color5} width={'full'} px={2} align={'center'} py={2} paddingX={4} position={'relative'} borderTopRadius={20} >
                <Text fontSize={30} fontWeight={700} color={'white'}>Help</Text>
                <Spacer />
                <Image ml={2} src='searchhelp.png' alt="profile" width={'90%'} />
            </VStack>
            <VStack width={'100%'} align={'flex-start'} height={'66vh'} >
                <Text p={2} fontWeight={600} fontSize={16} >20 collections</Text>
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
        </>
    );
};