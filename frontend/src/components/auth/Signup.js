import React, { useState, useId } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
	FormControl,
	FormLabel,
	VStack,
	Button,
	useToast,
} from '@chakra-ui/react';
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input';

const Signup = () => {
	const [showPass, setShowPass] = useState(false);
	const [showConfirmPass, setShowConfirmPass] = useState(false);
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [picture, setPicture] = useState('');
	const [loading, setLoading] = useState(false);
	const toast = useToast();
	const navigate = useNavigate();
	const id = useId();

	const handlePassShowClick = () => setShowPass(!showPass);
	const handleConfirmPassShowClick = () => setShowConfirmPass(!showConfirmPass);

	const handleSubmit = async () => {
		setLoading(true);

		if (!name || !email || !password || !confirmPassword) {
			toast({
				title: 'Please fill up the fields',
				status: 'warning',
				duration: 5000,
				isClosable: true,
				position: 'bottom',
			});
			setLoading(false);
			return;
		}

		if (password !== confirmPassword) {
			toast({
				title: 'Passwords do not match',
				status: 'warning',
				duration: 5000,
				isClosable: true,
				position: 'bottom',
			});
		}

		try {
			const config = {
				headers: {
					'Content-type': 'application/json',
				},
			};

			const response = await axios.post(
				'/api/user',
				{ name, email, password, picture },
				config
			);

			localStorage.setItem('userInfo', JSON.stringify(response));
			toast({
				title: 'Registration successfull',
				status: 'success',
				duration: 5000,
				isClosable: true,
				position: 'bottom',
			});

			setLoading(false);
			navigate('/chats');
		} catch (error) {
			toast({
				title: 'Error occured!',
				description: error.response.data.message,
				status: 'error',
				duration: 5000,
				isClosable: true,
				position: 'bottom',
			});
			setLoading(false);
		}
	};

	const postDetails = async (pictures) => {
		setLoading(true);
		if (pictures === undefined) {
			toast({
				title: 'Please select an image.',
				status: 'warning',
				duration: 5000,
				isClosable: true,
				position: 'bottom',
			});
			return;
		}

		if (
			pictures.type === 'image/jpeg' ||
			pictures.type === 'image/jpg' ||
			pictures.type === 'image/png'
		) {
			const data = new FormData();

			data.append('file', pictures);
			data.append('upload_preset', 'talkit');
			data.append('cloud_name', 'dv7lwdftm');

			try {
				const res = await axios.post(
					'https://api.cloudinary.com/v1_1/dv7lwdftm/image/upload',
					data
				);
				setPicture(res.data.url.toString());
				setLoading(false);
			} catch (err) {
				console.log(err);
				setLoading(false);
			}
		} else {
			toast({
				title: 'Please select an image.',
				status: 'warning',
				duration: 5000,
				isClosable: true,
				position: 'bottom',
			});
			setLoading(false);
			return;
		}
	};

	return (
		<VStack spacing="5px">
			<FormControl id={id + '-username'} isRequired pb={5}>
				<Input
					placeholder="Username"
					onChange={(event) => setName(event.target.value)}
				/>
			</FormControl>

			<FormControl id={id + '-email'} isRequired pb={5}>
				<Input
					placeholder="Email"
					onChange={(event) => setEmail(event.target.value)}
				/>
			</FormControl>

			<FormControl id={id + '-password'} isRequired pb={5}>
				<InputGroup>
					<Input
						type={showPass ? 'text' : 'password'}
						placeholder="Password"
						onChange={(event) => setPassword(event.target.value)}
					/>
					<InputRightElement width="4.5rem">
						<Button h="1.75rem" size="sm" onClick={handlePassShowClick}>
							{showPass ? 'Hide' : 'Show'}
						</Button>
					</InputRightElement>
				</InputGroup>
			</FormControl>

			<FormControl id={id + '-confirm-password'} isRequired pb={5}>
				<InputGroup>
					<Input
						type={showConfirmPass ? 'text' : 'password'}
						placeholder="Confirm Password"
						onChange={(event) => setConfirmPassword(event.target.value)}
					/>
					<InputRightElement width="4.5rem">
						<Button h="1.75rem" size="sm" onClick={handleConfirmPassShowClick}>
							{showConfirmPass ? 'Hide' : 'Show'}
						</Button>
					</InputRightElement>
				</InputGroup>
			</FormControl>

			<FormControl id={id + '-picture'} pb={5}>
				<FormLabel>Profile picture</FormLabel>
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
				onClick={handleSubmit}
				isLoading={loading}
			>
				Sign up
			</Button>
		</VStack>
	);
};

export default Signup;
