import axios from "axios";

const url = "https://json-server-achintya.herokuapp.com/";

export const fetchRestaurantsByCity = async (city) => {

    let res = await axios.get(`${url}restaurants`);
    return res.data;

};

export const fetchRestaurantById = async (id) => {

    let res = await axios.get(`${url}restaurants/${id}`);
    return res.data;
    
};

export const fetchCuisines = async (id) => {

    let res = await axios.get(`${url}cuisines`);
    return res.data;
    
};

export const fetchDishes = async (id) => {

    let res = await axios.get(`${url}dishes`);
    return res.data;
    
};

export const createUser = async (user) => {

    let res = await axios.post(`${url}swiggy_user`, user);
    return res.data;
    
};

export const loginUser = async (email, pwd) => {
    try {
        let res = await axios.get(`${url}swiggy_user?email=${email}`);
        if(res.data.length > 0 && res.data[0].pwd == pwd) return res.data[0];
        return "invalid";
    } catch(e) {
        return e;
    }
};
