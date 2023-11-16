<template>
    <div @click="toggleTheme"
        class="rounded flex p-4 space-x-6 justify-center items-center">
        <img src="../../assets/svg/icon-light-theme.svg" alt="Sun" />
        <label htmlFor="default-toggle" class="inline-flex relative items-center cursor-pointer">
            <input type="checkbox" :checked="isDarkMode" @input="toggleTheme" id="default-toggle"
                class="sr-only peer" />
            <div
                class="w-10 h-5 rounded-full peer peer-checked:after:translate-x-5 bg-accent-2  peer-checked:after:border-white after:content-[''] after:absolute after:top-[3px] after:left-[3px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3.5 after:w-3.5 after:transition-all peer-checked:bg-darkBlue">
            </div>
        </label>
        <img src="../../assets/svg/icon-dark-theme.svg" alt="Moon" />
    </div>
  </template>
  
  <script >
  import { ref, onMounted } from 'vue';
  
  export default {
      setup() {
          const d2dtheme = 'd2dtheme';
  
          const isDarkMode = ref(
              localStorage.getItem(d2dtheme) === 'dark' ||
              window.matchMedia('(prefers-color-scheme: dark)').matches
          );
  
          const toggleTheme = () => {
              isDarkMode.value = !isDarkMode.value;
              updateDocumentTheme();
              localStorage.setItem(d2dtheme, isDarkMode.value ? 'dark' : 'light');
          };
  
          const updateDocumentTheme = () => {
              const theme = isDarkMode.value ? 'dark' : 'light';
              document.documentElement.setAttribute('data-theme', theme);
          };
  
          const handleSystemThemeChange = (event) => {
              isDarkMode.value = event.matches;
              updateDocumentTheme();
          };
  
          onMounted(() => {
              const storedTheme = localStorage.getItem(d2dtheme);
              if (storedTheme) {
                  isDarkMode.value = storedTheme === 'dark';
                  updateDocumentTheme();
              } else {
                  const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
                  darkModeMediaQuery.addEventListener('change', handleSystemThemeChange);
  
                  // Setting document theme to immediately page mount if user prefers dark mode
                  if (darkModeMediaQuery.matches) {
                      updateDocumentTheme();
                  }
              }
          });
  
          return {
              isDarkMode,
              toggleTheme,
          };
      },
  };
  </script>
  