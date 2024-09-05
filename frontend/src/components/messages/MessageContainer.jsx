import { useEffect, useState } from "react";
import useConversation from "../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";
import { useAuthContext } from "../../context/AuthContext";
import { useSocketContext } from "../../context/SocketContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import  image  from '../../../dist/assets/kk.svg';

const MessageContainer = () => {
	const { selectedConversation, setSelectedConversation } = useConversation();
	const { onlineUsers } = useSocketContext();
	useEffect(() => {
		// cleanup function (unmounts)
		return () => setSelectedConversation(null);
	}, [setSelectedConversation]);


	const [dropdownVisible, setDropdownVisible] = useState(false);

	const toggleDropdown = () => {

		setDropdownVisible(!dropdownVisible);
	};

	return (
		<div className='w-screen flex flex-col gap-0 drop-shadow-lg  rounded-2xl  '>
			{!selectedConversation ? (
				<NoChatSelected />
			) : (
				// bg-gradient-to-b from-pink-100 to-transparent
				<>
					{/* Header */}
					<div className=' relative bg-white px-5 py-5 flex space-x-2  online shadow-pink-200'>
						<img
							src="https://avatar.iran.liara.run/public/boy?username=Mohit123"
							alt="Avatar"
							className='w-6 h-6 rounded-full'
						/>

						<div className="flex justify-between w-full">
							<span className='text-gray-900 font-bold'>{selectedConversation.fullName}</span>
							<span className="ml-auto">
								<FontAwesomeIcon icon={faEllipsisVertical} onClick={toggleDropdown} className="cursor-pointer" />
							</span>

						</div>
					</div>
					
					{dropdownVisible && (
						<div className="absolute right-0 mt-12 z-20 mr-5 w-48 bg-white border overflow-hidden border-pink-300 rounded-lg shadow-lg z-10 drop-shadow-lg">
							<ul className="py-1 overflow-hidden flex flex-col items-start z-20 w-full">
								<button className="px-4 py-2 text-black hover:bg-pink-100 cursor-pointer w-full text-left"><li >Report</li></button>
								<button className="px-4 py-2 text-black hover:bg-pink-100 cursor-pointer w-full text-left"><li >Block</li></button>
								<button className="px-4 py-2 text-black hover:bg-pink-100 cursor-pointer w-full text-left"><li >Mute</li></button>
								<button className="px-4 py-2 text-black hover:bg-pink-100 cursor-pointer w-full text-left"><li >Clean</li></button>
							</ul>
						</div>
					)}
					<Messages />
					<MessageInput />
				</>
			)}
		</div>
	);
};

export default MessageContainer;

const NoChatSelected = () => {
	const { authUser } = useAuthContext();
	return (
		<div className='flex items-center justify-center w-full h-full'>
			<div className='px-4 text-center sm:text-lg md:text-xl text-black font-semibold flex flex-col items-center gap-2'>
				<TiMessages className='text-3xl md:text-6xl text-center' />
				{/* <img src={image} alt="Message Icon" className='text-5xl md:text-9xl border-4xl text-center bg-pink-400' /> */}
				<p>Select a chat  </p>
				<p className="text-gray-300" >Nothing is selected</p>

			</div>
		</div>
	);
};


