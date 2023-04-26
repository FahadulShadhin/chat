import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	Container,
	Box,
	Tab,
	Tabs,
	TabPanel,
	TabPanels,
	TabList,
	Center,
} from '@chakra-ui/react';
import Signup from '../components/auth/Signup';
import Login from '../components/auth/Login';

const Home = () => {
	const navigate = useNavigate();

	useEffect(() => {
		const userInfo = JSON.parse(localStorage.getItem('userInfo'));

		if (userInfo) {
			navigate('/chats');
		}
	}, [navigate]);

	return (
		<Container maxW="xl" centerContent>
			<Box
				d="flex"
				justifyContent="center"
				p={3}
				bg="white"
				w="100%"
				m="40px 0 15px 0"
				borderRadius="lg"
				borderWidth="1px"
			>
				<Center fontSize="3xl" color="black">
					CHAT
				</Center>
			</Box>
			<Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
				<Tabs isFitted variant="soft-rounded">
					<TabList mb="1em">
						<Tab _selected={{ color: 'black', bg: 'blue.100' }}>Login</Tab>
						<Tab _selected={{ color: 'black', bg: 'blue.100' }}>Sign Up</Tab>
					</TabList>
					<TabPanels>
						<TabPanel>
							<Login />
						</TabPanel>
						<TabPanel>
							<Signup />
						</TabPanel>
					</TabPanels>
				</Tabs>
			</Box>
		</Container>
	);
};

export default Home;
