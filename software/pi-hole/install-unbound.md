---
title: Installing Unbound
description: 
published: true
date: 2023-06-21T13:19:58.220Z
tags: software, pi-hole, ads
editor: markdown
dateCreated: 2023-06-21T11:13:34.457Z
---

1. Open a terminal on the machine where you installed Pi-Hole, be it locally or over SSH.
2. For Debian-based distros, input the following command.
	1. `sudo apt install unbound`
3. After the installation completes, you will need to set up the config file for Pi-Hole. To do so, open the following file in your command line text editor, such as nano.
	1. `/etc/unbound/unbound.conf.d/pi-hole.conf`
4. Copy the following contents into the blank file.
<details>
  <summary>Unbound config</summary>
<br>
		```
      server:
      # If no logfile is specified, syslog is used
      # logfile: "/var/log/unbound/unbound.log"
      verbosity: 0

      interface: 127.0.0.1
      port: 5335
      do-ip4: yes
      do-udp: yes
      do-tcp: yes

      # May be set to yes if you have IPv6 connectivity
      do-ip6: no

      # You want to leave this to no unless you have *native* IPv6. With 6to4 and
      # Terredo tunnels your web browser should favor IPv4 for the same reasons
      prefer-ip6: no

      # Use this only when you downloaded the list of primary root servers!
      # If you use the default dns-root-data package, unbound will find it automatically
      #root-hints: "/var/lib/unbound/root.hints"

      # Trust glue only if it is within the server's authority
      harden-glue: yes

      # Require DNSSEC data for trust-anchored zones, if such data is absent, the zone becomes BOGUS
      harden-dnssec-stripped: yes

      # Don't use Capitalization randomization as it known to cause DNSSEC issues sometimes
      # see https://discourse.pi-hole.net/t/unbound-stubby-or-dnscrypt-proxy/9378 for further details
      use-caps-for-id: no

      # Reduce EDNS reassembly buffer size.
      # IP fragmentation is unreliable on the Internet today, and can cause
      # transmission failures when large DNS messages are sent via UDP. Even
      # when fragmentation does work, it may not be secure; it is theoretically
      # possible to spoof parts of a fragmented DNS message, without easy
      # detection at the receiving end. Recently, there was an excellent study
      # by Axel Koolhaas, and Tjeerd Slokker (https://indico.dns-oarc.net/event/36/contributions/776/)
      # in collaboration with NLnet Labs explored DNS using real world data from the
      # the RIPE Atlas probes and the researchers suggested different values for
      # IPv4 and IPv6 and in different scenarios. They advise that servers should
      # be configured to limit DNS messages sent over UDP to a size that will not
      # trigger fragmentation on typical network links. DNS servers can switch
      # from UDP to TCP when a DNS response is too big to fit in this limited
      # buffer size. This value has also been suggested in DNS Flag Day 2020.
      edns-buffer-size: 1232

      # Perform prefetching of close to expired message cache entries
      # This only applies to domains that have been frequently queried
      prefetch: yes

      # One thread should be sufficient, can be increased on beefy machines. In reality for most users running on small networks or on a single machine, it should be unnecessary to seek performance enhancement by increasing num-threads above 1.
      num-threads: 1

      # Ensure kernel buffer is large enough to not lose messages in traffic spikes
      so-rcvbuf: 1m

      # Ensure privacy of local IP ranges
      private-address: 192.168.0.0/16
      private-address: 169.254.0.0/16
      private-address: 172.16.0.0/12
      private-address: 10.0.0.0/8
      private-address: fd00::/8
      private-address: fe80::/10
		```
  
</details>

5. 	Restart Unbound with the following command.
	1. `sudo service unbound restart`
6.  Open the Pi-Hole web interface, then go to **Settings** > **DNS** > **Upstream DNS servers**.
7. Ensure that none of the third-party options are selected.
8. Click the checkbox for **Custom 1 (IPV4)**, then in the text box, enter the following. (This is telling Pi-Hole to listen on the localhost at port `5335`, which is where the above config file told Unbound to broadcast to.)
	1. `127.0.0.1#5335`
9. Make sure your settings match the below image.
		![pi-hole-unbound.png](/pi-hole-unbound.png)
10. Scroll down to the bottom of the page and click **Save**.

### Resolving the resolvconf.conf errors

If you're using a Debian-based distro for this, you might encounter a conflict with Unbound's resolver and the system's resolvconf service. This can interfere with Pi-Hole/Unbound, so here's how to fix that issue.

1. First check to see if the conflict is an issue. Type in the following command on the machine where you installed Pi-Hole (locally or over SSH).
	1. `systemctl is-active unbound-resolvconf.service`
2. If the output of the above command is `active`, then stop the service with the following command.
	1. `sudo systemctl disable --now unbound-resolvconf.service`
3. The next step is to disable the file resolvconf_resolvers.conf. To do so, input the following commands.
	1. `sudo sed -Ei 's/^unbound_conf=/#unbound_conf=/' /etc/resolvconf.conf`
	2. `sudo rm /etc/unbound/unbound.conf.d/resolvconf_resolvers.conf`
4. Finally, restart Unbound with the following command.
	1. `sudo service unbound restart`