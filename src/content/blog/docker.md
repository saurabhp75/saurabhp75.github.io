---
title: "Docker and k8s"
pubDatetime: 2022-09-23T15:22:00Z
tags: ["Docker", "Devops", "microservices"]
draft: false
description: "Introduction to Docker and Kubernets"
---

### Definition of DevOps

DevOps is a new term emerging from the collision of two major related trends. The first was also called “agile infrastructure” or “agile operations”; it sprang from applying Agile and Lean approaches to operations work.  
The second is a much expanded understanding of the value of collaboration between development and operations staff throughout all stages of the development lifecycle when creating and operating a service, and how important operations has become in our increasingly service-oriented world.

DevOps is a set of software development practices that combines software development with information technology operations to shorten the systems development life cycle while delivering features, fixes, and updates frequently in close alignment with business objectives.

### Microservices

The microservices architecture is a design approach to build a single application as a set of small services. Each service runs in its own process and communicates with other services through a well-defined interface using a lightweight mechanism, typically an HTTP-based application programming interface (API). Microservices are built around business capabilities; each service is scoped to a single purpose. You can use different frameworks or programming languages to write microservices and deploy them independently, as a single service, or as a group of services.

### Docker ecosystem consists of

- Docker image
- Docker hub
- Docker client
- Docker server
- Docker machine
- Docker compose

### Docker hierarchy

- Stack > Services > Container
- Services are defined in docker compose file
- Ports are exposed in Dockerfile, but mapped in Docker compose or command line

### Docker registery and repository

- Docker registery is a collection of repositories
- Docker repository is a collection of images similar to GitHub repo
- An account on registery(Dockerhub) can create many repositories
- The docker CLI uses Docker's public registery by default

**Note**: You can set your own private registery using docker trusted registery.

### Docker image and container

**Docker image**: Single file with all deps and config required to run a program.

### Docker installation using repo

### Image cache on host machine

Contains docker images previously downloaded from docker hub.

### Namespacing

Segmenting resources based on requesting process. Isolating resources per process or process group.

### Control groups (cgroups)

Limit amount of resources used per process.

**Docker Image**: fs snapshot + startup command.

**FS snapshot**: specific files and directories.

**Container**: Set of process which are assigned a grouping of specific resources.

### Create and run container from an image

```shell
$ docker run image_name [command]
```

### Run container in background(detached mode)

```shell
$ docker run -d image_name [command]
```

**Note**: The "command" provided, overrides the startup command.

### List currently running containers

```shell
$ docker ps
```

### List all containers ever created

```shell
$ docker ps --all
```

### Container lifecycle

Docker run = Docker create + Docker start

```shell
$ docker create image_name
$ docker start -a container_id
```

**Note**: "- a" attaches docker to container and prints it's output to console.

### Attaching docker cli to running container

```shell
$ docker attach containerid
```

### Restart a stopped container

```shell
$ docker start -a container_name
```

**Note**: Stopped container takes host resources.

### Remove stopped containers

```shell
$ docker system prune
```

**Note**: This will also remove all images downloaded from docker hub.

### Retrieving log output

```shell
$ docker logs container_id
```

**Note**: above command can retrieve logs from stopped containers.

### Stopping a container

```shell
$ docker stop container_id
$ docker kill container_id
```

**Note**: stop(sigterm) allows graceful exit, kill(sigkill) stops the container abruptly.

### Multicommand containers

```shell
$ docker exec -it container_id command
```

**Note**: "it" interactive mode.

### Executing command in running containers by getting a shell

```shell
$ docker exec -it container_id sh
```

### Below command will give shell but override the default startup

```shell
$ docker run -it docker_image sh
```

### Workflow for creating docker image:

Create file, Dockerfile, which specify following.

- specify base image. FROM
- WORKDIR /use/app
- COPY ./ ./
- install more apps. RUN
- specify startup command. CMD

```shell
$ docker build .
```

