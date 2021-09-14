#include <assert.h>
#include <complex.h>
#include <ctype.h>
#include <errno.h>
#include <fenv.h>
#include <float.h>
#include <inttypes.h>
#include <iso646.h>
#include <limits.h>
#include <locale.h>
#include <math.h>
#include <setjmp.h>
#include <signal.h>
#include <stdalign.h>
#include <stdarg.h>
#include <stdatomic.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>
#include <stdnoreturn.h>
#include <string.h>
#include <tgmath.h>
#include <threads.h>
#include <time.h>
#include <uchar.h>
#include <wchar.h>
#include <ctype.h>

#include <unistd.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <netinet/ip.h>

#define SERVER_PORT 8000
int main(int argc, char *argv[])
{

    int tcp_socket = socket(AF_INET, SOCK_STREAM, 0);

    struct sockaddr_in sa;

    memset(&sa, 0, sizeof(sa));

    sa.sin_family = AF_INET;
    sa.sin_port = htons(SERVER_PORT);
    sa.sin_addr.s_addr = htonl(INADDR_ANY);

    bind(tcp_socket, (struct sockaddr *)&sa, sizeof(sa));

    listen(tcp_socket, 10);

    int acceptedsocket = accept(tcp_socket, (struct sockaddr *)NULL, NULL);

    char b[1000];
    snprintf((char *)b, sizeof(b), "HTTP/1.0 200 OK\r\n\r\n<html>Hello<html>");

    send(acceptedsocket, (char *)b, strlen((char *)b), 0);

    close(acceptedsocket);
    close(tcp_socket);

    return 0;
}