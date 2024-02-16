import axios from "axios";


const axiosPublic = axios.create({
    baseURL: 'https://expense-tracker-server-xi.vercel.app'
});

const useAxiosPublic = () => {
    return axiosPublic
};

export default useAxiosPublic;