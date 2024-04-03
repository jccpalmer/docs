---
title: Installing the Grav container
description: Here's how to install Grav
published: true
date: 2024-04-03T14:36:15.792Z
tags: docker
editor: markdown
dateCreated: 2024-04-03T13:32:07.848Z
---

## Installation

We'll be using Docker Compose for this installation, so in your terminal, head over to the Grav directory you created in the [Prerequistes and preparation](/docker/grav/rereq-prep) document. I'll be using `nano` below, so if you're using a different text editor, substitute in your commands appropriately.

1. Create a new `docker-compose.yml` file in the root of the Grav directory, which in this example is `~/docker/grav`.
	1. `nano docker-compose.yml`
2. Copy the following code and fill in it appropriately.

	```
		---
		version: "2.1"
		services:
		  grav:
		    image: lscr.io/linuxserver/grav:latest
		    container_name: grav
		    environment:
		      - PUID=1000
		      - PGID=1000
		      - TZ=YOUR_TIMEZONE_HERE
		    volumes:
		      - /home/USERNAME/docker/grav/config:/config
		    ports:
		      - 8080:80
		    restart: unless-stopped
		   	

3. For *YOUR_TIMEZONE_HERE*, fill in your timezone with the appropriate tz code for where you live. You can find the codes [listed on Wikipedia](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones).
4. For *USERNAME*, fill it in with your user account's username.
5. Save the file.
6. While still in the Grav directory (where the new `docker-compose.yml` file is now saved), start up the Grav container.
	1. `docker compose up -d`
7. Wait for the container to download its resources and for the installation to finish.
8. In your web browser, navigate to the new URL using the container's port number. You'll need to know your server's IP address for this step.
	1. `http://localhost:8080`
9. The Grav admin panel should open and ask you to create an admin account. Follow the steps to do so and to start setting up your website.