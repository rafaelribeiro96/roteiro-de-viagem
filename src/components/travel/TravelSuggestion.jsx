import React, { useState } from 'react';

const KEY_GPT = process.env.NEXT_PUBLIC_KEY_GPT;
const KEY_GOOGLE = process.env.NEXT_PUBLIC_KEY_GOOGLE;
const SEARCH_ENGINE_ID = process.env.NEXT_PUBLIC_SEARCH_ENGINE_ID;

export default function TravelSuggestion() {
  const [city, setCity] = useState('');
  const [days, setDays] = useState(3);
  const [loading, setLoading] = useState(false);
  const [travel, setTravel] = useState('');
  const [observacaoUsuario, setObservacaoUsuario] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [copyButtonText, setCopyButtonText] = useState('Copiar Roteiro');
  const [images, setImages] = useState([]);

  async function fetchImages(query) {
    const url = `https://www.googleapis.com/customsearch/v1?key=${KEY_GOOGLE}&cx=${SEARCH_ENGINE_ID}&q=${encodeURIComponent(
      query
    )}&searchType=image`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.items) {
      return data.items.map((item) => item.link);
    } else {
      throw new Error('Nenhuma imagem encontrada.');
    }
  }

  async function handleGenerate() {
    setTravel('');
    setImages([]);
    if (city === '') {
      setErrorMessage('Por favor, preencha o campo da cidade.');
      return;
    } else if (days < 1 || days > 60) {
      setErrorMessage('O número de dias deve estar entre 1 e 60.');
      return;
    }

    setLoading(true);
    setErrorMessage('');

    const prompt = `Crie um roteiro para uma viagem de exatos ${days} dias na cidade(s), estado, país ou região de: "${city}", busque por lugares turísticos, lugares mais visitados, seja preciso nos dias de estadia fornecidos e limite o roteiro apenas na cidade fornecida. Forneça apenas em tópicos com nome do local onde ir em cada dia e diga o que há de interessante naquele lugar / atividade. Além de separar as atividades pelos turnos para uma maior dimensão de horário, como manhã, tarde e noite. Considere que o usuário irá se deslocar de um lugar para o outro e que o tempo de deslocamento deve ser considerado para o planejamento do roteiro. E no final da resposta, disponibilize observações que considere importante para aquela viagem do usuário para aquele local. Considere as seguintes observações sobre os gostos do usuário, no sentido do que ele gosta de fazer, observações para a viagem, limitações de datas, etc: ${observacaoUsuario}.`;

    fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${KEY_GPT}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.8,
        max_tokens: 500,
        top_p: 1
      })
    })
      .then((response) => response.json())
      .then((data) => {
        setTravel(data.choices[0].message.content);
      })
      .catch((error) => {
        setErrorMessage('Ocorreu um erro ao gerar o roteiro.');
        console.error('Erro ao gerar roteiro:', error);
      })
      .finally(() => {
        setLoading(false);
      });

    // Buscar imagens após gerar o relatório
    try {
      const fetchedImages = await fetchImages(city);
      // Limitar as imagens a uma quantidade máxima de 6
      const limitedImages = fetchedImages.slice(0, 6);
      setImages(limitedImages);
    } catch (error) {
      console.error('Erro ao buscar imagens:', error);
    }
  }

  function copyToClipboard(text) {
    navigator.clipboard.writeText(text);
    setCopyButtonText('Copiado');
    setTimeout(() => {
      setCopyButtonText('Copiar Roteiro');
    }, 2000); // Altere o tempo conforme desejado (em milissegundos)
  }

  return (
    <div className="travel-suggestion">
      <h3 className="title-chat-theme">Gerar Roteiro de Viagem</h3>
      <div className="input-travel-suggestion">
        <label htmlFor="city">Cidade(s), Estado, Região, País:</label>
        <input
          className="input-city-travel"
          type="text"
          id="city"
          placeholder='Ex: "Rio de Janeiro, RJ", "Paris", "Nordeste do Brasil", "Argentina", "Europa", etc'
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <label htmlFor="days">Quantidade de Dias de viagem (1-60):</label>
        <input
          className="input-days-travel"
          type="number"
          id="days"
          value={days}
          onChange={(e) => setDays(e.target.value)}
        />
        <label htmlFor="observacaoUsuario">
          Observações de gostos, desejos, etc:
        </label>
        <textarea
          className="input-obs-travel"
          id="observacaoUsuario"
          placeholder='Ex: "Gosto de lugares históricos, praia, museus, bares, viagem a negócio, etc"'
          value={observacaoUsuario}
          onChange={(e) => setObservacaoUsuario(e.target.value)}
        />
      </div>

      <div className="div-chat-buttons-theme">
        <button
          className="button-gerar-relatorio"
          onClick={handleGenerate}
          disabled={loading}
        >
          {loading ? 'Gerando...' : 'Gerar Roteiro'}
        </button>
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {travel && (
        <div className="travel-suggestion-content">
          <h4>Roteiro sugerido:</h4>
          {travel.split('\n\n').map((paragraph, i) => (
            <div key={i}>
              <p className="travel-text-chat-theme">
                {paragraph.split('\n').map((line, j) => (
                  <span key={j}>
                    {line}
                    <br />
                  </span>
                ))}
              </p>
              <br />
            </div>
          ))}
          <div className="share-buttons">
            <button
              className="copy-button"
              onClick={() => copyToClipboard(travel)}
            >
              {copyButtonText}
            </button>
            <button
              className="whatsapp-button-share"
              onClick={() => {
                const url = `whatsapp://send?text=${encodeURIComponent(
                  travel
                )}`;
                window.open(url, '_blank');
              }}
            >
              Compartilhar no WhatsApp
            </button>
          </div>
        </div>
      )}

      {travel && images.length > 0 && (
        <div className="image-gallery">
          <h4>Imagens de {city}:</h4>
          <div className="image-grid">
            {images.map((imageUrl, index) => (
              <div key={index} className="image-container">
                <img
                  src={imageUrl}
                  alt={`Imagem ${index + 1}`}
                  className="image"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
