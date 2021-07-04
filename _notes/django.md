---
layout: single
title: "Django"
excerpt: "Intro to Django"
---

1. Create virtual env, Pip install django.

2. Check django version using

```shell
$ python3 -m django –version (2.1.1)
```

3. Start a new project using

```shell
$ django-admin startproject project-name
```

4. The above command will create a folder with project-name containing various files.

5. The file `manage.py` allows us to run command line commands.

6. The file `settings.py` contains various config settings.
7. The file `urls.py` contain mapping(urlpatterns) between urls and the location to send the user.

8. The file `wsgi.py` (pronounce wisgee) setup the project config(wsgi config) to interface between our web app and web server(for e.g Apache).

9. Run the web app using

```shell
$ python manage.py runserver
```

10. Now we can add web applications(like blog) to the above created project. In fact we can have multiple apps within django for eg. a blog and a store app.

11. To create a new app we can use

```shell
$ python manage.py startapp app-name
```

12. The above command will create a folder with app-name containing various files.

13. We need to create a template folder for each app under django project and within this folder a folder with the name of the app. And then add this app to django project so that framework looks for templates folder under this app’s folder (also used in db migrations).

14. To add an app to django framework, add the app to **INSTALLED_APPS** in `settings.py` file.

15. **How the url pattern is matched in django app**. The web-app first checks urlpatterns in project’s `urls.py`, when match is found the appropriate view method is called, if urlpatterns contains include method for url matching, the web-app calls the view method of included app with the matched portion (in project’s urls.py) removed.  
    In the INSTALLED_APPS (used by django to search for templates and models for db) list in file `settings.py` under project-folder(django_blog/django_blog), add `blog.app.BlogConfig` (a class from `apps.py` under app folder)

## Django Templates

16. The block keyword in html file can be extended by child html pages, syntax is
    {% raw  %} {% block block-name %} {% endblock%} {% endraw  %}

17. Python like code can be embedded in html files, using:
    {% raw  %}
    {% for %} {% endfor %}  
    {% if %} {% else %} {% endif %}
    {% endraw %}

18. Variable in html template file can be accessed using {% raw  %} "{{ }}" {% endraw  %} .

19. How to use custom CSS files in django templates.
    Create a folder “app_name/static/appname/my.css”
    In template file use {% raw  %} {% load static %} {% endraw  %} to access the static folder  
    {% raw  %} Then use “<link rel="stylesheet" type="text/css" href="{% static 'appname/my.css' %}">” {% endraw  %}

20. Handling files and image fields in django models. The db only contains the path to file, actual file is stored on server disk. We need to configure following two settings in django.

- Where to save uploaded files in our system/server (MEDIA_ROOT).
- Where the webserver should serve the files (MEDIA_URL).

Use following code in projects urls.py to server static files during debug/development. This code tells django to serve files with url of MEDIA_URL from path MEDIA_ROOT.
if settings.DEBUG:
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

### Using **reverse lookup** in templates

22. If the entry in `urls.py` is like below:

```python
path('', PostListView.as_view(), name='blog-home')
```

Then the above view (blog-home) can be accessed in template using  
{% raw %}
\<a class="nav-item nav-link" href="{% url 'blog-home' %}">Home</a>
{% endraw %}

23. To create admin user, use following (first do the migrations)

```shell
$ python manage.py makemigrations (detects changes & creates files under migration folder)
$ python manage.py migrate (migrate the db)
$ python manage.py createsuperuser
```

24. Django template commands

{% raw  %}
{% url 'name' %} : link
{% block blockname %} followed by {% endblock %}
{% load static %} followed by {% static 'static-file-name' %}
{% endraw  %}

to register a model in admin panel add follwing line to `admin.py`

```python
admin.site.register(modelname)
```

### MEDIA_ROOT :

### MEDIA_URL :

### Django Forms

25. DateTimeField(auto_now=True) # datetime updates on both creation and updation.
26. DateTimeField(auto_now_add=True) # datetime updates only when creating but creation time can’t be changed.
27. DateTimeField(default=timezone.now) # creation time can be changed.

### Django Models

28. To view the sql of migrations, do following

```shell
$ python manage.py sqlmigrate blog 0001
```

29. To get django python shell, use following command

```shell
$ python manage.py shell
>>> from blog.models import Post
>>> from django.contrib.auth.models import User
>>> User.objects.all() # show all objects as queryset
>>> User.objects.first() # show only first object (not a queryset)
>>> User.objects.last() # show only last object
>>> User.objects.filter(username = ‘saurabh’)
>>> user = User.objects.filter(username = ‘saurabh’).first()
>>> User.objects.get(id=1)
>>> Post.objects.all()
```

### Creating and saving a model in two steps

```shell
>>> post_1 = Post(title=’Blog_1’, content=’First Post Content!’, author=user)
>>> post_1.save()
```

### Check the below code for matching author_id, is it a field in post model?

```shell
>>> post_2 = Post(title=’Blog_2’, content=’Second Post Content!’, author_id=user.id)
>>> post_2.save()
```

### To get all posts created by user from a user

```shell
# Note : ‘user’ is a foreign key to post, post_set contains all post created by user.
>>> user.post_set.all()
```

### to create and save a post by user in one step

```shell
>>> user.post_set.create(title=’Blog 3’, content=’Third Post Content!’)

>>> from django.contrib.auth.models import User
>>> user = User.objects.filter(username='saurabh').first()
>>> user.profile
>>> user.profile.image.url
```

30. Class based views : Django looks for temple <app>/<model>\_<viewtype>.html
    for eg. `blog/post_list.html`.

31. Adding post from json file:

```python
import json
from blog.models import Post
with open('posts.json') as f:
  posts_json = json.load(f)
  for post in posts_json:
    post = Post(title=post['title'], content=post['content'], author_id=post['user_id'])
    post.save()
```

32. Pagination in django :

```python
from django.core.paginator import Paginator
posts = ['1', '2', '3', '4', '5']
p = Paginator(posts, 2)
p.num_pages
for page in p.page_range
	  print(page)
page1 = p.page(1)
print(page1.number) # will print: 1
print(page1) # will print: <page 1 of 3>
```

### see the items on page1

```shell
>>> page1.object_list
[‘1’, ‘2’]
```

### see if the page has previous page

```shell
>>> page1.has_previuos()
False
>>> page1.has_next()
True
```

### get numbet of next page

```shell
>>> page1.next_page_number()
```

**Note** :
We should add trailing '/' in the route as it will enable routing of paths with missing '/' also to the same view as the path with '/'.

If we keep the default root urls.py as it is and set debug=True in settings.py, then we will get a default django page, when we run the server.

the context which is passed to render() is a dict with keys. These keys are directly accessible in the template file.

To use the static files in templates, we need to load them first using {% raw  %} {% load static %} {% endraw  %} then use {% raw  %} {% static "appname/staticfilename" %} {% endraw  %}

Question: How to avoid race condition in Django using F() ???

### Django Allauth

### To retrieve access token use following.

```python
from allauth.socialaccount.models import SocialToken
SocialToken.objects.filter(account__user=saurabhp75, account__provider='facebook')
```
