// client/src/pages/RegisterPage.jsx
import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  Link as ChakraLink
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const { username, email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/register', formData);
      console.log(res.data); // Should show success message
      alert('Registration successful!');
    } catch (err) {
      console.error(err.response.data);
      alert('Error in registration!');
    }
  };

  return (
    <Container centerContent bg="brand.900" minH="100vh" color="white" justify="center">
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
            <Stack align={'center'}>
                <Heading fontSize={'4xl'} color="brand.gold">Awaken as a new Hunter</Heading>
            </Stack>
            <Box
                rounded={'lg'}
                bg={'brand.800'}
                boxShadow={'lg'}
                p={8}
                as="form"
                onSubmit={onSubmit}
            >
                <Stack spacing={4}>
                    {/* Add Username FormControl */}
                    <FormControl id="username">
                        <FormLabel>Username</FormLabel>
                        <Input
                            type="text"
                            name="username"
                            value={username}
                            onChange={onChange}
                            required
                            bg="brand.900"
                            borderColor="brand.700"
                        />
                    </FormControl>
                    <FormControl id="email">
                        <FormLabel>Email address</FormLabel>
                        <Input
                            type="email"
                            name="email"
                            value={email}
                            onChange={onChange}
                            required
                            bg="brand.900"
                            borderColor="brand.700"
                        />
                    </FormControl>
                    <FormControl id="password">
                        <FormLabel>Password</FormLabel>
                        <Input
                            type="password"
                            name="password"
                            value={password}
                            onChange={onChange}
                            minLength="6"
                            required
                            bg="brand.900"
                            borderColor="brand.700"
                        />
                    </FormControl>
                    <Stack spacing={10} pt={2}>
                        <Button
                            type="submit"
                            size="lg"
                            bg={'brand.blue'}
                            color={'white'}
                            _hover={{ bg: 'blue.500' }}
                        >
                            Register
                        </Button>
                    </Stack>
                    <Stack pt={6}>
                        <Text align={'center'}>
                            Already registered? <ChakraLink as={RouterLink} to="/login" color={'brand.blue'}>Log in</ChakraLink>
                        </Text>
                    </Stack>
                </Stack>
            </Box>
        </Stack>
    </Container>
);
};

export default RegisterPage;