// client/src/components/Navbar.jsx
import React from 'react';
import { Box, Flex, Heading, Spacer, Button, Link as ChakraLink } from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <Flex as="nav" p="4" bg="brand.800" color="white" alignItems="center">
            <Box>
                <Heading size="md" color="brand.gold">Project: Monarch</Heading>
            </Box>
            <Spacer />
            <Box>
                {token ? (
                    <Button onClick={handleLogout} colorScheme="blue">Logout</Button>
                ) : (
                    <>
                        <ChakraLink as={RouterLink} to="/login" mr={4}>
                            <Button variant="ghost">Login</Button>
                        </ChakraLink>
                        <ChakraLink as={RouterLink} to="/register">
                            <Button variant="ghost">Register</Button>
                        </ChakraLink>
                    </>
                )}
            </Box>
        </Flex>
    );
};

export default Navbar;