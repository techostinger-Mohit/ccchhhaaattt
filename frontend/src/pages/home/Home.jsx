import MessageContainer from "../../components/messages/MessageContainer";
import Sidebar from "../../components/sidebar/Sidebar";

const Home = () => {
	return (
		<div className='flex h-screen w-screen rounded-lg overflow-hidden bg-pink p-10 gap-10  rounded-2xl shadow-pink-200'>
			<Sidebar />
			<MessageContainer />
		</div>
	);
};
export default Home;
