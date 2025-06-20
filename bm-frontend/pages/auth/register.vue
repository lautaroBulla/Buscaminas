<script setup lang="ts">
  definePageMeta({
    middleware: ['guest']
  })

  import { z } from 'zod/v4';

  const { locale, t } = useI18n();

  const { register } = useAuth();

  const passwordSchema = z.string()
    .min(8, t('login.strongPassword'))
    .regex(/[A-Z]/, t('login.strongPassword'))
    .regex(/[a-z]/, t('login.strongPassword'))
    .regex(/[0-9]/, t('login.strongPassword'))  
    .regex(/[^A-Za-z0-9]/, t('login.strongPassword')); 

  const schema = z.object({
    username: z.string().min(1, t('login.emptyUsername')),
    password: passwordSchema
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
        errorMessage.value = t('login.failedRegister');
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
  <div class="flex items-center justify-center 
              p-2
              md:pt-4"
  >
    <form @submit.prevent="submit" class="card flex flex-col items-center space-y-5 p-5 h-fit
                                          w-full 
                                          md:w-8/12 
                                          lg:w-6/12
                                          xl:w-4/12"
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
