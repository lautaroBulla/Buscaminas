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

  const submit = async () => {
    errorMessage.value = '';

    const validation = schema.safeParse(credentials.value);
    if (!validation.success) {
      console.error('Validation failed:', validation.error);
      
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
    <form @submit.prevent="submit">

      <div class="card flex flex-col items-center space-y-5 p-5">

        <p v-if="errorMessage">{{ errorMessage }}</p>

        <div class="flex flex-col items-start w-full">
          <p class="secondary">{{ $t('login.username') }}</p>
          <input
            type="text"
            class="input"
            v-model="credentials.username"
          />
        </div>

        <div class="flex flex-col items-start w-full">
          <p class="secondary">{{ $t('login.password') }}</p>
          <input
            type="password"
            class="input"
            v-model="credentials.password"
          />
        </div>

        <div class="flex flex-col items-center w-full">
          <button type="submit" class="primary">
            {{ $t('login.submit') }}
          </button>
        </div>

      </div>

    </form>
  </div>
</template>
