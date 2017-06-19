# BiMapCache

[![Circle CI](https://circleci.com/gh/StreakYC/bimapcache.svg?style=shield)](https://circleci.com/gh/StreakYC/bimapcache)
[![npm version](https://badge.fury.io/js/bimapcache.svg)](https://badge.fury.io/js/bimapcache)

This module is for memoizing to localStorage a single asynchronous function or a
pair of inverse asynchronous functions.

## API

This module exports the BiMapCache class, which must be instantiated with `new`
and has several public methods.

### new BiMapCache({key, getBfromA, getAfromB, storage, saveThrottle, maxLimit, maxAge})

When constructing a BiMapCache instance, you must pass an object with `key`,
`getAfromB`, and `getBfromA` properties. The rest of the properties are
optional.

`key` is the name of the property on localStorage (or the object passed as the
`storage` parameter) to use to store the cached data in.

`getAfromB` and `getBfromA` are the functions you want to cache. These functions
are expected to be inverses of each other, though if you only want to cache one
function then you could supply it as `getAfromB` and supply an error-throwing
function as `getBfromA`. Each function only gets called when the same-named
method on the BiMapCache instance is called. Each function must return a Promise
if it is to be used. The inputs and (resolved) outputs of these functions must
work as the keys of Maps and be JSONifiable, so it's recommended that they be
numbers or strings.

`saveThrottle` is an optional property specifying a number of milliseconds to
throttle saves to the storage by. This defaults to 3000 (or 3 seconds).

`maxLimit` specifies the maximum number of entries to keep in the persistent
cache. Old entries will be removed first if this limit is exceeded. This
defaults to 1000.

`maxAge` specifies the maximum age for cache entries. Cache entries that haven't
been set or retrieved within this time will be removed.

### biMapCache.getAfromB(input): Promise, biMapCache.getBfromA(input): Promise

Calling either of these methods on the instance will cause the cache to be
checked first. If no result is found in the cache, then the matching callback
given in the constructor will be called. If the promise from the given callback
resolves successfully, its result will be cached.

## Types

[Flow](https://flowtype.org/) type declarations for this module are included!
If you are using Flow, they won't require any configuration to use.
