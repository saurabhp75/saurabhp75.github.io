---
layout: single
title: "Python Virtual Environment"
excerpt: "Intro to Python Virtual Environment"

sidebar:
  - title: "Python Virtual Environment personal notes"
    text: "Python 3.x, Django 2.x, PythonAnywhere.com"
---


### To create a virtual env
```shell
$ cd ENV (where ENV in the directory to place virtual environment)
$ virtaulenv ENV
```

### To activate a virtualenv
```shell
$ source ENV/bin/activate
```

### To create a requirements text file
```shell
$ pip freeze > requirements.txt
```

### To install a package in a virtual environment
```shell
$ source myproject/bin/activate
$ pip install pkgname
```

### To install packages from requirements file
```shell
$ pip install -r requirements.txt
```

### To deactivate a virtual environment
```shell
$ deactivate
```

### Workflow of working in virtual environmnet
1. Create a new virtual env.
```shell
$ virtaulenv ENV
```
2. Activate it.
```shell
$ source ENV/bin/activate
```
3. Install all the required packages from requirements.txt 
```shell
$ pip install -r requirements.txt
```


### Using virtualenvwrapper

1. It’s advantage is that it keeps all virtual env in one place (`~/.virtualenvs`)
2. pip install --user virtualenvwrapper
3. Add these lines in `.bashrc`
```shell
export VIRTUALENVWRAPPER_PYTHON="/usr/bin/python3"
source ~/.local/bin/virtualenvwrapper.sh
```
4. source `~/.bashrc`
5. Create a virtual environments
```shell
    $ mkvirtualenv --python=python3.6 virt-env-name
```
6. List virtual envs.
```shell
    $ lsvirtualenv
```
7. Enter virtual environments
```shell
    $ workon virtual-env-name
```
8. Exit virtual env
```shell
    $ deactivate
```
9. Delete/remove a virtual environment
```shell
    $ rmvirtualenv ENVNAME 
```
### Virtualenvwrapper (From test driven develoment book)

1. pip install --user virtualenvwrapper

2. Put these lines in .bashrc
```shell
export VIRTUALENVWRAPPER_PYTHON="/usr/bin/python3"
source ~/.local/bin/virtualenvwrapper.sh
```

3. Create virtual environment using:
```shell
$ mkvirtualenv --python=python3.6 virt_env_name
```

### Conda and virtual environments

Create a virtual environment 
```shell
$ conda create --name $ENVIRONMENT_NAME python
```
Activate an environment	:
```shell
$ source activate $ENVIRONMENT_NAME
```
Deactivate an environment :
```shell
$ source deactivate
```
Create requirements file :
```shell
$ conda list --export
```
List all environments :
```shell
$ conda info --envs
```


### Python virtual environments using pyenv

1. Install your preferred Python version (to be run only once) :
```shell
$ pyenv install 3.6.5
```
2. Make it a virtualenv so you can make others later if you want :
```shell
$ pyenv virtualenv 3.6.5 myenv
```
3. Make it globally active (for your user) : 
```shell
$ pyenv global myenv
```
4. Delete the virtualenv : 
```shell
$ pyenv uninstall myenv
```
5. Make a new one : 
```shell
$ pyenv virtualenv 3.6.5 myenv
```
6. Make environments active per-directory : 
```shell
$ pyenv local myenv
```
will drop a `.python-version` file into your current folder and any time you invoke Python or pip-installed Python utilities from it or under it, they will be shimmed by pyenv.

Source :
https://askubuntu.com/questions/865554/how-do-i-install-python-3-6-using-apt-get/865644#865644

       
1. Create a virtual environment for a specific Python version.
```shell
$ pyenv virtualenv 3.4.3 my_env_3_4
```

2. Create a virtual environment based on the current Python version.
```shell
$ pyenv version
2.7.10 (set by /Users/akbar/.pyenv/version)
$ pyenv virtualenv my_env_2_7
```
This will create a virtual environment based on Python 2.7.10 under the 	pyenv root in a directory called my_env_2_7.

3. List existing virtual environments created by pyenv.
```shell
$ pyenv virtualenvs
```

4. The pyenv versions command will also show the virtual environments along with the installed versions of Python.
```shell
$ pyenv versions
```
5. If eval "$(pyenv virtualenv-init -)" is configured in your shell, pyenv-virtualenv will automatically activate/deactivate virtualenvs on entering/leaving directories which contain a .python-version file that contains the name of a valid virtual environment as shown in the output of pyenv virtualenvs. For manual activation/deactivation, see 5 and 6.
    
6. To manually activate a virtual environment.
```shell
$ pyenv activate my_env_2_7
```
7. To manually deactivate a virtual environment.
```shell
(my_env_2_7)$ pyenv deactivate
```

8. Delete a virtual environment. 
```shell
$ pyenv uninstall my_env_2_7
```

Source : http://akbaribrahim.com/managing-python-virtual-environments-with-pyenv-virtualenv/




