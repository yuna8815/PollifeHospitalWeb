<template>
  <v-app>
    <TopNav />
    <v-main>
      <router-view />
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import TopNav from '@/components/layout/TopNav'
import Footer from '@/components/layout/Footer'
export default {
  components: {
    TopNav,
    Footer
  }
}
</script>