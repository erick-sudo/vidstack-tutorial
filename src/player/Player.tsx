import {
  Controls,
  MediaAudioGainChangeEvent,
  MediaAutoPlayEvent,
  MediaAutoPlayEventDetail,
  MediaAutoPlayFailEvent,
  MediaAutoPlayFailEventDetail,
  MediaFullscreenChangeEvent,
  MediaFullscreenErrorEvent,
  MediaLiveChangeEvent,
  MediaLiveEdgeChangeEvent,
  MediaOrientationChangeEvent,
  MediaPIPChangeEvent,
  MediaPIPErrorEvent,
  MediaPlayer,
  MediaPlayerInstance,
  MediaProvider,
  MediaProviderInstance,
  ScreenOrientationChangeEventDetail,
  Time,
  Track,
  VolumeSlider,
  TextTrack,
  useMediaStore,
  MediaProviderAdapter,
  MediaProviderChangeEvent,
  isHLSProvider,
  isDASHProvider,
  isYouTubeProvider,
  Poster,
  Captions,
  ChapterTitle,
  Spinner,
  ToggleButton,
  PlayButton,
  MuteButton,
  CaptionButton,
  PIPButton,
  FullscreenButton,
  SeekButton,
  AirPlayButton,
  GoogleCastButton,
  Tooltip,
  Slider,
  useStore,
  SliderInstance,
  AudioGainSlider,
  TimeSlider,
  QualitySlider,
  Menu,
} from "@vidstack/react";
import {
  DefaultAudioLayout,
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";
import "@vidstack/react/player/styles/base.css";
import { forwardRef, useEffect, useRef } from "react";
import "./Player.css";
import HLS from "hls.js";
import DASH from "dashjs";
import {
  AirPlayIcon,
  ChromecastIcon,
  ClosedCaptionsIcon,
  ClosedCaptionsOnIcon,
  FullscreenExitIcon,
  FullscreenIcon,
  MuteIcon,
  PauseIcon,
  PictureInPictureExitIcon,
  PictureInPictureIcon,
  PlayIcon,
  SeekBackward10Icon,
  SeekBackward30Icon,
  SeekBackwardIcon,
  SeekForward10Icon,
  SeekForward30Icon,
  SeekForwardIcon,
  SettingsIcon,
  ThumbsDownIcon,
  ThumbsUpIcon,
  VolumeHighIcon,
  VolumeLowIcon,
} from "@vidstack/react/icons";
import { MenuOption, settings_options } from "./settings_options";

const textTracks = [
  // Subtitles
  {
    src: "https://files.vidstack.io/sprite-fight/subs/english.vtt",
    label: "English",
    language: "en-US",
    kind: "subtitles",
    default: true,
  },
  {
    src: "https://files.vidstack.io/sprite-fight/subs/spanish.vtt",
    label: "Spanish",
    language: "es-ES",
    kind: "subtitles",
  },
  // Chapters
  {
    src: "https://files.vidstack.io/sprite-fight/chapters.vtt",
    kind: "chapters",
    language: "en-US",
    default: true,
  },
] as const;

function Player() {
  const player = useRef<MediaPlayerInstance>(null);
  const provider = useRef<MediaProviderInstance>(null);

  const {
    canFullscreen,
    fullscreen,
    canPictureInPicture,
    pictureInPicture,
    canOrientScreen,
    orientation,
    streamType,
    canSetAudioGain,
    audioGain,
    audioTracks,
    audioTrack,
    textTrack,
    qualities,
    quality,
    autoQuality,
    canSetQuality,
  } = useMediaStore(player);

  const sliderRef = useRef<SliderInstance>(null);
  const { value, fillPercent } = useStore(SliderInstance, sliderRef);

  function onAutoPlay(
    detail: MediaAutoPlayEventDetail,
    nativeEvent: MediaAutoPlayEvent
  ) {
    // console.log("Success", detail, nativeEvent)
  }

  function onAutoPlayFail(
    { muted }: MediaAutoPlayFailEventDetail,
    nativeEvent: MediaAutoPlayFailEvent
  ) {
    // console.log(nativeEvent)
  }

  function onFullscreenChange(
    isFullscreen: boolean,
    nativeEvent: MediaFullscreenChangeEvent
  ) {
    // Fullscreen change
  }

  function onFullscreenError(
    error: unknown,
    nativeEvent: MediaFullscreenErrorEvent
  ) {
    // Fullscreen error
  }

  function onPIPChange(isActive: boolean, nativeEvent: MediaPIPChangeEvent) {
    // PIP Change
  }

  function onPIPError(error: unknown, nativeEvent: MediaPIPErrorEvent) {
    // PIP Error
  }

  function onOrientationChange(
    { orientation, lock }: ScreenOrientationChangeEventDetail,
    nativeEvent: MediaOrientationChangeEvent
  ) {
    // Screen orientation change
    console.log(orientation, lock);
  }

  function onLiveChange(isLive: boolean, nativeEvent: MediaLiveChangeEvent) {
    // ...
  }

  function onLiveEdgeChange(
    atLiveEdge: boolean,
    nativeEvent: MediaLiveEdgeChangeEvent
  ) {
    // ...
  }

  function onAudioGainChange(
    gain: number | null,
    nativeEvent: MediaAudioGainChangeEvent
  ) {
    //
    console.log(gain);
  }

  function onProviderChange(
    provider: MediaProviderAdapter | null,
    nativeEvent: MediaProviderChangeEvent
  ) {
    if (isHLSProvider(provider)) {
      console.log("HLS PROVIDER");
      provider.library = HLS;
      provider.config = {};
    } else if (isDASHProvider(provider)) {
      // console.log("DASH PROVIDER")
      provider.library = DASH;
      provider.config = {};
    } else if (isYouTubeProvider(provider)) {
      provider.cookies = true;
      console.log("Youtube provider");
    }
  }

  return (
    <div>
      <MediaPlayer
        className="vds-media-player group border-pink-700"
        keyShortcuts={{
          toggleFullscreen: "f",
          toggleMuted: "m",
          togglePictureInPicture: "i",
          seekForward: ["ArrowRight"],
          togglePaused: ["k", "Space"],
          seekBackward: ["b"],
        }}
        ref={player}
        // streamType="live"
        // minLiveDVRWindow={60}
        autoPlay
        playsInline
        onAutoPlay={onAutoPlay}
        onAutoPlayFail={onAutoPlayFail}
        onFullscreenChange={onFullscreenChange}
        onFullscreenError={onFullscreenError}
        fullscreenOrientation="none"
        onPictureInPictureChange={onPIPChange}
        onPictureInPictureError={onPIPError}
        onOrientationChange={onOrientationChange}
        onProviderChange={onProviderChange}
        // onAudioGainChange={onAudioGainChange}
        title="Sprite Fight"
        // MP4
        src="https://files.vidstack.io/sprite-fight/720p.mp4"

        // HLS
        // src="https://files.vidstack.io/sprite-fight/hls/stream.m3u8"

        // DASH
        // src="https://files.vidstack.io/sprite-fight/dash/stream.mpd"

        // YOUTUBE
        // src="https://www.youtube.com/watch?v=n8tW3UVw6WM"
      >
        <MediaProvider ref={provider}>
          {textTracks.map((track) => (
            <Track key={track.src} {...track} />
          ))}
          {/* <Poster
            className="absolute opacity-100 vds-media-playing:opacity-0 transition-opacity duration-1000 h-full w-full object-cover"
            src="https://cdn.pixabay.com/photo/2023/03/29/16/13/labrador-retriever-7885882_1280.jpg"
            alt="Girl walks into campfire with gnomes surrounding her friend ready for their next meal!"
          /> */}
        </MediaProvider>
        {/* <span className="absolute inline-block flex-1 overflow-hidden whitespace-nowrap text-ellipsis px-2 text-sm font-medium text-white">
          <span className="mr-1">•</span>
          <ChapterTitle />
        </span> */}
        <div className="absolute inset-0 pointer-events-none z-50 flex items-center justify-center">
          <Spinner.Root
            size={48}
            className="text-pink-400 opacity-0 transition-opacity duration-300 ease-linear vds-media-buffering:opacity-100 vds-media-buffering:animate-spin"
          >
            <Spinner.Track className=" opacity-25" width={8} />
            <Spinner.TrackFill className="opacity-75" width={8} />
          </Spinner.Root>
        </div>
        <div className="absolute inset-x-0 h-full p-4 bg-black/50 flex">
          <div className="flex-grow flex flex-col justify-end">
            <div className="flex flex-wrap gap-4">
              <ToggleButton
                className="group h-10 w-10 flex items-center justify-center rounded-md outline-none ring-0 data-[hocus]:ring-4 ring-inset ring-pink-400 text-pink-400 hover:bg-pink-400/20 duration-200"
                aria-label="Like video"
              >
                <ThumbsUpIcon className="w-8 h-8 hidden group-data-[pressed]:block" />
                <ThumbsDownIcon className="w-8 h-8 group-data-[pressed]:hidden" />
              </ToggleButton>
              <PlayButton className="group h-10 w-10 flex items-center justify-center rounded-md outline-none ring-0 data-[hocus]:ring-4 ring-inset ring-pink-400 text-pink-400 hover:bg-pink-400/20 duration-200">
                <PlayIcon className="w-8 h-8 hidden group-data-[paused]:block" />
                <PauseIcon className="w-8 h-8 group-data-[paused]:hidden" />
              </PlayButton>
              <MuteButton className="group h-10 w-10 flex items-center justify-center rounded-md outline-none ring-0 data-[hocus]:ring-4 ring-inset ring-pink-400 text-pink-400 hover:bg-pink-400/20 duration-200">
                <MuteIcon className="h-8 w-8 hidden group-data-[state='muted']:block" />
                <VolumeLowIcon className="h-8 w-8 hidden group-data-[state='low']:block" />
                <VolumeHighIcon className="h-8 w-8 hidden group-data-[state='high']:block" />
              </MuteButton>
              <CaptionButton className="group h-10 w-10 flex items-center justify-center rounded-md outline-none ring-0 data-[hocus]:ring-4 ring-inset ring-pink-400 text-pink-400 hover:bg-pink-400/20 duration-200">
                <ClosedCaptionsOnIcon className="w-8 h-8 hidden group-data-[active]:block" />
                <ClosedCaptionsIcon className="w-8 h-8 group-data-[active]:hidden" />
              </CaptionButton>
              <PIPButton className="group h-10 w-10 flex items-center justify-center rounded-md outline-none ring-0 data-[hocus]:ring-4 ring-inset ring-pink-400 text-pink-400 hover:bg-pink-400/20 duration-200">
                <PictureInPictureIcon className="w-8 h-8 hidden group-data-[active]:block" />
                <PictureInPictureExitIcon className="w-8 h-8 group-data-[active]:hidden" />
              </PIPButton>
              <FullscreenButton className="group h-10 w-10 flex items-center justify-center rounded-md outline-none ring-0 data-[hocus]:ring-4 ring-inset ring-pink-400 text-pink-400 hover:bg-pink-400/20 duration-200">
                <FullscreenIcon className="w-8 h-8 group-data-[active]:hidden" />
                <FullscreenExitIcon className="w-8 h-8 hidden group-data-[active]:block" />
              </FullscreenButton>
              <SeekButton
                className="group h-10 w-10 flex items-center justify-center rounded-md outline-none ring-0 data-[hocus]:ring-4 ring-inset ring-pink-400 text-pink-400 hover:bg-pink-400/20 duration-200"
                seconds={-10}
              >
                <SeekBackward10Icon className="h-8 w-8" />
              </SeekButton>

              <SeekButton
                className="group h-10 w-10 flex items-center justify-center rounded-md outline-none ring-0 data-[hocus]:ring-4 ring-inset ring-pink-400 text-pink-400 hover:bg-pink-400/20 duration-200"
                seconds={10}
              >
                <SeekForward10Icon className="h-8 w-8" />
              </SeekButton>
              <SeekButton
                className="group h-10 w-10 flex items-center justify-center rounded-md outline-none ring-0 data-[hocus]:ring-4 ring-inset ring-pink-400 text-pink-400 hover:bg-pink-400/20 duration-200"
                seconds={-30}
              >
                <SeekBackward30Icon className="h-8 w-8" />
              </SeekButton>

              <SeekButton
                className="group h-10 w-10 flex items-center justify-center rounded-md outline-none ring-0 data-[hocus]:ring-4 ring-inset ring-pink-400 text-pink-400 hover:bg-pink-400/20 duration-200"
                seconds={30}
              >
                <SeekForward30Icon className="h-8 w-8" />
              </SeekButton>

              <AirPlayButton className="group h-10 w-10 flex items-center justify-center rounded-md outline-none ring-0 data-[hocus]:ring-4 ring-inset ring-pink-400 text-pink-400 hover:bg-pink-400/20 duration-200">
                <AirPlayIcon className="h-8 w-8" />
              </AirPlayButton>

              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <GoogleCastButton className="group h-10 w-10 flex items-center justify-center rounded-md outline-none ring-0 data-[hocus]:ring-4 ring-inset ring-pink-400 text-pink-400 hover:bg-pink-400/20 duration-200">
                    <ChromecastIcon className="h-8 w-8" />
                  </GoogleCastButton>
                </Tooltip.Trigger>
                <Tooltip.Content
                  className="animate-out fade-out slide-out-to-bottom-2 data-[visible]:animate-in data-[visible]:fade-in data-[visible]:slide-in-from-bottom-4 z-10 rounded-lg bg-pink-400/50 text-white backdrop-blur p-4 text-sm border border-pink-400/50 max-w-sm"
                  placement="top center"
                >
                  <span className="">
                    Chromecast with Google TV (4K) can stream in up to 4K, and
                    Chromecast with Google TV (HD) can stream in up to 1080p. To
                    stream in 4K, a 4K-capable TV, reliable broadband internet
                    connection, and 4K entertainment are required. To stream in
                    HD, an HD-capable TV, reliable broadband internet
                    connection, and HD entertainment are required.
                  </span>
                </Tooltip.Content>
              </Tooltip.Root>

              {/* Settings Menu */}
              <MenuItem root={true} options={settings_options} />
            </div>
            <div className="flex flex-col gap-4 py-4">
              {/* TimeSlider */}
              {/* <TimeSlider.Root className="group relative cursor-pointer touch-none select-none outline-none aria-hidden:hidden">
                <TimeSlider.Track className="relative h-4 w-full rounded-lg bg-pink-400/20 backdrop-blur duration-300">
                  <TimeSlider.Progress className="bg-pink-200/20 backdrop-blur absolute h-full w-[var(--slider-progress)] rounded-lg will-change-[width]" />
                  <TimeSlider.TrackFill className="bg-pink-400 backdrop-blur absolute h-full w-[var(--slider-fill)] rounded-lg will-change-[width]" />
                </TimeSlider.Track>
                <TimeSlider.Thumb className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-pink-400 ring-pink-300/50 opacity-0 transition-opacity group-data-[active]:opacity-100 group-data-[dragging]:ring-4 left-[var(--slider-fill)] will-change-[left]" />
              </TimeSlider.Root> */}

              {/* Horizontal Chapters Time Slider */}
              <TimeSlider.Root className="group relative cursor-pointer touch-none select-none outline-none aria-hidden:hidden">
                <TimeSlider.Chapters className="relative flex h-full w-full items-center">
                  {(cues, forwardRef) =>
                    cues.map((cue) => (
                      <div
                        className="mr-1 last:mr-0 relative flex h-full w-full items-center"
                        key={cue.startTime}
                        ref={forwardRef}
                      >
                        <TimeSlider.Track className="relative h-4 w-full rounded bg-pink-400/20 backdrop-blur duration-300">
                          <TimeSlider.Progress className="bg-pink-200/20 backdrop-blur absolute h-full w-[var(--chapter-progress)] rounded will-change-[width]" />
                          <TimeSlider.TrackFill className="bg-pink-400 backdrop-blur absolute h-full w-[var(--chapter-fill)] rounded will-change-[width]" />
                        </TimeSlider.Track>
                      </div>
                    ))
                  }
                </TimeSlider.Chapters>
                <TimeSlider.Thumb className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 h-8 w-8 rounded bg-pink-400 ring-pink-300/50 opacity-0 transition-opacity group-data-[active]:opacity-100 group-data-[dragging]:ring-4 left-[var(--slider-fill)] will-change-[left]" />
                <TimeSlider.Preview className="flex flex-col opacity-0 data-[visible]:opacity-100 pointer-events-none items-center transition-opacity duration-500">
                  {/* <TimeSlider.Video src="https://files.vidstack.io/sprite-fight/720p.mp4" /> */}

                  <TimeSlider.Thumbnail.Root
                    src="https://files.vidstack.io/sprite-fight/thumbnails.vtt"
                    className="block h-[var(--thumbnail-height)] max-h-40 min-h-20 w-[var(--thumbnail-width)] max-w-40 min-w-28 ring-1 ring-pink-400/50 shadow rounded-lg overflow-hidden bg-black"
                  >
                    <TimeSlider.Thumbnail.Img />
                  </TimeSlider.Thumbnail.Root>
                </TimeSlider.Preview>
              </TimeSlider.Root>

              {/* Horizontal Volume Slider */}
              <VolumeSlider.Root className="group relative cursor-pointer touch-none select-none outline-none aria-hidden:hidden">
                <VolumeSlider.Track className="relative h-4 w-full rounded-lg bg-pink-400/20 backdrop-blur duration-300">
                  <VolumeSlider.TrackFill className="bg-pink-400 backdrop-blur absolute h-full w-[var(--slider-fill)] rounded-lg will-change-[width]" />
                </VolumeSlider.Track>
                <VolumeSlider.Thumb className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-pink-400 ring-pink-300/50 opacity-0 transition-opacity group-data-[active]:opacity-100 group-data-[dragging]:ring-4 left-[var(--slider-fill)] will-change-[left]" />
                <VolumeSlider.Preview className="text-pink-800 text-xs font-bold bg-pink-200 px-2 py-1 rounded opacity-0 data-[visible]:opacity-100 pointer-events-none items-center transition-opacity duration-500 mb-4">
                  <VolumeSlider.Value />
                </VolumeSlider.Preview>
              </VolumeSlider.Root>

              {/* Horizontal Quality Slider */}
              <QualitySlider.Root className="group relative cursor-pointer touch-none select-none outline-none ar-ia-hidden:hidden">
                <QualitySlider.Track className="relative h-4 w-full rounded-lg bg-pink-400/20 backdrop-blur duration-300">
                  <QualitySlider.TrackFill className="bg-pink-400 backdrop-blur absolute h-full w-[var(--slider-fill)] rounded-lg will-change-[width]" />
                </QualitySlider.Track>
                <QualitySlider.Thumb className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-pink-400 ring-pink-300/50 opacity-0 transition-opacity group-data-[active]:opacity-100 group-data-[dragging]:ring-4 left-[var(--slider-fill)] will-change-[left]" />
                <QualitySlider.Preview className="text-pink-800 text-xs font-bold bg-pink-200 px-2 py-1 rounded opacity-0 data-[visible]:opacity-100 pointer-events-none items-center transition-opacity duration-500 mb-4">
                  <QualitySlider.Value />
                </QualitySlider.Preview>
              </QualitySlider.Root>

              {/* AudioGainSlider */}
              <AudioGainSlider.Root className="group relative cursor-pointer touch-none select-none outline-none aria-hidden:hidden border-y border-pink-400">
                <AudioGainSlider.Track className="relative h-2 w-full bg-pink-400/10 backdrop-blur duration-300">
                  <AudioGainSlider.TrackFill className="bg-pink-400/50 backdrop-blur absolute h-full w-[var(--slider-fill)] will-change-[width]" />
                </AudioGainSlider.Track>
                <AudioGainSlider.Thumb className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 h-4 w-4 rounded-full bg-pink-400 ring-pink-300/50 opacity-0 transition-opacity group-data-[active]:opacity-100 group-data-[dragging]:ring-4 left-[var(--slider-fill)] will-change-[left]" />
                <AudioGainSlider.Steps className="flex items-center w-full h-full absolute inset-0 justify-between">
                  {(step) => (
                    <div
                      key={String(step)}
                      className="w-0.5 h-full bg-pink-400"
                    />
                  )}
                </AudioGainSlider.Steps>
              </AudioGainSlider.Root>

              {/* Slider */}
              <Slider.Root className="group relative cursor-pointer touch-none select-none outline-none aria-hidden:hidden">
                <Slider.Track className="relative h-2 w-full rounded-lg bg-pink-400/10 backdrop-blur duration-300">
                  <Slider.TrackFill className="bg-pink-400/50 backdrop-blur absolute h-full w-[var(--slider-fill)] rounded-lg will-change-[width]" />
                </Slider.Track>
                <Slider.Thumb className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 h-4 w-4 rounded-lg bg-pink-400 ring-pink-300/50 opacity-0 transition-opacity group-data-[active]:opacity-100 group-data-[dragging]:ring-4 left-[var(--slider-fill)] will-change-[left]" />
                {/* <Slider.Steps className="flex ">
                  {(step) => (
                    <span className="border-r h-4 flex-grow" key={String(step)}></span>
                  )}
                </Slider.Steps> */}
              </Slider.Root>
            </div>
          </div>
          <div className="w-32 flex gap-4 justify-center">
            {/* VerticalVolume Slider */}
            <VolumeSlider.Root
              orientation="vertical"
              className="group relative z-50 cursor-pointer touch-none select-none outline-none aria-hidden:hidden flex items-center justify-center"
            >
              <VolumeSlider.Track className="relative w-4 h-full rounded-lg bg-pink-400/20 backdrop-blur duration-300 flex items-end">
                <VolumeSlider.TrackFill className="bg-pink-400 backdrop-blur absolute w-full h-[var(--slider-fill)] rounded-lg will-change-[height]" />
              </VolumeSlider.Track>
              <VolumeSlider.Thumb className="absolute translate-y-1/2 h-8 w-8 rounded-full bg-pink-400 ring-pink-300/50 opacity-100 transition-opacity group-data-[active]:opacity-100 group-data-[dragging]:ring-4 bottom-[var(--slider-fill)] will-change-[bottom]" />
              <VolumeSlider.Preview className="text-pink-800 text-xs font-bold bg-pink-200 px-2 py-1 rounded opacity-0 data-[visible]:opacity-100 pointer-events-none items-center transition-opacity duration-500 ml-4">
                <VolumeSlider.Value />
              </VolumeSlider.Preview>
            </VolumeSlider.Root>

            {/* Vertical Slider */}
            <Slider.Root
              ref={sliderRef}
              value={value}
              orientation="vertical"
              className="group h-full w-2 relative cursor-pointer touch-none select-none outline-none aria-hidden:hidden"
            >
              <Slider.Track className="relative w-full h-full rounded-lg bg-pink-400/10 backdrop-blur duration-300">
                <Slider.TrackFill className="bg-pink-400/50 backdrop-blur absolute w-full h-[var(--slider-fill)] rounded-lg will-change-[height] bottom-0" />
              </Slider.Track>
              <Slider.Thumb className="absolute left-1/2 -translate-x-1/2 translate-y-1/2 h-4 w-4 rounded-lg bg-pink-400 ring-pink-300/50 opacity-0 transition-opacity group-data-[active]:opacity-100 group-data-[dragging]:ring-4 bottom-[var(--slider-fill)] will-change-[bottom]" />
              <Slider.Preview className="group">
                <Slider.Value
                  format="percent"
                  className="opacity-0 group-data-[visible]:opacity-100 text-white"
                />
              </Slider.Preview>
            </Slider.Root>
          </div>
        </div>

        {/* <Captions
          exampleText="Girl walks into campfire with gnomes surrounding her friend ready for their next meal! "
          className="media-preview:opacity-0 media-controls:bottom-[85px] media-captions:opacity-100 absolute inset-0 bottom-2 z-10 select-none break-words opacity-0 transition-[opacity,bottom] duration-300 bg-black "
        /> */}
        {/* <div className="absolute vds-media-paused:bg-red-700 border-4 p-3 top-4 left-4"></div> */}
        {/* <Controls.Root
          hideOnMouseLeave
          className="data-[visible]:opacity-100 absolute inset-0 opacity-0 transition-opacity duration-500 bg-gradient-to-t from-pink-950 via-transparent to-transparent pointer-events-none"
        ></Controls.Root> */}
        {/* <Time className="absolute text-2xl text-white top-0" type="current" />
        <Controls.Root className="border-2 absolute inset-0 border-black">
          <VolumeSlider.Root className="volume-slider">
            <VolumeSlider.Value />
            <VolumeSlider.Track className="relative h-12 bg-yellow-500/50 mt-8">
              <VolumeSlider.TrackFill className="absolute bg-yellow-500 w-[var(--slider-fill)] will-change-[width] h-full" />
            </VolumeSlider.Track>
          </VolumeSlider.Root>
        </Controls.Root> */}
      </MediaPlayer>

      <div>
        CanOrientScreen:&nbsp;{`${canOrientScreen}`}&nbsp;Orientation:&nbsp;
        {`${orientation}`}
      </div>
      <div>StreamType:&nbsp;{streamType}</div>
      <div>
        CanFullScreen:&nbsp;{`${canFullscreen}`}&nbsp;Fullscreen:&nbsp;
        {`${fullscreen}`}
      </div>
      <div>
        CanPictureInPicture:&nbsp;{`${canPictureInPicture}`}
        &nbsp;PictureInPicture:&nbsp;
        {`${pictureInPicture}`}
      </div>
      <div className="flex gap-4">
        {canFullscreen && (
          <>
            <button
              onClick={() => {
                player.current?.enterFullscreen("media");
              }}
              className="px-4 py-1 bg-pink-700 text-white rounded"
            >
              Enter Full Screen
            </button>
          </>
        )}
        {canPictureInPicture && (
          <>
            <button
              onClick={() => {
                player.current?.enterPictureInPicture();
              }}
              className="px-4 py-1 bg-pink-700 text-white rounded"
            >
              Enter PIP
            </button>
            <button
              onClick={() => {
                player.current?.exitPictureInPicture();
              }}
              className="px-4 py-1 bg-pink-700 text-white rounded"
            >
              Exit PIP
            </button>
          </>
        )}
      </div>
      <div className="flex gap-2 items-center p-2">
        <span>Audio Gain</span>

        <>
          {[1, 1.5, 2, 3].map((gain, index) => (
            <button
              key={index}
              onClick={() => player.current?.setAudioGain(gain)}
              className="bg-gradient-to-tr from-pink-700 to-pink-950 text-white h-10 w-10 rounded-full shadow shadow-black hover:shadow-lg hover:shadow-black duration-300"
            >
              {gain}
            </button>
          ))}
        </>
        <span>
          {`${canSetAudioGain}`} {`${audioGain}`}
        </span>
      </div>
    </div>
  );
}

function MenuItem({ root, options }: { root: boolean; options: MenuOption[] }) {
  return (
    <Menu.Root className="relative">
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <Menu.Button className="group h-10 w-10 flex items-center justify-center rounded-md outline-none ring-0 data-[hocus]:ring-4 ring-inset ring-pink-400 text-pink-400 hover:bg-pink-400/20 duration-200">
            <SettingsIcon className="h-8 w-8 transform transition-transform duration-500 ease-out group-data-[open]:rotate-90" />
          </Menu.Button>
        </Tooltip.Trigger>
        <Tooltip.Content
          className="animate-out fade-out slide-out-to-bottom-2 data-[visible]:animate-in data-[visible]:fade-in data-[visible]:slide-in-from-bottom-4 z-10 rounded-lg bg-pink-400/50 text-white backdrop-blur px-2 py-1 text-sm border border-pink-400/50 mt-2"
          placement="bottom end"
        >
          <span>Settings</span>
        </Tooltip.Content>
      </Tooltip.Root>
      <Menu.Items
        placement={root ? "top end" : "bottom end"}
        className="mb-2 animate-out fade-out slide-out-to-bottom-2 data-[open]:animate-in data-[open]:fade-in data-[open]:slide-in-from-bottom-4 flex h-[var(--menu-height)] max-h-96 min-w-64 flex-col vertical-scrollbar overscroll-y-contain rounded-md border border-white/10 bg-pink-500/20 backdrop-blur-sm py-1 pl-1 font-sans text-[15px] font-medium outline-none transition-[height] duration-300 will-change-[height] data-[resizing]:overflow-hidden"
      >
        {options.map((option, index) =>
          option.submenu ? (
            <MenuItem key={index} root={false} options={option.submenu} />
          ) : (
            <span key={index} className="text-white">
              {option.title}
            </span>
          )
        )}
      </Menu.Items>
    </Menu.Root>
  );
}

export default Player;
