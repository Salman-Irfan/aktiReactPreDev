import axios from "axios";
import BASE_URL from "../../../constants/baseUrl";


const updateNoteByIdApiService = async (id, updateNoteFormData, endPoint, token) => {
    try {
        const response = await axios.put(`${BASE_URL}${endPoint}/${id}`, updateNoteFormData, {
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