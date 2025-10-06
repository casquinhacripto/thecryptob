'use client';

import { useEffect, useState, useRef } from 'react';

export interface BitcoinPriceData {
  price: number;
  high24h: number;
  low24h: number;
  volume24h: number;
  priceChange24h: number;
  priceChangePercent24h: number;
}

export function useBitcoinPrice() {
  const [data, setData] = useState<BitcoinPriceData | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const reconnectAttemptsRef = useRef(0);
  const maxReconnectAttempts = 5;

  const connect = () => {
    try {
      const ws = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@ticker');
      wsRef.current = ws;

      ws.onopen = () => {
        console.log('✅ WebSocket connected to Binance');
        setIsConnected(true);
        reconnectAttemptsRef.current = 0;
      };

      ws.onmessage = (event) => {
        try {
          const ticker = JSON.parse(event.data);

          setData({
            price: parseFloat(ticker.c),
            high24h: parseFloat(ticker.h),
            low24h: parseFloat(ticker.l),
            volume24h: parseFloat(ticker.q), // Quote volume in USDT
            priceChange24h: parseFloat(ticker.p),
            priceChangePercent24h: parseFloat(ticker.P),
          });
        } catch (error) {
          console.error('Error parsing WebSocket data:', error);
        }
      };

      ws.onerror = () => {
        // Silently handle WebSocket errors - they're expected during hot-reload
        // The onclose handler will manage reconnection
        setIsConnected(false);
      };

      ws.onclose = () => {
        console.log('🔌 WebSocket disconnected');
        setIsConnected(false);

        // Attempt to reconnect
        if (reconnectAttemptsRef.current < maxReconnectAttempts) {
          reconnectAttemptsRef.current++;
          console.log(`🔄 Reconnecting... (${reconnectAttemptsRef.current}/${maxReconnectAttempts})`);

          reconnectTimeoutRef.current = setTimeout(() => {
            connect();
          }, 5000); // Reconnect after 5 seconds
        } else {
          console.error('Max reconnection attempts reached');
        }
      };
    } catch (error) {
      console.error('Failed to create WebSocket connection:', error);
      setIsConnected(false);
    }
  };

  useEffect(() => {
    connect();

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
    };
  }, []);

  return { data, isConnected };
}
