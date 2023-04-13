import React, { useState } from 'react';
import { FormControl, FormLabel, VStack, Button } from '@chakra-ui/react';
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input';

const Login = () => {
	const [show, setShow] = useState(false);
	const [name, setName] = useState();
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const [confirmPassword, setConfirmPassword] = useState();

	const handleClick = () => setShow(!show);
	const handleSubmit = () => {};
	const postDetails = (pictures) => {};

	return (
		<VStack spacing="5px">
			<FormControl id="email" isRequired>
				<FormLabel>Email</FormLabel>
				<Input
					placeholder="Enter your email"
					onChange={(event) => setEmail(event.target.value)}
				/>
			</FormControl>

			<FormControl id="password" isRequired>
				<FormLabel>Password</FormLabel>
				<InputGroup>
					<Input
						type={show ? 'text' : 'password'}
						placeholder="********"
						onChange={(event) => setPassword(event.target.value)}
					/>
					<InputRightElement width="4.5rem">
						<Button h="1.75rem" size="sm" onClick={handleClick}>
							{show ? 'Hide' : 'Show'}
						</Button>
					</InputRightElement>
				</InputGroup>
			</FormControl>

			<Button
				colorScheme="blue"
				width="100%"
				style={{ marginTop: 15 }}
				onClick={handleSubmit}
			>
				Login
			</Button>
		</VStack>
	);
};

export default Login;
