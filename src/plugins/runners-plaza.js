import Vue from 'vue'
import axios from 'axios'
import toast from './global'
import i18n from '@/i18n'

const toastMessages = {
  POST: 'created',
  PUT: 'updated',
  PATCH: 'updated',
  DELETE: 'deleted',
}

const Position = {
  Manager: 'Manager',
  Member: 'Member',
}

const requestMethods = {
  get: 'GET',
  post: 'POST',
  put: 'PUT',
  patch: 'PATCH',
  delete: 'DELETE',
}

function createClient (token = null) {
  return axios.create ({
    baseURL: process.env.VUE_APP_API_ENDPOINT_BASE,
    headers: {
      Authorization: `Bearer ${token}`
    },
  })
}

function assignCan (user) {
  let can = {
    manage: false,
    attend: false,
  }
  if (user.position === Position.Manager) {
    can.manage = true
  }
  if (user.position === Position.Member) {
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
        this.client = createClient (tokenData.accessToken)
        for (let request of this.queue) {
          this.request (request.method, request.url, request.data).then (request.resolve)
          this.$route.replace ({name: ''})
        }
        this.queue = []
        return this
      },
      async getMyself () {
        const me = await this.get ('/user')
        return assignCan (me)
      },
      async updateMyself (user) {
        const me = await this.patch ('/user', {
          name: user.name,
          email: user.email,
        })
        return me
      },
      async getUsers () {
        const users = await this.get ('/users')
        return users
      },
      async patchUser (user) {
        const patchedUser = await this.patch (`/users/${user.id}`, {
          position: user.position,
        })
        return patchedUser
      },
      async get (url) {
        return await this.request (requestMethods.get, url)
      },
      async post (url, data) {
        return await this.request (requestMethods.post, url, data)
      },
      async put (url, data) {
        return await this.request (requestMethods.put, url, data)
      },
      async patch (url, data) {
        return await this.request (requestMethods.patch, url, data)
      },
      async delete (url) {
        return await this.request (requestMethods.delete, url)
      },
      request (method, url, data = null) {
        return new Promise (async (resolve) => {
          if (this.client) {
            if (toastMessages[method]) {
              toast.dismiss ()
            }
            try {
              const response = await this.client.request ({
                method,
                url,
                data,
              })
              if (toastMessages[method]) {
                toast.success (i18n.t (toastMessages[method]))
              }
              resolve (response.data)
            } catch (error) {
              if (error.response && error.response.data.error_description) {
                toast.error (error.response.data.error_description)
              } else {
                toast.error (i18n.t ('error.unknown'))
              }
            }
          } else {
            this.queue.push ({
              method,
              url,
              data,
              resolve,
            })
          }
        })
      }
    }
  }
}

Vue.use (RunnersPlaza)
