#include <stdlib.h>
#include <stdint.h>
#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <errno.h>
#include <time.h>

#include <unistd.h>
#include <sys/socket.h>
#include <netinet/in.h>

#include "http_request_handler.h"

struct central_box {
    uint_fast32_t max_connections;
    struct socket_box *connected_socket_boxes;
};

struct socket_box {
    int fd;
    struct http_request_box httpreqbox;
};

int create_and_init_tcp_socket(uint16_t port, int backlog) {
    int tcp_sock_fd;
    tcp_sock_fd = socket(AF_INET, SOCK_STREAM | SOCK_NONBLOCK, 0);
    if (tcp_sock_fd == -1) { return tcp_sock_fd; }

    struct sockaddr_in TSA;
    struct sockaddr_in *SA;
    SA = (struct sockaddr_in *)malloc(sizeof(TSA));
    memset(SA, 0, sizeof(TSA));
    SA->sin_family = AF_INET;
    SA->sin_port = htons(port);
    (SA->sin_addr).s_addr = htonl(INADDR_ANY);

    int s;
    s = bind(tcp_sock_fd, (struct sockaddr *)SA, sizeof(TSA));
    if (s == -1) { return s; }

    s = listen(tcp_sock_fd, backlog);
    if (s == -1) { return s; }

    return tcp_sock_fd;
}

int_fast32_t find_index_of_socket_box(int fd, struct socket_box *b, uint_fast32_t n) {
    uint_fast32_t i;
    for (i = 0; i < n; i++) {
        if (b[i].fd == fd) { return i; }
    }
    return -1;
}

int_fast32_t find_index_of_empty_socket_box(struct socket_box *b, uint_fast32_t n) {
    uint_fast32_t i;
    for (i = 0; i < n; i++) {
        if (b[i].fd == -1) { return i; }
    }
    return -1;
}

void handle_connected_socket_on_creation(struct socket_box *sbptr, struct central_box *cbptr) {

}

void handle_connected_socket(struct socket_box *sbptr, struct central_box *cbptr) {

}

void handle_connected_socket_on_destruction(struct socket_box *sbptr, struct central_box *cbptr) {

}

void destory_connected_socket(struct socket_box *sbptr, struct central_box *cbptr) {
    handle_connected_socket_on_destruction(sbptr, cbptr);
    close(sbptr->fd);
    sbptr->fd = -1;
}

void accept_and_handle_connections(int tcp_sock_fd, uint_fast32_t max_connections, int backlog) {
    int_fast32_t i;
    int_fast32_t i1;
    int_fast32_t i2;
    int fd;

    struct central_box TCB;
    struct socket_box TSB;

    struct central_box *cbptr;
    struct socket_box *sbptr;

    cbptr = (struct central_box *)malloc(sizeof(TCB));
    memset(cbptr, 0, sizeof(TCB));

    cbptr->max_connections = max_connections;
    cbptr->connected_socket_boxes = (struct socket_box *)malloc(sizeof(TSB) * max_connections);
    memset(cbptr->connected_socket_boxes, 0, sizeof(TSB) * max_connections);

    for (i = 0; i < max_connections; i++) {
        (cbptr->connected_socket_boxes)[i].fd = -1;
    }

    while (1) {
        for (i = 0; i < backlog; i++) {
            fd = accept(tcp_sock_fd, (struct sockaddr *)NULL, NULL);
            if (fd == -1) { break; }

            i1 = find_index_of_socket_box(fd, cbptr->connected_socket_boxes, max_connections);

            if (i1 == -1) {
                i2 = find_index_of_empty_socket_box(cbptr->connected_socket_boxes, max_connections);
                if (i2 == -1) {
                    close(fd);
                    continue;
                }
            } else {
                handle_connected_socket_on_destruction((cbptr->connected_socket_boxes) + i1, cbptr);
                i2 = i1;
            }

            memset((cbptr->connected_socket_boxes) + i2, 0, sizeof(TSB));
            (cbptr->connected_socket_boxes)[i2].fd = fd;
            handle_connected_socket_on_creation((cbptr->connected_socket_boxes) + i2, cbptr);
        }
        for (i = 0; i < max_connections; i++) {
            if ((cbptr->connected_socket_boxes)[i].fd != -1) { 
                handle_connected_socket((cbptr->connected_socket_boxes) + i, cbptr);
            }
        }
    }
}

int main(int argc, char *argv[]) {
    int tcp_sock_fd;
    tcp_sock_fd = create_and_init_tcp_socket(8000, 64);
    if (tcp_sock_fd == -1) { return 0; }

    accept_and_handle_connections(tcp_sock_fd, 2048, 64);

    return 0;
} 
