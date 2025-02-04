interface TranslationResponse {
  [key: string]: {
    [key: string]: string | string[] | Record<string, string>;
  };
}

interface UseTranslationsReturn {
  translations: TranslationResponse | null;
  error: string | null;
}
