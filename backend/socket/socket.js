import { Server } from "socket.io";
import http from "http";
import express from "express";
import Redis from 'ioredis'
import { channel } from "diagnostics_channel";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: ["http://localhost:3300"],
		methods: ["GET", "POST"],
	},
});


const pub = new Redis({  
    host:'caching-3d715c1-techostinger-ade2.l.aivencloud.com',
    port:'19447',
    username:'default',
    password:'AVNS_MiAu3RzCnPQVs2qbbMU'
})
const sub = new Redis({
    host:'caching-3d715c1-techostinger-ade2.l.aivencloud.com',
    port:'19447',
    username:'default',
    password:'AVNS_MiAu3RzCnPQVs2qbbMU'
})




sub.subscribe("MESSAGE");
export const getReceiverSocketId = (receiverId) => {
	return userSocketMap[receiverId];
};

const userSocketMap = {}; // {userId: socketId}

pub.on('connect', () => {
    console.log('Publisher connected to Redis');
});

sub.on('connect', () => {
    console.log('Subscriber connected to Redis');
});

pub.on('error', (err) => {
    console.error('Publisher Redis error:', err);
});

sub.on('error', (err) => {
    console.error('Subscriber Redis error:', err);
});
 
io.on("connection", (socket) => {
	console.log("Connection event fired");
	console.log("a user connected", socket.id);

	const userId = socket.handshake.query.userId;
	if (userId != "undefined") userSocketMap[userId] = socket.id;

	// io.emit() is used to send events to all the connected clients
	io.emit("getOnlineUsers", Object.keys(userSocketMap));

	// socket.on() is used to listen to the events. can be used both on client and server side
	socket.on("disconnect",async (message) => {
		await pub.publish("MESSAGE", JSON.stringify({ message }));
		console.log(`Message published to Redis: ${message}`);
		console.log("user disconnected", socket.id);
		delete userSocketMap[userId];
		io.emit("getOnlineUsers", Object.keys(userSocketMap));
	});
	setTimeout(() => {
		pub.publish("MESSAGE", JSON.stringify({ message: "Test message from server" }));
	}, 5000);


	
	// socket.on("disconnect", async () => {
	// 	const customMessage = `User with socket ID ${socket.id} disconnected`;
	// 	console.log(`Publishing message to Redis: ${customMessage}`);
		
	// 	await pub.publish("MESSAGE", JSON.stringify({ message: customMessage }));
		
	// 	console.log(`Message published to Redis: ${customMessage}`);
	// 	console.log("user disconnected", socket.id);
	// 	delete userSocketMap[userId];
	// 	io.emit("getOnlineUsers", Object.keys(userSocketMap));
	// });
	  
});

sub.on("message",(channel,message)=>{
	if(channel=== "MESSAGE"){
		io.emit("message",message);
	}
})

export { app, io, server };




// await pub.publish("Message",JSON.Stringify({message}));




/**
 * 
 * create a basic registration page in asp.net with mvc framework which consist of name ,father name DOB(calender option to select data) ,religion,Caste ,gender(radio button to select gender).country,state(dropdown to show option to select state),district(drop of selected district as per state).pincode ,aaddress.Qualification (which contain  highschool ,intermwdiatem,ug,pg and a radio buton to select qualifaication), hobbie (add one by one hobby ) photio and signature upload
 */