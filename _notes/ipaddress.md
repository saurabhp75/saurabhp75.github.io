---
layout: single
title: "IP Address and CIDR"
excerpt: "Intro to IP Addresses"
---

Host address all 0: NW address.
Host address all 1: (directed) broadcast address.

A valid host IP address should not have all bits as 0s.

**Loopback address**: 127.x.x.x

### Classes of IP address(RFC 791)

### Class A
- 8 bit nw address (0....), 
- 127 networks 2^7, 0-126
- 127 is loopback address.
- 16.7 million host 2^24 - 2, 

### Class B
- 16 bit nw address(10....),
- 2^14=16384 networks
- network address,. 128.0 to 191.255
- 65000 host 2^16-2

### Class C
- 24 bit nw address(110.....), 
- 192.0.0 to 223.225.225, 
- 2^21=20,97,152 networks
- 254 host 2^8-2

### Class D
- NW address (1110....)
- multicast address
- used in video streaming and broadcast applications.
- 224.0.0.0 to 239.255.255.255
- there is no distinction of public or private IP.

### Class E
- NW address (1111...)
- Experimental address
- 240.0.0.0 to 255.255.255.255


### Private IP address space(RFC 1918)
- defines addresses which will be private to an organisation and will connect to internet via gateway.
- class A: 10.0.0.0 to 10.255.255.255
- class B: 172.16.0.0 to 172.31.255.255
- class C: 192.168.0.0 to 198.168.255.255
- private IP -> NAT-> Public IP
- NAT happen at gateway.

### Subnetting:
- Routing happen in layer 3, network layer.
- routing based on IP address.
- network mask: to get network address from IP address.
- in class based IP addressing scheme, ne mask is defined by address class.
- in subnetting we manually specify subnet mask.

### Why subnetting:
- efficient use of IP address.
- facilitate heirarchical network: subnets of subnets.
- allows for address summarisation.

**Subnet bits**: borrowed from host address bits.

### Questions to ask when subnetting:
- what is sub-network ID.
- what is usable host ID ranges.
- what is broadcast address.
- what is next sub-network ID.

### Note: 
- 1st host address= subnet Id + 1
- Last host= next sub-network Id -2
- Broadcast address= next sub-network Id - 1

**Subnet increment**: the value by which the next sub-network I'd increase. This value is the "binary weight" of last(lsb)subnet bit.

### IP routing table:
- all the networks the router is connected to.
- all the networks the device has learnt from dynamic routing protocols like ospf, eigrp or static routes.

### Powers of 2:
- 2^4 = 16
- 2^5 = 32
- 2^6 = 64
- 2^7 = 128
- 2^8 = 256