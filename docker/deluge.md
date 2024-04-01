---
title: Deluge VPN
description: One of several BitTorrent clients but masked behind a VPN
published: true
date: 2024-04-01T17:14:23.667Z
tags: docker
editor: markdown
dateCreated: 2023-06-19T00:46:35.768Z
---

# Project scope

This document describes how to create a Deluge Docker container with traffic that routes through the Gluetun VPN tunnel described in the [Gluetun VPN tunnel](/docker/gluetun) document. This will also show you how to have Deluge download files to a NAS via an SMB share.

## Background
  
**[Overview](/docker/deluge/overview):** This section goes over the background and what to expect from this project.  


## Getting ready
  
**[Prerequisites and preparation](/docker/deluge/prereq-prep):** This section addresses what you need to get started with installing the Deluge container, including a limitation with this project.

## Installation

**[Installing the Deluge container](/docker/deluge/install):** Here's the first part of what you'll need to get a Deluge container up and running. Start here if you want one unprotected and attached to network storage.
  
**[Configuring the Deluge VPN](/docker/deluge/config-vpn):** This document outlines what you need to do to hook up Deluge to the Gluetun VPN tunnel. If you haven't built your Gluetun container and tunnel yet, please go do that now.