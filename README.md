# Docker Compose setup for Codica :)

## Local setup

1. Check (/src/core/database/providers) for host db... 
    if you run db locally you need to change host parameter,
    if you run docker-compose - everything ok

2.  Run `docker-compose up -d --build` to setup local environment with Docker

This setup will handle hot reloading, so any updates you make to the NestJS code will update the container in realtime.
