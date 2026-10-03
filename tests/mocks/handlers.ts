import { http, HttpResponse } from "msw";
import {
  mockInstagramFeedResponse,
  mockInstagramEmptyResponse,
  mockInstagramErrorResponse,
} from "./fixtures/instagram-responses";

export const handlers = [
  // Mock para Graph API do Instagram
  http.get("https://graph.instagram.com/:user/media", ({ request }) => {
    const url = new URL(request.url);
    const token = url.searchParams.get("access_token");

    if (!token || token === "invalid_token") {
      return HttpResponse.json(mockInstagramErrorResponse, { status: 401 });
    }

    if (token === "empty_token") {
      return HttpResponse.json(mockInstagramEmptyResponse, { status: 200 });
    }

    return HttpResponse.json(mockInstagramFeedResponse, { status: 200 });
  }),

  // Mock para API Resend
  http.post("https://api.resend.com/emails", async ({ request }) => {
    const auth = request.headers.get("Authorization");
    if (!auth || !auth.startsWith("Bearer ")) {
      return HttpResponse.json({ message: "Missing API key" }, { status: 401 });
    }

    const body = (await request.json()) as { to?: string[]; subject?: string };
    if (!body?.to?.length) {
      return HttpResponse.json({ message: "Invalid payload" }, { status: 400 });
    }

    return HttpResponse.json({ id: "mock_resend_email_id_123" }, { status: 200 });
  }),
];
