#include <stdint.h>
#include <string.h>

#include "z_http.h"
#include "z_str.h"

#define z_http_char_test1(c) ((c > 96 && c < 123) || (c > 45 && c < 58) || (c > 64 && c < 91) || c == 95)

static uint8_t known_headers[] = { 'C', 'o', 'n', 't', 'e', 'n', 't', '-', 'L', 'e', 'n', 'g', 't', 'h', '\0' };
static uint64_t known_headers_index[] = { 0 };
static uint64_t known_headers_length[] = { 14 };

/* Returns -1 on error or 0 on success */

int64_t z_http_parse_request_line(struct z_http_context *ctx, void *buf, uint64_t len)
{
    struct z_http_context_request *req = &(ctx->request);

    if (len == 0 || req->is_request_line_finished != 0) { return -1; }

    uint8_t *s = (uint8_t *)buf;
    uint8_t c;

    uint64_t state = 1;
    uint64_t i = 0;
    uint64_t l = 0;

    while (i < len)
    {
        c = s[i];
        switch (state)
        {
        case 1:
            if (len > 3 && z_str_cmp4char(s, 'G', 'E', 'T', ' '))
            {
                req->method = Z_HTTP_REQUEST_METHOD_GET;
                i += 3;
            }
            else if (len > 4 && z_str_cmp5char(s, 'P', 'O', 'S', 'T', ' '))
            {
                req->method = Z_HTTP_REQUEST_METHOD_POST;
                i += 4;
            }
            else { return -1; }
            l = 0;
            state = 2;
            break;
        case 2:
            if (z_http_char_test1(c) && l != sizeof(req->uri) - 1)
            {
                (req->uri)[l] = c;
                l++;
            }
            else if (c == 32 && l != 0)
            {
                (req->uri)[l] = '\0';
                l = 0;
                state = 3;
            }
            else { return -1; }
            break;
        case 3:
            if (z_http_char_test1(c) && l != sizeof(req->version) - 1)
            {
                (req->version)[l] = c;
                l++;
            }
            else { return -1; }

            if (l != 0 && i == len - 1)
            {
                (req->version)[l] = '\0';
                req->is_request_line_finished = 1;
                return 0;
            }
            break;
        }
        i++;
    }

    return -1;
}