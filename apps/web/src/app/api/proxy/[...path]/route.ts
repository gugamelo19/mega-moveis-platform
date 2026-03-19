import { env } from "@/lib/env";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type ProxyContext = {
  params: Promise<{
    path: string[];
  }>;
};

async function proxyRequest(
  request: Request,
  context: ProxyContext,
) {
  const { path } = await context.params;
  const incomingUrl = new URL(request.url);
  const targetUrl = new URL(`${env.apiUrl}/${path.join("/")}`);

  targetUrl.search = incomingUrl.search;

  const headers = new Headers(request.headers);
  headers.delete("host");
  headers.delete("connection");

  let body: BodyInit | undefined;

  if (request.method !== "GET" && request.method !== "HEAD") {
    const contentType = request.headers.get("content-type") ?? "";

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      body = formData;
      headers.delete("content-type");
      headers.delete("content-length");
    } else {
      body = await request.text();
    }
  }

  let response: Response;

  try {
    response = await fetch(targetUrl, {
      method: request.method,
      headers,
      body,
      cache: "no-store",
    });
  } catch {
    return Response.json(
      {
        message:
          "Não foi possível conectar à API. Verifique se o backend está rodando.",
      },
      { status: 502 },
    );
  }

  const responseHeaders = new Headers(response.headers);
  responseHeaders.delete("content-encoding");
  responseHeaders.delete("transfer-encoding");
  responseHeaders.delete("connection");

  return new Response(await response.arrayBuffer(), {
    status: response.status,
    statusText: response.statusText,
    headers: responseHeaders,
  });
}

export async function GET(request: Request, context: ProxyContext) {
  return proxyRequest(request, context);
}

export async function POST(request: Request, context: ProxyContext) {
  return proxyRequest(request, context);
}

export async function PUT(request: Request, context: ProxyContext) {
  return proxyRequest(request, context);
}

export async function PATCH(request: Request, context: ProxyContext) {
  return proxyRequest(request, context);
}

export async function DELETE(request: Request, context: ProxyContext) {
  return proxyRequest(request, context);
}
