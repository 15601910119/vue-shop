<template>
  <div class="route">
    <router-view></router-view>
    <app-footer></app-footer>
  </div>
</template>

<script>
import Footer from '@/components/footer'
export default {
  components: {
    'app-footer': Footer
  }
}
</script>