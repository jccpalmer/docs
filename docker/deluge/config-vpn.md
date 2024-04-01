---
title: Configuring the Deluge VPN
description: If you want to mask your traffic behind a VPN, here's what you need to do
published: true
date: 2024-04-01T16:55:23.693Z
tags: docker
editor: markdown
dateCreated: 2024-04-01T16:55:23.693Z
---

## Project steps

Below are the steps necessary to set up Deluge to connect through the Gluetun VPN tunnel.

1. Navigate to where you saved the Deluge `docker-compose.yml` file.
	2. In this example, it's under `docker/deluge`.
3. Your code should look like the following with TZ filled in with your time zone and USERNAME with your account username.
  
<details>
  <summary>Docker Compose v1</summary>
  
  ```yaml
      	---
      version: "2.1"
      services:
        deluge:
          image: lscr.io/linuxserver/deluge:latest
          container_name: deluge
        environment:
          - PUID=1000
          - PGID=1000
          - TZ=YOUR_TIMEZONE_HERE (TZ FORMAT)
         volumes:
          - /home/USERNAME/docker/deluge/config:/config
          - /home/USERNAME/downloads:/downloads
         ports:
          - 8112:8112
          - 6881:6881
          - 6881:6881/udp
        restart: unless-stopped
  ```
  
</details>
  
4. However, since we have told Gluetun to be listening on port `8112`, you need to remove it from the Deluge container's Docker Compose to avoid port conflicts.
5. You need to also link Deluge to Gluetun's network. So your Docker Compose code should look like the following.
  
  <details>
  <summary>Docker Compose v2a</summary>
  
  ```yaml
      	---
      version: "2.1"
      services:
        deluge:
          image: lscr.io/linuxserver/deluge:latest
          container_name: deluge
        environment:
          - PUID=1000
          - PGID=1000
          - TZ=YOUR_TIMEZONE_HERE (TZ FORMAT)
         volumes:
          - /home/USERNAME/docker/deluge/config:/config
          - /home/USERNAME/downloads:/downloads
         ports:
          - 6881:6881
          - 6881:6881/udp
        restart: unless-stopped
        network_mode:
          container: gluetun
  ```
  
</details>
  
6. Exit the Docker Compose file, then type the following command.
  	1. `docker compose up -d`
7. If you go to the web UI at `http://localhost:8112`, you should notice that your IP address in the bottom right corner is different than your public one.
  
![deluge-1-1.jpg](/deluge-1-1.jpg)
  
### Errors with `network_mode: container`
  
1. The container should start up with the previous configuration. If, however, you run into errors, you can shut Deluge down with the following command while inside the Deluge directory.
  	1. `docker compose down`
2. Open your `docker-compose.yml` file and try changing `network_mode` to `service: gluetun` like the below code.
  
<details>
  <summary>Docker Compose v2b</summary>
  
  ```yaml
      	---
      version: "2.1"
      services:
        deluge:
          image: lscr.io/linuxserver/deluge:latest
          container_name: deluge
        environment:
          - PUID=1000
          - PGID=1000
          - TZ=YOUR_TIMEZONE_HERE (TZ FORMAT)
         volumes:
          - /home/USERNAME/docker/deluge/config:/config
          - /home/USERNAME/downloads:/downloads
         ports:
          - 6881:6881
          - 6881:6881/udp
        restart: unless-stopped
        network_mode:
          service: gluetun
  ```
  
</details>
  
3. Load up the container again with the following command.
  	1. `docker compose up -d`