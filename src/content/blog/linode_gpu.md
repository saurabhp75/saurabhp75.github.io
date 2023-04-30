---
title: "Linode GPU"
pubDatetime: 2022-09-23T15:22:00Z
tags: ["Linode"]
draft: false
description: "Introduction to Linode"
---

Reinforcement learning benefits from having large VRAM

### Cloud GPU providers

- AWS
- Azure
- GCP: Second cheapest, after Paperspace
- Paperspace: Cheapest but only one GPU per machine
- Linode: RTX6000 GPU, more tensor tflops, cheaper than Paperspace.

**Tensor Tflops**: Ability to process/train tensors

### GPU hardware

- Tesla V100: 112 Tensor Tflops
- RTX 6000: 130 Tensor Tflops

### Working on Linode

- You need to have **data storage VPS**(virtual private server). This should be in same region as the GPU.
  Then there is data preprocessing which should be on same VPS as data storage(at least on Linode).
  VPS are far cheaper than GPUs, the GPUs are billed per hour even if they are not used.

**Tip**: You should do all data preprocessing before training onb GPU server.

- On the data storage VPS create a volume
- Then run extfs command to create a dev
- mount the device to a folder(better put in /etc/fstab)
- Now download the dataset on the volume directly.
- Now create a GPU server, you can use stack scripts to setup the server.
- You shouldcreate the GPU server in the same region as data server.
- The cheapest server is $1000/month!!
- Linode GPU server are prorated at an hour, AWS is prorates at seconds.
- Now get the data from dataserver to GPU server, there are two methos.
- Method1(Secure copy from data server): scp -r src_foldername root@IP_ADD_DESTINATION:/dest_folder
- Method1(Secure copy from data server): scp -r src_filename root@IP_ADD_DESTINATION:/dest_folder
- Now train the model on data on GPU server.
- Method2(Attach the volume to the GPU server): First detach the volume from data server the attach to GPU server.
- Method2 is much faster.
- Attaching and detaching the volume, reboots the server.

### Stack(community) scripts on Linode:

- Installs development/production env and setup the machine.
- Installs python, CUDA drivers, Tensorflow, pytorch etc.
