import React from 'react';
import { HStack } from '@chakra-ui/react';
import { Button, Input, useDisclosure, Text, Spacer,useToast } from '@chakra-ui/react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'

interface ChildComponentProps {
    property: string;
    color: string;
    setColor: (color: string) => void;
}

export const Colour: React.FC<ChildComponentProps> = ({ property, color, setColor }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();

   const handleClick = () => {
        toast({
            title: 'Color Selected',
            status: 'info',
            duration: 3000,
            isClosable: true,
            position: 'top-right',
        });
    }

    return (
        <>
            <HStack justifyContent={'space-between'} width={'full'} px={1}>
                <Text fontWeight={'semibold'} >{property}</Text>
                <Spacer />
                <Button width={'0.5px'} py={2} height={'10px'} bg={color} borderRadius={'1'} border={'1px solid black'} onClick={onOpen} />

                <Text>{color}</Text>
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalCloseButton />
                        <ModalBody>
                            <Input width={'90%'} type="color"
                                onChange={(e) => setColor(e.target.value)} />
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme='green' mr={3} onClick={handleClick}>
                                Save
                            </Button>
                            <Button colorScheme='blue' mr={3} onClick={onClose}>
                                Close
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </HStack>
        </>
    );
};