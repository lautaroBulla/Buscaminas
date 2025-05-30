<script setup lang="ts">
  import { useAuth } from '~/composables/useAuth';
  import { z } from 'zod/v4';

  const { login } = useAuth();

  const schema = z.object({
    username: z.string().min(1, 'Username is required'),
    password: z.string().min(1, 'Password is required')
  });

  const credentials = ref({
    username: '',
    password: ''
  });
  const errorMessage = ref('');
  const errorUsername = ref('');
  const errorPassword = ref('');
  const errors = ref<{ username?: string; password?: string }>({});

  const submit = async () => {
    errorMessage.value = '';
    errors.value = {};

    const validation = schema.safeParse(credentials.value);
    if (!validation.success) {
      validation.error.issues.forEach(err => {
        const field = err.path[0] as keyof typeof errors.value;
        errors.value[field] = err.message;
      });
      return;
    }

    try {
      await login(credentials.value.username, credentials.value.password);
    } catch (error: any) {
      errorMessage.value = error?.data?.message || 'Login failed. Please try again.';
    }
  };
</script>

<template>
  <div class="flex items-center justify-center">
    <form @submit.prevent="submit" class="card flex flex-col items-center space-y-5 p-5 w-2/12 h-fit">

        <p v-if="errorMessage">{{ errorMessage }}</p>

        <div class="flex flex-col items-start w-full">
          <p class="secondary">{{ $t('login.username') }}</p>
          <input
            type="text"
            class="input"
            v-model="credentials.username"
          />
          <p v-if="errors.username" class="text-sm">{{ errors.username }}</p>
        </div>

        <div class="flex flex-col items-start w-full">
          <p class="secondary">{{ $t('login.password') }}</p>
          <input
            type="password"
            class="input"
            v-model="credentials.password"
          />
          <p v-if="errors.password" class="text-sm">{{ errors.password }}</p>
        </div>

        <div class="flex flex-col items-center w-full">
          <button type="submit" class="primary">
            {{ $t('login.submit') }}
          </button>
        </div>

    </form>
  </div>
</template>
