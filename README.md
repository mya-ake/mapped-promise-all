# mapped-promise-all

[![npm version](https://badge.fury.io/js/mapped-promise-all.svg)](https://badge.fury.io/js/mapped-promise-all)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
![CI](https://github.com/mya-ake/mapped-promise-all/workflows/CI/badge.svg)

Provides a mapping of the response of `Promise.all` to an object.

## Install

```bash
$ npm i mapped-promise-all
// or
$ yarn add mapped-promise-all
```

## Usage

```js
import { mappedPromiseAll } from 'mapped-promise-all';

const getUser = async () => ({
  name: 'user',
  email: 'sample@example.com',
});

const getItems = async () => [
  { id: 1, name: 'item 1' },
  { id: 2, name: 'item 2' },
];

mappedPromiseAll({
  user: getUser(),
  items: getItems(),
}).then(({ user, items }) => {
  // do something
});

// async/await
const { user, items } = await mappedPromiseAll({
  user: getUser(),
  items: getItems(),
});
// do something
```

## Contribution

If you find a bug or want to contribute to the code or documentation, you can help by submitting an [issue](https://github.com/mya-ake/mapped-promise-all/issues) or a [pull request](https://github.com/mya-ake/mapped-promise-all/pulls).

## License

[MIT](https://github.com/mya-ake/mapped-promise-all/blob/master/LICENSE)
