import Vue from 'vue'
import axios from 'axios'
import toast from './global'
import pagination from './pagination'
import i18n from './i18n'
import parse from 'parse-link-header'

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
  let params = null

  if (token != null) {
    params = {
      baseURL: process.env.VUE_APP_API_ENDPOINT_BASE,
      headers: {
        Authorization: `Bearer ${token}`
      },
    }
  } else {
    params = {
      baseURL: process.env.VUE_APP_API_ENDPOINT_BASE,
    }
  }

  return axios.create (params)
}

function assignCan (user) {
  let can = {
    manage: false,
    attend: false,
  }
  if (user.position === Position.Manager) {
    can.manage = true
    can.attend = true
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
        if (tokenData == null) {
          this.client = createClient (null)
        } else {
          this.client = createClient (tokenData.accessToken)
        }
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
        return await this.get ('/users')
      },
      async patchUser (user) {
        const patchedUser = await this.patch (`/users/${user.id}`, {
          position: user.position,
        })
        return patchedUser
      },
      async getRunner () {
        return await this.get ('/runner')
      },
      async getRunners (status) {
        return await this.get (`/runners?status=${status}`)
      },
      async getRunnerDetail (id) {
        return await this.get (`/runners/${id}`)
      },
      async getNextPendingRunner () {
        return await this.getNextOne ('/runners?status=pending')
      },
      async postRunner (form) {
        return await this.post ('/runner', form)
      },
      async patchRunner (form) {
        return await this.patch ('/runner', form)
      },
      async acceptRunner (id, reason = '') {
        return await this.patch (`/runners/${id}/status`, {
          status: 'Approved',
          reason: '',
        })
      },
      async rejectRunner (id, reason = null) {
        return await this.patch (`/runners/${id}/status`, {
          status: 'Rejected',
          reason: '',
        })
      },
      async pendingRunner (id, reason = null) {
        return await this.patch (`/runners/${id}/status`, {
          status: 'Pending',
          reason: '',
        })
      },
      async deleteRunner (form) {
        return await this.delete ('/runner')
      },
      async getEvent (id) {
        return await this.get (`/events/${id}`)
      },
      async getEvents () {
        return await this.get ('/events')
      },
      async getRecordableEvents () {
        return await this.get ('/events?recordable=1')
      },
      async postEvent (form) {
        return await this.post ('/events', form)
      },
      async patchEvent (id, form) {
        return await this.patch (`/events/${id}`, form)
      },
      async deleteEvent (id) {
        return await this.delete (`/events/${id}`)
      },
      async getNextOne (url) {
        url = pagination.appendPagingForNextOne (url)
        return await this.get (url)
      },
      async get (url) {
        let link = null
        let response = null

        url = pagination.appendPaging (url)
        response = await this.request (requestMethods.get, url)
        link = parse (response.headers.link)
        if (link != null) {
          pagination.updateLastPage (link.last.page)
        }

        return response.data
      },
      async post (url, data) {
        let response = await this.request (requestMethods.post, url, data)
        return response.data
      },
      async put (url, data) {
        let response = await this.request (requestMethods.put, url, data)
        return response.data
      },
      async patch (url, data) {
        let response = await this.request (requestMethods.patch, url, data)
        return response.data
      },
      async delete (url) {
        let response = await this.request (requestMethods.delete, url)
        return response.data
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

              resolve (response)
            } catch (error) {
              if (error.response && error.response.data.error_description) {
                toast.error (error.response.data.error_description)
                resolve (error.response)
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
