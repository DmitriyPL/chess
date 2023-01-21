run:
	docker run -d -p 3000:3000 --name chessApp --rm chess
stop:
	docker stop chessApp