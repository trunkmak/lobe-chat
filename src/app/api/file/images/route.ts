import { Imgur } from './imgur';

export const POST = async (req: Request) => {
  const { url } = await req.json();

  const imgur = new Imgur();

  const image = await fetch(url);

  const cdnUrl = await imgur.upload(await image.blob());

  return new Response(JSON.stringify({ url: cdnUrl }));
};
