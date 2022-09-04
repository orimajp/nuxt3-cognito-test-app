exports.handler = async (event, context) => {
  const { handler  } = await import('./.output/server/index.mjs');
//  event.rawPath = '/'

  event.path = event.path.replace(/^\//, '/prod/');

  const result = await handler(event);
  
  return result;
}
