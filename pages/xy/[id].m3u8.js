export default function handler(req, res) {
  const { id } = req.query;

  const IPTV_BASE = "https://livetvbox.live:443/live/Gareth/Gareth123";
  const tsUrl = `${IPTV_BASE}/${id}.ts`;
  const sequence = Math.floor(Date.now() / 10000); // to simulate sequence

  const playlist = `#EXTM3U
#EXT-X-VERSION:3
#EXT-X-TARGETDURATION:10
#EXT-X-MEDIA-SEQUENCE:${sequence}
#EXTINF:10.0,
${tsUrl}
#EXTINF:10.0,
${tsUrl}
#EXTINF:10.0,
${tsUrl}
`;

  res.setHeader("Content-Type", "application/vnd.apple.mpegurl");
  res.status(200).send(playlist);
}
