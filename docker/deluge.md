---
title: Deluge VPN
description: One of many BitTorrent client options to choose from
published: true
date: 2024-04-01T16:47:31.329Z
tags: docker
editor: markdown
dateCreated: 2023-06-19T00:46:35.768Z
---

# Project scope

This document describes how to create a Deluge Docker container with traffic that routes through the Gluetun VPN tunnel described in the [Gluetun VPN tunnel](/docker/gluetun) document. This will also show how to have Deluge download files to a NAS via an SMB share.

Please click the dropdowns below to access the section you need.

<details><summary>Overview</summary>
  
**[Overview](/docker/deluge/overview):** This section goes over the background and what to expect from this project.  
</details>

<details><summary>Prerequisites and preparation</summary>
  
**[Prerequisites and preparation](/docker/deluge/prereq-prep):** This section addresses what you need to get started with installing the Deluge container, including a limitation with this project.  
</details>

<details><summary>Installing the Deluge container</summary>
  
## Project steps
  
Below are the steps to get the Deluge container installed. You will be adjusting this later, but this section is to help you get going. The full page version is available [here](/docker/deluge/install).

1. Create a YAML file named `docker-compose.yml` in your text editor or IDE of your choice and save it to the directory created in Step 1 in [Preparation](/docker/deluge/prereq-prep). 
    a. In this example, the file is saved under `~/docker/deluge`.
2. Copy the following code into the blank file. 
  
<details>
  <summary>Docker Compose</summary>
  
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

12. The Deluge container is installed and ready for use if you don't want it masked behind a VPN. Assuming that you do, open your terminal to the Deluge directory and type the following.
  	1. `docker-compose down`
  	2. This will stop the Deluge container so that you can start Gluetun on port `8112`.
13. Head over to the [Gluetun instructions](/docker/gluetun) to learn how to set up the VPN tunnel and start it before proceeding to the next Deluge section.
  
</details>

<details><summary>Configuring the Deluge VPN</summary>
  
## Project steps

Below are the steps necessary to set up Deluge to connect through the Gluetun VPN tunnel. The full page version is available here.

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
  
</details>

<details><summary>Optional: Using Portainer for installation</summary>
  
  *Using Portainer for installation:** In this optional section, I'll walk you through how to do this process in the Portainer GUI application.
  
</details>

<details><summary>Optional: Using the thin client application</summary>
  
  **Using the thin client application:** This optional section briefly goes over how to use the Deluge desktop application as a thin client.
  
</details>