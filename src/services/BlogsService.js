import { AppState } from '../AppState'
import { Blog } from '../models/Blog'
import { logger } from '../utils/Logger'
import { convertToQuery } from '../utils/Query'
import { api } from './AxiosService'

class BlogsService {
  async getBlogs(query = {}) {
    AppState.blogs = []
    logger.log('query', query)
    const res = await api.get('api/blogs' + convertToQuery(query))
    logger.log(res)
    AppState.blogs = res.data.map(p => new Blog(p))
  }

  async createBlog(newBlog) {
    const res = await api.post('api/blogs', newBlog)
    AppState.blogs.unshift(new Blog(res.data))
    logger.log(res)
  }

  async deleteBlog(blogId) {
    const res = await api.delete('api/blogs/' + blogId)
    logger.log(res)
    AppState.blogs = AppState.blogs.filter(b => b.id !== blogId)
  }
}

export const blogsService = new BlogsService()
