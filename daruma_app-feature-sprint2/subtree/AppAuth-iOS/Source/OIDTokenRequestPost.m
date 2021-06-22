#import "OIDTokenRequestPost.h"
#import "OIDTokenUtilities.h"

static NSString *const kClientIDKey = @"client_id";
static NSString *const kClientSecretKey = @"client_secret";

@implementation OIDTokenRequestPost

- (NSURLRequest *)URLRequest {
    static NSString *const kHTTPPost = @"POST";
    static NSString *const kHTTPContentTypeHeaderKey = @"Content-Type";
    static NSString *const kHTTPContentTypeHeaderValue =
    @"application/x-www-form-urlencoded; charset=UTF-8";
    
    NSURL *tokenRequestURL = [self tokenRequestURL];
    NSMutableURLRequest *URLRequest = [[NSURLRequest requestWithURL:tokenRequestURL] mutableCopy];
    URLRequest.HTTPMethod = kHTTPPost;
    [URLRequest setValue:kHTTPContentTypeHeaderValue forHTTPHeaderField:kHTTPContentTypeHeaderKey];
    
    OIDURLQueryComponent *bodyParameters = [self tokenRequestBody];
    NSMutableDictionary *httpHeaders = [[NSMutableDictionary alloc] init];
    
    if (self.clientSecret) {
        // The client id and secret are encoded using the "application/x-www-form-urlencoded"
        // encoding algorithm per RFC 6749 Section 2.3.1.
        // https://tools.ietf.org/html/rfc6749#section-2.3.1
//        NSString *encodedClientID = [OIDTokenUtilities formUrlEncode:self.clientID];
//        NSString *encodedClientSecret = [OIDTokenUtilities formUrlEncode:self.clientSecret];
        
//        NSString *credentials =
//        [NSString stringWithFormat:@"%@:%@", encodedClientID, encodedClientSecret];
//        NSData *plainData = [credentials dataUsingEncoding:NSUTF8StringEncoding];
//        NSString *basicAuth = [plainData base64EncodedStringWithOptions:kNilOptions];
//
//        NSString *authValue = [NSString stringWithFormat:@"Basic %@", basicAuth];
//        [httpHeaders setObject:authValue forKey:@"Authorization"];
        [bodyParameters addParameter:kClientIDKey value:self.clientID];
        [bodyParameters addParameter:kClientSecretKey value:self.clientSecret];
    } else  {
        [bodyParameters addParameter:kClientIDKey value:self.clientID];
    }
    
    // Constructs request with the body string and headers.
    NSString *bodyString = [bodyParameters URLEncodedParameters];
    NSData *body = [bodyString dataUsingEncoding:NSUTF8StringEncoding];
    URLRequest.HTTPBody = body;
    
    for (id header in httpHeaders) {
        [URLRequest setValue:httpHeaders[header] forHTTPHeaderField:header];
    }
    
    return URLRequest;
}
@end
