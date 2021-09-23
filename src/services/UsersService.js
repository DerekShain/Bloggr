import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class UsersService {
  async getUserById(id) {
    const res = await api.get('api/profiles/' + id)
    logger.log('user res', res)
    AppState.profile = res.data
  }
}

export const usersService = new UsersService()
