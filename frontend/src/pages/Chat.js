import React, { useState } from 'react';
import { Box } from '@chakra-ui/layout';
import { ChatState } from '../Context/ChatProvider';
import SideDrawer from '../components/miscellaneous/SideDrawer';
import AllChats from '../components/AllChats';
import ChatBox from '../components/ChatBox';

const Chat = () => {
	const { user } = ChatState();
	const [fetchAgain, setFecthAgain] = useState();

	return (
		<div style={{ width: '100%' }}>
			{user && <SideDrawer />}
			<Box
				display="flex"
				justifyContent="space-between"
				w="100%"
				h="91.5vh"
				p="10px"
			>
				{user && <AllChats fetchAgain={fetchAgain} />}
				{user && (
					<ChatBox fetchAgain={fetchAgain} setFecthAgain={setFecthAgain} />
				)}
			</Box>
		</div>
	);
};

export default Chat;
