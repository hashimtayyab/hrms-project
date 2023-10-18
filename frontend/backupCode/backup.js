//NAVBAR USEEFFECT
  // useEffect(() =>{
  //   const token = localStorage.getItem('token');
  //   // setToken(token);
  //   if(token !== null){
  //     const myDecodedToken = decodeToken(token);
  //   setDecodedToken(myDecodedToken.id);
  //   setIsLoggedIn(true);
  //   }
  //   const getDetails = async () => {

  //     if(isLoggedIn === true){
  //       try{
  //      await userData().then((res) => {
  //         setUsername(res.data.username);
  //         setIsLoggedIn(true);
  //       });
  //       } catch(err){
  //         console.log("Cannot get details", err);
  //       }
  //     }
  //   }
  //   getDetails()
  //   ;}, [isLoggedIn]);



  // const userData = async () =>{
  //   return await axios.get(`http://localhost:4000/getuser/${decodedToken}`); 
  // }