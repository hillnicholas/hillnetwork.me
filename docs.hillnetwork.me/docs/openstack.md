# Overview
I have always been intrigued by the software that runs large-scale IaaS operations. The Openstack project has recently become a strong interest of mine, and I've been been studying various configurations, setups and deployments for it. This section will describe the various builds that I've done in the past.

## Build 0: DevStack on Ubuntu
This was my first Openstack "deployment". It was extremely straightforward. All I had to do was clone the git repository and run the setup script, which took a really long time to run. This gave me some insight on how massive and complex the project really is. The biggest issue I had with this build was that it wasn't persistent, and I hadn't really learned anything about the underlying infrastructure since the playbooks configured the entire system automatically.

## Build 1: Conjure-Up with Juju on Ubuntu + LXD
This build was also generally very simple to set up automatically. This time, the orchestration was performed by Juju, and provided some options that could be custom configured. I followed the process available on Ubuntu's documentation page for [installing Openstack on localhost](https://www.ubuntu.com/download/cloud/try-openstack).

## Build 2: Conjure-Up with Juju on Ubuntu Production Cluster
This build utilized juju for the orchestration and relied on MAAS to manage the bare metal. At the time, I had a Dell R900 with 128GB of RAM and 4 quad-core xeons, so emulating the minimal requirements with virtual machines was very doable. PXE was a little difficult because of how the virtual NICs were implemented, because any direct communications between the KVM host and the guest on a bridged connection had to be done on a separate virtual network. Just as I had the virtual "bare metal" infrastructure configured, I ended up selling the server.

# Build 3: Openstack over Site-to-Site VPN with VMware ESXi and KVM on OpenSUSE Leap
This is my most recent project for the summer. This time, I will not be using playbooks to configure services. I've decided to do this to get a stronger understanding of how each Openstack component works and interacts with the other components. I'm also trying to learn about datacenter networking and IPSec tunnels, hence why I'm also building a site-to-site VPN.

### The Services
As far as Openstack services go, this will be a minimal deployment, running only the following services:

 * Identity Service (Keystone)
 * Image Service (Glance)
 * Networking Service (Neutron)
 * Compute Service (Nova)
 * Dashboard Service (Horizon)
 * Block Storage Service (Cinder)


### The Network
The network will consist of two main isolated subnets, connected to each other over IPsec. Their network access to the outside world will come from PFSense routers, which will prevent any outbound traffic going to the residential LAN that the isolated networks are contained in. 

### The Architecture
The following is a diagram for the proposed system:
<img src="/img/cloud.png">

### To-do List

Service | Completed | Address | Site | Access
---- | ---- | ---- | ---- | ---- 
IPSec VPN Server | <span style="color: green;"> yes </span> | 52.53.197.197 | AWS | SSH
Morgantown Isolated Network | <span style="color: green;"> yes </span> | 172.16.4.0/24 | Morgantown | IPsec 
Roadwarrior Network | <span style="color: green;"> yes </span> | 172.16.5.0/24 | Morgantown | IPsec 
Frederick Isolated Network | <span style="color: orange;"> in progress </span> | 172.16.6.0/24 | Frederick | IPsec
Server0 Hypervisor (ESXi) | <span style="color: green;"> yes </span> | 192.168.2.101 | Morgantown | HTTPS 
Server1 Hypervisor (KVM)  | <span style="color: orange;"> in progress </span> | 192.168.2.102 (temp) | Frederick | SSH
Frederick Management Gateway | <span style="color: green;"> yes </span> | 172.16.5.4 | Frederick | HTTPS 
Morgantown Management Gateway | <span style="color: green;"> yes </span> | 172.16.5.5 | Morgantown | HTTPS 
Server0 Gateway | <span style="color: green;"> yes </span> | 172.16.4.1 | Morgantown | HTTPS 
DNS Server | <span style="color: green;"> yes </span> | 172.16.4.2 | Morgantown | SSH
Identity Service | <span style="color: orange;"> in progress </span> | 172.16.4.3 | Morgantown | n/a
Image Service | <span style="color: red;"> no </span> | 172.16.4.4 | Morgantown | n/a
Networking Service | <span style="color: red;"> no </span> | 172.16.4.5 | Morgantown | n/a
Dashboard Service | <span style="color: red;"> no </span> | 172.16.4.6 | Morgantown | n/a
Compute Service | <span style="color: red;"> no </span> | 172.16.4.7 | Morgantown | n/a
Block Storage Service | <span style="color: red;"> no </span> | 172.16.4.8 | Morgantown | n/a


