import axios from "axios";
import BASE_URL from "../../../constants/baseUrl";
import endPoints from "../../../constants/endPoints/endPoints";

const deleteNoteByIdEndpoint = endPoints.DELETE_NOTE;

const deleteNoteByIdApi = async (id, token) => {
    try {
        const response = await axios.delete(`${BASE_URL}${deleteNoteByIdEndpoint}/${id}`, {
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