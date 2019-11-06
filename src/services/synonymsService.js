import axios from 'axios';

const URL = 'https://api.datamuse.com/words?ml=';

const getSynonym = async word => {
    const response = await axios.get(`${URL}${word}`);
    return response.data;
};

const synonymsService = {
    getSynonym,
};

export default synonymsService;
