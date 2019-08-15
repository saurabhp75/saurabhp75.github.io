---
layout: single
title: "Python Virtual Environment"
excerpt: "Intro to Python Virtual Environment"

sidebar:
  - title: "Python Virtual Environment personal notes"
    text: "Python 3.x, Django 2.x, PythonAnywhere.com"
---

Virtual environments and pip

To create a virtual env :
$ cd ENV (where ENV in the directory to place virtual environment)
$ virtaulenv ENV  

To activate a virtualenv :
$source ENV/bin/activate. 

To create a requirements text file :
$ pip freeze > requirements.txt

To install a package in a virtual environment :
source myproject/bin/activate
pip install pkgname

To install packages from requirements file :
$ pip install -r requirements.txt

To deactivate a virtual environment :
$ deactivate

Workflow of working in virtual environmnet:
    1. Create a new virtual env.($virtaulenv ENV)
    2. Activate it.($source ENV/bin/activate.)
    3. Install all the required packages from requirements.txt ($pip install -r requirements.txt)


Using virtualenvwrapper

    1. It’s advantage is that it keeps all virtual env in one place (~/.virtualenvs)
    2. pip install --user virtualenvwrapper
    3. Add these lines in .bashrc
export VIRTUALENVWRAPPER_PYTHON="/usr/bin/python3"
source ~/.local/bin/virtualenvwrapper.sh
    4. source ~/.bashrc
    5. Create a virtual environments
       mkvirtualenv --python=python3.6 virt-env-name
    6. List virtual envs.
       lsvirtualenv
    7. Enter virtual environments
       $ workon virtual-env-name
    8. Exit virtual env
       $ deactivate
    9. Delete/remove a virtual environment
       rmvirtualenv ENVNAME 

virtualenvwrapper From test driven develoment book

    1. pip install --user virtualenvwrapper

    2. Put these lines in .bashrc :

export VIRTUALENVWRAPPER_PYTHON="/usr/bin/python3"
source ~/.local/bin/virtualenvwrapper.sh

    3. Create virtual environment using:
       mkvirtualenv --python=python3.6 virt_env_name


conda and virtual environments

Create a virtual environment :
$ conda create --name $ENVIRONMENT_NAME python

Activate an environment	:
$ source activate $ENVIRONMENT_NAME

Deactivate an environment :
$ source deactivate

Create requirements file :
$ conda list --export

List all environments :
$ conda info --envs



Python virtual environments using pyenv


    1. Install your preferred Python version (to be run only once) :
	pyenv install 3.6.5

    2. Make it a virtualenv so you can make others later if you want :
	pyenv virtualenv 3.6.5 myenv

    3. Make it globally active (for your user) : 
	pyenv global myenv

    4. Delete the virtualenv : 
	pyenv uninstall myenv

    5. Make a new one : 
	pyenv virtualenv 3.6.5 myenv

    6. Make environments active per-directory : 
	pyenv local myenv

	will drop a .python-version file into your current folder and any time you invoke 	Python or pip-installed Python utilities from it or under it, they will be shimmed by pyenv.

Source :
https://askubuntu.com/questions/865554/how-do-i-install-python-3-6-using-apt-get/865644#865644


       
    1. Create a virtual environment for a specific Python version.
       $ pyenv virtualenv 3.4.3 my_env_3_4

    2. Create a virtual environment based on the current Python version.
       $ pyenv version
	2.7.10 (set by /Users/akbar/.pyenv/version)

	$ pyenv virtualenv my_env_2_7
	This will create a virtual environment based on Python 2.7.10 under the 	pyenv root in a directory called my_env_2_7.
    3. List existing virtual environments created by pyenv.
       $ pyenv virtualenvs


    4. The pyenv versions command will also show the virtual environments along with the installed versions of Python.
       $ pyenv versions

    5. If eval "$(pyenv virtualenv-init -)" is configured in your shell, pyenv-virtualenv will automatically activate/deactivate virtualenvs on entering/leaving directories which contain a .python-version file that contains the name of a valid virtual environment as shown in the output of pyenv virtualenvs. For manual activation/deactivation, see 5 and 6.
       
    6. To manually activate a virtual environment.
       pyenv activate my_env_2_7

    7. To manually deactivate a virtual environment.
       (my_env_2_7)$ pyenv deactivate


    8. Delete a virtual environment. 
       $ pyenv uninstall my_env_2_7


       Source : http://akbaribrahim.com/managing-python-virtual-environments-with-pyenv-virtualenv/




