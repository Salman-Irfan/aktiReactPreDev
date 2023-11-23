import axios from "axios";
import BASE_URL from "../../../constants/baseUrl";
import endPoints from "../../../constants/endPoints/endPoints";



const getAllNotesApiService = async(endPoint, token) => {
    try {
        const response = await axios.get(`${BASE_URL}${endPoint}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        return response.data
    } catch (error) {
        console.log(error);
    }
}
export default getAllNotesApiService;