<template>
    <section class=" shadow py-3 ">
        <div class="flex items-center justify-between max-w-[900px] mx-auto">
            <Logo :width="100"/>
            <ToggleSwitch />
        </div>

    </section>
</template>

<script setup>
import ToggleSwitch from './ui/ToggleSwitch.vue'
import Logo from '../assets/svg/Logo.vue'
</script>