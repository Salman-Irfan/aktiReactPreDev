import axios from "axios";
import BASE_URL from "../../../constants/baseUrl";

const deleteNoteByIdEndpoint = "/notes";

const deleteNoteByIdApi = async (id) => {
    try {
        const response = await axios.delete(`${BASE_URL}${deleteNoteByIdEndpoint}/${id}`);
        return response.data
    } catch (error) {
        console.log(error);
    }
}
export default deleteNoteByIdApi;