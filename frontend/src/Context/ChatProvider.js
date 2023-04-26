import { createContext, useContext, useEffect, useState } from 'react';

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
	const [user, setUser] = useState();
	const [chats, setChats] = useState([]);
	const [selectedChat, setSelectedChat] = useState();

	useEffect(() => {
		const userInfo = JSON.parse(localStorage.getItem('userInfo'));
		setUser(userInfo);
	}, []);

	return (
		<ChatContext.Provider
			value={{ user, setUser, selectedChat, setSelectedChat, chats, setChats }}
		>
			{children}
		</ChatContext.Provider>
	);
};

export const ChatState = () => useContext(ChatContext);

export default ChatProvider;
