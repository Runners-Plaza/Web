import Vue from 'vue'
import axios from 'axios'
import toast from './toast'

const levelNumbers = {
  Owner: 3,
  Manager: 2,
  Member: 1,
}

const toastMessages = {
  POST: 'Created',
  PUT: 'Updated',
  DELETE: 'Deleted'
}

const requestMethods = {
    get: 'GET',
    post: 'POST',
    put: 'PUT',
    patch: 'PATCH',
    delete: 'DELETE',
}

function createClient (token = null) {
  return axios.create({
    baseURL: process.env.VUE_APP_API_ENDPOINT_BASE,
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

function assignLevelNumber (user) {
  user.levelNumber = levelNumbers[user.position]
  return user
}

function assignCan (user) {
  var can = {
    own: false,
    manage: false,
    attend: false
  }
  if (user.levelNumber >= levelNumbers.Owner) {
    can.own = true
  }
  if (user.levelNumber >= levelNumbers.Manager) {
    can.manage = true
  }
  if (user.levelNumber >= levelNumbers.Member) {
    can.attend = true
  }
  user.can = can
  return user
}

const RunnersPlaza = {
  install (Vue) {
    Vue.prototype.runnersPlaza = {
      client: null,
      tokenData: null,
      queue: [],
      setTokenData (tokenData) {
        this.tokenData = tokenData
        this.client = createClient(tokenData.accessToken)
        for (var request of this.queue) {
          this.request(request.method, request.url, request.data).then(request.resolve)
          this.$route.replace({name: ''})
        }
        this.queue = []
        return this;
      },
      async getMyself () {
        const me = await this.get('/user')
        return assignCan(assignLevelNumber(me), this.tokenData.scopes)
      },
      async updateMyself (user) {
        const me = await this.patch('/user', {
            name: user.name,
        })
        return assignLevelNumber(me)
      },
      async getUsers () {
        const users = await this.get('/users')
        for (var user of users)
          assignLevelNumber(user)
        return users
      },
      async patchUser (user) {
        const patchedUser = await this.patch(`/users/${user.id}`, {
          level: user.level
        })
        return assignLevelNumber(patchedUser)
      },
      async get (url) {
        return await this.request(requestMethods.get, url)
      },
      async post (url, data) {
        return await this.request(requestMethods.post, url, data)
      },
      async put (url, data) {
        return await this.request(requestMethods.put, url, data)
      },
      async patch (url, data) {
        return await this.request(requestMethods.patch, url, data)
      },
      async delete (url) {
        return await this.request(requestMethods.delete, url)
      },
      request (method, url, data = null) {
        return new Promise(async (resolve) => {
          if (this.client) {
            if (toastMessages[method]) {
              toast.dismiss()
            }
            try {
              const response = await this.client.request({
                method,
                url,
                data
              })
              if (toastMessages[method]) {
                toast.success(toastMessages[method])
              }
              resolve(response.data)
            } catch (error) {
              if (error.response && error.response.data.error_description) {
                toast.error(error.response.data.error_description)
              } else {
                toast.error('Something went wrong.')
              }
            }
          } else
            this.queue.push({
              method,
              url,
              data,
              resolve
            })
        })
      }
    }
  }
}

Vue.use(RunnersPlaza)
