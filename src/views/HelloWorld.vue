<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
  </div>
</template>


<script setup lang="ts">
import { ref,reactive } from 'vue'

defineProps<{ msg: string }>()

interface LoginInfo {
  username: string;
  password: string;
}

const param = reactive<LoginInfo>({
  username: 'admin',
  password: '123123'
});

const count = ref(0)
</script>


<style scoped>
.read-the-docs {
  color: #888;
}
</style>