**Note**: Here '.' is build context.

```shell
$ docker build -f Dockerfile.dev .
```

**Important**: Docker builds with cache, so add the changes at the bottom for the cache to take effect.

### Tagging an image

```shell
$ docker build -t saurabhp75/redis:latest .
$ docker tag
```

### Publishing an image

```shell
$ docker push
```

**Note**: In the command above:

- saurabhp75: dockerid
- redis: repo/project
- latest: version(tag)

### Manually Creating image from running container

- Run container using -it and sh.
- Install packages
- `$ docker commit -c 'CMD["redis-server"]' container_id`

### Basic docker workflow

- Develop (web) app
- Create Dockerfile
- Create image from Dockerfile
- Run image as container
- Connect to webapp from browser

### Container port mapping

- Required for incoming request.
- IMP: not done in Dockerfile.
- Can be done in docker compose config file or from command line.
- specified while running container.

```shell
$ docker run -p 8080:8080 image_name
```

### Specifying a working directory(for COPY)

- WORKDIR /use/app

**Note**: Any command following will be executed relative to this path in container.

**Note**: The order of commands in Dockerfile is important. Generally we should segment copy in Dockerfile, so that only the commands below the modified state are executed. Ie better use of caches.

### Docker compose

- Used to start multiple containers at the same time.
- Also simplifies long winded arguments passed when using docker run.
- Config file `docker-compose.yml`.

### Docker-compose commands:

### Specifying environment variables in docker compose config file

```yaml
environment:
  - REDIS_HOST=redis-server
```

### Run services specified in docker compose file

Similar to $ docker run image

```shell
$ docker-compose up
```

### To run services in background

```shell
$ docker-compose up -d
```

### Rebuild images and run services

```shell
$ docker-compose up --build
```

### Above is similar to

```shell
$ docker build .
$ docker run image
```

## Stopping docker-compose containers

```shell
$ docker-compose down
```

### Container maintenance with docker compose file

- Restarting crashed container.

```yaml
restart: always/"no"/on-failure/unless-stopped
```

### To see status of running services

```shell
$ docker-compose ps
```

**Note**: Above command should be run from the directory containing `docker-compose.yml` file

### Docker in production environment

Workflow:

- Two branches in GitHub repo, feature and master.
- Work on feature branch.
- Issue pull request to master branch and merge.
- On pull request Travis CI will merge(locally) and run test and merge in master if test are successful and later deploy.
- Above workflow is simplified using docker.

### Project generator

- node version 8.11.3
- New method: Just run `$ npx create-react-app appname`
- older way: First run `$ npm install -g create-react-app`
- Then run `$ create-react-app client`

### Run only in dev env. Runs on Dev server. For development use only

```shell
$ npm run start
```

### To run test

```shell
$ npm run test
```

### Build production version of app

```shell
$ npm run build
```

### Docker volumes

Maps host directory to container directory.

```shell
$ docker run -v $(pwd):/app imageid
```

### bookmarking volumes

```shell
$ docker run -v /app/node_modules -v $(pwd):/app imageid
```

**Note**: Here `/app/node_modules` folder in container should not be mapped to any host folder.

### Volumes In docker-compose.yml

```yaml
volumes:
  - app/node_modules
  - .:/app
```

### Build In docker-compose.yml

```yaml
build:
  context: .
  dockerfile: Dockerfile.dev
```

### Startup command in docker-compose.yml

```yaml
command: ["npm", "run", "start"]
```

### Multistep docker builds

- step 1: Output build folder using a base image
- step 2: Serve build folder using nginx and another base image.

### Specifying phases in Dockerfile

```yaml
FROM node:alpine as builder
```

`.travis.yml` file:

```yaml
sudo: required
services:
  - docker

before_install:
   - docker build -t TEST -f Dockerfile.dev .
script:

deploy:
  provider: elasticbeanstalk
  access_key_id:
    secure: "Encrypted <access-key-id>="
  secret_access_key:
    secure: "Encypted <secret-access-key>=" region: "us-east-1"
app: "example-app-name"
env: "example-app-environment" bucket_name: "the-target-S3-bucket"
```

