package main

import (
	context "context"
	"fmt"
	"log"
	"net"
	session "proto/session"

	grpc "google.golang.org/grpc"
	emptypb "google.golang.org/protobuf/types/known/emptypb"
)

type server struct {
	session.UnimplementedSessionServiceServer
}

func (*server) ValidateSession(ctx context.Context, sessionResponse *session.sessionResponse) (*emptypb.Empty, error) {

	return &emptypb.Empty, nil
}

func (*server) CreateSession(ctx context.Context, sessionRequest *session.SessionRequest) (*session.sessionResponse, error) {
	return &session.sessionResponse{}, nil
}

func main() {
	lis, err := net.Listen("tcp", "localhost:8082")

	if err != nil {
		log.Fatalf("Error while listening : %v", err)
	}

	s := grpc.NewServer()
	session.RegisterSessionServiceServer(s, &server{})
	fmt.Printf("Starting server in port :8082\n")

	if err := s.Serve(lis); err != nil {
		fmt.Printf("Error while serving : %v", err)
	}
}
