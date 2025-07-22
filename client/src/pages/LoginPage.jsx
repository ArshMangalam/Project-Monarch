// client/src/pages/LoginPage.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
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


const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      const res = await axios.get(`${API_URL}/api/auth/login`, config);
      // Store the token in localStorage
      localStorage.setItem('token', res.data.token);
      alert('Login successful!');
      // Redirect to a future dashboard page
      navigate('/dashboard');
    } catch (err) {
      console.error(err.response.data);
      alert('Error logging in!');
    }
  };

  return (
    <Container centerContent bg="brand.900" minH="100vh" color="white" justify="center">
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
            <Stack align={'center'}>
                <Heading fontSize={'4xl'} color="brand.gold">Log in to your account</Heading>
                <Text fontSize={'lg'} color={'gray.500'}>
                    to continue your journey ⚔️
                </Text>
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
                            required
                            bg="brand.900"
                            borderColor="brand.700"
                        />
                    </FormControl>
                    <Stack spacing={10}>
                        <Button
                            type="submit"
                            bg={'brand.blue'}
                            color={'white'}
                            _hover={{ bg: 'blue.500' }}
                        >
                            Log in
                        </Button>
                    </Stack>
                    <Stack pt={6}>
                        <Text align={'center'}>
                            Not a Hunter yet? <ChakraLink as={RouterLink} to="/register" color={'brand.blue'}>Awaken</ChakraLink>
                        </Text>
                    </Stack>
                </Stack>
            </Box>
        </Stack>
    </Container>
);
};

export default LoginPage;