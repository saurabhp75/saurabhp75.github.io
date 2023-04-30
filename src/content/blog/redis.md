---
title: "Redis"
pubDatetime: 2022-09-23T15:22:00Z
tags: ["Redis"]
draft: false
description: "Introduction to Redis"
---

set key value

get key

mset key1 value1 ......

mget key1 key2 .....

getrange key startindex stopindex

strlen key: gives length of string value. Returns 0 if key not present.

incr key: increment integer value by 1

decr key:

incrby, decrby: increment integer value by specific amount.

incrbyfloat

expire key 10: expire key after 10 second.

ttl key: time to expire of a key.

setex key duration value.

keys \*: show all the keys.

flushall: remove all the keys.

## list in redis

lpush key value1

lpush key value2

roush key value3

lrange key 0 -1: show all elements in the list.

llen key: length of the list.

lpop key

rpop key

lset key index value

linsert key before/after value(pivot) value.

lindex key index: see value at a particular index.

lpushx key value: insert only if list exist.

rpushx:

sort key [desc] [ALPHA]

blpop key duration: wait for duration

brpop key duration

## sets in redis

sadd key value1 [value2] .....

smembers key: list the set elements.

scard key: count the element in the set.

sismember key value: check if element present.

sdiff key1 key2: find difference in two sets.

sdiffstore key3 key1 key2: store difference in set3.

sinter key1 key2 ....: intersection of sets

sinterstore key1 key2:

sunion key1 key2 ....

sunionstore:

### sorted sets in redis

zadd key score1 value1 score2 value2....

zmembers key 0 -1

zcard

zcount key startrank endrank

-inf inf

zrem key member: remove a member from the set.

zrange key startindex endindex withscores.

zrevrange

zscore key member: show score of a member.

zrevrangebyscore key start end withscore.

zincrby key increment mamber: increment score of a member.

zremrangebyscore key min max

zremrangebyrank key min max: remove members by index.

## hyperloglog in redis

Hyperlog is a probabilistic data structure.

Pfadd key element1 ....: add element to hyperlog

pfcount key1 ....: show count of elements in hyperlog(s).

pfmerge key3 key1 key2: merge into key2.

## hashes in redis

hset myhash key value

hmset myhash key1 value2 ....

hmget key1.....

hkeys myhash: show keys in hash table.

hvals myhash:

hexists myhash key

hlen myhash

hincrby myhash key value

hincrbyfloat myhash key value

hdel myhash key

hstrlen myhash key: gives length of s value in hash.

hsetnx myhash key value: add only if key don't exists, ie don't overwrite.

## redis transactions

Transactions are atomic.

multi: open transaction terminal.
exec: execute the commands.

discard: discard all previous commands.

watch a: watch a value in the transaction.

## pubsub in redis

subscribe channel1 ....

publish channel1 "message".

psubscribe news\* h?llo: subscribe to a pattern of channels.

pubsub channels: show all non pattern channels.

pubsub numsub channel1: show no of subs for a channel.

pubsub numpat: show pattern based channels.

## scripts in redis

Lua is the scripting language.

## connection and security in redis

## geospatial redis

GEOADD map1 long lat member

GEOHASH map1 member

GEOPOS map1 member

GEODIST map1 member1 member2 [unit]

GEORADIUS

GEORADIUSBYMEMBER

## benchmark in redis

refis-benchmark -n 1000 -d 1000 -c 50

1000 commands, 1000 bytes of data and 50 client.
