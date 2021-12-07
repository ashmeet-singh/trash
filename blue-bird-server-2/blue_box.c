#include <stdlib.h>
#include <stdint.h>
#include <stdio.h>
#include <string.h>

#include <sys/socket.h>
#include <netinet/in.h>
#include <arpa/inet.h>

#include "z_http.h"

struct socket_box
{
    int fd;
    struct z_http_context http_ctx;
};

struct central_box
{
    uint64_t max_sockets;
    struct socket_box *socket_boxes;
};

int create_and_init_tcp_socket(uint16_t port, int backlog)
{
    int sockfd = socket(AF_INET, SOCK_STREAM | SOCK_NONBLOCK, 0);
    if (sockfd == -1) { return -1; }

    struct sockaddr_in TA;
    struct sockaddr_in *A = (struct sockaddr_in *)malloc(sizeof(TA));
    memset(A, 0, sizeof(TA));
    A->sin_family = AF_INET;
    A->sin_port = htons(port);
    A->sin_addr.s_addr = htonl(INADDR_ANY);

    if (bind(sockfd, (struct sockaddr *)A, sizeof(TA)) == -1) { return -1; }

    if (listen(sockfd, backlog) == -1) { return -1; }

    return sockfd;
}

void handle_connected_socket_on_creation(struct socket_box *sbptr, struct central_box *cbptr)
{

}

void handle_connected_socket(struct socket_box *sbptr, struct central_box *cbptr)
{

}

void handle_disconnected_socket_on_destruction(struct socket_box *sbptr, struct central_box *cbptr)
{

}

int64_t find_index_of_socket_box(int fd, struct socket_box *sb, uint64_t n) {
    uint64_t i;
    for (i = 0; i < n; i++)
    {
        if (sb[i].fd == fd) { return i; }
    }
    return -1;
}

int64_t find_index_of_empty_socket_box(struct socket_box *sb, uint64_t n) {
    uint64_t i;
    for (i = 0; i < n; i++)
    {
        if (sb[i].fd == -1) { return i; }
    }
    return -1;
}

void accept_and_handle_connections(int tcp_socket_fd, uint64_t max_sockets, int backlog)
{
    int64_t i1;
    int64_t i2;
    int64_t i3;
    uint64_t ui1;
    uint64_t ui2;
    uint64_t ui3;

    int fd;

    struct central_box TCB;
    struct socket_box TSB;

    struct central_box *cbptr;
    struct socket_box *sbptr;

    cbptr = (struct central_box *)malloc(sizeof(TCB));
    if (cbptr == NULL) { exit(EXIT_FAILURE); }
    memset(cbptr, 0, sizeof(TCB));

    sbptr = (struct socket_box *)malloc(sizeof(TSB) * max_sockets);
    if (sbptr == NULL) { exit(EXIT_FAILURE); }
    memset(sbptr, 0, sizeof(TSB) * max_sockets);

    cbptr->max_sockets = max_sockets;
    cbptr->socket_boxes = sbptr;

    for (ui1 = 0; ui1 < max_sockets; ui1++) { (sbptr)[ui1].fd = -1; }

    while (1)
    {
        for (i1 = 0; i1 < backlog; i1++)
        {
            fd = accept(tcp_socket_fd, (struct sockaddr *)NULL, NULL);
            if (fd == -1) { break; }

            i2 = find_index_of_socket_box(fd, sbptr, max_sockets);
            if (i2 == -1)
            {
                i3 = find_index_of_empty_socket_box(sbptr, max_sockets);
                if (i3 == -1) { close(fd); continue; }
            }
            else
            {
                handle_disconnected_socket_on_destruction(sbptr + i2, cbptr);
                i3 = i2;
            }
            memset(sbptr + i3, 0, sizeof(TSB));
            sbptr[i3].fd = fd;
            handle_connected_socket_on_creation(sbptr + i3, cbptr);
        }
        for (ui1 = 0; ui1 < max_sockets; ui1++)
        {
            if (sbptr[ui1].fd != -1)
            {
                handle_connected_socket(sbptr + ui1, cbptr);
            }
        }
    }
}

int main(int argc, char *argv[])
{
    int fd = create_and_init_tcp_socket(8080, 256);
    if (fd == -1) { return 1; }
    accept_and_handle_connections(fd, 1024, 256);
    return 0;
}