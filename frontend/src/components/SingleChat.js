import React from 'react';
import { ChatState } from '../Context/ChatProvider';
import { IconButton } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { Box, Text } from '@chakra-ui/layout';
import { getSender, getSenderFull } from '../config/ChatLogics';
import ProfileModal from './miscellaneous/ProfileModal';
import UpdateGroupChatModal from './miscellaneous/UpdateGroupChatModal';

const SingleChat = ({ fetchAgain, setFecthAgain }) => {
	const { user, selectedChat, setSelectedChat } = ChatState();
	return (
		<>
			{selectedChat ? (
				<>
					<Text
						fontSize={{ base: '28px', md: '30px' }}
						pb="3"
						px="2"
						w="100%"
						display="flex"
						justifyContent={{ base: 'space-between' }}
						alignItems="center"
					>
						<IconButton
							display={{ base: 'flex', md: 'none' }}
							icon={<ArrowBackIcon />}
							onClick={() => setSelectedChat('')}
						/>
						{!selectedChat.isGroupChat ? (
							<>
								{getSender(user, selectedChat.users)}
								<ProfileModal user={getSenderFull(user, selectedChat.users)} />
							</>
						) : (
							<>
								{selectedChat.chatName}
								<UpdateGroupChatModal
									fetchAgain={fetchAgain}
									setFecthAgain={setFecthAgain}
								/>
							</>
						)}
					</Text>

					<Box
						display="flex"
						flexDir="column"
						justifyContent="center"
						alignItems="center"
						p="3"
						bg="#E8E8E8"
						w="100%"
						h="100%"
						borderRadius="lg"
						overflow="hidden"
					>
						Messages here...
					</Box>
				</>
			) : (
				<Box
					display="flex"
					alignItems="center"
					justifyContent="center"
					h="100%"
				>
					<Text fontSize="3xl" pb="3" color="gray">
						Click on a user to start chat...
					</Text>
				</Box>
			)}
		</>
	);
};

export default SingleChat;
