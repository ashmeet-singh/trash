#ifndef _Z_HTTP_H_INCLUDED_
#define _Z_HTTP_H_INCLUDED_

#include <stdint.h>

#define Z_HTTP_REQUEST_METHOD_GET 1
#define Z_HTTP_REQUEST_METHOD_POST 2

struct z_http_context_headers
{
    uint8_t content_type[200];
};

struct z_http_context_request
{
    uint8_t is_request_line_finished;
    uint64_t method;
    uint8_t uri[2000];
    uint8_t version[50];
    uint8_t are_request_headers_finished;
    struct z_http_context_headers headers;
};

struct z_http_context
{
    struct z_http_context_request request;
};

int64_t z_http_parse_request_line(struct z_http_context *ctx, void *buf, uint64_t len);

#endif /* _Z_HTTP_H_INCLUDED_ */