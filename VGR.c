#include <stdint.h>
#include <stdlib.h>
#include <stddef.h>

#include <unistd.h>

int main(int argc, char *argv[])
{
    uint64_t s;
    uint8_t *b;
    uint64_t i1;
    uint64_t i2;

    s = 1280 * 720 * 3;
    b = malloc(s);
    for (i1 = 0; i1 < (s / 3); i1++)
    {
        b[(i1 * 3)] = 0x00;
        b[(i1 * 3) + 1] = 0xff;
        b[(i1 * 3) + 2] = 0x00;
    }
    i2 = 0;
    while (1)
    {
        if (i2 < (60 * 10))
        {
            write(STDOUT_FILENO, b, s);
            i2++;
        }
        else
        {
            break;
        }
    }

    return 0;
}