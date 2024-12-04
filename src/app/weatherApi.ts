// src/app/weatherApi.ts
import { WeatherData } from './types';

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/geo/1.0/direct';
const WEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const getWeatherData = async (city: string): Promise<WeatherData> => {
  try {
    // Verificação adicional da API Key
    if (!API_KEY) {
      throw new Error('API Key não configurada. Verifique o arquivo .env.local');
    }

    // Primeiro, obtenha as coordenadas da cidade
    const geoResponse = await fetch(
      `${BASE_URL}?q=${encodeURIComponent(city)}&limit=1&appid=${API_KEY}`
    );
    
    // Verificar se a resposta foi bem-sucedida
    if (!geoResponse.ok) {
      const errorBody = await geoResponse.text();
      console.error('Erro na resposta da API de geolocalização:', errorBody);
      throw new Error(`Erro na API de geolocalização: ${geoResponse.status}`);
    }

    const geoData = await geoResponse.json();

    if (!geoData.length) {
      throw new Error('Cidade não encontrada');
    }

    const { lat, lon } = geoData[0];

    // Agora use o endpoint de previsão do tempo
    const weatherResponse = await fetch(
      `${WEATHER_BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}&lang=pt_br`
    );

    // Verificar se a resposta do weather foi bem-sucedida
    if (!weatherResponse.ok) {
      const errorBody = await weatherResponse.text();
      console.error('Erro na resposta da API de weather:', errorBody);
      throw new Error(`Erro na API de weather: ${weatherResponse.status}`);
    }

    const weatherData = await weatherResponse.json();

    // Buscar também os dados atuais
    const currentResponse = await fetch(
      `${WEATHER_BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}&lang=pt_br`
    );

    if (!currentResponse.ok) {
      const errorBody = await currentResponse.text();
      console.error('Erro na resposta da API de current weather:', errorBody);
      throw new Error(`Erro na API de current weather: ${currentResponse.status}`);
    }

    const currentData = await currentResponse.json();

    // Processar dados de previsão
    const processedForecast = processForecastData(weatherData);

    return {
      city: `${geoData[0].name}, ${geoData[0].country}`,
      temperature: Math.round(currentData.main.temp),
      feelsLike: Math.round(currentData.main.feels_like),
      humidity: currentData.main.humidity,
      windSpeed: Math.round(currentData.wind.speed * 3.6),
      pressure: currentData.main.pressure,
      visibility: Math.round(currentData.visibility / 1000),
      uvIndex: 0, // A API gratuita não fornece índice UV
      condition: currentData.weather[0].main,
      forecast: processedForecast
    };
  } catch (error) {
    console.error('Erro ao buscar dados do clima:', error);
    throw error;
  }
};

const processForecastData = (forecastData: any) => {
  if (!forecastData?.list?.length) {
    return [];
  }

  const dailyForecasts = new Map();

  forecastData.list.forEach((item: any) => {
    const date = new Date(item.dt * 1000);
    const dateStr = date.toISOString().split('T')[0];

    if (!dailyForecasts.has(dateStr)) {
      dailyForecasts.set(dateStr, {
        date: date.toLocaleDateString('pt-BR'),
        dayName: date.toLocaleDateString('pt-BR', { weekday: 'short' }),
        maxTemp: item.main.temp_max,
        minTemp: item.main.temp_min,
        condition: item.weather[0].main
      });
    } else {
      const existing = dailyForecasts.get(dateStr);
      existing.maxTemp = Math.max(existing.maxTemp, item.main.temp_max);
      existing.minTemp = Math.min(existing.minTemp, item.main.temp_min);
    }
  });

  return Array.from(dailyForecasts.values())
    .slice(0, 5)
    .map(forecast => ({
      ...forecast,
      maxTemp: Math.round(forecast.maxTemp),
      minTemp: Math.round(forecast.minTemp)
    }));
};