import axios from "axios";
import BASE_URL from "../../../constants/baseUrl";
import endPoints from "../../../constants/endPoints/endPoints";

const addNoteEndpoint = endPoints.ADD_NOTE

const addNoteApiService = async (addNoteFormData, authToken) => {
    try {
        const response = await axios.post(`${BASE_URL}${addNoteEndpoint}`, addNoteFormData, {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        });
        return response.data
    } catch (error) {
        console.log(error.message);
    }
}
export default addNoteApiService