export interface WeatherData {
    city: string;
    temperature: number;
    feelsLike: number;
    humidity: number;
    windSpeed: number;
    pressure: number;
    visibility: number;
    uvIndex: number;
    condition: string;
    forecast: ForecastDay[];
  }
  
  export interface ForecastDay {
    date: string;
    dayName: string;
    maxTemp: number;
    minTemp: number;
    condition: string;
  }