import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser, clearUser } from "../state/user";
import { profile } from "../services/api";
function PersistProfile() {
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  let grabProfile = async (token: string) => {
    let data = await profile(token);
    if (data["error"]) {
      dispatch(clearUser());
    } else {
      dispatch(setUser(data["user"]));
    }
  };
  useEffect(() => {
    let token = localStorage.getItem("superToken");
    // if a super token exists and user is logged out
    if (token && !user.isAuthenticated) {
      grabProfile(token);
    }
  }, []);
  return <></>;
}
export default PersistProfile;
