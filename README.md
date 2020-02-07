# ScrapeKit Probe

This Chrome extension in a part of ScrapeKit Framework.

It is meant to be used together with WebDriver to give your web scraper some extra features otherwise unavailable, such as mocking geolocation or setting proxy right from the web page context.

## Installation

- Download and extract probe.zip
- Go to chrome://extensions 
- Enable Developer mode
- Load Unpacked

## Usage

Probe injects a couple of objects into every page available globally, so you can eval them just like they were a part of the page.

### Set Geolocation Coordinates

Use this method to set the mocked geolocation coordinates. This will persist for every page load in the current session until you switch it off.

```javascript
scrapeKit.geo.set({
    lat: 12.34567,
    lng: 21.76543
});
```

### Get Geolocation Coordinates

Returns the mocked coordinates

```javascript
let geo = scrapeKit.geo.get();

// { lat:'123',lng:'321',use:'1' }

```

### Unset Geolocation Coordinates

Use this method to stop mocking geolocation

```javascript
scrapeKit.geo.unset();
```

### Set Proxy

Set an HTTP/HTTPS proxy with authorizationL

```javascript
scrapeKit.proxy.set({
    scheme: "http",
    host: "127.0.0.1",
    port: 8080,
 //   username: "admin",
 //   pasword: "password",
});
```

### Unset Proxy

Disable proxy and reset the configuration.

```javascript
scrapeKit.proxy.unset();
```

### Intercept XmlHttpRequest Queries

Probe injects xhook. For detailed examples refer to Xhook's [documentation](https://github.com/jpillora/xhook).

```javascript
//modify 'responseText' of 'example2.txt'
xhook.after(function(request, response) {
  if(request.url.match(/example\.txt$/))
    response.text = response.text.replace(/[aeiou]/g,'z');
});
```
