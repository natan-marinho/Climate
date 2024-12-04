import { Sun, Cloud, CloudRain, CloudLightning, CloudFog } from "phosphor-react";
import styled from "styled-components";

export const WeatherIcon = ({ condition }: { condition: string }) => {
  const iconMap: { [key: string]: JSX.Element } = {
    'Clear': <Sun size={32} weight="fill" color="#FFB200" />,
    'Clouds': <Cloud size={32} weight="fill" color="#60A5FA" />,
    'Rain': <CloudRain size={32} weight="fill" color="#60A5FA" />,
    'Thunderstorm': <CloudLightning size={32} weight="fill" color="#60A5FA" />,
    'Fog': <CloudFog size={32} weight="fill" color="#9CA3AF" />
  };

  return iconMap[condition] || <Cloud size={32} weight="fill" color="#60A5FA" />;
};

export const IconContainer = styled.div<{ condition: string }>`
  width: 2rem;
  height: 2rem;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => {
    switch (props.condition) {
      case 'Clear': return '#FEF3C7';
      case 'Clouds': return '#DBEAFE';
      case 'Rain': return '#E0E7FF';
      case 'Thunderstorm': return '#E0E7FF';
      case 'Fog': return '#F3F4F6';
      default: return '#DBEAFE';
    }
  }};
`;