import { useFormik } from 'formik';
import {HStack,FormControl,Input,Button, InputGroup, InputLeftAddon, Box, Grid,Center, Image, Text, Stack} from '@chakra-ui/react';

import {useState} from 'react';
import {useContext} from 'react';
import { mainPageContext } from '../App';

interface box {
    topRow:number;
    rightCol:number;
    bottomRow: number;
    leftCol: number;
}

export const Facedetect = () => {
    const { user, setUser } = useContext(mainPageContext)
    const [boxes, setBoxes] = useState<box[]>([])
    const [imgurl, setImgurl] = useState('')

    const calculateFaceLocations = (data:any) =>{
        const image = document.getElementById('inputimage');
        const w = Number(image?.clientWidth)
        const h = Number(image?.clientHeight);
        return data.outputs[0].data.regions.map((face:any)=>{
            const clarifaiFace = face.region_info.bounding_box;
            return {
                leftCol: clarifaiFace.left_col*w,
                rightCol: w-(clarifaiFace.right_col*w),
                topRow: clarifaiFace.top_row*h,
                bottomRow: h-(clarifaiFace.bottom_row*h)
            }
        });
    }

    const formik = useFormik({
        initialValues: {
          url: "",
        },
        onSubmit: (values) => {
            fetch('https://smart-brain-api-project.onrender.com/imageurl',{
                method: 'post',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({
                    input: imgurl
                })
            }).then(res => res.json())
            .then(res => {
                if (res){
                    fetch('https://smart-brain-api-project.onrender.com/image',{
                        method:'put',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            id: user.id
                        })
                    }).then(res => res.json())
                    .then(count => {
                        setUser({...user, entries: count })
                    })
                    .catch(err=>console.log('something went wrong'))
                }
                setBoxes(calculateFaceLocations(res))
            })
            .catch(err => console.log(err))
        }
      });

    return (
        <Box w='100%'>
            <Center p={10}>
                <Stack spacing={3}>
                <Text fontSize='3xl'>{user.username}, Your current entry count is: <Text fontSize='4xl' as='mark' p={1}>{user.entries}</Text></Text>
                <Text fontSize='2xl'>This Magic Brain will detect faces in your provided Image links. Give it a try below.</Text>
                </Stack>
            </Center>
        <Grid templateRows='repeat(2,0.5fr)' w='100%' gap={6}>
        <Center>
        <Box w='80%' mt={5}>
        <form onSubmit={formik.handleSubmit}>
            <HStack alignItems='center' spacing={0}>
                <FormControl w='100%'>
                {/* <FormLabel htmlFor="email">Image Url:</FormLabel> */}
                <InputGroup >
                <InputLeftAddon>Image Url:</InputLeftAddon>
                <Input
                    id="imglink"
                    name="imglink"
                    variant="filled"
                    // onChange={formik.handleChange}
                    onChange={(event:React.ChangeEvent<HTMLInputElement>) => {
                        formik.handleChange(event);
                        setImgurl(event.target.value)
                        setBoxes([])
                    }}
                    value={imgurl}
                />
                {/* <InputRightAddon><Button colorScheme='teal' variant='link'>Detect</Button></InputRightAddon> */}
                </InputGroup>
                </FormControl>
                <Button type="submit" colorScheme='teal' variant='outline'>Detect</Button>
            </HStack>
        </form>
        </Box>
        </Center>
        <Center>
            <Box position='relative'>
                <Image src={imgurl} alt='' maxBlockSize='sm' objectFit='contain' id='inputimage'/>
                {boxes.map(box => 
                    <Box as='div' key={`box${box.topRow}${box.rightCol}`} display='flex' flexWrap='wrap' justifyContent='center' position='absolute' top={box.topRow} right={box.rightCol} bottom={box.bottomRow} left={box.leftCol} border='2px solid blue'></Box>
                )}
            </Box>
        </Center>
        </Grid>
        </Box>
    );

}

// https://plus.unsplash.com/premium_photo-1661715812379-23d652805042?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
// https://images.unsplash.com/photo-1676563110936-9d902b6eb937?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
