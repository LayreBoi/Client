<template>
  <div class="flex gap-4 py-4">
    <avatar :user="user" class="w-10" />
    <div class="flexcol">
      <p>{{ user.username }}</p>
      <p class="opacity-35">
        {{ user.uuid }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IUser } from "/@/types/api/user";
import Avatar from "../user/Avatar.vue";
defineProps<{user: IUser}>();
</script>
