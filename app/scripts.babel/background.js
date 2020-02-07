'use strict';

chrome.runtime.onInstalled.addListener( function ( details ) {
  console.log( 'previousVersion', details.previousVersion );
} );
chrome.tabs.onUpdated.addListener( function ( tabId ) {
  chrome.pageAction.show( tabId );
} );


function unsetgeo() {
  localStorage.setItem( 'scrapeKit.geo.lat', '' );
  localStorage.setItem( 'scrapeKit.geo.lng', '' );
  localStorage.setItem( 'scrapeKit.geo.use', '0' );
  return getgeo();
}

function getgeo() {
  return {
    lat: localStorage.getItem( 'scrapeKit.geo.lat' ),
    lng: localStorage.getItem( 'scrapeKit.geo.lng' ),
    use: localStorage.getItem( 'scrapeKit.geo.use' ),
  };
}

function setgeo( geo ) {
  console.log( geo );
  localStorage.setItem( 'scrapeKit.geo.lat', geo.lat );
  localStorage.setItem( 'scrapeKit.geo.lng', geo.lng );
  localStorage.setItem( 'scrapeKit.geo.use', '1' );

  return getgeo();
}

function clearproxy() {
  return chrome.proxy.settings.clear( {}, _ => _ );
}

function setproxy( proxy ) {

  chrome.proxy.settings.set( {
    value: {
      mode: 'fixed_servers',
      rules: {
        proxyForHttps: {
          scheme: proxy.scheme,
          host: proxy.host,
          port: proxy.port,
        },
        proxyForHttp: {
          scheme: proxy.scheme,
          host: proxy.host,
          port: proxy.port,
        },
        // bypassList: ['foobar.com']
      }
    }, scope: 'regular'
  }, function () {

    if ( !!proxy.username && !!proxy.password ) {
      chrome.webRequest.onAuthRequired.addListener( ( details, callbackFn ) => callbackFn( {
        authCredentials: {
          username: proxy.username,
          password: proxy.password
        }
      } ), { urls: ['<all_urls>'] }, ['asyncBlocking'] );
    }


  } );


}

chrome.runtime.onMessage.addListener(
  function ( request, sender, cb ) {
    if ( !request.action ) return;
    console.log( request );

    if ( request.action == 'setProxy' )
      cb( setproxy( request.data ) );
    if ( request.action == 'clearProxy' )
      cb( clearproxy() );
    if ( request.action == 'clearGeo' )
      cb( unsetgeo() );
    if ( request.action == 'setGeo' )
      cb( setgeo( request.data ) );
    if ( request.action == 'getGeo' ) {
      cb( getgeo() );
    }
    if ( request.action == 'test' ) {
      console.log( 'test!' );
      cb( { someData: 'test', success: true } );
    }
  } );