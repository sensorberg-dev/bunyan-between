
# bunyan-between

Filter [bunyan][0]-logs based on a time frame.

Install with:

```sh
$ npm install -g bunyan-between
```

To get all log entries from the 1st of april this year:

```sh
cat /app/bunyan.log | bunyan-between 2014-04-01 2014-04-02 | bunyan
```

This module is based on [bunyan-reltime][1] from Chakrit Wichian.

[0]: https://github.com/trentm/node-bunyan
[1]: https://github.com/chakrit/bunyan-reltime
