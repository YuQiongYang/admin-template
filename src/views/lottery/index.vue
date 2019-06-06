<template>
  <div class="lottery-con">
    <div class="yin-header">
      <Navbar />
    </div>
    <div class="scroll-y">
      qqq
    </div>
  </div>
</template>

<script>
import Navbar from '@/layout/components/Navbar'
export default {
  name: 'Lotterry',
  components: {
    Navbar
  },
  data() {
    return {
      list: null,
      listLoading: true
    }
  },
  created() {
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>

</style>
