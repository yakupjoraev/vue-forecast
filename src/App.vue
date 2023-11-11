<script setup>
import { ref, onMounted, computed } from "vue";
import { API_KEY, BASE_URL } from "./constants";
import WeatherSummary from "./components/WeatherSummary.vue";
import Highlights from "./components/Highlights.vue";
import Coords from "./components/Coords.vue";
import Humidity from "./components/Humidity.vue";

const city = ref(localStorage.getItem("lastSearchedCity") || "Paris");
const weatherInfo = ref(null);
const isError = computed(() => weatherInfo.value?.cod !== 200);

function getWeather() {
  fetch(`${BASE_URL}?q=${city.value}&units=metric&appid=${API_KEY}`)
    .then((response) => response.json())
    .then((data) => (weatherInfo.value = data));
}

onMounted(getWeather);
</script>

<template>
  <div class="page">
    <main class="main">
      <div class="container">
        <div class="laptop">
          <div class="sections">
            <section
              :class="['section', 'section-left', { 'section-error': isError }]"
            >
              <div class="info">
                <div class="city-inner">
                  <input
                    v-model="city"
                    type="text"
                    class="search"
                    @keyup.enter="getWeather"
                  />

                  <button class="city-btn" type="button" @click="getWeather">
                    <img src="/src/assets/img/search.svg" alt="" />
                  </button>
                </div>

                <WeatherSummary v-if="!isError" :weatherInfo="weatherInfo" />
                <div v-else class="error">
                  <div class="error-title">Ooooops! Something went wrong</div>
                  <div v-if="weatherInfo?.message" class="error-message">
                    {{ weatherInfo?.message }}
                  </div>
                </div>
              </div>
            </section>
            <section class="section section-right">
              <Highlights v-if="!isError" :weatherInfo="weatherInfo" />
            </section>
          </div>
          <div v-if="!isError" class="sections">
            <Coords :coord="weatherInfo.coord" />
            <Humidity :humidity="weatherInfo.main" />
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style lang="scss" scoped>
@import "./assets/styles/main.scss";

.page {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px 0;
  background-color: #59585d;
}

.laptop {
  width: 100%;
  padding: 20px;
  background-color: #0e100f;
  border-radius: 25px;
}

.sections {
  display: flex;
  width: 100%;
}

@media (max-width: 767px) {
  .sections {
    flex-direction: column;
  }
}

.section-left {
  width: 30%;
  padding-right: 10px;
}

@media (max-width: 767px) {
  .section-left {
    width: 100%;
    padding-right: 0;
  }
}

.section-left.section-error {
  min-width: 235px;
  width: auto;
  padding-right: 0;

  & ~ .section-right {
    width: 0;
    padding-left: 0;
  }
}

.error {
  padding-top: 20px;
}

.error-title {
  margin-bottom: 20px;
  font-size: 18px;
  font-weight: 700;
}

.error-message {
  text-transform: capitalize;
}

.section-right {
  width: 70%;
  padding-left: 10px;
}

@media (max-width: 767px) {
  .section-right {
    width: 100%;
    margin-top: 16px;
    padding-left: 0;
  }
}

.city-inner {
  position: relative;
  display: inline-block;
  width: 100%;
}

.city-btn {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  right: 10px;
  width: 25px;
  height: 25px;
  background-color: transparent;
  border: 0;
  padding: 0;
  margin: 0;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.info {
  height: 100%;
  padding: 16px;
  background: url("/src/assets/img/gradient-1.jpg") no-repeat 50% 50%;
  background-size: cover;
  border-radius: 25px;
}

.search {
  width: 100%;
  padding: 16px;
  font-family: "Inter", Arial, sans-serif;
  color: var(--white);
  background-color: rgba(0, 0, 0, 0.75);
  border-radius: 16px;
  border: none;
  outline: none;
  cursor: pointer;
}

.section-bottom {
  width: 50%;
  margin-top: 16px;
}

@media (max-width: 767px) {
  .section-bottom {
    width: 100%;
  }
}
</style>
