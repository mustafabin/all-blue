import { useNavigate } from "react-router-dom";
import { useEffect} from 'react'
import { discordLogin } from "../services/api";
import { useDispatch } from "react-redux";
import { setUser } from "../state/user.js";
import Swal from "sweetalert2";
const AuthScreen = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const fragment = new URLSearchParams(window.location.hash.slice(1));
  const [accessToken, tokenType] = [fragment.get('access_token'), fragment.get('token_type')];
  let handleDiscordLogin = async (accessToken:string, tokenType:string) => {
    let data = await discordLogin(accessToken,tokenType)
    console.log(data)
    if (!data["token"]) {
      Swal.fire("Somthing went wrong", "please try again", "error");
      navigate("/");
    } else {
      localStorage.setItem("SuperToken", data["token"]);
      dispatch(setUser(data["user"]));
      navigate("/home");
    }
  }
  useEffect(()=>{
    if(!accessToken || !tokenType){
      navigate("/")
    }else{
      handleDiscordLogin(accessToken,tokenType)
    }
  },[])
  
  return (
    <>
      <h1 className="text-white"> Please wait as we authenticate you ... </h1>
    </>
  );
}
export default AuthScreen;