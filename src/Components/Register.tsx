import { useFormik } from "formik";
import {
  Box,
  Button,
  useColorModeValue,
  Flex,
  FormControl,
  FormLabel,
  Input,
  VStack
} from "@chakra-ui/react";
import {useContext } from 'react';
import { RegisterContext } from "../App";

export const Register = () => {
    const {handleSignIn ,handleLoggedIn, loadUser } = useContext(RegisterContext);
  const formik = useFormik({
    initialValues: {
        username: "",
      email: "",
      password: ""
    },
    onSubmit: (values) => {
        fetch('https://smart-brain-api-project.onrender.com/register',{
            method: 'post',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: values.email,
                password: values.password,
                username: values.username
            })
        })
        .then(res => res.json())
        .then(user => {
            if(user.id){
                loadUser(user);
                handleLoggedIn();
            }
        })
        .catch(err => console.log('something went wrong'))
    //   alert(JSON.stringify(values, null, 2));
    }
  });
  return (
    <Flex align="center" justify="center" h="100vh">
        <Box bg={useColorModeValue('dark.200','light.200')} p={6} rounded="md" border='1px'>
            <form onSubmit={formik.handleSubmit}>
                <VStack spacing={4} align="flex-start">
                    <FormControl isRequired>
                    <FormLabel htmlFor="text">User Name</FormLabel>
                    <Input
                        id="username"
                        name="username"
                        type="text"
                        variant="filled"
                        onChange={formik.handleChange}
                        value={formik.values.username}
                    />
                    </FormControl>
                    <FormControl isRequired>
                    <FormLabel htmlFor="email">Email Address</FormLabel>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        variant="filled"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                    />
                    </FormControl>
                    <FormControl isRequired>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <Input
                        id="password"
                        name="password"
                        type="password"
                        variant="filled"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                    />
                    </FormControl>
                    <Button type="submit" colorScheme="purple" width="full">
                        Register
                    </Button>
                </VStack>
            </form>
            <Box as="span" fontSize='sm' marginTop='2px'>
                Already have an account?
                <Button colorScheme="purple" variant='link' onClick={ handleSignIn }>
                    Signin
                </Button>
            </Box>
        </Box>
    </Flex>
  );
}