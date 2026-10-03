export const mockInstagramFeedResponse = {
  data: [
    {
      id: "18012345678901234",
      caption: "Bastidores do estúdio: identidade visual com acabamento contemporâneo e alma baiana.",
      media_url: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800&auto=format&fit=crop&q=80",
      permalink: "https://www.instagram.com/p/DB123456/",
      timestamp: "2026-09-20T14:30:00+0000",
      media_type: "IMAGE",
    },
    {
      id: "18012345678901235",
      caption: "Produção documental e videocast no Pelourinho.",
      media_url: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=80",
      permalink: "https://www.instagram.com/p/DB123457/",
      timestamp: "2026-09-18T16:00:00+0000",
      media_type: "CAROUSEL_ALBUM",
    },
    {
      id: "18012345678901236",
      caption: "Design editorial e tipografia autoral.",
      media_url: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80",
      permalink: "https://www.instagram.com/p/DB123458/",
      timestamp: "2026-09-15T11:20:00+0000",
      media_type: "IMAGE",
    },
  ],
};

export const mockInstagramEmptyResponse = {
  data: [],
};

export const mockInstagramErrorResponse = {
  error: {
    message: "Invalid OAuth access token.",
    type: "OAuthException",
    code: 190,
  },
};
