FROM php:8.2-fpm

RUN apt-get update && apt-get install -y \
  libpq-dev \
  libzip-dev \
  zip \
  unzip \
  git \
  curl \
  && docker-php-ext-install pdo pdo_pgsql zip

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

COPY . /var/www

RUN composer install --prefer-dist --no-scripts --no-dev --optimize-autoloader

RUN chown -R www-data:www-data /var/www \
  && chmod -R 775 /var/www/storage /var/www/bootstrap/cache

RUN rm -f .env

CMD php artisan migrate --force && php artisan config:cache && php artisan serve --host=0.0.0.0 --port=8000
EXPOSE 8000