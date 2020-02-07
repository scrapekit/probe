window.addEventListener( 'message', function ( event ) {
  // Prevent garbage
  if ( event.source != window || !event.data || !event.data.ext || event.data.ext != 'scrapekit' )
    return;

  // Send to backend

  if ( event.data.to == 'background' ) {
    chrome.runtime.sendMessage( {
      action: event.data.action,
      data: event.data.data
    }, function ( response ) {
      postMessage( { ext: 'scrapekit', to: 'page', 'action': event.data.action, data: response }, '*' );
    } );
  }

}, false );

