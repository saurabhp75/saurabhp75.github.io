---
title: "Big Data and Hadoop"
pubDatetime: 2022-09-23T15:22:00Z
tags: ["Big Data", "Hadoop"]
draft: false
description: "Intro to Big Data and Hadoop"
---

### Big data Hadoop

**HDFS**: Hadoop distributed file system

**YARN**: Yet another resource negotiator. sits on top of mapreduce.

- Manages the resources on hadoop cluster.

**Mapreduce**: Programming metaphore/model that allows you to distribute the data processing over a cluster. It consists of **mappers** and **reducers**.

**Note**:

- Mappers transform the data in parallel across the cluster and reducers aggregate the data together.

- Earlier mapreduce and yarn were a single module.

**Pig**: A SQL style scripting, can be used in place of Java and Python. It sits on top of mapreduce.

**Hive**: Just like pig, it sits over mapreduce and is very similar to SQL db.

**Apache Ambari**: Web view of the Hadoop cluster.

**Ambari alternatives**: Cloudera, MapR etc.

**Mesos**: A yarn alternative.

**Spark**: Sits at the same level as mapreduce.

**Tez**: Used in conjunction with Hive. Works on directed acyclic graph, similar to spark.

**HBASE**: Exposes the data on cluster to transactional platforms. HBASE is a nosql db, a columnar datastore.

**Apache storm**: A way of processing streaming data ie from sensors or weblogs, it is similar to spark streaming.

**OOzie**: A way to schedule jobs on the cluster.

**Zookeeper**: A tech for coordinating everything on your cluster, ie which nodes are up or down, keeping track of which node is master.

### Data ingestion:

- **sqoop**: Ties the cluster to relational db.

- **Flume**: Transfers weblogs to the cluster.

- **Kafka**: General purpose data ingestion for hadoop cluster.

### External data store:

- Cassandra
- Mongodb
- MySQL

**Note**: Cassandra/Mongodb sits between real time app and hadoop cluster.

### Query Engines(Hive is built into hadoop)

- Apache Drill: SQL like queries
- Hue: Similar to Amabari
- Apache pheonix: Similar to Drill
- Presto
- Apache Zeppelin: Notebook style interface.

### HDFS

- Used for handling veey large files across a cluster.
- Breaks down large files into smaller blocks(eg 128MB) on different computers/node.
- Each node can parallely process the data.
- More than one copy of a block is stored accross nodes for better resilience.

### HDFS Architecture

- Name node and Data nodes.
- Name node keeps track of where all the blocks of data are stored. Also keeps edit log.
- Data nodes: Talks to client applications.
- Data nodes communicate with each other to keep data blocks in sync.

### Reading a file

- Client appp first inetract with name node for data.
- Name node them tells the clients app about which data nodes conatins the requested data.

### Writing a file

- If a client app wants to create a new file. It will contact name node.
- Name node will respond with list of data nodes to be used.
- The app will contact a single data node with the data.
- The data node will talk to other data nodes to replicate the data.
- The data node will then inform the status to client app which will then send the info to name node.

### Handling failure of Name node

- Backup the dat and metadata(edit log) on local storage or NFS.
- Secondary name node: maintains a merged copy of edit log yoou can restore from.

### HDFS Federation

- Scale beyond a single name node.
- Each namenode manages a specific namespace volume.
- Used when there are large number of small files.
- Also helps in resilience.

### HDFS high availability

- Prevents downtime on cluster in case of failure.
- Previous approaches lead to small downtime.
- Hot standby namenode using shared edit log(which is outside of cluster?).
- Hot standby namenode can takeover right after the namenode failure.
- There is no downtime unlike earlier methods.
- Zookeeper tracks active namenode.
- Uses extreme measures to ensure only one namenode is used at a time.

### Using HDFS

- Ambari Web UI.
- CLI.
- HTTP/HDFS proxies.
- Java interface.
- NFS gateway.
