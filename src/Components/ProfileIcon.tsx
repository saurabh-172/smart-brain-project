import { 
    Avatar,
    Popover,
    PopoverTrigger,
    Button,
    Portal,
    PopoverContent,
    PopoverArrow,
    PopoverBody,
    VStack,
} from '@chakra-ui/react';

import {useContext} from 'react';
import { profileContext } from '../App';

export const ProfileIcon = () => {
    const { handleLoggedOut, handleProfileOpen, user } = useContext(profileContext)
    return (
        <Popover>
            <PopoverTrigger>
                <Avatar bg='teal.500' src={user.avatar}/>
            </PopoverTrigger>
            <Portal>
                <PopoverContent>
                    <PopoverArrow />
                    <PopoverBody alignContent='center' alignSelf='center'>
                        <VStack>
                            <Button colorScheme='teal' variant='link' onClick={handleProfileOpen}>Profile</Button>
                            <Button colorScheme='teal' variant='link' onClick={handleLoggedOut}>Sign Out</Button>
                        </VStack>
                    </PopoverBody>
                </PopoverContent>
            </Portal>
        </Popover>
    );
}