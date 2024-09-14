import React, { useState, useEffect } from 'react';
import { VStack, Stack } from '@chakra-ui/react';
import { Chatpopup } from './Chatpopup';
import { Settings } from './Settings';
import { SupabaseClient } from '../Reusable/Supabase';

export const Admin: React.FC = () => {
  const [color, setColor] = useState<string>('#0641FB');
  const [color2, setColor2] = useState<string>('#FFFFFF');
  const [color3, setColor3] = useState<string>('#0641FB');
  const [color4, setColor4] = useState<string>('#FFFFFF');
  const [color5, setColor5] = useState<string>('#000000');

  //getting the colors from supabase 
  const getColorFromSupabase = async (id: number) => {
    try {
      const { data, error } = await SupabaseClient
        .from('Themes')
        .select('color') // Only select the 'color' column
        .eq('id', id) // Filter for the specific ID
        .single(); // Fetch only the first matching record (assuming unique IDs)

      if (error) {
        console.error('Error fetching color:', error);
        return null;
      }
      if (data) {
        return data.color;

      } else {
        console.warn(`Color for ID ${id} not found`);
        return null;
      }
    } catch (error) {
      console.error('Unexpected error fetching color:', error);
      return null;
    }
  };

  //setting in app the colors from supabase
  React.useEffect(() => {
    const fetchColors = async () => {
      const color1 = await getColorFromSupabase(1);
      const color2 = await getColorFromSupabase(2);
      const color3 = await getColorFromSupabase(3);
      const color4 = await getColorFromSupabase(4);
      const color5 = await getColorFromSupabase(5);
      console.log(color1, color2, color3, color4, color5);
      setColor(color1);
      setColor2(color2);
      setColor3(color3);
      setColor4(color4);
      setColor5(color5);
    };
    fetchColors();
  }
    , []);


  const updateColorInSupabase = async (id: number, color: string) => {
    const { error } = await SupabaseClient
      .from('Themes')
      .update({ color: color })
      .match({ id: id });

    if (error) {
      console.error('Error updating color in Supabase:', error);
    }
  };

  useEffect(() => {
    updateColorInSupabase(1, color);
  }, [color]);

  useEffect(() => {
    updateColorInSupabase(2, color2);
  }, [color2]);

  useEffect(() => {
    updateColorInSupabase(3, color3);
  }, [color3]);

  useEffect(() => {
    updateColorInSupabase(4, color4);
  }, [color4]);

  useEffect(() => {
    updateColorInSupabase(5, color5);
  }, [color5]);


  return (
    <VStack width="100%" height={['200vh', '100vh']} bg="white" >
      <Stack
        direction={{ base: 'column', md: 'row' }}
        spacing={4}
        width="100%"
        height={['200vh', '100vh']}
      >
        <Settings
          color={color} setColor={setColor} color2={color2} setColor2={setColor2} color3={color3} setColor3={setColor3}
          color4={color4} setColor4={setColor4} color5={color5} setColor5={setColor5} />
        <Chatpopup color={color} color2={color2} color3={color3} color4={color4} color5={color5} />
      </Stack>
    </VStack>
  );
};