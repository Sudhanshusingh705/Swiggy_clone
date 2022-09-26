import { useDispatch } from "react-redux";
import { setUserId } from "../../Redux/User/action";

export const usePersistUser = () =>{
    const dispatch = useDispatch();
    if(localStorage.getItem("user_id")) {
        dispatch(setUserId(localStorage.getItem("user_id")));
    }
    return "";
};