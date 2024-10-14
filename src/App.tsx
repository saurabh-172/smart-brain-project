import * as React from "react"
import {useState, createContext } from 'react'

import {
  Box,
  Button,
  ButtonGroup,
  Spacer,
  Flex
} from "@chakra-ui/react"
import { ColorModeSwitcher } from "./ColorModeSwitcher"
import { Facedetect } from "./Components/Facedetect"
import { Signin } from "./Components/Signin"
import { Register } from "./Components/Register"
import { ProfileIcon } from "./Components/ProfileIcon"
import { Profile } from "./Components/Profile"

const skeletonUser = {
  id: '',
  username: '',
  email: '',
  entries: 0,
  joined: '',
  avatar: ''
}

export const SignContext = createContext<{handleRegister: () => void; handleLoggedIn: ()=>void; loadUser: (data: UserType) => void;}>({ handleRegister: () => {}, handleLoggedIn:()=>{}, loadUser:()=>{}});
export const RegisterContext = createContext<{handleSignIn: () => void; handleLoggedIn: ()=>void; loadUser: (data: UserType) => void;}>({ handleSignIn: () => {}, handleLoggedIn:()=>{}, loadUser: ()=>{}});
export const profileContext = createContext<{handleLoggedOut: () => void;handleProfileOpen: () => void; user:UserType;}>({ handleLoggedOut: () => {}, handleProfileOpen: () => {},user:skeletonUser});
export const profileSaveContext= createContext<{handleProfileSave: (updateduser:UserType) =>void;user: UserType;}>({handleProfileSave: () => {}, user: skeletonUser})
export const mainPageContext = createContext<{user: UserType; setUser:(user: UserType) => void;}>({user: skeletonUser,setUser: ()=>{}});

// export const loggedInContext = createContext<{handleLoggedIn: () => void}>({ handleLoggedIn: () => {} });
// export const loggingContext = createContext<{handleLoggedIn:()=>void; handleLoggedOut: () => void;}>({ handleLoggedIn:()=>{}, handleLoggedOut:()=>{},})

interface UserType{
  id: string | number;
  username: string;
  email: string;
  entries: number;
  joined: string;
  avatar: string;
}

export const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSignIn, setShowSignIn] = useState(true);
  const [showProfile, setShowProfile] = useState(false);
  const [user, setUser] = useState<UserType>(skeletonUser)

  const loadUser = (data: UserType) => {
    setUser({
      id: data.id,
      username: data.username,
      email: data.email,
      entries: data.entries,
      joined: data.joined,
      avatar: data.avatar
    } as UserType)
  }

  const handleProfileOpen = () => {
    setShowProfile(true);
  }
  
  const handleProfileSave = (updateduser:UserType) => {
    setUser({...user, ...updateduser})
    setShowProfile(false);
  }

  const handleLoggedOut = () => {
    setUser(skeletonUser)
    setShowProfile(false)
    setIsLoggedIn(false)
  }

  const handleLoggedIn = () => {
    setIsLoggedIn(true)
  }

  const handleRegister = () => {
    setShowSignIn(false)
  }

  const handleSignIn = () => {
    setShowSignIn(true)
  }

  return (
  <Box textAlign="center" fontSize="xl">
    <Flex minWidth='max-content' alignItems='center' gap='2' p={3}>
      <Box p='2'>
        Smart-Brain
      </Box>
      <Spacer />
      { isLoggedIn ? <profileContext.Provider value={{handleLoggedOut, handleProfileOpen,user}}><ProfileIcon /></profileContext.Provider> : 
        <ButtonGroup gap='2'>
          <Button colorScheme='teal' variant='link' onClick = {handleRegister}>Sign Up</Button>
          <Button colorScheme='teal' variant='link' onClick = {handleSignIn}>Log in</Button>
        </ButtonGroup> 
      }
      <ColorModeSwitcher justifySelf='flex-end'/>
    </Flex>
    
    {showProfile? <profileSaveContext.Provider value={{handleProfileSave, user }}><Profile /></profileSaveContext.Provider> : (isLoggedIn ? <mainPageContext.Provider value={{user, setUser}}><Facedetect /></mainPageContext.Provider> : ( showSignIn ? <SignContext.Provider value={{handleRegister, handleLoggedIn, loadUser}}><Signin /></SignContext.Provider> : <RegisterContext.Provider value={{handleSignIn ,handleLoggedIn, loadUser}}> <Register /> </RegisterContext.Provider>)) }

  </Box>
  );
}
