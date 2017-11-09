# Install dependencies and run main application build.
# Run grunt with --force to ignore errors.
# --unsafe-perm ensures dispatch to theme-related operations can still run as root for Docker.
docker-compose -f build.yml run --rm cli "npm install --unsafe-perm && grunt --timer --quiet"

docker-compose -f build.yml run --rm cli 'cd /var/www/build/html && ../../vendor/drupal/console/bin/drupal site:install standard  \
--langcode="en"  \
--db-type="mysql"  \
--db-host="db"  \
--db-name="d8_headless"  \
--db-user="admin"  \
--db-pass="admin"  \
--db-port="3306"  \
--site-name="Drupal 8 headless"  \
--site-mail="admin@example.com"  \
--account-name="admin"  \
--account-mail="admin@example.com"  \
--account-pass="admin" --force'

docker-compose -f build.yml run --rm cli 'cd /var/www/build/html && ../../vendor/drupal/console/bin/drupal moi jsonapi devel_generate'

docker-compose -f build.yml run --rm drush genc 20