To run tests and exit, as Travis expects the tests to exit, do the following.

```shell
$ docker run image_name npm run test -- --coverage
```

### AWS Elastic beanstalk

- Most appropriate for running one docker container at a time. We can also run multiple copies of same container.
- In the course Stephen deployed multiple different containers on elastic beanstalk??
- EB automatically creates a load balancer and can spawn docker instances when needed.
- EB automatically scales the app for us.
- For port mapping in EB, use" EXPOSE 80" in Dockerfile.

### To push images to dockerhub from Travis config file

**Note**: This is generally done under `after_success`. First login to dockerhub then push the imageid/tagname

```yaml
- echo DOCKER_PASSWORD | docker login -u "$DOCKER_ID" --password-stdin
- docker push tagname
```

**Note**: When we push a single Dockerfile to elastic beanstalk, it automatically builds the image and run the docker container. For running multiple containers EB used ECS (elastic container service).ECS has task definitions which tells how to run each service.

`dockerrun.aws.json` is similar to docker compose file. But here we don't build images, rather we download from docker hub. Also, services are called container definition.

Task definitions are defined in `Dockerrun.aws.json` file.

```json
{
  name:
  image: image in docker hub
  hostname: service name in docker compose
  essential: true/false
memory: 128
portMappings: [ ]
links: [ ]
  }
```

### Running databases inside containers

We generally don't run dB in containers. Easy to scale, built in logging and maintenance, better security, automated backups and rollback, easy to migrate away from elastic beanstalk and use some other service.

Redis > AWS (EC) ElastiCache
Postgres > AWS RDS (relational database service).

AWS regions = Data centres.

### AWS VPC (Virtual private cloud)

Each AWS user has his own VPC. All service instance are inside his own VPC cloud which ensures privacy and security.
A user has one vpc per region.

### Security group(firewall rules).

Defines inbound and outbound traffic on VPC. It is used to connect multiple AWS instances in a VPC. For eg. a redis dB and EB container.

**Note**: Docker compose is generally used in development environment.

### What is Kubernetes aka k8s?

System for running many different containers over multiple different machines.

### Why use Kubernetes.

When you need to run many different containers with different images.

If an app has one type of container then Kubernetes is not needed.

### Kubernetes:

A **cluster** consisting of one **master** and one or more **nodes** (VMs/physical machine). Master controls what each node runs.

### Minikube(used in development)

- Used to setup kubernetes cluster on your local machine.
- Used only in development.
- Used to manage/create VMs/node on local machine.

### Managed solutions (used in production) :

- EKS(elastic container service for kubernetes) by AWS,
- GKE(Google kubernetes engine) by google.

**Kubectl**: used to manage containers in the node/VM. Used both in development and production. kubectl interacts with master in the cluster.

### Sanity commands

```shell
$ minikube status
$ kubectl cluster-info
```

`$ minikube start` creates a VM/node on your local machine.

### To get IP of VM

```shell
$ minikube ip
```

**Note**: Each pod also has an IP address but it is not easily Accessible from outside. Updating a pod may change its IP address, therefore we have service objects which has a selector property which connects with the pod. The user access the pod through service object.

### Docker Vs Kubernetes

- In Docker we can build images using Dockerfile, whereas in Kubernetes images are expected to be prebuilt.
- In Docker networking between containers is easy by using docker compose. In Kubernetes networking has to be done manually.

### Kubernetes config files

- `client-pod.yaml`
- `client-node-port.yaml`

We feed the two config files to kubectl. Which creates objects from them.

```shell
$ kubectl apply -f filename
```

**Note**: If filename is a directory, then all the files in the directory will be applied.

### To get status of pods

```shell
$ kubectl get pods
```

### To get status of services

```shell
$ kubectl get services
```

