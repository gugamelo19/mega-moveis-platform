import { env } from "@/lib/env";

type UploadProductImageParams = {
  token: string;
  productId: string;
  file: File;
  altText?: string;
  isPrimary?: boolean;
  sortOrder?: number;
};

export async function uploadProductImage({
  token,
  productId,
  file,
  altText,
  isPrimary,
  sortOrder,
}: UploadProductImageParams) {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("productId", productId);

  if (altText) {
    formData.append("altText", altText);
  }

  if (typeof isPrimary === "boolean") {
    formData.append("isPrimary", String(isPrimary));
  }

  if (typeof sortOrder === "number") {
    formData.append("sortOrder", String(sortOrder));
  }

  const response = await fetch(`${env.apiUrl}/uploads/product-image`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    let message = "Não foi possível enviar a imagem";

    try {
      const errorData = (await response.json()) as {
        message?: string | string[];
      };

      if (Array.isArray(errorData.message)) {
        message = errorData.message[0] ?? message;
      } else if (typeof errorData.message === "string") {
        message = errorData.message;
      }
    } catch {
      // mantém mensagem padrão
    }

    throw new Error(message);
  }

  return response.json();
}
