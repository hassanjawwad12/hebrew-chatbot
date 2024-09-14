import React from 'react';
import { VStack, Text, Spacer, HStack, Image, Box ,Icon} from '@chakra-ui/react';
import { BsRobot } from "react-icons/bs";
import {Footer} from './Footer'
import { createClient, SupabaseClient } from '@supabase/supabase-js';

//connecting to supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY as string;
const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);


export const Chat: React.FC = () => {
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
   

    return (
        <VStack width={['100%', '100%']} height="100vh" align='center' p={['0','0','0', '4']} bg="#00000066" >
            <VStack width={['full', 'full', 'full', '720px']} height={['100%','100%','100%', '95%']} bg='white' borderRadius={['0','0','0','20']} >
                <VStack borderRadius={['0','0','0', '20']} bg={selectedColor} width={'full'} px={2} align={'flex-start'} py={2} paddingX={4}>
                    <HStack width={'full'} justifyContent={'space-between'} p={2} mt={5}>
                        <Icon 
                            as={BsRobot} 
                            w={10} 
                            h={10} 
                            color={'#A09A9B'}
                        />
                        <Image src='people.png' alt="profile" width={150} height={'auto'} />
                    </HStack>
                    <Spacer />
                    <Text textAlign={'left'} color={'#A09A9B'} fontWeight={'700'} fontSize={['lg', '36px']}>Hello There.</Text>
                    <Text textAlign={'left'} color={'#FFFFFF'} fontWeight={'700'} fontSize={['lg', '36px']}>Excited to explore?</Text>
                    <Spacer />
                    <Box height={'1vh'} />
                </VStack>
                <VStack border={'1px solid grey'} justifyContent={['center', 'none']} align={'center'} height={['60%', '70%', '70%', '320px']} width={'85%'} borderRadius={'12'} mt={10}>
                    <Image src='tech.jpg' alt="profile" width={['200px', '450px', '450px', '352px']} mt={4} />
                    <Text textAlign={'left'} fontWeight={'700'}> Lorem ipsum dolor </Text>
                    <Text textAlign={'center'} >Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
                </VStack>
               <Footer />
            </VStack>
        </VStack>
    );
};

