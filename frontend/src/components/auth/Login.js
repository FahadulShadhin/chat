import React, { useState, useId } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FormControl, VStack, Button, useToast } from '@chakra-ui/react';
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input';

const Login = () => {
	const [show, setShow] = useState(false);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const toast = useToast();
	const navigate = useNavigate();
	const id = useId();

	const handlePassShowClick = () => setShow(!show);

	const submitHandler = async () => {
		setLoading(true);
		if (!email || !password) {
			toast({
				title: 'Please Fill all the Feilds',
				status: 'warning',
				duration: 5000,
				isClosable: true,
				position: 'bottom',
			});
			setLoading(false);
			return;
		}

		try {
			const config = {
				headers: {
					'Content-type': 'application/json',
				},
			};

			const { data } = await axios.post(
				'/api/user/login',
				{ email, password },
				config
			);
			toast({
				title: 'Login Successful',
				status: 'success',
				duration: 5000,
				isClosable: true,
				position: 'bottom',
			});
			localStorage.setItem('userInfo', JSON.stringify(data));
			setLoading(false);
			navigate('/chats');
		} catch (error) {
			toast({
				title: 'Error Occured!',
				description: error.response.data.message,
				status: 'error',
				duration: 5000,
				isClosable: true,
				position: 'bottom',
			});
			setLoading(false);
		}
	};

	return (
		<VStack spacing="5px">
			<FormControl id={id + '-email'} isRequired pb={5}>
				<Input
					value={email}
					type="email"
					onChange={(event) => setEmail(event.target.value)}
					placeholder="Email"
				/>
			</FormControl>
			<FormControl id={id + '-password'} isRequired pb={5}>
				<InputGroup size="md">
					<Input
						value={password}
						onChange={(event) => setPassword(event.target.value)}
						type={show ? 'text' : 'password'}
						placeholder="Password"
					/>
					<InputRightElement width="4.5rem">
						<Button h="1.75rem" size="sm" onClick={handlePassShowClick}>
							{show ? 'Hide' : 'Show'}
						</Button>
					</InputRightElement>
				</InputGroup>
			</FormControl>
			<Button
				colorScheme="blue"
				width="100%"
				onClick={submitHandler}
				isLoading={loading}
			>
				Login
			</Button>
		</VStack>
	);
};

export default Login;
