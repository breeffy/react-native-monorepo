# @breeffy/icons

> Component to show [FontAwesome](https://fontawesome.com) icons.

## Features

- **Duotone** icons support
- FontAwesome v6 support
- TypeScript support
- Compatible with [styled-components](https://styled-components.com)
- Compatible with styled-components [css property](https://styled-components.com/docs/api#css-prop)

### Peer Dependencies

```json
"peerDependencies": {
  "react": "*",
  "react-native": "*",
  "react-native-svg": "*"
}
```

See [this section](https://github.com/breeffy/react-native-monorepo#peer-dependencies) about peer dependencies and how to get correct versions.

## Installation

```
# Install react-native-svg peer dependency
$ yarn add react-native-svg
# Install @breeffy/icons package
$ yarn add @breeffy/icons
# Install FontAwesome icon packs
$ yarn add @fortawesome/free-solid-svg-icons
```

## Configuration

Add required icons or styles into library

```typescript
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas);
```

## Usage

```typescript
import { Icon } from '@breeffy/icons';
import type { IconProps } from '@breeffy/icons';

export const Icon = () => {
  return <Icon icon={['far', 'address-book']} />;
};
```

> See [storybook](https://github.com/breeffy/react-native-monorepo#storybook) for use case examples. Also see [react-native-fontawesome](https://github.com/FortAwesome/react-native-fontawesome) documentation, most of it is still valid.
