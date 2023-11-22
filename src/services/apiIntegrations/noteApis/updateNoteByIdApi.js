import axios from "axios";
import BASE_URL from "../../../constants/baseUrl";
import endPoints from "../../../constants/endPoints/endPoints";

const updateNoteApiEndPoint = endPoints.UPDATE_NOTE;

const updateNoteByIdApiService = async (id, updateNoteFormData, token) => {
    try {
        const response = await axios.put(`${BASE_URL}${updateNoteApiEndPoint}/${id}`, updateNoteFormData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data
    } catch (error) {
        console.log(error.message);
    }
}
export default updateNoteByIdApiService