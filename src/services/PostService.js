import axiosInstance from '../AxiosConfig';

class PostService {
  getPosts() {
    return axiosInstance.get('/posts/all');
  }

  createPost(post) {
    return axiosInstance.post('/posts', post);
  }

  getPost(id) {
    return axiosInstance.get(`/posts/${id}`);
  }

  updatePost(id, post) {
    return axiosInstance.put(`/posts/${id}`, post);
  }

  deletePost(id) {
    return axiosInstance.delete(`posts/${id}`);
  }
}

const posts = {
  getPosts: () => axiosInstance.get('/posts/all'),
  getPost: (id) => axiosInstance.get(`/posts/${id}`),
  createPost: (post) => axiosInstance.post('/posts', post),
  updatePost: (id, post) => axiosInstance.put(`/posts/${id}`, post),
  deletePost: (id) => axiosInstance.delete(`/posts/${id}`),
};

export default posts;