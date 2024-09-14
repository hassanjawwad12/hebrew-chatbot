import React, { useRef, useEffect } from 'react';
import { Input, IconButton, useToast } from '@chakra-ui/react';
import { GoPaperclip } from "react-icons/go";
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { Spinner } from '@chakra-ui/react'

const API_URL = import.meta.env.VITE_API_URL;

type ChildComponentProps = {
  uuid: string;
  setUuid: React.Dispatch<React.SetStateAction<string>>;
  setUserUpload: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Upload: React.FC<ChildComponentProps> = ({ uuid, setUuid, setUserUpload }) => {

  const [loading, setLoading] = React.useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const toast = useToast();

  useEffect(() => {
    const storedUuid = sessionStorage.getItem('myUuid');
    if (storedUuid) {
      setUuid(storedUuid);
    } else {
      // If not, generate a new UUID
      const newUuid = uuidv4();
      // Store the UUID in session storage
      sessionStorage.setItem('myUuid', newUuid);
      // Update the state with the new UUID
      setUuid(newUuid);
    }
  }, []);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) {
      toast({
        title: 'No file selected',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (files.length > 3) {
      toast({
        title: 'Too many files selected',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append('file', files[i]);
    }
    formData.append('uuid', uuid);

    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/uploadFile`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast({
        title: 'File uploaded successfully',
        description: response.data.message,
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
      setUserUpload(true);
      setLoading(false);
    } catch (error) {
      toast({
        title: 'Error uploading file',
        description: 'Error occured while uploading file',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
    }
  };

  const handlePaperclipClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <>
      {loading ? <Spinner color='red.500' /> :
        <>
          <Input
            type="file"
            multiple
            ref={fileInputRef}
            onChange={handleFileUpload}
            display="none"
          />
          <IconButton
            aria-label="Upload file"
            icon={<GoPaperclip />}
            color="#100B05"
            fontSize="30px"
            onClick={handlePaperclipClick}
            variant="ghost"
          />
        </>
      }
    </>
  );
};


