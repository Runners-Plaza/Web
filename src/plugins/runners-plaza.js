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
      async getRecordsOfRunner (id) {
        return await this.get (`/runners/${id}/records`)
      },
      async getNextPendingRunner () {
        return await this.getNextOne ('/runners?status=Pending')
      },
      async postRunner (form) {
        return await this.post ('/runner', form)
      },
      async patchRunner (form) {
        return await this.patch ('/runner', form)
      },
      async acceptRunner (id) {
        return await this.patch (`/runners/${id}/status`, {
          status: 'Approved',
          reason: '',
        })
      },
      async rejectRunner (id, reason = null) {
        return await this.patch (`/runners/${id}/status`, {
          status: 'Rejected',
          reason: reason,
        })
      },
      async pendingRunner (id) {
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
      async getDistance (id) {
        return await this.get (`/distances/${id}`)
      },
      async getDistances (id) {
        return await this.get (`/events/${id}/distances`, false)
      },
      async postDistance (id, form) {
        return await this.post (`/events/${id}/distances`, form)
      },
      async patchDistance (id, form) {
        return await this.patch (`/distances/${id}`, form)
      },
      async deleteDistance (id) {
        return await this.delete (`/distances/${id}`)
      },
      async postDistanceRecord (id, form) {
        return await this.post (`/distances/${id}/records`, form)
      },
      async getRecordsOfEvent (id) {
        return await this.get (`/records?event_id=${id}`, false)
      },
      async getRecords (status) {
        if (status === null) {
          return await this.get (`/records`)
        } else {
          return await this.get (`/records?status=${status}`)
        }
      },
      async getMyRecords () {
        return await this.get (`/runner/records`)
      },
      async getRecord (id) {
        return await this.get (`/records/${id}`)
      },
      async getNextPendingRecord () {
        return await this.getNextOne ('/records?status=Pending')
      },
      async patchRecord (id, form) {
        return await this.patch (`/records/${id}`, form)
      },
      async deleteRecord (id) {
        return await this.delete (`/records/${id}`)
      },
      async postRecordCertificate (id, form) {
        return await this.post (`/records/${id}/certificate`, form)
      },
      async getRecordCertificate (id) {
        return await this.get (`/records/${id}/certificate`, false, false)
      },
      async getRecordError (id) {
        return await this.get (`/records/${id}/error`);
      },
      async acceptRecord (id) {
        return await this.patch(`/records/${id}/status`, {
          status: 'Approved',
          reason: '',
        })
      },
      async rejectRecord (id, reason = '') {
        return await this.patch(`/records/${id}/status`, {
          status: 'Rejected',
          reason: reason,
        })
      },
      async pendingRecord (id) {
        return await this.patch(`/records/${id}/status`, {
          status: 'Pending',
          reason: '',
        })
      },
      async getNextOne (url) {
        url = pagination.appendPagingForNextOne (url)
        return await this.get (url)
      },
      async get (url, paging = true, needToast = true) {
        let link = null
        let response = null

        if (paging) {
          url = pagination.appendPaging (url)
          response = await this.request (requestMethods.get, url, null, needToast)
          link = parse (response.headers.link)
          if (link != null) {
            pagination.updateLastPage (link.last.page)
          }
        } else {
          response = await this.request (requestMethods.get, url, null, needToast)
        }

        return response.data
      },
      async post (url, data, needToast = true) {
        let response = await this.request (requestMethods.post, url, data, needToast)
        return response.data
      },
      async put (url, data, needToast = true) {
        let response = await this.request (requestMethods.put, url, data, needToast)
        return response.data
      },
      async patch (url, data, needToast = true) {
        let response = await this.request (requestMethods.patch, url, data, needToast)
        return response.data
      },
      async delete (url, needToast) {
        let response = await this.request (requestMethods.delete, url, null, needToast)
        return response.data
      },
      request (method, url, data = null, needToast = true) {
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

              if (toastMessages[method] && needToast) {
                toast.success (i18n.t (toastMessages[method]))
              }

              resolve (response)
            } catch (error) {
              if (error.response && error.response.data.error_description) {
                if (needToast) {
                  toast.error (error.response.data.error_description)
                }
                resolve (error.response)
              } else {
                if (needToast) {
                  toast.error (i18n.t ('error.unknown'))
                }
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
