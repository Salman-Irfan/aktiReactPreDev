import axios from "axios";
import BASE_URL from "../../../constants/baseUrl";

const getAllNotesEndpoint = "/notes";

const getAllNotesApiService = async() => {
    try {
        const response = await axios.get(`${BASE_URL}${getAllNotesEndpoint}`)
        return response.data
    } catch (error) {
        console.log(error);
    }
}
export default getAllNotesApiService;