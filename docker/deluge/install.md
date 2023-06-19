---
title: Installing the Deluge container
description: 
published: true
date: 2023-06-19T01:09:15.306Z
tags: docker, deluge, vpn
editor: markdown
dateCreated: 2023-06-19T01:01:02.777Z
---

This page assumes that you have Docker Compose installed.

1. Create a YAML file named `docker-compose.yml` in your text editor or IDE of your choice and save it to the directory created in Step 1 in [Preparation](/docker/deluge/prereq-prep). 
    a. In this example, the file is saved under `~/docker/deluge`.
2. Copy the following code into the blank file. 
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

2. Fill in *YOUR\_TIMEZONE\_HERE* with an appropriate tz database format timezone, which you can find [here](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones).
4. Fill in *USERNAME* with your user account's username.
5. Save the file, naming it `docker-compose.yml`. 
6. Navigate to the deluge container folder where you saved docker-compose.yml.
	a. `cd docker/deluge`
7. Input the following command to start up the container for automatic installation.
	a. `docker-compose up -d`
8. Wait for the download and installation to finish.
9. Once complete, open a web browser and enter the server's IP address followed by port `8112`.
	a. In this example, that would be `http://localhost:8112`
10. The Deluge web UI should open. It will ask for a username and password.
	a. Input `admin` for *username* and `deluge` for *password*.
11. You will see your server's public IP address in the bottom right corner. Confirm this by checking it via a site such as [What's My IP?](https://www.whatsmyip.org/). My IP address is blurred for security reasons.

![deluge-1-1.jpg](/deluge-1-1.jpg)

12. The Deluge container is installed and ready for use. Please refer to the next document for setting up the connection via Gluetun.