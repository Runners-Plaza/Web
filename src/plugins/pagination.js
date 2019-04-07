import Vue from 'vue'

const paging = {
  page: 1,
  per_page: 8,
  last_page: 1,
}

const pagination = {
  updateLastPage (lastPage) {
    Object.assign (paging, {
      last_page: parseInt (lastPage),
    })
  },
  updatePage (page) {
    Object.assign (paging, {
      page: page,
    })
  },
  getPaging () {
    return paging
  },
  appendPaging (url) {
    if (url.indexOf ('page=') > -1 || url.indexOf ('per_page=') > -1) {
      return url
    }

    if (url.indexOf ('?') > -1) {
      return url + '&page=' + paging.page + '&per_page=' + paging.per_page
    } else {
      return url + '?page=' + paging.page + '&per_page=' + paging.per_page
    }
  },
  appendPagingForNextOne (url) {
    if (url.indexOf ('page=') > -1 || url.indexOf ('per_page=') > -1) {
      return url
    }

    if (url.indexOf('?') > -1) {
      return url + '&page=1&per_page=1'
    } else {
      return url + '?page=1&per_page=1'
    }
  },
  resetPaging () {
    Object.assign (paging, {
      page: 1,
    })
  }
}

const Pagination = {
  install (Vue) {
    Vue.mixin ({
      data () {
        return {
          pagination,
        }
      },
    })
  }
}

Vue.use (Pagination)

export default pagination
