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
import { SignContext } from "../App";

export const Signin = () => {
  const { handleRegister, handleLoggedIn, loadUser } = useContext(SignContext);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    onSubmit: (values) => {
        fetch('http://localhost:3000/signin',{
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            email: values.email,
            password: values.password
          })
        })
        .then(res => res.json())
        .then(data =>{
          if(data.id){
            loadUser(data)
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
                    Login
                    </Button>
                </VStack>
            </form>
            <Box as="span" fontSize='sm' marginTop='2px'>
                Don't have an account?
                <Button colorScheme="purple" variant='link' onClick={ handleRegister }>
                    Register
                </Button>
            </Box>
        </Box>
    </Flex>
  );
}