<script setup lang="ts">
  definePageMeta({
    middleware: ['guest']
  })

  import { z } from 'zod/v4';

  const { locale, t } = useI18n();

  const { register } = useAuth();

  const schema = z.object({
    username: z.string().min(1, 'Username is required'),
    password: z.string().min(1, 'Password is required')
  })

  const credentials = ref({
    username: '',
    password: ''
  })

  const errorMessage = ref('');
  const errors = ref<{username?: string, password?: string}>({});

  const showPassword = ref(false);

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
      await register(credentials.value.username, credentials.value.password);
      return navigateTo('/');
    } catch(error: any) {
      let msg = error?.data?.message; 
      if (!msg) {
        errorMessage.value = t('login.failed');
      } else if (msg === 'password is not strong enough') {
        if (locale.value === 'en') {
          errorMessage.value = 'Password is not strong enough';
        } else {
          errorMessage.value = 'La contraseña es muy debil';
        }
      } else {
        errorMessage.value = error?.data?.message;
      } 
    }
  }

  const changePassword = () => {
    if (credentials.value.password) {
      const toggleShow = document.getElementById('toggleShow');
      toggleShow?.classList.remove('hidden');
    } else {
      const toggleShow = document.getElementById('toggleShow');
      toggleShow?.classList.add('hidden');
    }
  }
</script>

<template>
  <div class="flex items-center justify-center">
    <form @submit.prevent="submit" class="card flex flex-col items-center space-y-5 p-5 h-fit
                                          w-11/12
                                          md:w-3/12"
    >

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
          <div class="relative w-full">
            <input
              :type="showPassword ? 'text' : 'password'"
              class="input w-full pr-10"
              v-model="credentials.password"
              @input="changePassword"
            />
            <button
              type="button"
              id="toggleShow"
              class="hidden absolute right-2 top-1/2 transform -translate-y-1/2 hover:cursor-pointer hover:opacity-80"
              @click="showPassword = !showPassword"
            >
              {{ showPassword ? 'Hide' : 'Show' }}
            </button>
          </div>
          <p v-if="errors.password" class="text-sm">{{ errors.password }}</p>
        </div>

        <div class="flex flex-col items-center w-full">
          <button type="submit" class="primary">
            {{ $t('login.register') }}
          </button>
        </div>

    </form>
  </div>
</template>
