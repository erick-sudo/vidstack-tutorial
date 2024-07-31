# LOADING

## Load Strategies

A loading strategy specifies when media or the poster image should begin loading.  
Loading media too early can effectively slow down your entire application.

The following media loading strategies are available:

- **eager**: Load media immediately - use when media needs to be interactive as soon as possible.
- **idle**: Load media once the page has loaded and the requestIdleCallback is fired - use when media is lower priority and doesn’t need to be interactive immediately.
- **visible**: Load media once it has entered the visual viewport - use when media is below the fold and you prefer delaying loading until it’s required.
- **play**: Load the provider and media on play - use when you want to delay loading until interaction.
- **custom**: Load media when the startLoading()/startLoadingPoster() method is called or the media-start-loading/media-start-loading-poster event is dispatched - use when you need fine control of when media should begin loading.

## View Type

Suggests what type of media layout will be displayed, either `audio` or `video`.
The view type is by default inferred from the provider and media type.

```js
<MediaPlayer viewType="audio">
```

## Stream Type

The stream type refers to the mode in which content is delivered through the video player. The player uses this type to determine how to manage state/internals such as duration updates, seeking, and how to appropriately present UI components and layouts.

- `on-demand`: Video on Demand (VOD) content is pre-recorded and can be accessed and played at any time. VOD streams allow viewers to control playback, pause, rewind, and fast forward.
- `live`: Live streaming delivers real-time content as it happens. Viewers join the stream and watch the content as it’s being broadcast, with limited control over playback.
- `live:dvr`: Live DVR (Live Digital Video Recording) combines the features of both live and VOD. Viewers can join a live stream and simultaneously pause, rewind, and fast forward, offering more flexibility in watching live events.
- `ll-live`: A live streaming mode optimized for reduced latency, providing a near-real-time viewing experience with minimal delay between the live event and the viewer.
- `ll-live:dvr`: Similar to low-latency live, this mode enables viewers to experience live content with minimal delay while enjoying the benefits of DVR features (same as `live:dvr`).

## Duration

By default, duration is inferred from the provider and media.

```js
	// 5 minutes.
	<MediaPlayer duration={300}>
```

## Clipping

Clipping allows shortening the media by specifying the time at which playback should start and end.

```js
	<MediaPlayer clipStartTime={10} clipEndTime={30}>
```

