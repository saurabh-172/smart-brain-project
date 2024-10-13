import {
    Button,
    Card,
    Avatar,
    Stack,
    CardBody,
    Center,
    VStack,
    FormControl,
    FormLabel,
    Input
} from '@chakra-ui/react'
import { useFormik } from 'formik';
import {useContext} from 'react';
import { profileSaveContext } from '../App';

export const Profile = () => {
    const {handleProfileSave, user} = useContext(profileSaveContext);

    const formik = useFormik({
        initialValues: {
          email: user.email,
          username: user.username,
          avatar: user.avatar
        },
        onSubmit: (values) => {
            fetch(`http://localhost:3000/profile/:${user.id}`,{
                method:'post',
                headers: {'Content-Type': 'application/json'},
                body:JSON.stringify({
                    id: user.id,
                    email: values.email,
                    username: values.username,
                    avatar: values.avatar
                })
            })
            .then(res=>res.json())
            .then(updateduser=>{
                // console.log(data) 
                handleProfileSave(updateduser)
            }) 
            .catch(err=>console.log('something went wrong'))
        }
      });

    return (
        <Center mt={10}>
            <Card
                direction={{ base: 'column', sm: 'row' }}
                overflow='hidden'
                variant='outline'
                p={5}
                align='center'
                maxW='3xl'
                >
                <Avatar bg='teal.500' size='2xl' src={user.avatar}/>
                <Stack>
                    <CardBody>
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
                                <FormLabel htmlFor="text">Username</FormLabel>
                                <Input
                                    id="username"
                                    name="username"
                                    type="text"
                                    variant="filled"
                                    onChange={formik.handleChange}
                                    value={formik.values.username}
                                />
                                </FormControl>
                                <FormControl>
                                <FormLabel htmlFor="link">Avatar Url</FormLabel>
                                <Input
                                    id="avatar"
                                    name="avatar"
                                    type="link"
                                    variant="filled"
                                    onChange={formik.handleChange}
                                    value={formik.values.avatar}
                                />
                                </FormControl>
                                <Button variant='outline' colorScheme='green' type='submit'>
                                    Save Changes
                                </Button>
                            </VStack>
                        </form>
                    </CardBody>
                    {/* <CardFooter justifyContent='center'>
                    </CardFooter> */}
                </Stack>
            </Card>
        </Center>
    );
}