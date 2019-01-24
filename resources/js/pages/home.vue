<template>
  <card :title="$t('home')">
    {{ $t('welcome') }}
  </card>
</template>

<script>
export default {
  metaInfo () {
    return { title: this.$t('home') }
  }
}
</script>
