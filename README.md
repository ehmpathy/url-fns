# url-fns

![ci_on_commit](https://github.com/uladkasach/url-fns/workflows/ci_on_commit/badge.svg)
![deploy_on_tag](https://github.com/uladkasach/url-fns/workflows/deploy_on_tag/badge.svg)

Easily define and manipulate urls with relative paths, query parameters, and path parameters.

# install

```sh
npm install url-fns
```

# use

### createUrl

`createUrl` enables you to create a new url from a path, pathParams, and queryParams

for example:

```ts
import { createUrl } from 'url-fns';

const url = createUrl({
  path: '/jobs/:jobSlug/get-this-job',
  pathParams: { jobSlug: '123' },
  queryParams: { variant: 'b' },
});
expect(url).toEqual('/jobs/123/get-this-job?variant=b');
```

### updateUrl

`updateUrl` enables you to modify parts of an existing url

for example:
```ts
import { updateUrl } from 'url-fns';

const url = updateUrl({
  from: '/jobs/123/get-this-job?variant=b',
  with: {
    path: '../learn-more', // notice that this is a relative path
    queryParams: {
      focus: 'title',
    },
  },
});
expect(url).toEqual('/jobs/123/learn-more?variant=b&focus=title');
```

note:
- the `with.path` argument, optional, allows you to update the path of the url in two ways:
  - absolute replacement: if the `with.path` starts with `/`, it is assumed that you want to completely replace the path
  - relative replacement: if the `with.path` starts with `./` or `../`, it is assumed that you want a relative path update

### stringifyQueryParams

`stringifyQueryParams` enables you to easily stringify query parameter objects

for example:
```ts
import { stringifyQueryParams } from 'url-fns';

const stringifiedQueryParams = stringifyQueryParams({ variant: 'b', focus: 'title' });
expect(stringifiedQueryParams).toEqual('variant=b&focus=title');
```

### parseQueryParams

`parseQueryParams` enables you to easily parse query parameter strings

for example:
```ts
import { parseQueryParams } from 'url-fns';

const parsedQueryParams = parseQueryParams('variant=b&focus=title');
expect(parsedQueryParams).toEqual({ variant: 'b', focus: 'title' });
```

# notes

### allowed query-string values

This library restricts the allowed type of values of query-params you give it to be `string`s

This places the burden of serializing more complicated data types on _you_, the user of the library. This is for a few reasons:
- it incentivizes you to keep the data you're putting into query-params simpler
  - which will hopefully help prevent unexpected errors from cropping up 🙂
- it protects you from errors that could arise when different query-string libraries act on the same query-strings
  - e.g., if the libraries don't quite serialize/deserialize in the same way 😬
- it keeps the logic in this library simpler

As you can see, it:
- helps prevent us users from shooting ourselves in the foot 🦶🔫
- helps keep the library simple 🕊️
