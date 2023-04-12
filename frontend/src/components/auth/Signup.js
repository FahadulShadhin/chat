import React, { useState } from 'react';
import { FormControl, FormLabel, VStack, Button } from '@chakra-ui/react';
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input';

const Signup = () => {
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
			<FormControl id="first-name" isRequired>
				<FormLabel>Name</FormLabel>
				<Input
					placeholder="Enter your name"
					onChange={(event) => setName(event.target.value)}
				/>
			</FormControl>

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

			<FormControl id="confirm-password" isRequired>
				<FormLabel>Confirm Password</FormLabel>
				<InputGroup>
					<Input
						type={show ? 'text' : 'password'}
						placeholder="********"
						onChange={(event) => setConfirmPassword(event.target.value)}
					/>
					<InputRightElement width="4.5rem">
						<Button h="1.75rem" size="sm" onClick={handleClick}>
							{show ? 'Hide' : 'Show'}
						</Button>
					</InputRightElement>
				</InputGroup>
			</FormControl>

			<FormControl id="picture">
				<FormLabel>Upload your picture</FormLabel>
				<Input
					type="file"
					p={1.5}
					accept="image/*"
					onChange={(event) => postDetails(event.target.files[0])}
				/>
			</FormControl>

			<Button
				colorScheme="blue"
				width="100%"
				style={{ marginTop: 15 }}
				onClick={handleSubmit}
			>
				Sign up
			</Button>
		</VStack>
	);
};

export default Signup;
