---
title: Prerequisites and preparation
description: What you'll need to get started with Grav
published: true
date: 2024-04-03T14:18:08.544Z
tags: docker
editor: markdown
dateCreated: 2024-04-03T13:30:13.780Z
---

## Prerequisites

- A server, preferably running Debian, Ubuntu, or Alpine Linux.
- Docker and Docker Compose installed. (To avoid having to run all of your Docker commands with `sudo`, be sure to add your user to the `docker` group.)
- A text editor installed such as nano, vim, or VSCode over SSH.

## Preparation

1. Connect to your server running Docker.
2. Create a `docker` folder if you do not have one.
	1. `mkdir docker`
3. Create a `grav` folder inside the `docker` one you just made.
	1. `mkdir docker/grav`
4. Make a `config` folder inside the Grav directory.
	1. `mkdir docker/grav/config`

You do not need any additional preparation needed for this project. Please head over to the [Installing the Grav container](/docker/grav/install) document for the next steps.