import { generateApiClient } from '@utils/apiUtils';
const songsApi = generateApiClient('itunes');

export const getSongs = songTerm => songsApi.get(`/search?term=${songTerm}`);
