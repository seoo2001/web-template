up:
	docker compose up --build -d

down:
	docker compose down

restart:
	docker compose restart

stop:
	docker compose stop

rebuild:
	docker compose down -v
	docker compose up --build -d

logs:
	docker compose logs -f

ps:
	docker compose ps