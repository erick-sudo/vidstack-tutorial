# EVENTS

## Media Events
The player `smoothes` out any unexpected behavior across browsers, attaches additional metadata to the event detail, and rich information such as the request event that triggered it or the origin event that kicked it off.

## Media Request Events
`Vidstack Player` is built upon a request and response model for updating media state. Request are dispatched as events to the player component.

The player attempts to satisfy requests by performing operations on the provider based on the given request, and then attaching it to the corresponding media event.

**When are request events fired?**

Media request events are fired by `Vidstack` components generally in response to user actions. Most actions are a direct consequence to `UI` events such as pressing a button or dragging a slider. However, some actions may be indirect such as scrolling the player out of view, switching browser tabs, or the device going to sleep.

**How are request events fired?**

Request events are standard `DOM` events which can be dispatched like any other, however, they’re generally dispatched by using the [`MediaRemoteControl`](https://www.vidstack.io/docs/player/core-concepts/state-management?styling=tailwind-css#updating) as it’s simpler. A good practice is to always attach [event triggers](https://www.vidstack.io/docs/player/core-concepts/events?styling=tailwind-css#event-triggers) to ensure requests can be traced back to their origin. This is the same way all `Vidstack` components dispatch requests internally.

## Cancelling Requests
Meida request events can be cancelled by listening for them on the player or the component dispatching it and preventing the default behavior:

```js
	
	import { type MediaSeekRequestEvent } from '@vidstack/react';

	function onSeekRequest(time: number, nativeEvent: MediaSeekRequestEvent) {
	  nativeEvent.preventDefault();
	}
	
	// Option 1. Cancel requests on the player.
	<MediaPlayer onMediaSeekRequest={onSeekRequest} />;
	
	// Option 2. Cancel requests on the component dispatching it.
	<TimeSlider.Root onMediaSeekRequest={onSeekRequest} />
	
```

