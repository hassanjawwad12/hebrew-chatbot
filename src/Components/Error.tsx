import React from 'react';
import { Alert, AlertIcon, AlertTitle, AlertDescription, VStack } from '@chakra-ui/react';

export const ErrorPage: React.FC = () => {
    return (
        <VStack width="100%" height="100vh" align='center' justifyContent='center' bg="gray.800" >
            <Alert
                status='error'
                variant='subtle'
                w='50%'
                flexDirection='column'
                alignItems='center'
                justifyContent='center'
                textAlign='center'
                height='400px'
                rounded={42}
            >
                <AlertIcon boxSize='80px' mr={0} />
                <AlertTitle mt={4} mb={1} fontSize='2xl'>
                    Page does not Exist!
                </AlertTitle>
                <AlertDescription maxWidth='sm' mt={6} fontWeight={'semibold'}>
                    Kindly put in the correct route
                </AlertDescription>
            </Alert>
        </VStack>
    );
};