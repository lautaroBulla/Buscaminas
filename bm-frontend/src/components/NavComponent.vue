
<template>
    <nav class="flex flex-row bg-gray-700 w-full">
        <div class="w-1/3"></div>
        <div class="flex justify-center w-1/3">
            <p class="text-5xl">
                {{ $t('nav.title') }}
            </p>  
        </div>
        <div class="flex justify-end space-x-5 mr-10 w-1/3">
            <button class="border hover:cursor-pointer">
                Register
            </button>
            <button class="border hover:cursor-pointer">
                Login
            </button>
        </div>
    </nav>
</template>