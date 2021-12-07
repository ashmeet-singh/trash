#include <stdint.h>

int64_t z_str_find_CRLF(void *buf, uint64_t len)
{
    if (len == 0) { return -1; }

    uint8_t *s = (uint8_t *)buf;

    uint64_t i;
    for (i = 0; i < len - 1; i++)
    {
        if (s[i] == 13 && s[i + 1] == 10) { return i; }
    }
    return -1;
}

void z_str_trim(void *buf, uint64_t len)
{
    uint8_t *s = (uint8_t *)buf;
    uint64_t i;
    uint64_t l = 0;
    uint64_t e = 0;

    for (i = 0; i < len; i++)
    {
        if (l != 0 || s[i] != 32)
        {
            s[l] = s[i];
            l++;
            if (s[i] != 32) { e = l; }
        }
    }
    for (i = e; i < len; i++) { s[i] = '\0'; }
}