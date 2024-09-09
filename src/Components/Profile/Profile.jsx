// import React, { useState } from 'react'
// import { BsArrowLeft, BsCheck2, BsPencil } from 'react-icons/bs'
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { updateUser } from '../../Redux/Auth/Action';

// const Profile = ({handleClouseOpenProfile}) => {
//   const [flag,setFlag]=useState(false);
//   const navigate=useNavigate();
//   const [username,setUsername]=useState(null);
//   const [tempPicture,setTempPicture]=useState(null);
//   const {auth}=useSelector(store=>store);
//   const dispatch=useDispatch();

//   // const handleNavigate=()=>{
//   // navigate("/");
//   // console.log("naviggate back")

//   // };
//   const handleFlag=()=>{
//     setFlag(true)
//     }
// const handleCheckClick=()=>{
//   setFlag(false);

//     const data = {
//       id: auth.reqUser?.id,
//       token: localStorage.getItem("token"),
//       data: { full_name:username },
//     };

    
//       dispatch(updateUser(data))
//     }
  
  
  
//   const handleChange=(e)=>{
//     setUsername(e.target.value);
//     console.log(username)

//     };

//     const uploadToCloudnary=(pics)=>{

      
//         const data = new FormData();

//         data.append("file", pics);
//         data.append("upload_preset", "ashok21");
//         data.append("cloud_name", "zarmariya");

//         fetch("https://api.cloudinary.com/v1_1/zarmariya/image/upload", {
//           method: "post",
//           body: data,
//         })
//           .then((res) => res.json())
//           .then((data) => {
//             console.log("imgurl", data);
//             setTempPicture(data.url.toString());
//            //setMessage("profile image updated successfully")
//            //setOpen(true);
            
//             const dataa = {
//               id: auth.reqUser.id,
//               token: localStorage.getItem("token"),
//               data: { profile_picture: data.url.toString() },
//             };
//             // userUpdate(id, )
//             dispatch(updateUser(dataa));
            
//           });


//     };


//     const handleUpdateName=(e)=>{
//       const data = {
//         id: auth.reqUser?.id,
//         token: localStorage.getItem("token"),
//         data: { full_name:username },
//       };

//       if(e.target.key==="Enter"){
//         dispatch(updateUser(data))
//       }
//     }

  
//   return (
//     <div className='w-full h-full'>
//         <div className='flex items-center space-x-10 bg-[#008069] text-white pt-16 px-10 pb-5'>
//             <BsArrowLeft className='cursor-pointer text-2xl font-bold' onClick={handleClouseOpenProfile}/>

//             <p className='cursor-pointer font-semibold'>
//               Profile
//             </p>
//         </div>
//         {/* Update Profile Pic Section */}
//         <div className='flex flex-col justify-center items-center my-12'>
//         <label htmlFor="imageInput">
//           <img className='rounded-full w-[15vw] h-[15vw] cursor-pointer' src={auth.reqUser?.profile_picture ||  tempPicture ||"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"} alt="" />
//         </label>

//         <input onChange={(e)=>uploadToCloudnary(e.target.files[0])} type="file" name="" id="imageInput" className='hidden'/>
//     </div>

//      {/* Name Section */}
//     <div className='bg-white px-3'>
//       <p className='py-3'>Your Name</p>
//       {!flag && <div className='w-full flex justify-between items-center'>
//        <p className='py-3'> {auth.reqUser.full_name || "username"}</p>
//        <BsPencil onClick={handleFlag} className='cursor-pointer'/>
//       </div>}
//       {
        
//            flag &&  <div className='w-full flex justify-between items-center py-2'>
//               <input onKeyPress={handleUpdateName}  onChange={handleChange} className='w-[80%] outline-none border-b-2 border-blue-700 px-2 py-2' type="text" placeholder='Enter your name'/>
//               <BsCheck2 onClick={handleCheckClick} className='cursor-pointer text-2xl'/>
//             </div>
      
//       }
//     </div>

