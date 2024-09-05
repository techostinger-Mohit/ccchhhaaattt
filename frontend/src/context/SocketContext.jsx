import React, { createContext, useState, useEffect, useContext, useCallback } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => {
	return useContext(SocketContext);
};



export const SocketContextProvider = ({ children }) => {
	const [socket, setSocket] = useState(null);
	const [onlineUsers, setOnlineUsers] = useState([]);
	const { authUser } = useAuthContext();
	const [message, setMessage] = useState([]

	)
	// const MessageRec=useCallback((msg)=>{
	// 	console.log("Message recived from server");
	// 	const {message} = JSON.parse(msg);
	// 	setmessage((prev)=> [...prev,message])

	// },[])
	const MessageRec = useCallback((msg) => {
		console.log("Message received from server");
		const { message } = JSON.parse(msg);
		setMessage((prev) => [...prev, message]);
	}, []);

	useEffect(() => {
		if (authUser) {
			const socket = io("http://localhost:8800", {
				query: {
					userId: authUser._id,
				},
			});


			setSocket(socket);
			socket.on('message', MessageRec);
			// socket.on() is used to listen to the events. can be used both on client and server side
			socket.on("getOnlineUsers", (users) => {
				setOnlineUsers(users);
			});

			return () => socket.close();
		} else {
			if (socket) {
				socket.close();
				socket.off("meaasge", MessageRec);
				setSocket(null);
			}
		}
	}, [authUser]);

	return <SocketContext.Provider value={{ socket, onlineUsers, message }}>{children}</SocketContext.Provider>;
};
