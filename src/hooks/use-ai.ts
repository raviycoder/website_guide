// src/hooks/useAI.ts
import { useState, useEffect } from 'react';
import { checkAIAvailability, createAISession } from '@/lib/chrome-ai';

export function useAI() {
  const [session, setSession] = useState<{ prompt: (input: string) => Promise<string> } | null>(null)
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function init() {
      try {
        const status = await checkAIAvailability();
        if (status === 'available') {
          const aiSession = await createAISession();
          setSession(aiSession);
          setIsReady(true);
        }
      } catch (e) {
        setError('AI not available' + e);
      }
    }
    init();
  }, []);

  return { session, isReady, error };
}
