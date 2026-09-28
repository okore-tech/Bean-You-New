// CloudFront Function (viewer-request) for a Next.js `output: "export"` site
// served from a private S3 bucket via Origin Access Control.
//
// S3's REST API has no concept of an index document, so a request for
// "/about/" would 404. Next is configured with trailingSlash: true, which
// emits "/about/index.html", so we map directory-style URIs onto that file.
//
// Deploy:  aws cloudfront create-function --name beanyou-rewrite \
//            --function-config Comment="index.html rewrite",Runtime=cloudfront-js-2.0 \
//            --function-code fileb://infra/cloudfront-rewrite.js
// Then associate it with the default cache behaviour as a viewer-request function.

function handler(event) {
  var request = event.request;
  var uri = request.uri;

  // "/about/" -> "/about/index.html"
  if (uri.endsWith('/')) {
    request.uri = uri + 'index.html';
    return request;
  }

  // "/about" -> "/about/index.html" (only when the last segment has no file
  // extension, so real assets like /images/logo.png are left alone)
  var lastSegment = uri.substring(uri.lastIndexOf('/') + 1);
  if (lastSegment.indexOf('.') === -1) {
    request.uri = uri + '/index.html';
  }

  return request;
}
