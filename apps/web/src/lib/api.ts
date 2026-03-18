import { env } from './env';

type RequestOptions = RequestInit & {
  token?: string;
};

export async function api<T>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const { token, headers, ...rest } = options;

  const response = await fetch(`${env.apiUrl}${path}`, {
    ...rest,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
  });

  if (!response.ok) {
    let message = 'Erro inesperado na requisição';

    try {
      const errorData = (await response.json()) as {
        message?: string | string[];
      };

      if (Array.isArray(errorData.message)) {
        message = errorData.message[0] ?? message;
      } else if (typeof errorData.message === 'string') {
        message = errorData.message;
      }
    } catch {
      // mantém mensagem padrão
    }

    throw new Error(message);
  }

  return (await response.json()) as T;
}
