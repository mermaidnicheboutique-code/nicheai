import { NextResponse } from 'next/server';

const SITE_URL = 'https://nicheai-nx5p.vercel.app';

interface VideoInfo {
  loc: string;
  video: {
    thumbnail_loc: string;
    title: string;
    description: string;
    content_loc: string;
    duration?: number;
  };
}

const videos: VideoInfo[] = [
  {
    loc: SITE_URL,
    video: {
      thumbnail_loc: `${SITE_URL}/nicheai-logo.jpg`,
      title: 'NicheAI Background Animation',
      description: 'Quantum-inspired visual background for NicheAI platform showcasing the fusion of AI and blockchain technology',
      content_loc: `${SITE_URL}/bg-video-1.mp4`,
      duration: 30,
    },
  },
  {
    loc: `${SITE_URL}/aurora`,
    video: {
      thumbnail_loc: `${SITE_URL}/nicheai-logo.jpg`,
      title: 'Aurora AI Avatar',
      description: 'Meet Aurora - your emotionally intelligent AI companion with empathy, intuition, and nurturing capabilities',
      content_loc: `${SITE_URL}/chatbot-avatar.mp4`,
      duration: 10,
    },
  },
  {
    loc: `${SITE_URL}/atlas`,
    video: {
      thumbnail_loc: `${SITE_URL}/nicheai-logo.jpg`,
      title: 'Atlas AI Avatar',
      description: 'Meet Atlas - your strategic AI companion with leadership, protection, and analytical capabilities',
      content_loc: `${SITE_URL}/atlas-avatar.mp4`,
      duration: 10,
    },
  },
  {
    loc: SITE_URL,
    video: {
      thumbnail_loc: `${SITE_URL}/nicheai-logo.jpg`,
      title: 'NicheAI Hero Video',
      description: 'Experience the future of quantum AI and blockchain technology with NicheAI',
      content_loc: `${SITE_URL}/hero-robot-video.mp4`,
      duration: 30,
    },
  },
];

function generateVideoSitemap(): string {
  const videoEntries = videos
    .map(
      (item) => `
  <url>
    <loc>${item.loc}</loc>
    <video:video>
      <video:thumbnail_loc>${item.video.thumbnail_loc}</video:thumbnail_loc>
      <video:title>${item.video.title}</video:title>
      <video:description>${item.video.description}</video:description>
      <video:content_loc>${item.video.content_loc}</video:content_loc>
      ${item.video.duration ? `<video:duration>${item.video.duration}</video:duration>` : ''}
      <video:family_friendly>yes</video:family_friendly>
      <video:live>no</video:live>
    </video:video>
  </url>`
    )
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${videoEntries}
</urlset>`;
}

export async function GET() {
  const sitemap = generateVideoSitemap();

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
