import React from 'react';
import { VStack } from '@chakra-ui/react';
import { Radio, RadioGroup, Text, Stack, HStack,useToast } from '@chakra-ui/react'
import { Colour } from '../Reusable/Colour'
import { SupabaseClient } from '../Reusable/Supabase';

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

export const Theme: React.FC<ChildComponentProps> = ({ color, setColor, color2, setColor2, color3, setColor3, color4, setColor4, color5, setColor5 }) => {
    const [value, setValue] = React.useState<string>('')
    const toast = useToast();

    const handleChangeToRtl = async () => {
        try {
            const { error } = await SupabaseClient
                .from('direction')
                .update({ is_rtl: false })
                .eq('id', 1);
                toast({
                    title: 'Direction changed to left',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                    position: 'top-right',
                  });
            if (error) {
                throw error;
            }
        } catch (error) {
            console.error('Error updating table direction:', error);
        }
    };

    const handleRTL = async () => {
        try {
            const { error } = await SupabaseClient
                .from('direction')
                .update({ is_rtl: true })
                .eq('id', 1);
                toast({
                    title: 'Direction changed to right',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                    position: 'top-right',
                  });

            if (error) {
                throw error;
            }
        } catch (error) {
            console.error('Error updating table direction:', error);
        }
    };



    return (
        <VStack height={'full'} width={['100%', '100%']} align={'flex-start'} p={4} gap={2.5} rounded={'12'}>
            <Text fontWeight={'700'} fontSize={['md', 'md']}>Select chat page direction</Text>
            <RadioGroup onChange={setValue} value={value} py={2}>
                <Stack direction='row'>
                    <Radio onClick={handleChangeToRtl} colorScheme='gray' value='left' >Left</Radio>
                    <Radio onClick={handleRTL} colorScheme='gray' value='right'>Right</Radio>
                </Stack>
            </RadioGroup>
            <Text fontWeight={'700'} fontSize={['md', 'md']}>User chat theme</Text>
            <VStack border={'1px solid black'} borderRadius={'8'} width={'full'} align={'flex-start'} p={1.5} gap={4} >
                <Colour property={'Chat text color'} color={color} setColor={setColor} />
                <Colour property={'Chat box color'} color={color2} setColor={setColor2} />
            </VStack>
            <Text fontWeight={'700'} fontSize={['md', 'md']}>Bot chat theme</Text>
            <VStack border={'1px solid black'} borderRadius={'8'} width={'full'} align={'flex-start'} p={1.5} gap={4} >
                <Colour property={'Chat text color'} color={color3} setColor={setColor3} />
                <Colour property={'Chat box color'} color={color4} setColor={setColor4} />
            </VStack>
            <HStack justifyContent={'space-between'} width={'full'} px={1} >
                <Colour property={'Chat bubble color'} color={color5} setColor={setColor5} />
            </HStack>
        </VStack>
    );
};

