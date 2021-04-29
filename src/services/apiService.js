import { apiConfig } from '../configs';
import HttpService from './httpService';

const ApiService = {
    async getUserList(data) {
        return HttpService.get(`${apiConfig.baseUrl}/api/users`, data);
    },

    async register(data) {
        return HttpService.post(`${apiConfig.baseUrl}/api/public/register`, data);
    },

    async login(data) {
        return HttpService.post(`${apiConfig.baseUrl}/api/public/login`, data);
    },

    // 发布内容
    async createPost(data) {
        return HttpService.post(`${apiConfig.baseUrl}/api/posts`, data);
    },

    async getPosts(data) {
        return HttpService.get(`${apiConfig.baseUrl}/api/public/posts`, data);
    },

    async getPost(id) {
        return HttpService.get(`${apiConfig.baseUrl}/api/posts/${id}`);
    },

    async uploadImage(data) {
        return HttpService.upload(`${apiConfig.baseUrl}/api/upload/image`, data);
    }

}

export default ApiService;