//       <div className='px-3 my-5'>
//         <p className='py-10'>
//           This Name is Only Visible to your postman Contacts
//         </p>
//       </div>

//     </div>
//   );
// };

// export default Profile

import React, { useState } from 'react';
import { BsArrowLeft, BsCheck2, BsPencil } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateUser } from '../../Redux/Auth/Action';

const Profile = ({ handleClouseOpenProfile }) => {
  const [flag, setFlag] = useState(false);
  const navigate = useNavigate();
  const [username, setUsername] = useState(null);
  const [tempPicture, setTempPicture] = useState(null);
  const { auth } = useSelector(store => store);
  const dispatch = useDispatch();

  const handleFlag = () => {
    setFlag(true);
  }

  const handleCheckClick = () => {
    setFlag(false);

    const data = {
      id: auth.reqUser?.id,
      token: localStorage.getItem("token"),
      data: { full_name: username },
    };

    dispatch(updateUser(data));
  }

  const handleChange = (e) => {
    setUsername(e.target.value);
  };

  const uploadToCloudinary = (pics) => {
    const data = new FormData();
    data.append("file", pics);
    data.append("upload_preset", "ashok21");
    data.append("cloud_name", "zarmariya");

    fetch("https://api.cloudinary.com/v1_1/zarmariya/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setTempPicture(data.url.toString());
        const dataa = {
          id: auth.reqUser.id,
          token: localStorage.getItem("token"),
          data: { profile_picture: data.url.toString() },
        };
        dispatch(updateUser(dataa));
      });
  };

  const handleUpdateName = (e) => {
    const data = {
      id: auth.reqUser?.id,
      token: localStorage.getItem("token"),
      data: { full_name: username },
    };
    if (e.target.key === "Enter") {
      dispatch(updateUser(data));
    }
  }

  const handleNavigate = () => {
    navigate("/");
  };

  return (
    <div className="w-full h-screen bg-gray-100 flex flex-col">
      <div className="flex items-center space-x-4 bg-gradient-to-r from-green-400 to-blue-500 text-white pt-12 px-8 pb-4">
        <BsArrowLeft className="cursor-pointer text-3xl font-bold" onClick={handleNavigate} />
        <p className="cursor-pointer font-semibold text-xl">Profile</p>
      </div>

      <div className="flex flex-col items-center flex-grow mt-10">
        <label htmlFor="imageInput" className="relative">
          <img 
            className="rounded-full w-40 h-40 object-cover shadow-lg cursor-pointer transition-transform transform hover:scale-105" 
            src={auth.reqUser?.profile_picture || tempPicture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"} 
            alt="Profile"
          />
        </label>
        <input 
          onChange={(e) => uploadToCloudinary(e.target.files[0])} 
          type="file" 
          id="imageInput" 
          className="hidden" 
        />
      </div>

      <div className="bg-white mt-8 p-6 rounded-lg shadow-md mx-4">
        <p className="text-gray-700 mb-2 text-sm">Your Name</p>
        {!flag && (
          <div className="w-full flex justify-between items-center">
            <p className="text-lg font-medium text-gray-900">{auth.reqUser?.full_name || "username"}</p>
            <BsPencil onClick={handleFlag} className="cursor-pointer text-xl text-gray-500 hover:text-gray-700" />
          </div>
        )}
        {flag && (
          <div className="w-full flex justify-between items-center py-2">
            <input 
              onKeyPress={handleUpdateName} 
              onChange={handleChange} 
              className="w-[80%] outline-none border-b-2 border-blue-500 px-2 py-1 text-lg" 
              type="text" 
              placeholder="Enter your name" 
            />
            <BsCheck2 onClick={handleCheckClick} className="cursor-pointer text-2xl text-green-500 hover:text-green-700" />
          </div>
        )}
      </div>

      <div className="px-4 mt-6 text-center mb-4">
        <p className="text-gray-600 text-sm">
          This Name is Only Visible to your postman Contacts
        </p>
      </div>
    </div>
  );
};

export default Profile;


