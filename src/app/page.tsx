'use client'

import { useEffect, useState } from 'react';
import { WeatherData } from './types';
import { getWeatherData } from './weatherApi';
import { WeatherIcon, IconContainer } from './weatherIcons';
import * as S from './style';

export default function Home() {
  const [city, setCity] = useState('São Paulo');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async (searchCity: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await getWeatherData(searchCity);
      setWeatherData(data);
    } catch (error: any) {
      setError(error.message || 'Erro ao buscar dados do clima');
      console.error('Erro:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(city);
  }, []);

  if (loading) {
    return <S.ContainerPage>Carregando...</S.ContainerPage>;
  }

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      fetchWeather(e.currentTarget.value);
    }
  };

  if (loading || !weatherData) {
    return <S.ContainerPage>Carregando...</S.ContainerPage>;
  }

  return (
    <S.ContainerPage>
      <S.Content>
        <S.Title>Clima Hoje</S.Title>
        <S.Input 
          type="text" 
          placeholder="Buscar cidade..."
          onKeyPress={handleSearch}
        />
        <S.ClimateData>
          <S.MainData>
            <S.City>{weatherData.city}</S.City>
            <S.Date>
              {new Date().toLocaleDateString('pt-BR', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </S.Date>
            <S.Temperature>{weatherData.temperature}° C</S.Temperature>
            <S.StatusClimate>
              <IconContainer condition={weatherData.condition}>
                <WeatherIcon condition={weatherData.condition} />
              </IconContainer>
              {weatherData.condition}
            </S.StatusClimate>
          </S.MainData>
          <S.DetailedData>
            <S.DetailTitle>Detalhes</S.DetailTitle>
            <S.DetailContainer>
              <S.DetailLabel>Sensação Térmica</S.DetailLabel>
              <S.Detail>{weatherData.feelsLike}° C</S.Detail>
            </S.DetailContainer>
            <S.DetailContainer>
              <S.DetailLabel>Umidade</S.DetailLabel>
              <S.Detail>{weatherData.humidity}%</S.Detail>
            </S.DetailContainer>
            <S.DetailContainer>
              <S.DetailLabel>Velocidade do Vento</S.DetailLabel>
              <S.Detail>{weatherData.windSpeed} km/h</S.Detail>
            </S.DetailContainer>
            <S.DetailContainer>
              <S.DetailLabel>Pressão</S.DetailLabel>
              <S.Detail>{weatherData.pressure} hPa</S.Detail>
            </S.DetailContainer>
            <S.DetailContainer>
              <S.DetailLabel>Visibilidade</S.DetailLabel>
              <S.Detail>{weatherData.visibility} km</S.Detail>
            </S.DetailContainer>
            <S.DetailContainer>
              <S.DetailLabel>Índice UV</S.DetailLabel>
              <S.Detail>{weatherData.uvIndex}</S.Detail>
            </S.DetailContainer>
          </S.DetailedData>
        </S.ClimateData>
        <S.Forecast>Próximos 5 dias</S.Forecast>
        <S.ListNextDays>
          {weatherData.forecast.map((day, index) => (
            <S.NextDay key={index}>
              <S.NextDayTitle>{day.dayName}</S.NextDayTitle>
              <S.DetailLabel>{day.date}</S.DetailLabel>
              <IconContainer condition={day.condition}>
                <WeatherIcon condition={day.condition} />
              </IconContainer>
              <S.Detail>{day.maxTemp}° C</S.Detail>
              <S.DetailLabel>{day.minTemp}° C</S.DetailLabel>
            </S.NextDay>
          ))}
        </S.ListNextDays>
      </S.Content>
    </S.ContainerPage>
  );
}