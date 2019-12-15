<template>
  <div class="text-xs-center">
    <v-pagination
      v-model="currentPage"
      :length="lastPage"
    ></v-pagination>
  </div>
</template>

<script>
export default {
  name: "the-pagination",
  props: [
    'refreshCounter',
  ],
  inject: [
    'changePage',
  ],
  data () {
    return {
      currentPage: 1,
      lastPage: 1,
    }
  },
  mounted () {
    this.updatePage ()
  },
  methods: {
    reload () {
      let paging = this.pagination.getPaging ()

      this.currentPage = paging.page
      this.lastPage = parseInt (paging.last_page)
    },
    async updatePage () {
      this.pagination.updatePage (this.currentPage)
      await this.changePage ()
      this.reload ()
    },
  },
  watch: {
    currentPage () {
      this.updatePage ()
    },
    refreshCounter () {
      this.updatePage ()
    },
  },
}
</script>
