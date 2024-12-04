import styled from "styled-components";

export const ContainerPage = styled.div`
    width: 100%;
    height: 100%;
    padding: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(to bottom,#1E40AF, #fff);
`;

export const Content = styled.div`
    width: 90%;
    max-width: 1200px;
    height: max-content;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    gap: 1.5rem;
    background: linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(30, 64, 175, 0.1));
    border-radius: 2rem;

    padding: 2rem;

    @media (max-width: 1024px) {
        max-height: 100%;
        overflow: auto;
    }

    @media (max-width: 768px) {
        width: 100%;
        padding: 1.5rem;
        gap: 1rem;
    }
`;

export const Title = styled.h1`
    width: 100%;
    font-size: 1.75rem;
    color: #fff;

    @media (max-width: 768px) {
        font-size: 1.5rem;
    }
`;

export const Input = styled.input`
    width: 100%;
    background-color: #fff;
    opacity: 0.15;
    border: 1px solid transparent;
    border-radius: 1rem;
    outline: 0;
    padding: 0.75rem 0.5rem;
    font-size: 1rem;

    &:hover {
        border: 1px solid #1E40AF;
    }
`;

export const ClimateData = styled.div`
    width: 100%;
    max-width: 800px;
    background-color: #fafafb;
    display: flex;
    justify-content: center;
    align-items: start;
    gap: 2rem;
    border-radius: 2rem;
    padding: 2rem;

    @media (max-width: 768px) {
        padding: 1.5rem;
    }
`;

export const MainData = styled.div`
    width: 50%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

export const City = styled.h1`
    font-size: 2rem;
    color: #1F2937;

    @media (max-width: 768px) {
        font-size: 1.75rem;
    }
`;

export const Date = styled.h6`
    color: #6B7280;
    font-size: 1rem;
`;

export const Temperature = styled.h1`
    font-size: 4rem;
    color: #1F2937;

    @media (max-width: 768px) {
        font-size: 3.5rem;
    }
`;

export const StatusClimate = styled.div`
    font-size: 1.5rem;
    color: #1F2937;
    display: flex;
    align-items: center;
    justify-content: start;
    gap: 1rem;

    @media (max-width: 768px) {
        font-size: 1.25rem;
    }
`;

export const DetailedData = styled.div`
    width: 100%;
    max-width: 800px;
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    padding: 2rem;
    background-color: #f3f4f6;
    border-radius: 1.5rem;

    @media (max-width: 768px) {
        padding: 1.5rem;
        border-radius: 1rem;
    }
`;

export const DetailTitle = styled.h1`
    width: 100%;
    font-size: 1.5rem;
    color: #1F2937;

    @media (max-width: 768px) {
        font-size: 1.25rem;
    }
`;

export const DetailContainer = styled.div`
    padding: 1rem;
    width: calc(50% - 1rem);
    background-color: #ffffff;
    border-radius: 1rem;

    @media (max-width: 768px) {
        width: 100%;
    }
`;

export const DetailLabel = styled.h6`
    color: #6B7280;
    font-size: 0.75rem;
`;

export const Detail = styled.h1`
    font-size: 1.25rem;
    color: #1F2937;

    @media (max-width: 768px) {
        font-size: 1.1rem;
    }
`;

export const Forecast = styled.h1`
    width: 100%;
    max-width: 800px;
    font-size: 1.5rem;
    color: #fff;

    @media (max-width: 768px) {
        font-size: 1.25rem;
    }
`;

export const ListNextDays = styled.div`
    width: 100%;
    max-width: 800px;
    display: flex;
    justify-content: center;
    gap: 1.5rem;

    @media (max-width: 768px) {
        flex-wrap: wrap;
        gap: 1rem;
    }
`;

export const NextDay = styled.div`
    flex: 0 0 calc(20% - 1.2rem);
    padding: 1.5rem;
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    background-color: #ffffff;

    @media (max-width: 768px) {
        flex: 0 0 calc(50% - 0.5rem);
        padding: 1rem;
    }
`;

export const NextDayTitle = styled.div`
    width: 100%;
    font-size: 1.25rem;
    color: #1F2937;

    @media (max-width: 768px) {
        font-size: 1.1rem;
    }
`;