<template>
  <v-progress-circular
    v-show="showProgressCircular"
    indeterminate
    color="primary"
    class="bottom"
 />
</template>

<script>
export default {
  name: "the-infinite-scroll",
  inject: [
    'changePage',
  ],
  data () {
    return {
      bottom: false,
      currentPage: 0,
      lastPage: 0,
    }
  },
  computed: {
    showProgressCircular () {
      return this.currentPage === 0 || (this.bottom && this.currentPage !== this.lastPage)
    },
  },
  mounted () {
    this.updatePage ()
    window.addEventListener('scroll', () => {
      this.bottom = this.bottomVisible()
    })
  },
  methods: {
    bottomVisible() {
      const scrollY = window.scrollY
      const visible = document.documentElement.clientHeight
      const pageHeight = document.documentElement.scrollHeight
      const bottomOfPage = visible + scrollY >= pageHeight
      return bottomOfPage || pageHeight < visible
    },
    reload () {
      let paging = this.pagination.getPaging ()
      this.currentPage = paging.page
      this.lastPage = parseInt (paging.last_page)
    },
    async updatePage () {
      this.pagination.updatePage (this.currentPage + 1)
      await this.changePage ()
      this.reload ()
    },
  },
  watch: {
    bottom (bottom) {
      if (bottom && this.currentPage !== this.lastPage) {
        this.updatePage ()
      }
    },
  },
}
</script>

<style>
html {
  overflow: scroll;
}
</style>
