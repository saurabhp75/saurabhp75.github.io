---
title: "Networkx"
pubDatetime: 2022-09-23T15:22:00Z
tags: ["Networkx"]
draft: true
description: "Introduction to Networkx"
---

Network :

useful for modelling relationships between entities.

by modelling data as a network we gain an insight into

insights :

important entities : what nodes are important. ie broadcasters or influencers.
pathfinding : we can optimize transportation between cities.
clustering : levereage nw structure to find communitiies (clustering) within a nw.

nw structure (graph) :
nodes
edges

Note : node and edges can have metadata associated with them.

networkX (python library)

to manipulate, analyse and model graph data.

####

```
import networkx as nx

g = nx.graph()

g.add_nodes_from([1,2,3])

g.nodes()

g.add_edge(1,2) # add egde bewteen 1 and 2.

g.edges() # shows list of edges(tuple of nodes forming edge)

[(1,2)]
```

#Adding a metadata to node

`g.node[1]['label'] = 'blue'`
