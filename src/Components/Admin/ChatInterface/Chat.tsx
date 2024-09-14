import React from 'react';
import { VStack, Text, Spacer, HStack, Image, Box, Icon, Button } from '@chakra-ui/react';
import { IoArrowBackOutline } from "react-icons/io5";
import { GoPaperclip } from "react-icons/go";

interface ChildComponentProps {
    color: string;
    color2: string;
    color3: string;
    color4: string;
    color5: string;
    setOrder: React.Dispatch<React.SetStateAction<number>>;
}

export const Chat: React.FC<ChildComponentProps> = ({ color, color2, color3, color4, color5, setOrder }) => {
    return (
        <>
            <VStack bg={color5} height={'30vh'} align={'center'} width={'full'} px={2} py={4} paddingX={4} position={'relative'} borderTopRadius={20} >
                <Icon cursor={'pointer'} w={10} h={10} as={IoArrowBackOutline} onClick={() => setOrder(0)} position={'absolute'} top={2} left={2} color={'white'} />

                <Text color={'white'} fontWeight={'700'} fontSize={['lg', '20px']} >Company</Text>
                <Spacer />
                <Image src='people.png' alt="profile" width={170} height={'auto'} />
                <Spacer />
                <Text width={['100%', '70%']} color={'#FFFFFF'} textAlign={'center'} fontWeight={'400'} fontSize={['lg', '16px']} >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</Text>
            </VStack>
            <VStack spacing={4} width={'100%'} align="stretch">
                <Box ml={4} bg={color4} p={4} borderRadius="md" alignSelf="flex-start">
                    <Text color={color3}>Hi how are you?</Text>
                </Box>
                <Box ml={4} bg={color4} p={4} borderRadius="md" alignSelf="flex-start">
                    <Text color={color3}>Hi how are you?</Text>
                </Box>

                <Box mr={4} bg={color2} p={4} borderRadius="md" alignSelf="flex-end">
                    <Text color={color}>What are you upto?</Text>
                </Box>
                <Box mr={4} bg={color2} p={4} borderRadius="md" alignSelf="flex-end">
                    <Text color={color}>What is the news today?</Text>
                </Box>

                <Box bg={color2} p={4} mr={4} borderRadius="md" alignSelf="flex-end">
                    <Text color={color}>I am fine...</Text>
                </Box>
                <Box
                    mt={4}
                    w="100%"
                    h="0.5px"
                    bg="gray.300"
                />
                <HStack px={4} py={2} align={'center'} width={'90%'} justifyContent={'space-between'} mt={2} >
                    <Text color={'#100B05'}
                    >Message|</Text>
                    <Spacer />
                    <Button

                        colorScheme="blue"
                        fontWeight="bold"
                        fontSize={["md", "md"]}
                        color="#FFFFFF"
                        bg="#182139"
                        borderRadius="10px"
                        px={["4", "4"]}

                    >Send</Button>
                    <Icon
                        as={GoPaperclip}
                        color="#100B05"
                        fontSize="30px"
                    />
                </HStack>
            </VStack>
        </>
    );
};