<script setup>
    import { useI18n } from 'vue-i18n';

    const { locale } = useI18n();

    function changeLanguage (event) {
        locale.value = event.target.value;
    }
</script>

<template>
    <div class="flex flex-row gap-x-2 mr-5">
        <label>{{ $t('languageSelector.language') }}:</label>
        <select v-model="locale" @change="changeLanguage">
            <option value="en">English</option>
            <option value="es">Spanish</option>
        </select>
    </div>
</template>