import axios from "axios";
import BASE_URL from "../../../constants/baseUrl";
import endPoints from "../../../constants/endPoints/endPoints";

const getAllNotesEndpoint = endPoints.GET_ALL_NOTES;

const getAllNotesApiService = async() => {
    try {
        const response = await axios.get(`${BASE_URL}${getAllNotesEndpoint}`)
        return response.data
    } catch (error) {
        console.log(error);
    }
}
export default getAllNotesApiService;