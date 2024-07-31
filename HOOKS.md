# HOOKS

- **useState**  
  Used to subscribe to specific state on a component instance.

- **useStore**  
  Used to subscribe to multiple states on a component instance.

- **useMediaPlayer**  
  Used to retrieve the nearest root media player instance.
  `Player ref is required if called outside of <MediaPlayer>`

- **useMediaProvider**  
  Used to retrieve the curretn media provider instance.

- **useMediaRemote**  
  Used to create a media remote control for dispatching media requests.

- **useMediaState**  
  Used to subscribe to a specific media state update.

- **useMediaStore**  
  Used to subscribe to multiple media state updates.
  ` A ref is required if called outside of <MediaPlayer>`

- **useSliderState**  
  Used to subscribe to specific slider state updates.

  - Can be used within any slider instance
  - A ref is required if called outside outside of a slider instance

- **useSliderStore**  
  Used to subscribe to multiple slider state updates.

  - Can be used within any slider instance
  - A ref is required if called outside outside of a slider instance

- **useSliderPreview**  
  Used to create floating panel above a custom slider.

- **useChapterTitle**  
  Used to retrieve current chapter title text.

- **useThumbnails**  
  Used to fetch and resolve thumbnail images.  
  This hook fetches, parses, and resolves thumbnail images from WebVTT file, JSON file, or Object.
  This hook returns the resilved data for each image such as the start time, end time, coordinates, dimensions, and url. It is safe to call this hook in multiple places with the same src argument as work is de-de-duped and cached.
  The active thumbail can be retrieved by passing the data to **useActiveThumbnailHook** with a desired time.

- createTextTrack  
  Used to create and add a new text track to the player.

- **useTextCues**  
  Used to observe cues on the given text track.

- **useActiveTextCues**  
  Used to subscribe to the active text cues for a given text track.

- **useActiveTextTrack**  
  Used to retrieve the active text track of a specific kind/s

- **useAudioOptions**  
  Used to retrieve the current audio track options.

- **useAudioGainOptions**  
  Used to retrieve the current audio gain options.

- **useCaptionOptio**ns
  Used to retrieve the current caption/subtitle text track options.

- **useChapterOptions**  
  Used to retrieve the current chapter options.

- **usePlaybackRateOptions**  
  Used to retrieve the current playback rate options.

- **useVideoQualityOptions**  
  Used to retrieve the current video playback quality options.
