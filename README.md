# Pattern Lab 2 on Drupal 8, running on Outrigger

## Setup

Proceed through these steps from the root of the repo:

### 1. Build and Start the Apache/PHP / MariaDB / Angular containers with:

  - `docker-compose build && docker-compose up -d`

### 2. Use the build script to run npm / composer to fetch a copy of Drupal 8 / grunt and store it in `./build/html` with:

  - `sh ./bin/septup.sh`

### 3. Ensure the installer has permissions to create the settings files and files directory with:

  - `docker-compose exec www cp /var/www/build/html/sites/default/default.settings.php /var/www/build/html/sites/default/settings.php`
  - `docker-compose exec www chown -R apache:apache /var/www/build/html/sites/default`

### 4. You should be able to load the Drupal 8 installer by navigating to:

  - http://www.d8.vm/

### 5. Proceed through the installation

### 6. Configure the database

  - Database name: drupal8_example
  - Database user: admin
  - Database password: admin
  - Database host: db.d8.vm

### 7. Copy custom theme into Drupal

  - For now, we have to manually copy src/PL2-BEM to build/html/themes/custom/

## Working with the project

### 1. Running drush commands on the site

  - `docker-compose -f build.yml run --rm drush cache-rebuild`

### 2. Running grunt commands on the site

  - `docker-compose -f build.yml run --rm grunt <command>`

### 3. Running composer commands on the site

  - `docker-compose -f build.yml run --rm composer <command>`

### 4. Getting a CLI on the code base (this will open a bash shell)

  - `docker-compose -f build.yml run --rm cli`

### 5. Importing a private key into a build container

When you need to clone data that is in a private repo, you will need to pass your
SSH private key into the container so that is can be used with git to clone your
project.

To get your private key into the build container, volume mount your key into the container at `/root/.ssh/outrigger.key` and it will be processed accordingly.

`~/.ssh/id_rsa:/root/.ssh/outrigger.key`

!!! NOTE !!!
If your private key has a name other than `id_rsa` then use that key in the volume mount above.

