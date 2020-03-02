# react-native-svg-icons

![npm](https://img.shields.io/npm/v/@breeffy/react-native-svg-icons/latest)
![npm](https://img.shields.io/npm/l/@breeffy/react-native-svg-icons)

## Introduction
This React Native component aims to be improved drop-in replacement for [react-native-fontawesome](https://github.com/FortAwesome/react-native-fontawesome). It allows to use **FontAwesome 5** / **FontAwesome 5 Pro** icons as SVG icons.

## Difference between react-native-svg-icons and react-native-fontawesome
Feature      | Description
------------ | -------------
Built-in and up-to-date Typescript types | react-native-svg-icons was rewritten using Typescript and automatically generates and packages \*.d.ts files into npm package. This ensures types are always up-to-date. You don't need to download them from somewhere else.
**style** property accepts array of styles | This makes react-native-svg-icons **compatible** with [styled-components](https://styled-components.com) and it's all modern features like **css** property
Deprecated **width** and **height** properties were removed | You should use unified **size** property
Duotone icons **are not supported** | Both in react-native-svg-icons and react-native-fontawesome

## Installation

```
$ yarn add "react-native-svg"
$ yarn add "@fortawesome/fontawesome-svg-core"
$ yarn add "@fortawesome/free-solid-svg-icons"
$ yarn add "@fortawesome/react-native-fontawesome"
$ yarn add "@breeffy/react-native-svg-icons"
```

## Add additional FontAwesome 5 styles or Pro version icons

**Visit [fontawesome.com/icons](https://fontawesome.com/icons) to search for free and Pro icons**

```
$ yarn add "@fortawesome/free-brands-svg-icons"
$ yarn add "@fortawesome/free-regular-svg-icons"
```

If you are a [Font Awesome Pro](https://fontawesome.com/pro) subscriber you can install Pro packages; this requires [additional configuration](https://fontawesome.com/how-to-use/on-the-web/setup/using-package-managers).

```
$ yarn add "@fortawesome/pro-solid-svg-icons"
$ yarn add "@fortawesome/pro-regular-svg-icons"
$ yarn add "@fortawesome/pro-light-svg-icons"
```

## How to use SVG Icons

You can use SVG Icons in your React Native components like this:

```typescript
import { SvgIcon } from '@breeffy/react-native-svg-icons';
...
<SvgIcon
  color={'#262F56'}
  icon={['far', 'coffee']}
  size={24}
/>
```
Also you can use **SvgIcon** with [styled-components](https://styled-components.com). Below example shows how to use **styled-components [css prop](https://styled-components.com/docs/api#css-prop)**
```typescript
import 'styled-components/macro';
...
<SvgIcon
  css={`
    margin-top: 15px;
  `}
  color={iconColor}
  icon={['far', iconName]}
  size={24}
/>
```

### Color

Color can be specified either through top-level **color** property or as **color** property of **style** objects.

1. **IF** top-level **color** property is provided it takes precendence and will be used
2. **ELSE IF** any *style object's* **color** property is provided will be used the most last one
3. **ELSE** `DEFAULT_COLOR = '#000'` will be used

#### Color Property Example

```typescript
import { SvgIcon } from '@breeffy/react-native-svg-icons';
...
<SvgIcon
  color={'#262F56'}
  icon={ faCoffee }
/>
```

### Size

Size can be specified using to-level **size** property. If **size** property is not provided will be used `export const DEFAULT_SIZE = 16;`

**width** and **height** properties of style objects **are not supported and will be ignored**. You should use unified **size** property.

#### Size Property Example

```typescript
import { SvgIcon } from '@breeffy/react-native-svg-icons';
...
<SvgIcon
  size={ 32 }
  icon={ faCoffee }
/>
```

## Features

### Masking

```typescript
import { SvgIcon } from '@breeffy/react-native-svg-icons';
...
<SvgIcon
  mask={['far', 'circle']}
  icon={ faCoffee }
/>
```

[More on masking...](https://fontawesome.com/how-to-use/on-the-web/styling/masking)

### Power Transforms

```typescript
import { SvgIcon } from '@breeffy/react-native-svg-icons';
...
<SvgIcon icon="arrows" transform="shrink-6 left-4" />
<SvgIcon icon="arrow-rightr" transform={{ rotate: 42 }} />
```

[More on power transforms...](https://fontawesome.com/how-to-use/on-the-web/styling/power-transforms)

## Integration
More detailed guides how to use and configure **FontAwesome 5** icons can be found
at [react-native-fontawesome](https://github.com/FortAwesome/react-native-fontawesome)

## Frequent questions

### How do I import the same icon from two different styles?

With ES modules and `import` statements we can rename:

```javascript
import { library } from '@fortawesome/fontawesome-svg-core'
import { faStroopwafel as fasFaStroopwafel } from '@fortawesome/pro-solid-svg-icons'
import { faStroopwafel as farFaStroopwafel } from '@fortawesome/pro-regular-svg-icons'

library.add(fasFaStroopwafel, farFaStroopwafel)
```

### I don't think tree-shaking is working; got any advice?

Check out our [docs here](https://fontawesome.com/how-to-use/with-the-api/other/tree-shaking).

## How to Help

Review the following docs before diving in:

- [CONTRIBUTING.md](CONTRIBUTING.md)
- [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)

