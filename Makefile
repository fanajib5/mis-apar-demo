# Development

serve:
	php artisan serve

tinker:
	php artisan tinker

horizon:
	php artisan horizon

schedule-work:
	php artisan schedule:work

# Testing

test:
	php artisan test

test-parallel:
	php artisan test --parallel

test-coverage:
	php artisan test --coverage

test-file:
	php artisan test $(filter-out $@,$(MAKECMDGOALS))

test-filter:
	php artisan test --filter="$(filter-out $@,$(MAKECMDGOALS))"

# Database

migrate:
	php artisan migrate

rollback:
	php artisan migrate:rollback

fresh:
	php artisan migrate:fresh --seed

# Code Quality

pint:
	./vendor/bin/pint

routes:
	php artisan route:list

# Generators

make-livewire:
	php artisan make:livewire $(filter-out $@,$(MAKECMDGOALS))

make-model:
	php artisan make:model $(filter-out $@,$(MAKECMDGOALS)) -mf

# CI Simulation (GitHub Actions locally)

ci-lint:
	composer install && npm install && composer lint

ci-test:
	cp .env.example .env && touch database/database.sqlite && php artisan key:generate && npm run build && php artisan test --compact

ci-all: ci-lint ci-test

# Security

audit:
	composer audit

outdated:
	composer outdated

update:
	composer update

key-generate:
	php artisan key:generate

# Docker (from docs)

docker-up:
	docker compose up -d

docker-down:
	docker compose down