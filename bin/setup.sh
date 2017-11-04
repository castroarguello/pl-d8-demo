# Install dependencies and run main application build.
# Run grunt with --force to ignore errors.
# --unsafe-perm ensures dispatch to theme-related operations can still run as root for Docker.
docker-compose -f build.yml run --rm cli "npm install --unsafe-perm && grunt --timer --quiet"

