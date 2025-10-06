'use client';

import { useEffect, useState } from 'react';

export interface CoinData {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  sparkline: number[];
}

// Top 50 cryptocurrencies trading pairs on Binance
const BINANCE_SYMBOLS = [
  'BTCUSDT', 'ETHUSDT', 'BNBUSDT', 'SOLUSDT', 'XRPUSDT',
  'ADAUSDT', 'AVAXUSDT', 'DOGEUSDT', 'DOTUSDT', 'MATICUSDT',
  'LINKUSDT', 'LTCUSDT', 'UNIUSDT', 'ATOMUSDT', 'ETCUSDT',
  'XLMUSDT', 'FILUSDT', 'APTUSDT', 'INJUSDT', 'SUIUSDT',
  'ARBUSDT', 'OPUSDT', 'NEARUSDT', 'TIAUSDT', 'SEIUSDT',
  'STXUSDT', 'RENDERUSDT', 'IMXUSDT', 'KASUSDT', 'AAVEUSDT',
  'TAOUSDT', 'ALGOUSDT', 'FTMUSDT', 'RUNEUSDT', 'PYTHUSDT',
  'WIFUSDT', 'JUPUSDT', 'PENDLEUSDT', 'FLOKIUSDT', 'ICPUSDT',
  'HBARUSDT', 'VETUSDT', 'GRTUSDT', 'QNTUSDT', 'LDOUSDT',
  'EOSUSDT', 'SANDUSDT', 'AXSUSDT', 'MANAUSDT', 'PEPEUSDT'
];

const SYMBOL_MAP: Record<string, string> = {
  BTCUSDT: 'BTC',
  ETHUSDT: 'ETH',
  BNBUSDT: 'BNB',
  SOLUSDT: 'SOL',
  XRPUSDT: 'XRP',
  ADAUSDT: 'ADA',
  AVAXUSDT: 'AVAX',
  DOGEUSDT: 'DOGE',
  DOTUSDT: 'DOT',
  MATICUSDT: 'MATIC',
  LINKUSDT: 'LINK',
  LTCUSDT: 'LTC',
  UNIUSDT: 'UNI',
  ATOMUSDT: 'ATOM',
  ETCUSDT: 'ETC',
  XLMUSDT: 'XLM',
  FILUSDT: 'FIL',
  APTUSDT: 'APT',
  INJUSDT: 'INJ',
  SUIUSDT: 'SUI',
  ARBUSDT: 'ARB',
  OPUSDT: 'OP',
  NEARUSDT: 'NEAR',
  TIAUSDT: 'TIA',
  SEIUSDT: 'SEI',
  STXUSDT: 'STX',
  RENDERUSDT: 'RENDER',
  IMXUSDT: 'IMX',
  KASUSDT: 'KAS',
  AAVEUSDT: 'AAVE',
  TAOUSDT: 'TAO',
  ALGOUSDT: 'ALGO',
  FTMUSDT: 'FTM',
  RUNEUSDT: 'RUNE',
  PYTHUSDT: 'PYTH',
  WIFUSDT: 'WIF',
  JUPUSDT: 'JUP',
  PENDLEUSDT: 'PENDLE',
  FLOKIUSDT: 'FLOKI',
  ICPUSDT: 'ICP',
  HBARUSDT: 'HBAR',
  VETUSDT: 'VET',
  GRTUSDT: 'GRT',
  QNTUSDT: 'QNT',
  LDOUSDT: 'LDO',
  EOSUSDT: 'EOS',
  SANDUSDT: 'SAND',
  AXSUSDT: 'AXS',
  MANAUSDT: 'MANA',
  PEPEUSDT: 'PEPE'
};

export function useMultiCoinTicker() {
  const [coins, setCoins] = useState<CoinData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        // Fetch all tickers at once (more efficient, single request)
        const response = await fetch('https://api.binance.com/api/v3/ticker/24hr');

        if (!response.ok) throw new Error('Failed to fetch ticker data');

        const allTickers = await response.json();

        // Filter to only our selected symbols
        const filteredTickers = allTickers.filter((ticker: any) =>
          BINANCE_SYMBOLS.includes(ticker.symbol)
        );

        const coinData: CoinData[] = filteredTickers.map((ticker: any) => {
          const symbol = SYMBOL_MAP[ticker.symbol] || ticker.symbol;

          return {
            id: symbol.toLowerCase(),
            symbol,
            name: symbol,
            price: parseFloat(ticker.lastPrice),
            change24h: parseFloat(ticker.priceChangePercent),
            sparkline: [], // No sparkline data from Binance 24h ticker
          };
        });

        // Sort by market cap (approximate using volume as proxy)
        coinData.sort((a, b) => {
          const aIndex = BINANCE_SYMBOLS.indexOf(`${a.symbol}USDT`);
          const bIndex = BINANCE_SYMBOLS.indexOf(`${b.symbol}USDT`);
          return aIndex - bIndex;
        });

        setCoins(coinData);
        setIsLoading(false);
        setError(null);
      } catch (error) {
        console.error('Error fetching coin data:', error);
        setError('Unable to load coin data.');
        setIsLoading(false);
      }
    };

    // Initial fetch
    fetchCoins();

    // Update every 10 seconds (Binance has higher rate limits)
    const interval = setInterval(fetchCoins, 10000);

    return () => clearInterval(interval);
  }, []);

  return { coins, isLoading, error };
}
