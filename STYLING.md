# STYLING

## Styling Elements

`Vidstack Player` enables styling any child element of the player with `CSS` based on the current media state.

This is made possible by exposing media state as data attributes on the player `DOM` element.
The presence and/or absence of these media attributes can be used to style children of the player element with `CSS`.

The `[attr]` selector will select elements based on the presence or value of an attribute, and the `:not()` pseudo-class represents elements that do not match a list of selectors.

## Styling Components

Similarly to styling player elements, components also expose data attributes and `CSS` variables for styling with `CSS`.