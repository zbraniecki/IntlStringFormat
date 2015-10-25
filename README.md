Intl.StringFormat
================

A polyfill for the upcoming [Intl.StringFormat](https://github.com/zbraniecki/intl-stringformat-spec)
specification.


## Installation

```
npm install intl-listformat
```
_or_
```
git clone https://github.com/zbraniecki/IntlStringFormat.git
cd IntlStringFormat
npm install
make
```
_or_ download the latest release from
[here](https://github.com/zbraniecki/IntlStringFormat/releases/latest)


## Usage

The package's `polyfill.js` contains an UMD wrapper, so you can include or
require it pretty much anywhere. When included, it'll set `Intl.StringFormat`
according to the spec.

This version follows the Oct 2015 spec.
