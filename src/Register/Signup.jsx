// import { Alert, Button, Snackbar } from '@mui/material';
// import { green } from '@mui/material/colors';
// import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { currentUser, register } from '../Redux/Auth/Action';

// const Signup = () => {

//     const [openSnackbar, setOpenSnackbar] =useState(false)
// const navigate = useNavigate();
// const [inputData, setInputData] = useState({full_name:"",email: "",
// password: "",});
// const {auth}=useSelector(store=>store);
// const token=localStorage.getItem("token")

// const dispatch = useDispatch();

// console.log('current user', auth.reqUser)

//     const handleSubmit=(e)=>{
//         e.preventDefault()
//     console.log("handle submit",inputData)
//     dispatch(register(inputData))
//     setOpenSnackbar(true)
//     }
//     const handleChange = (e) => {
//       const { name, value } = e.target;
//       setInputData((values) => ({ ...values, [name]: value }));
        
//      };
//      const handleSnackbarClose=()=>{
//         setOpenSnackbar(false)
//      }

//    useEffect(()=>{
// if (token)dispatch(currentUser(token))
//    },[token])

//    useEffect(()=>{
//     if (auth.reqUser?.full_name){
//       navigate("/")
//     }
//        },[auth.reqUser])

//   return (
//     <div>
//         <div>
//       <div className="flex flex-col justify-center min-h-screen items-center">
//       <div className="w-[30%] p-10 shadow-md bg-white">
//         <form onSubmit={handleSubmit} className="space-y-5">
//           <div>
//             <p className="mb-2">User Name</p>
//             <input
//               className="py-2 px-3 outline outline-green-600 w-full rounded-md border-1"
//               type="text"
//               placeholder="Enter username"
//               name="full_name"
//               onChange={(e) => handleChange(e)}
//               value={inputData.full_name}
//             />
//           </div>
//           <div>
//             <p className="mb-2">Email</p>
//             <input
//               className="py-2 px-3 outline outline-green-600 w-full rounded-md border-1"
//               type="text"
//               placeholder="Enter your Email"
//               name="email"
//               onChange={(e) => handleChange(e)}
//               value={inputData.email}
//             />
//           </div>
//           <div>
//             <p className="mb-2">Password</p>
//             <input
//               className="py-2 px-2 outline outline-green-600 w-full rounded-md border-1"
//               type="text"
//               placeholder="Enter your Password"
//               name="password"
//               onChange={(e) => handleChange(e)}
//               value={inputData.password}
//             />
//           </div>
//           <div>
//                         <Button color='success' type='submit' variant="contained" className='w-full'
//                         sx={{bgcolor:green[700], padding:".5rem 0rem"}}>
//                             sign up
//                         </Button>
//                     </div>
//         </form>
//         <div className="flex space-x-3 item-center mt-5">
//           <p className="">Already Have Account?</p>
//           <Button variant='contained' onClick={() => navigate("/signin")}
//             className="text-blue-500 hover:text-blue-800 cursor-pointer">
//                 sign in
//                     </Button>
//         </div>
//       </div>
//       </div>
//       <Snackbar open={openSnackbar} autoHideDuration={6000} onClose ={handleSnackbarClose}>

// <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}> Your Account Has Been Successfully Created!

        
//       </Alert>
//       </Snackbar>
//     </div>
//     </div>
//   )
// }

// export default Signup

import { Alert, Button, Snackbar } from '@mui/material';
import { green } from '@mui/material/colors';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { currentUser, register } from '../Redux/Auth/Action';

const Signup = () => {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const navigate = useNavigate();
    const [inputData, setInputData] = useState({ full_name: "", email: "", password: "" });
    const { auth } = useSelector(store => store);
    const token = localStorage.getItem("token");
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("handle submit", inputData);
        dispatch(register(inputData));
        setOpenSnackbar(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputData((values) => ({ ...values, [name]: value }));
    };

    const handleSnackbarClose = () => {
        setOpenSnackbar(false);
    };

    useEffect(() => {
        if (token) dispatch(currentUser(token));
    }, [token]);

    useEffect(() => {
        if (auth.reqUser?.full_name) {
            navigate("/");
        }
    }, [auth.reqUser]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 via-indigo-600 to-blue-600">
            <div className="flex w-10/12 max-w-4xl shadow-lg rounded-lg overflow-hidden">
                <div className="w-1/2 bg-white p-10">
                    <h2 className="text-3xl font-semibold text-center mb-5">Create Account</h2>
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <p className="mb-2 text-sm font-semibold">User Name</p>
                            <input
                                className="py-2 px-3 outline-none w-full rounded-md border-1 border-gray-300"
                                type="text"
                                placeholder="Enter username"
                                name="full_name"
                                onChange={(e) => handleChange(e)}
                                value={inputData.full_name}
                            />
                        </div>
                        <div>
                            <p className="mb-2 text-sm font-semibold">Email</p>
                            <input
                                className="py-2 px-3 outline-none w-full rounded-md border-1 border-gray-300"
                                type="text"
                                placeholder="Enter your Email"
                                name="email"
                                onChange={(e) => handleChange(e)}
                                value={inputData.email}
                            />
                        </div>
                        <div>
                            <p className="mb-2 text-sm font-semibold">Password</p>
                            <input
                                className="py-2 px-3 outline-none w-full rounded-md border-1 border-gray-300"
                                type="password"
                                placeholder="Enter your Password"
                                name="password"
                                onChange={(e) => handleChange(e)}
                                value={inputData.password}
                            />
                        </div>
                        <Button
                            color='success'
                            type='submit'
                            variant="contained"
                            className='w-full'
                            sx={{ bgcolor: green[700], padding: ".5rem 0rem" }}>
                            Sign Up
                        </Button>
                    </form>
                    <div className="flex space-x-3 items-center mt-5">
                        <p>Already Have an Account?</p>
                        <Button variant='text' onClick={() => navigate("/signin")}
                            className="text-blue-500 hover:text-blue-800 cursor-pointer">
                            Sign In
                        </Button>
                    </div>
                </div>
                <div className="w-1/2 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 flex items-center justify-center">
                    <div className="text-white text-center px-5">
                        <h2 className="text-4xl font-semibold">Welcome</h2>
                        <p className="mt-5">Create an account to start using our services!</p>
                    </div>
                </div>
            </div>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
                    Your Account Has Been Successfully Created!
                </Alert>
            </Snackbar>
        </div>
    );
}

export default Signup;
