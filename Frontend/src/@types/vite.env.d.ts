interface ImportMetaEnv {
  readonly MODE: string; // Para import.meta.env.MODE
  // Adicione outras variáveis de ambiente personalizadas, se necessário
  readonly VITE_API_URL?: string; // Exemplo opcional
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}