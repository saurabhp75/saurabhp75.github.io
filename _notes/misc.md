---
layout: single
title: "Miscellaneous"
excerpt: "Miscellaneous Notes"

sidebar:
  - title: "Miscellaneous"
    text: "Python 3.x, Django 2.x, PythonAnywhere.com"
---

## To search recursively (including some filetypes)
grep -r --include "*.txt" texthere .

## To search recursively (excluding some filetypes)
grep -r --exclude "*.txt" texthere .


## To change only directory permissions recursively :
find . -type d -exec chmod 755 {} \;


## To change only file permissions recursively :
find . -type f -exec chmod 644 {} \;


## To search for a string recursively in directories :
grep -r "string" .

## To list only directories
ls -l | grep '^d'


## To selectivey download folder from github:
url     : https://github.com/ParrotPrediction/docker-course-xgboost/tree/master/notebooks notebooks
command : svn export https://github.com/ParrotPrediction/docker-course-xgboost/trunk/notebooks notebooks


url     : https://github.com/CoreyMSchafer/code_snippets/tree/master/Python/Flask_Blog
command : svn export https://github.com/CoreyMSchafer/code_snippets/trunk/Flask_Blog corey_flask 


## pandas get_dummies : 
pd.get_dummies(train, columns = ['Month', 'DayofMonth', 'DayOfWeek', 'UniqueCarrier'], drop_first = True)


## To see laptop infirmation :
sudo dmidecode | grep -A 9 "System Information"


## to update conda
conda update conda
conda update anaconda

## to see all jupyetrlab installed extensions
jupyter labextension list


## dash installation
conda create -n env-dash python

conda install -n env-dash dash==0.21.1
conda install -n env-dash -c conda-forge dash==0.21.1

conda install -n env-dash dash-renderer==0.13.0
conda install -n env-dash -c conda-forge dash-renderer==0.13.0

conda install -n env-dash dash-html-components==0.11.0
conda install -n env-dash -c conda-forge dash-html-components==0.11.0

conda install -n env-dash dash-core-components==0.23.0
conda install -n env-dash -c conda-forge dash-core-components==0.23.0

conda update -n env-dash myenv -c conda-forge plotly



## to remove a certain file type/extension recursively in folders 
find . -name "*.mp4" -type f -delete



## packages installed for chloropleth
pip install shapely==1.6.3
pip install pyshp==1.2.10
pip install geopandas==0.3.0


## jupyter rate limit ####
jupyter notebook --NotebookApp.iopub_data_rate_limit=10000000000

https://gis.stackexchange.com/questions/293326/how-to-automate-topology-check-fix-in-qgis


## if you are using two different github accounts. Use seperate ssh keys.

- Create a new key for each github a/c using command below. This will create keys in "~/.ssh/id_rsa_ytechlabs"
  file.

  $ ssh-keygen -t rsa -C "contact@ytechlabs.com"

- Add the keys in ssh using command below. 

  $ ssh-add ~/.ssh/id_rsa_ytechlabs

- Delete all cached keys before using command below.
  $ ssh-add -D

- Check your saved keys using command below.
  $ ssh-add -l

- Important:  you need to add the generated ssh public key (.pub)to github account also.

- Add following lines in "~/.ssh/config". This create ssh alias, which should be used when cloning a repo.
  Otherwise you have to change the [remote "origin"]/url field  in ".git/config" the after cloning. 

  #personal account
  Host github.com-saurabhp75  # ssh alias
   	HostName github.com
	User git
	IdentityFile ~/.ssh/id_rsa
        IdentitiesOnly yes

  #org account
  Host github.com-ytechlabs # ssh alias
	HostName github.com
	User git
	IdentityFile ~/.ssh/id_ytech
        IdentitiesOnly yes

- When cloning a repo don't use "a", use "b". Where "github.com-ytechlabs" is ssh alias.
  (a) $ git clone git@github.com:ytechlabs/ytechlabs.github.io.git 
  (b) $ git clone git@github.com-ytechlabs:ytechlabs/ytechlabs.github.io.git

$ git clone git@github.com-ytechlabs:ytechlabs/ytechlabs.github.io.git

git clone git@github.com-saurabhp75:saurabhp75/saurabhp75.github.io.git




