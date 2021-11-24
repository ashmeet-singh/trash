package main

import (
	"encoding/json"
	"io"
	"net/http"
	"sync"
)

type Storage struct {
	Messages [10]Storage_Message
	Needle   int
	M        sync.Mutex
}

type Storage_Message struct {
	Name  string
	Group string
	Text  string
	Id    int
}

type Message_Type1 struct {
	Name  string
	Group string
	Text  string
}

type Message_Type2 struct {
	Name          string
	Group         string
	LastMessageId int
}

type Message_Type3 struct {
	Name string
	Text string
}

var S = Storage{}

func main() {
	S.Needle = cap(S.Messages)

	http.HandleFunc("/send", sendHandler)
	http.HandleFunc("/receive", receiveHandler)

	http.ListenAndServe(":8080", nil)
}

func sendHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodPost {
		B, E := io.ReadAll(r.Body)
		if E == nil {
			J := Message_Type1{}
			E1 := json.Unmarshal(B, &J)
			if E1 == nil && J.Name != "" && J.Group != "" && J.Text != "" {
				S.M.Lock()

				M := &(S.Messages[S.Needle%cap(S.Messages)])

				(*M).Name = J.Name
				(*M).Group = J.Group
				(*M).Text = J.Text
				(*M).Id = S.Needle

				S.Needle = S.Needle + 1

				S.M.Unlock()
			} else {
				w.WriteHeader(http.StatusBadRequest)
				io.WriteString(w, "400 Bad Request")
			}
		} else {
			w.WriteHeader(http.StatusInternalServerError)
			io.WriteString(w, "500 Internal Server Error")
		}
	} else {
		w.WriteHeader(http.StatusMethodNotAllowed)
		io.WriteString(w, "405 Method Not Allowed")
	}
}

func receiveHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodPost {
		B, E := io.ReadAll(r.Body)
		if E == nil {
			J := Message_Type2{}
			E1 := json.Unmarshal(B, &J)
			if E1 == nil {
				S.M.Lock()

				var Messages []Message_Type3
				Message := Message_Type3{}
				var M *Storage_Message
				for i := 0; i < (cap(S.Messages) - 1); i++ {
					M = &(S.Messages[(S.Needle-i-1)%cap(S.Messages)])
					if (*M).Id != 0 && (*M).Id == J.LastMessageId {
						break
					}
					if (*M).Group == J.Group && (*M).Name != J.Name {
						Message.Name = (*M).Name
						Message.Text = (*M).Text
						Messages = append(Messages, Message)
					}
				}

				if len(Messages) == 0 {
					w.Header().Set("Content-Type", "application/json")
					io.WriteString(w, "[]")
				} else {
					B2, E2 := json.Marshal(Messages)
					if E2 == nil {
						w.Header().Set("Content-Type", "application/json")
						w.Write(B2)
					} else {
						w.WriteHeader(http.StatusInternalServerError)
						io.WriteString(w, "500 Internal Server Error")
					}
				}

				S.M.Unlock()
			} else {
				w.WriteHeader(http.StatusBadRequest)
				io.WriteString(w, "400 Bad Request")
			}
		} else {
			w.WriteHeader(http.StatusInternalServerError)
			io.WriteString(w, "500 Internal Server Error")
		}
	} else {
		w.WriteHeader(http.StatusMethodNotAllowed)
		io.WriteString(w, "405 Method Not Allowed")
	}
}
