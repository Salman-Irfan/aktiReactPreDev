import axios from "axios";
import BASE_URL from "../../../constants/baseUrl";


const deleteNoteByIdApi = async (id, endPoint, token) => {
    try {
        const response = await axios.delete(`${BASE_URL}${endPoint}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data
    } catch (error) {
        console.log(error);
    }
}
export default deleteNoteByIdApi;