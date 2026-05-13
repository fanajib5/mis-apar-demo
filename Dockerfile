# Multi-stage build untuk production
FROM composer:latest as composer

FROM php:8.3-fpm-alpine AS php-fpm

# Install system dependencies
RUN apk add --no-cache \
    git \
    unzip \
    libzip-dev \
    libpng-dev \
    libjpeg-turbo-dev \
    libfreetype6-dev \
    libxml2-dev \
    oniguruma-dev \
    freetype-dev \
    libpng \
    icu-dev \
    $PHPIZE_DEPS

# Install PHP extensions
RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) \
        bcmath \
        exif \
        gd \
        intl \
        opcache \
        pcntl \
        pdo_mysql \
        zip \
        soap \
        sockets

# Install Redis extension via PECL
RUN pecl install redis && docker-php-ext-enable redis

# Copy composer from composer image
COPY --from=composer /usr/bin/composer /usr/local/bin/composer

# Set working directory
WORKDIR /var/www/html

# Copy application files
COPY . .

# Install PHP dependencies
RUN composer install --no-dev --prefer-dist --optimize-autoloader --no-interaction

# Build frontend assets
RUN apk add --no-cache nodejs npm \
    && npm ci \
    && npm run build \
    && apk del nodejs npm

# Set permissions
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache \
    && chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

# Switch to non-root user
USER www-data

# Expose port (will be used by Nginx)
EXPOSE 9000

CMD ["php-fpm", "-F"]

# --- Nginx stage ---
FROM nginx:alpine AS nginx

# Copy nginx config
COPY --from=php-fpm /etc/nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=php-fpm /var/www/html /var/www/html

# Copy custom nginx config
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