### Objects in k8s

In k8s we define **object** instead of containers.

### Types of objects

- **StatefulSet**
- **ReplicaController**
- **Pod**: used to run a container, it's a grouping of similar containers. It's smallest unit of deployment.
- **Service**: used to setup networking.
- **Deployment**
- **Pod**: smallest unit for deployment in k8s.
- **Secrets**: normally used to store passwords.

**Note**: We create secret Object using an imperative command instead of config file due to security reasons.
Node>pod>containers

### Types of services

- **ClusterIP**: IP address to be used within the cluster.
- **NodePort**: exposes container to outside world. Used only in development, with exceptions. It's between 30000 - 32767
- **Load balancer**: Not used directly now
- **Ingress**: Preferred over Load balancer. It automatically creates Load balance.

Every node in k8s cluster has a **kube-proxy**. Which is one single window to outside world.

### k8s development workflow

### Imperative Vs Declarative deployment

- Declarative is used in production environment.
- Just change the config file and feed to kubectl.
- We cannot change everything in a Node using this(pod) approach, only few things like image name. But not containers, name and port.
- But we can change them using deployment object.

Name and kind in config file uniquely identifies an object in k8s. This helps in deciding whether to update or create an object.

### To get detailed info about an object

```shell
$ kubectl describe obj-type [obj-name]
```

### Deployment Vs pod Objects

### Pods

- Run a single set of tightly coupled containers.
- Good for one off deployment.
- Rarely used directly in production. Deployment are used instead.

### Deployment

- Runs a set of one or more identical pods.
- Monitors the state of each pods and updating as required.
- Good for both development and production.
- Deployment uses pod template.

### To delete an object

```shell
$ kubectl delete -f config file
```

### To get status of deployments

```shell
$ kubectl get deployments
```

To get the deployment to recreate the pods with latest updated version of docker image is a bit complex. (Kubernetes `issue#33664`). Because the latest image has no tag , so there is no change in deployment config file. The accepted solution is to use an imperative command to update the image version(a unique tag) the deployment should use.

```shell
$ kubectl set image object-type / object-name container-name = image-to-use
```

**Description**: Set image property on an object.

### To make the docker cli to communicate to docker server in a VM/node

```shell
$ eval $(minikube docker env)
```

**Note**: this only configures your current terminal window. It can be used to alter the containers in a VM/node.

### NodePort Vs ClusterIP services

- **ClusterIP**: Exposes a set of pods to other objects in the cluster.
- **NodePort**: Exposes a set of pods to the outside world (only good for development purpose).

**PVC**: persistent volume claim.

PVC>PV>Volume.

### Volume (generic container)

Some sort of mechanism which allows a container to access filesystem outside of itself.

### Volume (k8s)

An object that allows a container to store data at pod level.

### Volume Vs persistent volume(PV)

Volume's lifecycle is tied to that of pod. Persistent volume outlasts the kid's lifecycle.

### PV Vs PVC

PVC consists of:

- Statically provisioned PV.
- Dynamically provisioned PV.

### PV access modes

- **ReadWriteOnce**: can be used by single node.
- **ReadMany**: many nodes can read.
- **ReadWriteMany**: many nodes can read write.

### Storage classes for PVs

- **GCP**: Persistent disk.
- **AWS**: Block store.

### Creating a secret Object

```shell
$ kubectl create secret generic secrrt-na me --from-literal key=value
```

### Ingress-nginx(community/k8s led)

- We'll use this.
- Setup is different on AWS and GCP.
- We'll configure ingress on GCP.

### Kubernetes-ingress(led by nginx)

### How to login to GCP from Travis

- create s service account in GCP.
- Download the credentials Jason file to local machine.
- Install Travis CLI on local machine.
- `$ travis encrypt-file json-file -r saurabhp75/repo-name`

### Helm, Tiller(package manager for GCP)

### RBAC(Role based access control)

### local development using skaffold
