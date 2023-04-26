<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Footer from '@/components/layout/Footer'

export default {
  components: {
    Footer
  }
}
</script>

<style lang="scss" scoped>
.theme--light.v-application {
  background: #F9FAFA;
}
</style>