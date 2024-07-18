import axiosInstance from '../AxiosConfig';

const PostService = {
  getPosts: () => axiosInstance.get('/posts/all'),
  getPost: (id) => axiosInstance.get(`/posts/${id}`),
  createPost: (post) => axiosInstance.post('/posts', post),
  updatePost: (id, post) => axiosInstance.put(`/posts/${id}`, post),
  deletePost: (id) => axiosInstance.delete(`/posts/${id}`),
};

export default PostService;