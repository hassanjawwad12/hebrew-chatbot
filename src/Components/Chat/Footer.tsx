import React from 'react';
import { VStack, Text, HStack, Icon } from '@chakra-ui/react';
import { IoHomeOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { FaRegMessage } from "react-icons/fa6";
import { GoQuestion } from "react-icons/go";

export const Footer: React.FC = () => {

    const [selected, setSelected] = React.useState<string>('home');

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/botChat');
        setSelected('botChat');
    };

    const handleSecond = () => {
        setSelected('home');
        navigate('/');
    }

    const handleThird = () => {
        setSelected('FAQ');
        navigate('/FAQ');
    }

    return (

        <HStack width={'90%'} justifyContent={'space-between'} p={2}>
            <VStack align={'center'} onClick={handleSecond} cursor={'pointer'}>
                <Icon
                    as={IoHomeOutline}
                    w={8}
                    h={8}
                    color={selected === 'home' ? 'purple' : 'black'}
                    sx={{
                        fontWeight: selected === 'home' ? 'bold' : 'normal',
                    }}

                />
                <Text>Home</Text>
            </VStack>
            <VStack align={'center'} onClick={handleClick} cursor={'pointer'}>
                <Icon
                    as={FaRegMessage}
                    w={7}
                    h={7}
                    color={selected === 'botChat' ? 'purple' : 'black'}
                />
                <Text  >Message</Text>
            </VStack>
            <VStack align={'center'} onClick={handleThird} cursor={'pointer'} >
                <Icon
                    as={GoQuestion}
                    w={8}
                    h={8}
                    color={selected === 'FAQ' ? 'purple' : 'black'}
                />
                <Text>Help</Text>
            </VStack>
        </HStack>
    );
};

