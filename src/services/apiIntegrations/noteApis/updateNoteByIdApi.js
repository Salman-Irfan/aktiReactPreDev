import axios from "axios";
import BASE_URL from "../../../constants/baseUrl";

const updateNoteApiEndPoint = "/notes";

const updateNoteByIdApiService = async (id, updateNoteFormData) => {
    try {
        const response = await axios.put(`${BASE_URL}${updateNoteApiEndPoint}/${id}`, updateNoteFormData);
        return response.data
    } catch (error) {
        console.log(error.message);
    }
}
export default updateNoteByIdApiService