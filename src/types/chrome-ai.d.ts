// types/chrome-ai.d.ts
interface LanguageModelStatic {
  availability(): Promise<"available" | "downloadable" | "downloading" | "unavailable">;
  create(options?: {
    temperature?: number;
    topK?: number;
    monitor?: (monitor: DownloadMonitor) => void;
  }): Promise<LanguageModelSession>;
}

interface LanguageModelSession {
  prompt(input: string): Promise<string>;
  promptStreaming(input: string): ReadableStream;
  destroy(): void;
}

interface DownloadMonitor {
  addEventListener(event: 'downloadprogress', callback: (e: { loaded: number }) => void): void;
}

declare const LanguageModel: LanguageModelStatic;