import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import { useState } from 'react'
import SearchInput from "./SearchInput";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
	const [menuVisible, setMenuVisible] = useState(false);

	const toggleMenu = () => {
	  setMenuVisible(!menuVisible); 
	};
	return (
		<div className='flex flex-col gap-4 p-4 bg-white  rounded-2xl shadow-lg shadow-pink-200'
			style={{ width: "35vw", maxHeight: "100%", overflowY: "auto" }}>
			 <span className="flex justify-between relative">
        <h2 className="text-pink-500 inline font-bold text-xl">Chat </h2>

        <FontAwesomeIcon 
          icon={faEllipsisVertical} 
          className="cursor-pointer" 
          onClick={toggleMenu} 
        />
        
        {menuVisible && (
          <div className="absolute right-0 mt-2 w-70  bg-white border border-pink-300 rounded-lg shadow-lg z-50">
            <ul className="py-2 flex flex-col z-20 w-full">
              <button className="px-4 py-2 text-black cursor-pointer hover:bg-pink-100  w-full text-left"><li >Delete Chat</li></button>
              <button className="px-4 py-2 text-black cursor-pointer hover:bg-pink-100 w-full text-left"><li >New Chat</li></button>
              <button className="px-4 py-2 text-black cursor-pointer hover:bg-pink-100 w-full text-left"><li >Chat Settings</li></button>
              
            </ul>
          </div>
        )}
      </span>
			<SearchInput />
			{/* <hr className="stoke-2 stroke-red-500" /> */}
			{/* <div className='divider ' style={{stroke:"12px"}}></div> */}
			<div className="relative">
  <div className="h-px bg-gradient-to-r from-pink-0 to-pink-100"></div>
  <div className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-b from-pink-200 "></div>
</div>
			<Conversations />
			<LogoutButton />

		</div>
	
	);
};
export default Sidebar;

