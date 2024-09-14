import React from 'react';
import { VStack, Text, HStack, Image, Box, Spacer } from '@chakra-ui/react';
import { ChatIcon } from '@chakra-ui/icons'

interface ChildComponentProps {
    color5: string;
    setOrder: React.Dispatch<React.SetStateAction<number>>;

}

export const Start: React.FC<ChildComponentProps> = ({ color5, setOrder }) => {


    return (
        <>
            <HStack bg={color5} width={'full'} justifyContent={'center'} align={'center'} p={4} borderTopRadius={20} >
                <Text fontSize={20} fontWeight={700} color={'white'}>Messages </Text>
            </HStack>
            <VStack align={'center'} justifyContent={'center'} height={'66vh'}  >
                <Spacer />
                <ChatIcon color={'black'} fontSize={40} />
                <Text fontSize={16} fontWeight={600}> No messages</Text>
                <Text fontWeight={400}> Lorem ipsum dolor sit amet, consectetur</Text>
                <Spacer />
                <Image cursor={'pointer'} onClick={() => setOrder(2)} src='send.png' alt="profile" width={'100%'} mt={10} />
            </VStack>
            <Box
                w="100%"
                h="0.5px"
                bg="gray.300"
            />
        </>
    );
};