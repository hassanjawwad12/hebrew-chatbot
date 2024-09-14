import React from 'react';
import { VStack, Text, Spacer, HStack, Image, Box, Icon } from '@chakra-ui/react';
import { BsRobot } from "react-icons/bs";
//import { Start } from './ChatInterface/Start'
import { Chat } from './ChatInterface/Chat'
import { History } from './ChatInterface/History'
import { IoHomeOutline } from "react-icons/io5";
import { FaRegMessage } from "react-icons/fa6";
import { GoQuestion } from "react-icons/go";


interface ChildComponentProps {
    color: string;
    color2: string;
    color3: string;
    color4: string;
    color5: string;
}

export const Chatpopup: React.FC<ChildComponentProps> = ({ color, color2, color3, color4, color5 }) => {

    const [order, setOrder] = React.useState<number>(0)
    const [selected, setSelected] = React.useState('home');

    const handleClick = (name: string) => {
        setSelected(name);
        setOrder(0);
    };

    const handleSecond = (name: string) => {
        setSelected(name);
        setOrder(1);
    };

    const handleThird = (name: string) => {
        setSelected(name);
        setOrder(2);
    };

    return (
        <VStack width={['100%', '50%']} height="100vh" align='start' p='4' bg="#00000066" >
            <VStack width={['360px', '520px']} height={['90%', '92%']} bg='white' borderRadius={20}>
                {order === 0 ? (
                    <>
                        <VStack borderRadius={20} bg={color5} width={'full'} px={2} align={'flex-start'} py={2} paddingX={4} position={'relative'}>
                            <HStack width={'full'} justifyContent={'space-between'} p={2} mt={5}>
                                <Icon
                                    as={BsRobot}
                                    w={10}
                                    h={10}
                                    color={'#A09A9B'}
                                />   <Image src='people.png' alt="profile" width={150} height={'auto'} />
                            </HStack>
                            <Spacer />
                            <Text textAlign={'left'} color={'#A09A9B'} fontWeight={'700'} fontSize={['lg', '36px']}>Hello There.</Text>
                            <Text textAlign={'left'} color={'#FFFFFF'} fontWeight={'700'} fontSize={['lg', '36px']}>Excited to explore?</Text>
                            <Spacer />
                            <Box height={'1vh'} />
                        </VStack>
                        <VStack border={'1px solid grey'} align={'center'} height={'300px'} width={'85%'} borderRadius={'12'} mt={10}>
                            <Image src='tech.jpg' alt="profile" width={['200px', '352px']} mt={4} />
                            <Text textAlign={'left'} fontWeight={'700'}> Lorem ipsum dolor </Text>
                            <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
                        </VStack>
                        <HStack width={'90%'} justifyContent={'space-between'} p={2}>
                            <VStack align={'center'} onClick={() => handleClick('home')} cursor={'pointer'}>
                                <Icon
                                    as={IoHomeOutline}
                                    w={10}
                                    h={10}
                                    color={selected === 'home' ? 'purple' : 'black'}
                                />
                                <Text>Home</Text>
                            </VStack>
                            <VStack align={'center'} onClick={() => handleSecond('message')} cursor={'pointer'}>
                                <Icon
                                    as={FaRegMessage}
                                    w={7}
                                    h={7}
                                    color={selected === 'message' ? 'purple' : 'black'}
                                />
                                <Text>Message</Text>
                            </VStack>
                            <VStack align={'center'} onClick={() => handleThird('help')} cursor={'pointer'}>
                                <Icon
                                    as={GoQuestion}
                                    w={10}
                                    h={10}
                                    color={selected === 'help' ? 'purple' : 'black'}
                                />
                                <Text>Help</Text>
                            </VStack>
                        </HStack>

                    </>
                ) : order === 1 ? (
                    <>
                        <Chat color={color} color2={color2} color3={color3} color4={color4} color5={color5} setOrder={setOrder} />

                    </>
                ) : (
                    <>
                        <History color5={color5} />
                        <HStack width={'90%'} justifyContent={'space-between'} p={2}>
                            <VStack align={'center'} onClick={() => handleClick('home')} cursor={'pointer'}>
                                <Icon
                                    as={IoHomeOutline}
                                    w={10}
                                    h={10}
                                    color={selected === 'home' ? 'purple' : 'black'}
                                />
                                <Text>Home</Text>
                            </VStack>
                            <VStack align={'center'} onClick={() => handleSecond('message')} cursor={'pointer'}>
                                <Icon
                                    as={FaRegMessage}
                                    w={7}
                                    h={7}
                                    color={selected === 'message' ? 'purple' : 'black'}
                                />
                                <Text>Message</Text>
                            </VStack>
                            <VStack align={'center'} onClick={() => handleThird('help')} cursor={'pointer'}>
                                <Icon
                                    as={GoQuestion}
                                    w={10}
                                    h={10}
                                    color={selected === 'help' ? 'purple' : 'black'}
                                />
                                <Text>Help</Text>
                            </VStack>
                        </HStack>
                    </>
                )}

            </VStack>
        </VStack>
    );
};