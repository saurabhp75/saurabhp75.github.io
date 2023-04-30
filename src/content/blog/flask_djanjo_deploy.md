---
title: "Deploying Django and Flask app"
pubDatetime: 2022-09-23T15:22:00Z
tags: ["Django", "Flask", "Deployment"]
draft: false
description: "Introduction to Django and Flask app deployment"
---

### Hosting Flask app on pythonanywhere

1. Zip the folder using

```shell
$ zip -r filename.zip folder
```

2. Upload the zipped project folder to _pythonanywhere_.

3. Unzip the folder using.

```shell
$ unzip filename.zip
```

4. Set up virtual env using :

```shell
$ mkvirtualenv --python=/usr/bin/python3.6 my-virtualenv
```

Later you can switch to virtual env using :

```shell
$ workon my-virtualenv
```

**Note**: location of virtual env = “/home/username/.virtualenvs/myenv”

5. Go to the Web Tab and hit Add a new web app. Choose Manual Configuration, and then choose the Python version -- make sure it's the same version as the one you used in your virtualenv.

6. Now go to the Virtualenv section, and enter your virtualenv name: my-virtualenv. When you hit enter, you'll see it updates to the full path to your virtuaelenv (/home/yourusername/.virtualenvs/my-virtualenv).

7. In WSGI configuration file (/var/www/saurabhp75_pythonanywhere_com_wsgi.py)

- Remove HELLO_WORLD variable assignment.
- Remove application() method definition.
- Add/uncomment following lines.
  ```python
  import os
  from dotenv import load_dotenv
  project_folder = os.path.expanduser('~/flaskhost')  # adjust as appropriate
  load_dotenv(os.path.join(project_folder, '.env'))
  ```

### Setting environment variables in pythonanywhere

1. Save your environment variables into a .env file in your project folder as shown below.

```shell
$ cd ~/my-project-dir
$ echo "SECRET_KEY=sekritvalue" >> .env
$ echo "OTHER_SECRET=somethingelse" >> .env
```

2. Install python-dotenv into your virtualenv as shown below. Optionally, add it to your requirements.txt, if you're using one:

```shell
$ workon my-virtualenv-name
$ pip install python-dotenv
$ echo python-dotenv >> requirements.txt
```

3. For your web app itself (loading your .env file in your WSGI file) Add follwing lines in your WSGI config file.

```python
import os
from dotenv import load_dotenv
project_folder = os.path.expanduser('~/my-project-dir')  # adjust as appropriate
load_dotenv(os.path.join(project_folder, '.env'))
```

4. (For bash consoles) If not using virtual env use (a) otherwise (b)

- (a) set -a; source ~/my-project-dir/.env; set +a
- (b) echo 'set -a; source ~/flaskblog/.env; set +a' >> ~/.virtualenvs/myenv/bin/postactivate

### Hosting Django app on pythonanywhere

Following steps are same as in Flask app :

1. Upload the files to pythonanywhere.
2. (Try this???) : In setting.py make DEBUG = True.
3. In `settings.py` file add following line:  
   ALLOWED_HOSTS = ['saurabhp75.pythonanywhere.com']
4. Setting up virtual environment.
5. Setting up the environment variables.
6. Editing the WSGI config file (`/var/www/yourusername_pythonanywhere_com_wsgi.py`)  
   **Note**: sudo pip install python-dotenv

```python
import os
import sys
from dotenv import load_dotenv
project_folder = os.path.expanduser('~/django_blog')  # adjust as appropriate
load_dotenv(os.path.join(project_folder, '.env'))

path = '/home/saurabhp75/django_blog'
if path not in sys.path:
    sys.path.append(path)

os.environ['DJANGO_SETTINGS_MODULE'] = 'django_blog.settings'

from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()
```

7. Setting up static files. There are 3 main things to do:

- (Optionally) you can change the default STATIC_URL, which is /static/, to being a different prefix, like /assets/
- Set STATIC_ROOT in settings.py
  STATIC_ROOT = "/home/myusername/myproject/static"
  STATIC_ROOT = os.path.join(BASE_DIR, "static")
- Run python manage.py collectstatic
- Set up a Static Files entry on the PythonAnywhere Web tab

Goto the (Web tab)->(Static Files) on the PythonAnywhere dashboard.
Enter the same URL as STATIC_URL in the url section (typically, /static/)
Enter the path from STATIC_ROOT into the path section (the full path, including /home/username/etc)
