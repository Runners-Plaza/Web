<template>
  <div @update-paging="updatePaging" class="text-xs-center">
    <v-pagination
      v-model="currentPage"
      :length="lastPage"
      @input="$emit('change-page', currentPage)"
    ></v-pagination>
  </div>
</template>

<script>
export default {
  name: "the-pagination",
  props: [
    'reloadPaging',
  ],
  data () {
    return {
      currentPage: 1,
      lastPage: 1,
    }
  },
  mounted () {
    this.currentPage = 1
  },
  methods: {
    updatePaging () {
      let paging = this.pagination.getPaging ()

      this.currentPage = paging.page
      this.lastPage = parseInt(paging.last_page)
    },
  },
  watch: {
    reloadPaging () {
      this.updatePaging ()
    },
  },
}
</script>
