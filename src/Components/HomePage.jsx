import React, { useEffect, useState } from 'react'
import { TbCircleDashed } from "react-icons/tb";
import { BiCommentDetail } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import { BsEmojiSmile, BsFilter, BsMicFill, BsThreeDotsVertical } from "react-icons/bs";
import { ImAttachment } from "react-icons/im";
import ChatCard from './ChatCard/ChatCard';
import MessageCard from './MessageCard/MessageCard';
import "./HomePage.css"
import { useNavigate } from 'react-router-dom';
import Profile from './Profile/Profile';
import { PiDotsThreeOutlineVerticalBold } from 'react-icons/pi';
import { Button, Menu, MenuItem } from '@mui/material';
import CreateGroup from './Group/CreateGroup';
import { useDispatch, useSelector } from 'react-redux';
import { LOGOUT } from '../Redux/Auth/ActionType';
import { currentUser, logoutAction, searchUser } from '../Redux/Auth/Action';
import { createChat, getUsersChat } from '../Redux/Chat/Action';
import { createMessage, getAllMessage } from '../Redux/Message/Action';

import SockJS from 'sockjs-client/dist/sockjs';
import { over } from 'stompjs';

const HomePage = () => {
    const [querys,setQuerys]=useState(null);
    const [currentChat,setCurrentChat]=useState(null);
    const [content,setContent]=useState("");
    const [isProfile,setIsProfile]=useState(false);
    const navigate=useNavigate();
    const [isGroup,setIsGroup]=useState(false)
const [isconnect,setIsConnect]=useState(false);
const [messages, setMessages]=useState([]);

    const [anchorEl, setAnchorEl] =useState(null);
    const {auth,chat,message}=useSelector(store=>store);
const dispatch=useDispatch();
const token=localStorage.getItem("token");

    const open = Boolean(anchorEl);

const [stompClint,setStompClint]=useState();


const connect=()=>{
  const sock=new SockJS("http://localhost:6565/ws");
  const temp=over(sock);
  setStompClint(temp);


  const headers={
    Authorization:`Barer ${token}`,
    "X-XSFR-TOKEN":getCookies("XSFR-TOKEN")
  }

  temp.connect(headers,onConnect,onError);

};
function getCookies(name){
  const value=`; ${document.cookie}`;
  const parts=value.split(`; ${name}=`);
  if(parts.length===2){
    return parts.pop().split(";").shift();
  }
}

const onError = (error) => {
  console.log("on error ", error);
};

const onConnect = () => {
  setIsConnect(true);
};

useEffect(() => {
  if (message.newMessage && stompClint) {
    setMessages([...messages, message.newMessage]);
    stompClint?.send("/app/message", {}, JSON.stringify(message.newMessage));
    // messageRef.current?.scrollIntoView({
    //   behavior: "smooth",
    // })
    ;
  }
}, [message.newMessage]);

const onMessageReceive = (payload) => {
  console.log("receive message------------- ", JSON.parse(payload.body));
  const receivedMessage = JSON.parse(payload.body);
  setMessages([...messages, receivedMessage]);
};

useEffect(()=>{
  if(isconnect && stompClint && auth.reqUser && currentChat){
    const subscription = stompClint.subscribe("group/"+currentChat.id.toString,onMessageReceive);
console.log("hello----------------")
    return()=>{
      subscription.unsubscribe();
    }
  }



})

useEffect(()=>{
connect();
},[])

useEffect(()=>{
setMessages(message.messages)
},[message.messages])





    const handleClick = (e) => {
      setAnchorEl(e.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };


    const handleClickOnChatCard = (userId) =>{
        //setCurrentChat(item)
        //console.log(userId,"----")
        dispatch(createChat({token, data:{userId}}))
        setQuerys("")
    };


    const handleSearch=(keyword)=>{
        dispatch(searchUser({keyword,token}))
    };
    const handleCreateNewMessage=()=>{ 
      dispatch(createMessage({token,
        data: {chatId:currentChat.id,content:content},
      })
    );
        console.log("create new message")

        // naviga

    };

    // const handleCreateChat=(userId)=>{
    //   dispatch(createChat({userId}))
    // }

    useEffect(()=>{

        dispatch(getUsersChat({token}))

    },[chat.createdChat,chat.createdGroup]);

    useEffect(()=>{

      if(currentChat?.id)
      dispatch(getAllMessage({chatId:currentChat.id, token}))
    },[currentChat,message.newMessage])

    const handleNavigate=()=>{
        setIsProfile(true);

    };

    const handleCloseOpenProfile = () => {
      setIsProfile(false);
    };

    const handleClouseOpenProfile=()=>{

        setIsProfile(false);
    };
    
    const handleCreateGroup = ()=>{
setIsGroup(true)
    };

    // const handleLogOut = () => {
    //   dispatch(logOutAction());
    //   navigate("/signup");
    // };

    useEffect(()=>{

        dispatch(currentUser(token))
        
    },[token])

const handleLogout=()=>{
    dispatch(logoutAction())
    navigate("/signup")

}

const handleCurrentChat = (item) => {
  setCurrentChat(item);
  // messageRef.current?.scrollIntoView({
  //   behavior: "smooth",
  // });
};

console.log(" current chat" , currentChat)

useEffect(()=>{

    if(!auth.reqUser){
        navigate("/signup")
    }
},[auth.reqUser])

  return (
    <div className='relative bg-gray-200' >
        <div className='py-14 bg-[#eb6357] w-full'></div>
        <div className='flex bg-yellow-400 h-[90vh] absolute top-[5vw] w-[96vw] left-[2vw]
        ' >
            <div className='left w-[30%] bg-yellow-400 h-full'>
                 {/* Profile */}
                 {isGroup && <CreateGroup setIsGroup={setIsGroup} />}
          {isProfile && (
            <div className="w-full h-full">
              <Profile handleCloseOpenProfile={handleCloseOpenProfile} />
            </div>
          )}

          {!isProfile && !isGroup && (
            <div className="w-full">
              {/*home */}
              {
                <div className="flex justify-between items-cente p-3">
                  <div
                    onClick={handleNavigate}
                    className="flex items-center space-x-3"
                  >
                    <img
                      className="rounded-full w-10 h-10 cursor-pointer"
                      src={
                        auth.reqUser?.profile_picture ||
                        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                      }
                      alt=""
                    />
                    <p>{auth.reqUser?.full_name}</p>
                  </div>
                  <div className="space-x-3 text-2xl flex">
                    <TbCircleDashed
                      className="cursor-pointer"
                      onClick={() => navigate("/status")}
                    />
                    <BiCommentDetail />
                    <div>
                      <BsThreeDotsVertical
                        id="basic-button"
                        aria-controls={open ? "basic-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        onClick={handleClick}
                      />

                      <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                          "aria-labelledby": "basic-button",
                        }}
                      >
                        <MenuItem onClick={() => navigate("/profile")}>
                          Profile
                        </MenuItem>
                        <MenuItem onClick={handleCreateGroup}>
                          Creat Group
                        </MenuItem>
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                      </Menu>
                    </div>
                  </div>
                </div>
              }

              <div className="relative flex justify-center items-center bg-white py-4 px-3 ">
                <input
                  className="border-none outline-none bg-slate-200 rounded-md w-[93%] py-2 pl-9"
                  type="text"
                  placeholder="Search or start new chat"
                  onChange={(e) => {
                    setQuerys(e.target.value);
                    handleSearch(e.target.value);
                  }}
                  value={querys}
                />
                <AiOutlineSearch className="left-6 top-6 absolute" />
                <div>
                  <BsFilter className="ml-4 text-3xl" />
                </div>
              </div>

              {/* all user*/}
              <div className="bg-white overflow-y-scroll h-[72vh] px-3">
                {querys &&
                  auth.searchUser?.map((item) => (
                    <div onClick={() => handleClickOnChatCard(item.id)}>
                      {" "}
                      <hr />
                      <ChatCard
                        name={item.full_name}
                        userImg={
                          item.profile_picture ||
                          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                        }
                      />
                    </div>
                  ))}

                {chat.chats.length > 0 &&
                  !querys &&
                  chat.chats?.map((item) => (
                    <div onClick={() => handleCurrentChat(item)}>
                      
                      <hr />
                      {item.is_group ? (
                        <ChatCard
                          name={item.chat_name}
                          userImg={
                            item.chat_image ||
                            "https://kmpplus.com/wp-content/uploads/2018/08/Cafebord-2-COLOURBOX23980354-1024x1024-1.jpg"
                          }
                        />
                      ) : (
                        <ChatCard
                          isChat={true}
                          name={
                            auth.reqUser?.id !== item.users[0]?.id
                              ? item.users[0].full_name
                              : item.users[1].full_name
                          }
                          userImg={
                            auth.reqUser.id !== item.users[0].id
                              ? item.users[0].profile_picture ||
                                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                              : item.users[1].profile_picture ||
                                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                          }
                          // message={
                          //   (item.id ===
                          //     messages[messages.length - 1]?.chat?.id &&
                          //     messages[messages.length - 1]?.content) 
                          // }
                        />
                      )}
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
            {/*default messaging page */} 
           
               {!currentChat &&    <div className=' w-[70%] flex flex-col items-center justify-center h-full'>

                        <div className='max-w-[70%] text-center'>
                            <img src="https://www.creativefabrica.com/wp-content/uploads/2021/03/12/man-postman-profession-cartoon-vector-Graphics-9506578-1.jpg" alt="" />
                            <h1 className='text-4xl text-white-600'> 
                                Postman
                            </h1>
                            <p className='my-9'>Send Message</p>
                        </div>
            </div>}
        
{/*{message part}*/}

{/* name={item.chat_name}
                          userImg={
                            item.chat_image ||
                            "https://cdn.pixabay.com/photo/2017/10/13/12/29/hands-2847508_640.jpg"
                          } */}


                    {currentChat && <div className='w-[70%] relative bg-[#695c5c] '>

                        <div className='header absolute top-0 w-full bg-[#E34234]'>
                            <div className='flex justify-between'>
                                <div className='py-3 space-x-4 flex items-center px-3'>
                                    <img className='w-10 h-10 rounded-full' src={currentChat.is_group?currentChat.chat_image ||"https://kmpplus.com/wp-content/uploads/2018/08/Cafebord-2-COLOURBOX23980354-1024x1024-1.jpg": (auth.reqUser.id !== currentChat.users[0].id
                              ? currentChat.users[0].profile_picture ||
                                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                              : currentChat.users[1].profile_picture ||
                                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png") } alt=" " />
                                        <p>
                                           {currentChat.is_group? currentChat.chat_name:  auth.reqUser?.id===currentChat.users[0].id?currentChat.users[1].full_name:currentChat.user[0].full_name}
                                        </p>
                                </div>
                                <div className='py-3 flex space-x-4 items-center px-3'>
                                    <AiOutlineSearch/>
                                    <BsThreeDotsVertical/>
                                    
                                </div>
                            </div>
                        </div>
                        {/*  Message Section*/}
                        <div className='px-10 h-[85vh] overflow-y-scroll  ' >
                            <div className='space-y-1 flex flex-col justify-center border-none mt-20 py-2'>
                                {messages.length>0 && messages?.map((item,i )=>(
                                <MessageCard isReqUserMessage={item.user.id!==auth.reqUser.id} content={item.content}/>
                              ))}
                            </div>
                        </div>

{/* Footer Part */}

                    <div className='footer bg-[#695c5c] absolute bottom-0 w-full py-3 text-2xl'>

                    <div className='flex justify-between items-center px-5'>

                            <BsEmojiSmile className='cursor-pointer
                            '/> 
                            <ImAttachment/>
                       

                        <input className='py-2 outline-none border-none bg-white pl-4 rounded-md w-[85%]' type="text" onChange={(e)=>setContent(e.target.value)}
                        placeholder='Type whatever you want to say'
                        value={content}
                        onKeyPress={(e)=>{
                            if(e.key==="Enter"){

                                handleCreateNewMessage();
                                setContent("")
                            }


                        }}
                        />                   
                        <BsMicFill/>
                        </div>
                    </div>
                </div>}

            </div>
        </div>
  
  

  );
};

export default HomePage