- You can set a clip start time or just an end time, both are not required.
- The media duration and chapter durations will be updated to match the clipped length.
- Any media resources such as text tracks and thumbnails should use the full duration.
- Seeking to a new time is based on the clipped duration. For example, if a 1 minute video is clipped to 30 seconds, seeking to 30s will be the end of the video.
- [Media URI Fragments](https://www.w3.org/TR/media-frags) are set internally to efficiently load audio and video files between the clipped start and end times (e.g., `/video.mp4#t=30,60`).

## Media Session

The [Media Session API](https://developer.mozilla.org/en-US/docs/Web/API/Media_Session_API) is automatically set using the provided `title`, `artist`, and `artwork` (`poster` is used as fallback) player properties.

## Storage

Storage enables saving player and media settings so that the user can resume where they left off. This includes saving and initializing on load settings such as language, volume, muted, captions visibility, and playback time.

### Local Storage

[Local Storage](https://developer.mozilla.org/en-US/docs/Web/API/Storage) enables saving data locally on the user’s browser. This is a simple and fast option for remembering player settings, but it *won’t* persist across domains, devices, or browsers.

Provide a storage key prefix for turning local storage on like so:

```js
	<MediaPlayer storage="storage-key">
```

### Extending Local Storage

Optionally, you can extend and customize local storage behaviour like so:

```js
	import { LocalMediaStorage } from '@vidstack/react';

	class CustomLocalMediaStorage extends LocalMediaStorage {
	  // override methods here...
	}

	// Provide storage to player.
	<MediaPlayer storage={CustomLocalMediaStorage}>
```

### Remote Storage

Remote Storage enables asynchronously saving and loading data from anywhere. This is great as settings willl persist across user sessions even if the domain, device, or browser changes. Generally, you will save player/media settings to a remote database based on the currently authenticated user.

Implement the `MediaStorage` interface and provide it to the player like so:

```ts
import { type MediaStorage } from "@vidstack/react";

class MediaDatabaseStorage implements MediaStorage {
  async getVolume() {}
  async setVolume(volume: number) {}

  async getMuted() {}
  async setMuted(isMuted: boolean) {}

  async getTime() {}
  async setTime(time: number) {}

  async getLang() {}
  async setLang(lang: string | null) {}

  async getCaptions() {}
  async setCaptions(isOn: boolean) {}

  async onLoad() {}

  onChange(src, mediaId, playerId) {}

  onDestroy() {}
}
```

```js
	const storage = useMemo(() => new MediaDatabaseStorage(), []);

	<MediaPlayer storage={storage}>
```

## Sources

The player can accept one or more media sources which can be a `string` URL of the media resource to load, or any of the following objects: `MediaStream`, `MediaSource`, `Blob`, or `File`

**Single Source**

```js
<MediaPlayer src="https://files.vidstack.io/sprite-fight/720p.mp4" />
```

**Multiple Source Types**

The list of [supported media formats](https://www.vidstack.io/docs/player/core-concepts/loading?styling=tailwind-css#supported-codecs) varies from one browser to the other. You should either provide your source in a single format that all relevant browsers support, or provide multiple sources in enough different formats that all the browsers you need to support are covered.

```js
<MediaPlayer
  src={[
    // Audio
    {
      src: "https://files.vidstack.io/agent-327/audio.mp3",
      type: "audio/mpeg",
    },
    { src: "https://files.vidstack.io/agent-327/audio.ogg", type: "audio/ogg" },
    // Video
    { src: "https://files.vidstack.io/agent-327/720p.ogv", type: "video/ogg" },
    { src: "https://files.vidstack.io/agent-327/720p.avi", type: "video/avi" },
    { src: "https://files.vidstack.io/agent-327/720p.mp4", type: "video/mp4" },
  ]}
/>
```

## Source Types

The player [source selection](https://www.vidstack.io/docs/player/getting-started/architecture?styling=tailwind-css#source-selection) process relies on file extensions, object types, and type hints to determine which provider to load and how to play a given source. The following is a table of supported media file extensions and types for each provider:

| Media     | Extensions                                                               | Types                                                                                                                                     |
| --------- | ------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------- |
| **Audio** | m4a, m4b, mp4a, mpga, mp2, mp2a, mp3, m2a, m3a, wav, weba, aac, oga, spx | audio/mpeg, audio/ogg, audio/3gp, audio/mp4, audio/webm, audio/flac, audio/object                                                         |
| **Video** | mp4, ogg, ogv, webm, mov, m4v                                            | video/mp4, video/webm, video/3gp, video/ogg, video/avi, video/mpeg                                                                        |
| **HLS**   | m3u8                                                                     | application/vnd.apple.mpegurl, audio/mpegurl, audio/x-mpegurl, application/x-mpegurl, video/x-mpegurl, video/mpegurl, application/mpegurl |
| **DASH**  | mpd                                                                      | application/dash+xml                                                                                                                      |

## Source Sizes

You can provide video qualities/resolutions using multiple video files with different sizes (e.g, 1080p, 720p, 480p) like so:

```js
// It is recommended to use adaptive streaming protocols
// such as HLS or DASH over providing providing multiple static media files

<MediaPlayer
  src={[
    {
      src: "https://files.vidstack.io/sprite-fight/1080p.mp4",
      type: "video/mp4",
      width: 1920,
      height: 1080,
    },
    {
      src: "https://files.vidstack.io/sprite-fight/720p.mp4",
      type: "video/mp4",
      width: 1280,
      height: 720,
    },
    {
      src: "https://files.vidstack.io/sprite-fight/480p.mp4",
      type: "video/mp4",
      width: 853,
      height: 480,
    },
  ]}
/>
```

## Audio Tracks

Audio tracks are loaded from the HLS playlist. Audio tracks cannot be manually added to the player at this time.

## Text Tracks

Text tracks allow provision of text-based information or content associated with video or audio. These text tracks can be used to enhance the accessibility and user experience of media content in various ways.

```js
import { MediaPlayer, MediaProvider, Track } from "@vidstack/react";

<MediaPlayer>
  <MediaProvider>
    {/* Dynamically add/remove tracks as needed. */}
    <Track
      src="/subs/english.vtt"
      kind="subtitles"
      label="English"
      lang="en-US"
      default
    />
    <Track
      src="/subs/spanish.vtt"
      kind="subtitles"
      label="Spanish"
      lang="es-ES"
    />
  </MediaProvider>
</MediaPlayer>;
```

When `default` is set on a text track it will set the mode of that track to showing immediately, i.e. this track is immediately active.  
#NB Only one default is allowed per track kind.

The [vidstack/media-captions](https://github.com/vidstack/media-captions) library handles loading, parsing, and rendering captions inside of the player. The following caption formats are supported:

- [VTT](https://github.com/vidstack/media-captions#vtt)
- [SRT](https://github.com/vidstack/media-captions#srt)
- [SSA/ASS](https://github.com/vidstack/media-captions#ssaass)
- [JSON](https://www.vidstack.io/docs/player/core-concepts/loading?styling=tailwind-css#json-tracks)

The following text track kinds are supported:

- **subtitles**: Provides a written version of the audio for non-native speakers.
- **captions**: Includes dialog and descriptions of important audio elements, like music or sound effects.
- **chapters**: Contains information (e.g, title and start times) about the different chapter or sections of the media file.
- **descriptions**: Provides information about the visual content to assist individuals who are blind or visually impaired.
- **metadata**: Additional information or descriptive data within a media file. This metadata can be used for various purposes, like providing descriptions, comments, or annotations related to the media content. It is not displayed as subtitles or captions but serves as background information that can be used for various purposes, including search engine optimization, accessibility enhancements, or supplementary details for the audience.

## JSON Tracks

JSON content can be provided directly to text tracks or loaded from a remote location.

```js
  import { type VTTContent } from '@vidstack/react';
  const content: VTTContent = {
    cues: [ { startTime: 0, endTime: 5, text: '...' }, { startTime: 5, endTime: 10, text: '...' }, ], };
    // Option 1. Provide JSON directly.
    <Track content={content} label="English" kind="captions" lang="en-US" type="json" />;
    // Option 2. Load from a remote location.
    <Track src="/subs/english.json" ... type="json" />
```

```json
  // Example JSON text tracks:
  [
    {
      label: "English",
      kind: "captions",
      lang: "en-US",
      type: "json",
      content: { regions: [], cues: [] },
      default: true,
    },
  ];
```

```json
// Example JSON cues:
// cues.json
[
  { "startTime": 0, "endTime": 5, "text": "Cue One!" },
  { "startTime": 5, "endTime": 10, "text": "Cue Two!" }
]
```

```json
// Example JSON regions and cues:
// regions.json
{
  "regions": [{ "id": "0", "lines": 3, "scroll": "up" }],
  "cues": [
    { "region": { "id": "0" }, "startTime": 0, "endTime": 5, "text": "Hello!" }
  ]
}
```

## Thumbnails

Thumbnails are small, static images or frames extracted from the video or audio content that serve as a visual preview or representation of the media content, allowing users to quickly identify and navigate to specific points within the video or audio.  
Thumbnails are often displayed in the time slider or chapter menu; enabling users to visually browse and select the part of the content they want to play.

Thumbnails can be loaded using the `<Thumbnail />` component or `useThumbnails` hook.

Thumbnails are generally provided in the Web Video Text Tracks (WebVTT) format.
The WebVTT file specifies the time ranges of when to display images, with the respective image URL and coordinates (only required if using a sprite.

**Sprite**

Sprites are [large storyboard images](https://files.vidstack.io/sprite-fight/storyboard.jpg) that contain multiple small tiled thumbnails. They’re preferred over loading multiple images because:

- Sprites reduce total file size due to compression.
- Avoid loading delays for each thumbnail.
- Reduce the number of server requests.

The WebVTT file must append the coordinates of each thumbnail like so:

```
WEBVTT

00:00:00.000 --> 00:00:04.629
storyboard.jpg#xywh=0,0,284,160

00:00:04.629 --> 00:00:09.258
storyboard.jpg#xywh=284,0,284,160

...
```

**Multiple Images**

In the case of multiple individual thumbnail images, they can be specified like so:

```
WEBVTT

00:00:00.000 --> 00:00:04.629
/media/thumbnail-1.jpg

00:00:04.629 --> 00:00:09.258
/media/thumbnail-2.jpg

...
```

Thumbnails can also be loaded as a json file. The `Content-Type` header should be set to `application/json` on the response. The returned JSON can be VTT cues, an array of images, or a storyboard.

Example JSON VTT:

vtt.json

```json
[
  { "startTime": 0, "endTime": 5, "text": "/media/thumbnail-1.jpg" },
  { "startTime": 5, "endTime": 10, "text": "/media/thumbnail-2.jpg" }
]
```

Example JSON images:

images.json

```json
[
  { "startTime": 0, "endTime": 5, "url": "/media/thumbnail-1.jpg" },
  { "startTime": 5, "endTime": 10, "url": "/media/thumbnail-2.jpg" }
]
```

Example JSON storyboard:

storyboard.json

```json
{
  "url": "https://example.com/storyboard.jpg",
  "tileWidth": 256,
  "tileHeight": 160,
  "tiles": [
    { "startTime": 0, "x": 0, "y": 0 },
    { "startTime": 50, "x": 256, "y": 0 }
  ]
}
```

**Thumbnails Object**

Example object with multiple images:

```js
import { type ThumbnailImageInit } from "@vidstack/react";

const thumbnails: ThumbnailImageInit[] = [
  { startTime: 0, url: "/media/thumbnail-1.jpg" },
  { startTime: 5, url: "/media/thumbnail-2.jpg" },
  // ...
];
```

Example storyboard object:

```js
import { type ThumbnailStoryboard } from "@vidstack/react";

const storyboard: ThumbnailStoryboard = {
  url: "https://example.com/storyboard.jpg",
  tileWidth: 256,
  tileHeight: 160,
  tiles: [
    { startTime: 0, x: 0, y: 0 },
    { startTime: 50, x: 256, y: 0 },
  ],
};
```

Provide objects directly like so:

```js
// 1. Layouts.
<PlyrLayout thumbnails={storyboard} />
<DefaultVideoLayout thumbnails={storyboard} />

// 2. Thumbnail component.
<Thumbnail.Root src={storyboard}>...</Thumbnail.Root>

// 3. Hook
const thumbnails = useThumbnails(storyboard);
```

## Video Qualities

Adaptive streaming protocols like `HLS` and` DASH` not only enable streaming media chunks, but also have the ability to adapt playback quality based on the device size, network conditions, and other information.  
Adaptive qualities is important for speeding up initial delivery and to avoid loading excessive amounts of data which cause painful buffering delays.

Video streaming platforms such as `Cloudflare Stream` and `Mux` will take an input video file and create renditions out of the box, with multiple resolutions (width/height) and bit rates.

By default, the best quality is automatically selected by the streaming engine such as `hls.js` or `dash.js` always seen as the `"Auto"` option in the player quality menu, as they're generally more conservative to avoid excessive bandwidth usage.
