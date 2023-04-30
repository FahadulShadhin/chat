import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Text } from '@chakra-ui/layout';
import { BellIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { useDisclosure } from '@chakra-ui/hooks';
import { useToast } from '@chakra-ui/toast';
import {
	Button,
	Tooltip,
	Menu,
	MenuButton,
	MenuList,
	Avatar,
	MenuItem,
	MenuDivider,
	Input,
} from '@chakra-ui/react';
import {
	Drawer,
	DrawerBody,
	DrawerContent,
	DrawerHeader,
	DrawerOverlay,
} from '@chakra-ui/modal';
import { Spinner } from '@chakra-ui/spinner';
import { ChatState } from '../../Context/ChatProvider';
import ProfileModal from '../miscellaneous/ProfileModal';
import ChatLoading from '../ChatLoading';
import UserListItem from '../User/UserListItem';

const SideDrawer = () => {
	const [search, setSearch] = useState('');
	const [searchResult, setSearchResult] = useState([]);
	const [loading, setLoading] = useState(false);
	const [loadingChat, setLoadingChat] = useState(false);
	const { user, setSelectedChat, chats, setChats } = ChatState();
	const toast = useToast();
	const navigate = useNavigate();
	const { isOpen, onOpen, onClose } = useDisclosure();

	const logoutHandler = () => {
		localStorage.removeItem('userInfo');
		navigate('/');
	};

	const handleSearch = async () => {
		if (!search) {
			toast({
				title: 'Please Enter something in search',
				status: 'warning',
				duration: 5000,
				isClosable: true,
				position: 'top-left',
			});
			return;
		}

		try {
			setLoading(true);

			const config = {
				headers: {
					Authorization: `Bearer ${user.token}`,
				},
			};

			const { data } = await axios.get(`/api/user?search=${search}`, config);

			setLoading(false);
			setSearchResult(data);
		} catch (error) {
			toast({
				title: 'Error Occured!',
				description: 'Failed to Load the Search Results',
				status: 'error',
				duration: 5000,
				isClosable: true,
				position: 'bottom-left',
			});
		}
	};

	const accessChat = async (userId) => {
		try {
			setLoadingChat(true);
			const config = {
				headers: {
					'Content-type': 'application/json',
					Authorization: `Bearer ${user.token}`,
				},
			};
			const { data } = await axios.post(`/api/chat`, { userId }, config);
			console.log(data);

			if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
			setLoadingChat(false);
			setSelectedChat(data);
			onClose();
		} catch (error) {
			toast({
				title: 'Error fetching the chat',
				description: error.message,
				status: 'error',
				duration: 5000,
				isClosable: true,
				position: 'bottom-left',
			});
		}
	};

	return (
		<>
			<Box
				display="flex"
				justifyContent="space-between"
				alignItems="center"
				bg="white"
				w="100%"
				p="5px 10px 5px 10px"
				borderWidth="5px"
			>
				<Tooltip
					label="search users to chat"
					hasArrow
					placeContent="bottom-end"
				>
					<Button variant="ghost" bg="gray.100" onClick={onOpen}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 50 50"
							width="30px"
							height="30px"
						>
							<path d="M 21 3 C 11.601563 3 4 10.601563 4 20 C 4 29.398438 11.601563 37 21 37 C 24.355469 37 27.460938 36.015625 30.09375 34.34375 L 42.375 46.625 L 46.625 42.375 L 34.5 30.28125 C 36.679688 27.421875 38 23.878906 38 20 C 38 10.601563 30.398438 3 21 3 Z M 21 7 C 28.199219 7 34 12.800781 34 20 C 34 27.199219 28.199219 33 21 33 C 13.800781 33 8 27.199219 8 20 C 8 12.800781 13.800781 7 21 7 Z" />
						</svg>
						<Text px="4">Search user</Text>
					</Button>
				</Tooltip>
				<Text fontSize="2xl" as="b">
					CHAT
				</Text>

				<div>
					<Menu>
						<MenuButton p="1">
							<BellIcon fontSize="2xl" m="1" />
						</MenuButton>
						{/* <MenuList></MenuList> */}
					</Menu>

					<Menu>
						<MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
							<Avatar
								size="sm"
								cursor="pointer"
								name={user.name}
								src={user.picture}
							/>
						</MenuButton>

						<MenuList>
							<ProfileModal user={user}>
								<MenuItem>Profile</MenuItem>
							</ProfileModal>
							<MenuDivider />
							<MenuItem onClick={logoutHandler}>Logout</MenuItem>
						</MenuList>
					</Menu>
				</div>
			</Box>

			<Drawer placement="left" onClose={onClose} isOpen={isOpen}>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
					<DrawerBody>
						<Box display="flex" pb="2">
							<Input
								placeholder="Search by name or email"
								mr={2}
								value={search}
								onChange={(e) => setSearch(e.target.value)}
							/>
							<Button onClick={handleSearch}>Go</Button>
						</Box>
						{loading ? (
							<ChatLoading />
						) : (
							searchResult?.map((user) => (
								<UserListItem
									key={user._id}
									user={user}
									handleFunction={() => accessChat(user._id)}
								/>
							))
						)}
						{loadingChat && <Spinner ml="auto" d="flex" />}
					</DrawerBody>
				</DrawerContent>
			</Drawer>
		</>
	);
};

export default SideDrawer;
