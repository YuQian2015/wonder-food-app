import { apiConfig } from '../configs';
import HttpService from './httpService';

const ApiService = {
    async getUserList(data) {
        return HttpService.get(`${apiConfig.baseUrl}/api/users`, data);
    },

    async getUserInfo() {
        return HttpService.get(`${apiConfig.baseUrl}/api/users/info`);
    },

    async updateUserInfo(data) {
        return HttpService.put(`${apiConfig.baseUrl}/api/users/info`, data);
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

    async createComment(data) {
        return HttpService.post(`${apiConfig.baseUrl}/api/comments`, data);
    },

    async getComment(postId) {
        return HttpService.get(`${apiConfig.baseUrl}/api/comments`, { post_id: postId });
    },

    async uploadImage(data) {
        return HttpService.upload(`${apiConfig.baseUrl}/api/upload/image`, data);
    },

    async getStores() {
        return HttpService.get(`${apiConfig.baseUrl}/api/stores`);
    },

    async getFoods() {
        return HttpService.get(`${apiConfig.baseUrl}/api/products`);
    },
    
    async getBanners() {
        return HttpService.get(`${apiConfig.baseUrl}/api/settings?type=banner`);
    },
}

export default ApiService;