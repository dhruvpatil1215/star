export default function handler(req, res) {
  const { stream_id } = req.query;

  const IPTV_BASE_URL = "https://livetvbox.live:443/live/Gareth/Gareth123";
  const now = Math.floor(Date.now() / 1000); // current UNIX timestamp

  const tsUrls = [
    `${IPTV_BASE_URL}/${stream_id}.ts?t=${now}`,
    `${IPTV_BASE_URL}/${stream_id}.ts?t=${now + 10}`,
    `${IPTV_BASE_URL}/${stream_id}.ts?t=${now + 20}`
  ];

  const playlist = [
    "#EXTM3U",
    "#EXT-X-VERSION:3",
    "#EXT-X-TARGETDURATION:10",
    `#EXT-X-MEDIA-SEQUENCE:${now % 100000}`,
    `#EXTINF:10.0,`,
    tsUrls[0],
    `#EXTINF:10.0,`,
    tsUrls[1],
    `#EXTINF:10.0,`,
    tsUrls[2]
  ].join("\n");

  res.setHeader("Content-Type", "application/vnd.apple.mpegurl");
  res.setHeader("Cache-Control", "no-store");
  res.status(200).send(playlist);
}
