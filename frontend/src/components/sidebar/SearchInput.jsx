import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import useConversation from "../../zustand/useConversation";
import useGetConversations from "../../hooks/useGetConversations";
import toast from "react-hot-toast";
import { CiSearch } from "react-icons/ci";

const SearchInput = () => {
	const [search, setSearch] = useState("");
	const { setSelectedConversation } = useConversation();
	const { conversations } = useGetConversations();

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!search) return;
		if (search.length < 3) {
			return toast.error("Search term must be at least 3 characters long");
		}

		const conversation = conversations.find((c) => c.fullName.toLowerCase().includes(search.toLowerCase()));

		if (conversation) {
			setSelectedConversation(conversation);
			setSearch("");
		} else toast.error("No such user found!");
	};
	return (
		<form onSubmit={handleSubmit} className='flex bg-white mt-7 items-center'>
  <div className='relative w-full'>
    <span className='absolute inset-y-0 left-0 flex items-center pl-3'>
      <CiSearch className='text-black' />
    </span>
    <input
      type='text'
      placeholder='Search for People'
      className='input input-bordered stoke-2 w-full rounded-full text-black bg-white pl-10'
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  </div>
</form>

	);
};
export default SearchInput;


