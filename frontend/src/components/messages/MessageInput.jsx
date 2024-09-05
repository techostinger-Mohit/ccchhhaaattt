
import { useState } from "react";
import { BsSend } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage";
import { MdEmojiEmotions, MdMicNone } from "react-icons/md";
// import { FontAwesomeIcon } from 'fortawesome/react-fontawesome'
import EmojiPicker from 'emoji-picker-react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { useRef } from "react";
import { IoIosAttach } from "react-icons/io";




const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { loading, sendMessage } = useSendMessage();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) return;
    await sendMessage(message);
    setMessage("");
  };

  

  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click(); // Trigger click on hidden file input
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log('Selected file:', file);

     
      const imageURL = URL.createObjectURL(file);
      console.log('Image URL:', imageURL);

      // Reset the input value after use
      event.target.value = '';
    }
  }



  const onEmojiClick = (event, emojiObject) => {
    console.log("Emoji clicked:", emojiObject); // Log the entire emojiObject
    if (event && event.emoji) {
      setMessage(prevMessage => prevMessage + event.emoji);
      console.log("Updated message:", message + event.emoji);
    } else {
      console.log("Emoji object or emoji is undefined:", event.emoji);
    }
    // setShowEmojiPicker(false); // Close the picker after selecting an emoji
  };


  
  return (

    <form className='px-4 py-6 relative bg-white drop-shadow-lg' onSubmit={handleSubmit}>

      
  <div className='flex items-center bg-pink  drop-shadow-lg shadow-pink-200'>
    {/* Input Field with Emoji Icon */}
    <div className='flex-grow relative'>
      <button
        type='button'
        className='absolute left-0 top-0 bottom-0 flex items-center pl-3'
        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
      >
        <MdEmojiEmotions />
      </button>

      <input
        type='text'
        className='border text-sm rounded-lg block w-full p-3 pl-10 pr-3 text-black bg-white border-gray-600'
        placeholder='Type Something'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{ paddingRight: '120px' }} 
      />

      {/* Emoji Picker */}
      {showEmojiPicker && (
        <div className='absolute bottom-12 left-0'>
          <EmojiPicker onEmojiClick={onEmojiClick} />
        </div>
      )}
    </div>

    {/* Icons Container */}
    <div className='flex space-x-2 ml-2'>
      <button type='button' className='flex items-center'>
        {/* <FontAwesomeIcon icon={faCamera} /> */}
        <IoIosAttach />
      </button>

      <button type='button' className='flex items-center'>
        <MdMicNone />
      </button>

      <button type='submit' className='flex items-center'>
        {loading ? <div className='loading loading-spinner'></div> : <BsSend />}
      </button>
    </div>
  </div>
</form>

  
  );
};

export default MessageInput;

