---
title: "Django"
pubDatetime: 2022-09-23T15:22:00Z
tags: ["Django"]
draft: false
description: "Introduction to Django Class Based Views"
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
    `{% block block-name %} {% endblock%}`

17. Python like code can be embedded in html files, using:

    ```
    {% for %} {% endfor %}
    {% if %} {% else %} {% endif %}
    ```

18. Variable in html template file can be accessed using `"{{ }}"`.

19. How to use custom CSS files in django templates.
    Create a folder “app_name/static/appname/my.css”
    In template file use `{% load static %}` to access the static folder  
    Then use `“<link rel="stylesheet" type="text/css" href="{% static 'appname/my.css' %}">”`

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

```
\<a class="nav-item nav-link" href="{% url 'blog-home' %}">Home</a>
```

23. To create admin user, use following (first do the migrations)

```shell
$ python manage.py makemigrations (detects changes & creates files under migration folder)
$ python manage.py migrate (migrate the db)
$ python manage.py createsuperuser
```

24. Django template commands

```
{% url 'name' %} : link
{% block blockname %} followed by {% endblock %}
{% load static %} followed by {% static 'static-file-name' %}
```

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

30. Class based views : Django looks for temple `<app>/<model>\_<viewtype>.html`
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

To use the static files in templates, we need to load them first using `{% load static %}` then use `{% static "appname/staticfilename" %}`

Question: How to avoid race condition in Django using F() ???

### Django Allauth

### To retrieve access token use following.

```python
from allauth.socialaccount.models import SocialToken
SocialToken.objects.filter(account__user=saurabhp75, account__provider='facebook')
```

# Django clas based views

### Justification of CBVs

By using decorators you can change things before and after the original view runs but you can’t do anything about the way the original view works.

Using this (Adding extra view parameters) method you can override the original function behaviour however there’s a limit to the number of parameters you can allow your function views to have and notice that these function views cannot be further overridden.

### How to use Django class based views

```python
path('ccv-with-values/', views.CustomClassView.as_view(header='Hello'), name='ccv-with-values')
```

**Note**: I recommend you avoid using it because passing parameters to the as_view method pollutes the urls.py with configuration that (at least in my opinion) should not be there (and there’s no reason to have to take a look at both your urls.py and your views.py to understand the behavior of your views). It is better to derive a custom class from the view and initialize the parameters there and avoid passing parameters to "as_view()" method.

### What is a mixin

A mixin is a class not related to the class based view hierarchy we are using - the mixin inherits from object (or from another mixin) and just defines the methods and attributes that need to be overridden. When the mixin is mixed with the ancestors of a class its functionality will be used by that class.

**Important** : One should implement common functionality that needs to be re-used between classes only with mixins.

Each one of the view classes you define should inherit from one and only one other class view and any number of mixins you want.

Make sure that the view class is rightmost in the ancestors list and the mixins are to the left of it.

### Use of super in over-riding methods

The case where you want to use the functionality of more than one mixins for the same thing. For example, let’s suppose that we had a mixin that added some data to the context and a different mixing that added some different data to the context. Both would use the get_context method and you’d like to have the context data of both of them to your contex. In such situations where we want to also use the methods of the mixins and class on the right, we can use super().

```python
class V:
    def x(self):
        print ("From V")

class M1:
    def x(self):
        super().x()
        print ("From M1")

class M2:
    def x(self):
        super().x()
        print ("From M2")

class MIXIN(M2, M1, V):
    def x(self):
        super().x()
        print ("From MIXIN")

print ("MIXIN OUTPUT")
MIXIN().x()
```

MIXIN OUTPUT
From V
From M1
From M2
From MIXIN

running super().x() from a method instance will try to find method x() on the MRO ancestors of this instance.

## Calling super() in Python2 and Python3

### In Python2

super(ClassName, self).x()

### In Python3

super().x()

## Django Class hierarchy

### View(Base class of all view classes)

It has only one attribute (http_method_names) and a very small number of methods.

The most important method is the as_view() class method.
The as_view() will instantiate an instance object of the View class (actually the class that inherits from View) and use this object to properly generate a functional view.

The View class cannot be used as it is but it must be inherited by a child class.

The child class needs to define a method that has the same name as each http method that is supported

For example if only HTTP GET and HTTP POST are supported then the inherited class must define a get() and a post() method;

These methods are called from the functional view through dispatch() method and need to return a proper response object.

So, we have two central methods here:

- The as_view() class method that creates the object instance and returns its view function and
- dispatch() that will call the proper named class method depending on the HTTP method (i.e post, get, put etc).

You shouldn’t ever need to mess with as_view() but,
because dispatch() is the only instance method that is guaranteed to run every time the class based view will run, you will frequently need to override dispatch() especially to control access control.

### RedirectView

- The RedirectView inherits directly from view.
- It attributes like url (to use a static url) or pattern_name (to use one of the patterns define in your urls.py) to define where it should redirect.
- These attributes are used by the get_redirect_url() which will generate the actual url to redirect to and can be overriden for example to redirect to a different location depending on the current user.
- RedirectView defines a get() method that returns a redirect to another page.

### TemplateView

The TemplateView inherits from View and two more mixins, viz, TemplateResponseMixin and ContextMixin.

TemplateResponseMixin defines some template-related attributes (most important being the template_name, template_engine, content_type) and two methods:

One that retrieves the template that will be used to render this View (get_template_names)
and one that actually renders the template (render_to_response) using a TemplateResponse instance.

The ContextMixin provides the get_context_data that is passed to the template to be rendered and should be overridden if you want to pass more context variables.

TemplateView renders and returns a Django template in the get() method.

Possible ways to customize Redirect and Template views by over-riding methods using mixins

1. Create a catch all RedirectView that depending on the remainder of the url it will redirect to a different page.

2. Create a mixin that appends some things to the context of all CBVs using it,

3. Use dynamic templates based on some other condition (that’s actually what Detail/List/UpdateView are doing).
4. Render a template to a different output than Html (for example a text file) etc.

### FormView

Can be used whenever we want to display a form (not a form related to a Model i.e for Create/Update/Delete, for these cases there are specific CBVs (like???)).

### FormMixin :

- Inherits from ContextMixin
- Overrides its get_context_data() method to add the form to the view.
- Adds some attributes and methods for proper form handling,
  - form_class (attribute when the form class will be the same always)
  - get_form_class() (method when the form class will be dynamic for e.g. depending on the logged in user)
  - initial and get_initial() (same logic as before for the form’s initial values)
  - form_valid() and form_invalid() to define what should happen when the form is valid or invalid.
  - get_form_kwargs to pass some keyword arguments to the form’s constructor etc.

### ProcessFormView :

- FormMixin does not define any form handling logic (i.e check if the form is valid and call its form_valid() method)
- Above logic is defined in the ProcessFormView which inherits from View.
- Defines get() (just render the form) and post() (check if the form is valid and call form_valid else call form_invalid) methods.

One interesting thing here is to notice here is that Django defines both the FormMixin and ProcessFormView. The FormMixin offers the basic Form elements (the form class, initial data etc) and could be re-used in a different flow beyond the one offered by ProcessFormView (for example display the form as a JSON object instead of a Django template). On the other hand, ProcessFormView is required in order to define the get and post methods that are needed from the View. These methods can’t be overridden in the FormMixin since that would mean that the mixin would behave as a view!

### BaseFormView :

- Used to inherit from ProcessFormView and FormMixin.
- It does not do anything more than providing a base class that other classes that want to use the form functionality (i.e both the ProcessFormView and FormMixin) will inherit from.

### ListView and DetailView

The ListView is used to render multiple objects in a template, for example in a list or table.

The MultipleObjectMixin is used make a query to the database (either using a model or a queryset) and pass the results to the context. It also supports custom ordering (get_ordering()) and pagination (paginate_queryset()).

However, the most important method of this mixin is get_queryset(). This method checks to see if the queryset or model attribute are defined (queryset will be checked first so it has priority if both are defined) and returns a queryset result (taking into account the ordering).

This queryset result will be used by the get_context_data() method of this mixin to actually put it to the context by saving to a context variable named object_list. Notice that you can set the context_object_name attribute to add and extra another variable to the context with the queryset beyond object_list (for example if you have an ArticleLsitView you can set context_object_name = articles to be able to do `{% for article in articles %}` in your context instead of ` {% for article in object_list %})`.

The **MultipleObjectMixin** can be used and overridden when we need to put multiple objects in a View. This mixin is inherited (along with View) from BaseListView that adds a proper get method to call get_context_data and pass the result to the template.

As we can also see, Django uses the **MultipleObjectTemplateResponseMixin** that inherits from TemplateResponseMixin to render the template. This mixin does some magic with the queryset or model to define a template name (so you won’t need to define it yourself) - that’s from where the app_label/app_model_list.html default template name is created.

Similar to the ListView is the DetailView which has the same class hierarchy as the ListView with two differences: It uses SingleObjectMixin instead of MultipleOjbectMixin, SingleObjectTemplateResponseMixin instead of MultipleObjectTemplateResponseMixin and BaseDetailView instead of BaseListView.

The **SingleObjectMixin** will use the get_queryset() (in a similar manner to the get_queryset() of MultipleObjectMixin) method to return a single object (so all attributes and methods concerning ordering or pagination are missing) but instead has the get_object() method which will pick and return a single object from that queryset (using a pk or slug parameter). This object will be put to the context of this view by the get_context_data. The BaseDetailView just defines a proper get to call the get_context_data (of SingleObjectMixin) and finally the SingleObjectTemplateResponseMixin will automatically generate the template name (i.e generate app_label/app_model_detail.html).

### The CreateView

This class is used to create a new instance of a model. It has a rather complex hierarchy diagram but we’ve already discussed most of these classes:

As we can see the CreateView inherits from **BaseCreateView** and **SingleObjectTemplateResponseMixin**.

SingleObjectTemplateResponseMixin is mainly used to define the template names that will be searched for (i.e app_label/app_model_form.html),

**BaseCreateView** is used to combine the functionality of ProcessFormView (that handles the basic form workflow as we have already discussed) and ModelFormMixin.

**ModelFormMixin** is a rather complex mixin that inherits from both SingleObjectMixin and FormMixin.

SingleObjectMixin functionality is not really used by CreateView (since no object will need to be retrieved for the CreateView) however the ModelFormMixin is also used by UpdateView that’s why ModelFormMixin also inherits from it (to retrieve the object that will be updated).

ModelFormMixin mixin adds functionality for handling forms related to models and object instances. More specifically it adds functionality for:

- Creating a form class (if one is not provided) by the configured model / queryset. If you don’t provide the form class (by using the form_class attribute) then you need to configure the fields that the generated form will display by passing an array of field names through the fields attribute
- Overrides the form_valid in order to save the object instance of the form
- Fixes get_success_url to redirect to the saved object’s absolute_url when the object is saved
- Pass the current object to be updated (that was retrieving through the SingleObjectMixin) -if there is a current object- to the form as the instance attribute

### The UpdateView and DeleteView

The UpdateView class is almost identical to the CreateView - the only difference is that UpdateView inherits from BaseUpdateView (and SingleObjectTemplateResponseMixin) instead of BaseCreateView.

BaseUpdateView overrides the get and post methods of ProcessFormView to retrieve the object (using SingleObjectMixin‘s get_object()) and assign it to an instance variable - this will then be picked up by the ModelFormMixin and used properly in the form as explained before.

One thing I notice here is that it seems that the hierarchy would be better if the ModelFormMixin inherited only from FormMixin (instead of both from FormMixin and SingleObjectMixin) and BaseUpdateView inheriting from ProcessFormView, ModelForMixin and SingleObjectMixin. This way the BaseCreateView wouldn’t get the non-needed SingleObjectMixin functionality. I am not sure why Django is implemented this way (i.e the ModelFormMixin also inheriting from SingleObjectMixin thus passing this non-needed functionality to BaseCreateView)

DeleteView is more or less the same as the DetailView with the addition of the DeleteMixin in the mix. The DeleteMixin adds a post() method that will delete the object when called and makes success_url required (since there would be no object to redirect to after this view is posted).

### Access control mixins

Another small hierarchy of class based views (actually these are all mixins) are the authentication ones which can be used to control access to a view.

AcessMixin : Provides some basic functionality (i.e what to do when the user does not have access to the view, find out the login url to redirect him etc) and is used as a base for the other three methods.

**Attributes**

- login_url = None
- permission_denied_message = ''
- raise_exception = False
- redirect_field_name = 'next'

**Methods**

- def get_login_url(self):
- def get_permission_denied_message(self):
- def get_redirect_field_name(self):
- def handle_no_permission(self):

LoginRequiredMixin, PermissionRequiredMixin and UserPassesTestMixin :
Override the dispatch() method of View to check if the user has the specific rights (i.e if he has logged in for LoginRequiredMixin, if he has the defined permissions for PermissionRequiredMixin or if he passes the provided test in UserPassesTextMixin).
If the user has the rights the view will proceed as normally (call super’s dispatch) else the access denied functionality from AccessMixin will be implemented.

### Some other CBVs

Beyond the class based views I discussed in this section, Django also has a bunch of CBVs related to account views (LoginView, LogoutView, PasswordChangeView etc) and Dates (DateDetailView, YearArchiveView etc). Using the CBV Inspector you should be able to follow along and decide the methods you need to override for your needs.

Also, most well written Django packages will define their own CBVs that inherit from the Django CBVs - with the knowledge you acquired here you will be able to follow along on their source code to understand how everything works.

### Real world use cases :

Filter the contents of listview (using mixin)

```python
class GetQuerysetOverrideMixin:
    def get_queryset(self):
        qs = super().get_queryset()
        return qs.filter(status='PUBLISHED')

class GetQuerysetOverrideListView(GetQuerysetOverrideMixin, ListView):
    pass
```

Do something when a valid form is submitted (over-ride form_valid in a mixin) :

```python
def form_valid(self, form, ):
    # let's calculate a field value
    form.instance.calculated_field = form.cleaned_data['data1'] + form.cleaned_data['data2']

    # save the form by calling super().form_valid(); keep the return value - it is the value of get_success_url
    redirect_to = super().form_valid(form)

    # For Create or UpdateView, the just-saved object will be assigned to self.object
    logger.log("Created an object with id {0}".format(self.object.id)

    # return the redirect
    return redirect_to
```

The form_valid gets the actual form which, since is validated has a cleaned_data dictionary of values. This form also has an instance attribute which is the object that this form is bound to - notice that a normal Form won’t have an instance, only a ModelForm. This can be used to modify the instance of this form as needed - before saving it. When you want to actually save the instance you call super().form_valid() passing it the modified form (and instance). This method does three things

- It saves the instance to the database
- It assigns the saved object to the object instance attribute (so you can refer to it by self.instance)
- It uses get_redirect_url to retrieve the location where you should redirect after the form is submitted

Thus in this example we save redirect_to to return it also from our method also and then can use self.object.id to log the id of the current object.

### Change the queryset of the CBV

All CBVs that inherit from SingleObjectMixin or MultipleObjectMixin (ListView, DetailView, UpdateView and DeleteView) have a model and a queryset property that can be used (either one or the other) to define the queryset that will be used for querying the database for that CBVs results. This queryset can be further dynamically refined by overriding the get_queryset() method. What I usually do is that I define the model attribute and then override get_queryset() in order to dynamically modify the queryset.

For example, let’s say that I wanted to add a count of articles and documents per each category. Here’s how the CategoryListView could be done:

# Django Authentication

## Django user authentication system handles

- user accounts,
- groups,
- permissions
- cookie-based user sessions

The Django Authentication System (DAS) handles both authentication and authorization. Here the term authentication is used to refer to both tasks.

The auth system consists of:

- Users
- Permissions: Binary (yes/no) flags designating whether a user may perform a certain task.
- Groups: A generic way of applying labels and permissions to more than one user.
- A configurable password hashing system
- Forms and view tools for logging in users, or restricting content
- A pluggable backend system

DAS doesn’t provide some features commonly found in web authentication systems like.

- Password strength checking
- Throttling of login attempts
- Authentication against third-parties (OAuth, for example)

### Installation

DAS is bundled as a Django contrib module in django.contrib.auth. By default, the required configuration is already included in the settings.py generated by django-admin startproject, these consist of two items listed in your INSTALLED_APPS setting:

1. 'django.contrib.auth' contains the core of the authentication framework, and its default models.
2. 'django.contrib.contenttypes' is the Django content type system, which allows permissions to be associated with models you create.

and these items in your MIDDLEWARE setting:

1. SessionMiddleware manages sessions across requests.
2. AuthenticationMiddleware associates users with requests using sessions.

With these settings in place, running the command manage.py migrate creates the necessary database tables for auth related models and permissions for any models defined in your installed apps.

## User objects

User objects are the core of the authentication system. They typically represent the people interacting with your site and are used to enable things like restricting access, registering user profiles, associating content with creators etc. Only one class of user exists in Django’s authentication framework, i.e.,'superusers'or admin 'staff' users are just user objects with special attributes set, not different classes of user objects.
The primary attributes of the default user are:

- username
- password
- email
- first_name
- last_name

## Creating users

The most direct way to create users is to use the included create_user() helper function:

```shell
>>> from django.contrib.auth.models import User
>>> user = User.objects.create_user('john', 'lennon@thebeatles.com', 'johnpassword')
# At this point, user is a User object that has already been saved
# to the database. You can continue to change its attributes
# if you want to change other fields.
>>> user.last_name = 'Lennon'
>>> user.save()
```

**Note** : You can also create users interactively using Django Admin.

### Creating superusers

using the createsuperuser command:

```shell
$ python manage.py createsuperuser --username=joe --email=joe@example.com
```

### Changing passwords

From command line

```python
$ python manage.py changepassword *username*
```

### From code

```shell
>>> from django.contrib.auth.models import User
>>> u = User.objects.get(username='john')
>>> u.set_password('new password')
>>> u.save()
```

## Authenticating users

```python
authenticate(request=None, **credentials)
```

Use **authenticate()** to verify a set of credentials. It takes credentials as keyword arguments, username and password for the default case, checks them against each authentication backend, and returns a User object if the credentials are valid for a backend. If the credentials aren’t valid for any backend or if a backend raises PermissionDenied, it returns None. For example:

```python
from django.contrib.auth import authenticate
user = authenticate(username='john', password='secret')
if user is not None:
    # A backend authenticated the credentials
else:
    # No backend authenticated the credentials
```

request is an optional HttpRequest which is passed on the authenticate() method of the authentication backends.

**Note**: This is a low level way to authenticate a set of credentials; for example, it’s used by the RemoteUserMiddleware. Unless you are writing your own authentication system, you probably won’t use this. Rather if you’re looking for a way to login a user, use the LoginView.

### Permissions and Authorization

DAS provides a way to assign permissions to specific users and groups of users. It’s used by the Django admin site, but you’re welcome to use it in your own code.
The Django admin site uses permissions as follows:

- Access to view objects is limited to users with the “view” or “change” permission for that type of object.
- Access to view the “add” form and add an object is limited to users with the “add” permission for that type of object.
- Access to view the change list, view the “change” form and change an object is limited to users with the “change” permission for that type of object.
- Access to delete an object is limited to users with the “delete” permission for that type of object.

Permissions can be set not only per type of object, but also per specific object instance. By using the has_view_permission(), has_add_permission(), has_change_permission() and has_delete_permission() methods provided by the ModelAdmin class, it is possible to customize permissions for different object instances of the same type.

User objects have two many-to-many fields: groups and user_permissions. User objects can access their related objects in the same way as any other Django model:

```python
myuser.groups.set([group_list])
myuser.groups.add(group, group, ...)
myuser.groups.remove(group, group, ...)
myuser.groups.clear()
myuser.user_permissions.set([permission_list])
myuser.user_permissions.add(permission, permission, ...)
myuser.user_permissions.remove(permission, permission, ...)
myuser.user_permissions.clear()
```

### Default permissions

When django.contrib.auth is listed in your INSTALLED_APPS setting, it will ensure that three default permissions – add, change and delete – are created for each Django model defined in one of your installed applications.
These permissions will be created when you run manage.py migrate; the first time you run migrateafter adding django.contrib.auth to INSTALLED_APPS, the default permissions will be created for all previously-installed models, as well as for any new models being installed at that time. Afterward, it will create default permissions for new models each time you run manage.py migrate (the function that creates permissions is connected to the post_migrate signal).
Assuming you have an application with an app_label foo and a model named Bar, to test for basic permissions you should use:

- add: user.has_perm('foo.add_bar')
- change: user.has_perm('foo.change_bar')
- delete: user.has_perm('foo.delete_bar')
- view: user.has_perm('foo.view_bar')
  The Permission model is rarely accessed directly.

### Groups

django.contrib.auth.models.Group models are a generic way of categorizing users so you can apply permissions, or some other label, to those users. A user can belong to any number of groups.
A user in a group automatically has the permissions granted to that group. For example, if the group Site editors has the permission can_edit_home_page, any user in that group will have that permission.
Beyond permissions, groups are a convenient way to categorize users to give them some label, or extended functionality. For example, you could create a group 'Special users', and you could write code that could, say, give them access to a members-only portion of your site, or send them members-only email messages.

### Programmatically creating permissions

While custom permissions can be defined within a model’s Metaclass, you can also create permissions directly. For example, you can create the can_publish permission for a BlogPost model in myapp:

```python
from myapp.models import BlogPost
from django.contrib.auth.models import Permission
from django.contrib.contenttypes.models import ContentType
content_type = ContentType.objects.get_for_model(BlogPost)
permission = Permission.objects.create(
    codename='can_publish',
    name='Can Publish Posts',
    content_type=content_type,
)
```

The permission can then be assigned to a User via its user_permissions attribute or to a Group via its permissions attribute.

### Permission caching

The ModelBackend caches permissions on the user object after the first time they need to be fetched for a permissions check. This is typically fine for the request-response cycle since permissions aren’t typically checked immediately after they are added (in the admin, for example). If you are adding permissions and checking them immediately afterward, in a test or view for example, the easiest solution is to re-fetch the user from the database. For example:

```python
from django.contrib.auth.models import Permission, User
from django.contrib.contenttypes.models import ContentType
from django.shortcuts import get_object_or_404

from myapp.models import BlogPost

def user_gains_perms(request, user_id):
    user = get_object_or_404(User, pk=user_id)
    # any permission check will cache the current set of permissions
    user.has_perm('myapp.change_blogpost')

    content_type = ContentType.objects.get_for_model(BlogPost)
    permission = Permission.objects.get(
        codename='change_blogpost',
        content_type=content_type,
    )
    user.user_permissions.add(permission)

    # Checking the cached permission set
    user.has_perm('myapp.change_blogpost')  # False

    # Request new instance of User
    # Be aware that user.refresh_from_db() won't clear the cache.
    user = get_object_or_404(User, pk=user_id)

    # Permission cache is repopulated from the database
    user.has_perm('myapp.change_blogpost')  # True
```

### Authentication in Web requests

Django uses sessions and middleware to hook the authentication system into request objects.
These provide a request.user attribute on every request which represents the current user. If the current user has not logged in, this attribute will be set to an instance of AnonymousUser, otherwise it will be an instance of User.
You can tell them apart with is_authenticated, like so:

```python
if request.user.is_authenticated:
    # Do something for authenticated users.
    ...
else:
    # Do something for anonymous users.
    …
```

### How to log a user in

If you have an authenticated user you want to attach to the current session - this is done with a login() function.
login(request, user, backend=None)
To log a user in, from a view, use login(). It takes an HttpRequest object and a User object. login() saves the user’s ID in the session, using Django’s session framework. Note that any data set during the anonymous session is retained in the session after a user logs in.
This example shows how you might use both authenticate() and login():

```python
from django.contrib.auth import authenticate, login

def my_view(request):
    username = request.POST['username']
    password = request.POST['password']
    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)
        # Redirect to a success page.
        ...
    else:
        # Return an 'invalid login' error message.
```

### Selecting the authentication backend

When a user logs in, the user’s ID and the backend that was used for authentication are saved in the user’s session. This allows the same authentication backend to fetch the user’s details on a future request. The authentication backend to save in the session is selected as follows:

1. Use the value of the optional backend argument, if provided.
2. Use the value of the user.backend attribute, if present. This allows pairing authenticate()and login(): authenticate() sets the user.backend attribute on the user object it returns.
3. Use the backend in AUTHENTICATION_BACKENDS, if there is only one.
4. Otherwise, raise an exception.

In cases 1 and 2, the value of the backend argument or the user.backend attribute should be a dotted import path string (like that found in AUTHENTICATION_BACKENDS), not the actual backend class.

### How to log a user out

logout(request)

To log out a user who has been logged in via django.contrib.auth.login(), use django.contrib.auth.logout() within your view. It takes an HttpRequest object and has no return value. Example:

```python
from django.contrib.auth import logout
def logout_view(request):
    logout(request)
    # Redirect to a success page.
```

## Models:

A model is the single, definitive source of information about your data. It contains the essential fields and behaviors of the data you’re storing. Generally, each model maps to a single database table.
The basics:

- Each model is a Python class that subclasses django.db.models.Model.
- Each attribute of the model represents a database field.
- With all of this, Django gives you an automatically-generated database-access API.

Quick example:

```python
from django.db import models

class Person(models.Model):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
```

### Some technical notes:

- The name of the table,myapp_person, is automatically derived from some model metadata but can be overridden.
- An id field is added automatically, but this behavior can be overridden.

### Using models

Once you have defined your models, you need to tell Django you’re going to use those models. Do this by editing your settings file and changing the INSTALLED_APPS setting to add the name of the module that contains your models.py.
For example, if the models for your application live in the module myapp.models, INSTALLED_APPS. When you add new apps to NSTALLED_APPS, be sure to run manage.py migrate, optionally making migrations for them first with manage.py makemigrations.
Fields:
The most important part of a model – and the only required part of a model – is the list of database fields it defines. Fields are specified by class attributes. Be careful not to choose field names that conflict with the models API like clean, save, or delete.

### Field types

Each field in your model should be an instance of the appropriate Field class. Django uses the field class types to determine a few things:

- The column type, which tells the database what kind of data to store (e.g. INTEGER, VARCHAR, TEXT).
- The default HTML widget to use when rendering a form field (e.g. \<input type="text">, \<select>).
- The minimal validation requirements, used in Django’s admin and in automatically-generated forms.

Django ships with dozens of built-in field types; you can find the complete list in the model field reference. You can easily write your own fields if Django’s built-in ones don’t do the trick; see Writing custom model fields.

### Field options

Each field takes a certain set of field-specific arguments. For example, CharField (and its subclasses) require a max_length argument which specifies the size of the VARCHAR database field used to store the data.
There’s also a set of common arguments available to all field types. All are optional. They’re fully explained in the reference, but here’s a quick summary of the most often-used ones:
**null**: If True, Django will store empty values as NULL in the database. Default is False.
**blank**: If True, the field is allowed to be blank. Default is False.
Note that this is different than null. Null is purely database-related, whereas blank is validation-related. If a field has blank=True, form validation will allow entry of an empty value. If a field has blank=False, the field will be required.
choices
An iterable (e.g., a list or tuple) of 2-tuples to use as choices for this field. If this is given, the default form widget will be a select box instead of the standard text field and will limit choices to the choices given.

A choices list looks like this:

```python
YEAR_IN_SCHOOL_CHOICES = (
    ('FR', 'Freshman'),
    ('SO', 'Sophomore'),
    ('JR', 'Junior'),
    ('SR', 'Senior'),
    ('GR', 'Graduate'),
)
```

The first element in each tuple is the value that will be stored in the database. The second element is displayed by the field’s form widget.

Given a model instance, the display value for a field with choices can be accessed using the get_FOO_display() method. For example:

```python
from django.db import models
class Person(models.Model):
    SHIRT_SIZES = (
        ('S', 'Small'),
        ('M', 'Medium'),
        ('L', 'Large'),
    )
    name = models.CharField(max_length=60)
    shirt_size = models.CharField(max_length=1, choices=SHIRT_SIZES)
```

For above model we can use below code to view the display value of shirt_size

```shell
>>> p = Person(name="Fred Flintstone", shirt_size="L")
>>> p.save()
>>> p.shirt_size
'L'
>>> p.get_shirt_size_display()
'Large'
```

### default

The default value for the field. This can be a value or a callable object. If callable it will be called every time a new object is created.

### help_text

Extra “help” text to be displayed with the form widget. It’s useful for documentation even if your field isn’t used on a form.

### primary_key

If True, this field is the primary key for the model.
If you don’t specify primary_key=True for any fields in your model, Django will automatically add an IntegerField to hold the primary key, so you don’t need to set primary_key=True on any of your fields unless you want to override the default primary-key behavior.
The primary key field is read-only. If you change the value of the primary key on an existing object and then save it, a new object will be created alongside the old one.
Unique
If True, this field must be unique throughout the table.

### Automatic primary key fields

By default, Django gives each model the following field:
id = models.AutoField(primary_key=True)
This is an auto-incrementing primary key.

If you’d like to specify a custom primary key, just specify primary_key=True on one of your fields. If Django sees you’ve explicitly set Field.primary_key, it won’t add the automatic id column.Each model requires exactly one field to have primary_key=True.

### Verbose field names

Each field type, except for ForeignKey, ManyToManyField and OneToOneField, takes an optional first positional argument – a verbose name. If the verbose name isn’t given, Django will automatically create it using the field’s attribute name, converting underscores to spaces.
In this example, the verbose name is "person's first name":

```python
first_name = models.CharField("person's first name", max_length=30)
```

In this example, the verbose name is "first name":

```python
first_name = models.CharField(max_length=30)
```

**ForeignKey**, **ManyToManyField** and **OneToOneField** require the first argument to be a model class, so use the verbose_name keyword argument. The convention is not to capitalize the first letter of the verbose_name. Django will automatically capitalize the first letter where it needs to.

```python
poll = models.ForeignKey(
    Poll,
    on_delete=models.CASCADE,
    verbose_name="the related poll",
)
sites = models.ManyToManyField(Site, verbose_name="list of sites")
place = models.OneToOneField(
    Place,
    on_delete=models.CASCADE,
    verbose_name="related place",
)
```

## Relationships

Clearly, the power of relational databases lies in relating tables to each other. Django offers ways to define the three most common types of database relationships: many-to-one, many-to-many and one-to-one.

### Many-to-one relationships

To define a many-to-one relationship, use django.db.models.ForeignKey. You use it just like any other Field type: by including it as a class attribute of your model. ForeignKey requires a positional argument: the class to which the model is related.

For example, if a Car model has a Manufacturer – that is, a Manufacturer makes multiple cars but each Car only has one Manufacturer – use the following definitions:

```python
from django.db import models
class Manufacturer(models.Model):
      pass

class Car(models.Model):
    manufacturer = models.ForeignKey(Manufacturer, on_delete=models.CASCADE)
    # ...
```

It’s suggested, but not required, that the name of a ForeignKey field (manufacturer in the example above) be the name of the model, lowercase. You can, of course, call the field whatever you want.

### Many-to-many relationships

To define a many-to-many relationship, use ManyToManyField. You use it just like any other Field type: by including it as a class attribute of your model.
ManyToManyField requires a positional argument: the class to which the model is related.
For example, if a Pizza has multiple Topping objects – that is, a Topping can be on multiple pizzas and each Pizza has multiple toppings – here’s how you’d represent that:

```python
from django.db import models
class Topping(models.Model):
    # ...
    pass
class Pizza(models.Model):
    # ...
    toppings = models.ManyToManyField(Topping)
```

It’s suggested, but not required, that the name of a ManyToManyField (toppings in the example above) be a plural describing the set of related model objects. It doesn’t matter which model has the ManyToManyField, but you should only put it in one of the models – not both. Generally, ManyToManyField instances should go in the object that’s going to be edited on a form. In the above example, toppings is in Pizza (rather than Topping having a pizzas ManyToManyField) because it’s more natural to think about a pizza having toppings than a topping being on multiple pizzas. The way it’s set up above, the Pizza form would let users select the toppings.

### Extra fields on many-to-many relationships

When you’re only dealing with simple many-to-many relationships such as mixing and matching pizzas and toppings, a standard ManyToManyField is all you need. However, sometimes you may need to associate data with the relationship between two models.
For example, consider the case of an application tracking the musical groups which musicians belong to. There is a many-to-many relationship between a person and the groups of which they are a member, so you could use a ManyToManyField to represent this relationship. However, there is a lot of detail about the membership that you might want to collect, such as the date at which the person joined the group.
For these situations, Django allows you to specify the model that will be used to govern the many-to-many relationship. You can then put extra fields on the intermediate model. The intermediate model is associated with the ManyToManyField using the through argument to point to the model that will act as an intermediary. For our musician example, the code would look something like this:

```python
from django.db import models

class Person(models.Model):
    name = models.CharField(max_length=128)
    def __str__(self):
        return self.name

class Group(models.Model):
    name = models.CharField(max_length=128)
    members = models.ManyToManyField(Person, through='Membership')
    def __str__(self):
        return self.name

class Membership(models.Model):
    person = models.ForeignKey(Person, on_delete=models.CASCADE)
    group = models.ForeignKey(Group, on_delete=models.CASCADE)
    date_joined = models.DateField()
    invite_reason = models.CharField(max_length=64)
```

When you set up the intermediary model, you explicitly specify foreign keys to the models that are involved in the many-to-many relationship. This explicit declaration defines how the two models are related.

### There are a few restrictions on the intermediate model:

- Your intermediate model must contain one – and only one - foreign key to the source model (this would be Group in our example), or you must explicitly specify the foreign keys Django should use for the relationship using ManyToManyField.through_fields. If you have more than one foreign key and through_fields is not specified, a validation error will be raised. A similar restriction applies to the foreign key to the target model (this would be Person in our example).
- For a model which has a many-to-many relationship to itself through an intermediary model, two foreign keys to the same model are permitted, but they will be treated as the two (different) sides of the many-to-many relationship. If there are more than two foreign keys though, you must also specify through_fields as above, or a validation error will be raised.
- When defining a many-to-many relationship from a model to itself, using an intermediary model, you must use symmetrical=False (seethe model field reference).

Now that you have set up your ManyToManyField to use your intermediary model (Membership, in this case), you’re ready to start creating some many-to-many relationships. You do this by creating instances of the intermediate model:

```shell
>>> ringo = Person.objects.create(name="Ringo Starr")
>>> paul = Person.objects.create(name="Paul McCartney")
>>> beatles = Group.objects.create(name="The Beatles")
>>> m1 = Membership(person=ringo, group=beatles,
...     date_joined=date(1962, 8, 16),
...     invite_reason="Needed a new drummer.")
>>> m1.save()
>>> beatles.members.all()
<QuerySet [<Person: Ringo Starr>]>
>>> ringo.group_set.all()
<QuerySet [<Group: The Beatles>]>
>>> m2 = Membership.objects.create(person=paul, group=beatles,
...     date_joined=date(1960, 8, 1),
...     invite_reason="Wanted to form a band.")
>>> beatles.members.all()
<QuerySet [<Person: Ringo Starr>, <Person: Paul McCartney>]>
```

Unlike normal many-to-many fields, you can’t use add(), create(), or set() to create relationships:

### The following statements will not work

```shell
>>> beatles.members.add(john)
>>> beatles.members.create(name="George Harrison")
>>> beatles.members.set([john, paul, ringo, george])
```

Why? You can’t just create a relationship between a Person and a Group - you need to specify all the detail for the relationship required by the Membership model. The simple add, create and assignment calls don’t provide a way to specify this extra detail. As a result, they are disabled for many-to-many relationships that use an intermediate model. The only way to create this type of relationship is to create instances of the intermediate model.
The remove() method is disabled for similar reasons. For example, if the custom through table defined by the intermediate model does not enforce uniqueness on the (model1, model2) pair, a remove() call would not provide enough information as to which intermediate model instance should be deleted:

```shell
>>> Membership.objects.create(person=ringo, group=beatles,
...     date_joined=date(1968, 9, 4),
...     invite_reason="You've been gone for a month and we miss you.")
>>> beatles.members.all()
<QuerySet [<Person: Ringo Starr>, <Person: Paul McCartney>, <Person: Ringo Starr>]>
>>> # This will not work because it cannot tell which membership to remove
>>> beatles.members.remove(ringo)
```

However, the clear() method can be used to remove all many-to-many relationships for an instance:

```shell
>> # Beatles have broken up
>>> beatles.members.clear()
>>> # Note that this deletes the intermediate model instances
>>> Membership.objects.all()
<QuerySet []>
```

Once you have established the many-to-many relationships by creating instances of your intermediate model, you can issue queries. Just as with normal many-to-many relationships, you can query using the attributes of the many-to-many-related model:

# Find all the groups with a member whose name starts with 'Paul'

```shell
>>> Group.objects.filter(members__name__startswith='Paul')
<QuerySet [<Group: The Beatles>]>
```

As you are using an intermediate model, you can also query on its attributes:

# Find all the members of the Beatles that joined after 1 Jan 1961

```shell
>>> Person.objects.filter(
...     group__name='The Beatles',
...     membership__date_joined__gt=date(1961,1,1))
<QuerySet [<Person: Ringo Starr]>
```

If you need to access a membership’s information you may do so by directly querying the Membership model:

```shell
>>> ringos_membership = Membership.objects.get(group=beatles, person=ringo)
>>> ringos_membership.date_joined
datetime.date(1962, 8, 16)
>>> ringos_membership.invite_reason
'Needed a new drummer.'
```

Another way to access the same information is by querying the many-to-many reverse relationship from a Person object:

```shell
>>> ringos_membership = ringo.membership_set.get(group=beatles)
>>> ringos_membership.date_joined
datetime.date(1962, 8, 16)
>>> ringos_membership.invite_reason
'Needed a new drummer.'
```

### One-to-one relationships

To define a one-to-one relationship, use OneToOneField. You use it just like any other Field type: by including it as a class attribute of your model.
This is most useful on the primary key of an object when that object “extends” another object in some way.
OneToOneField requires a positional argument: the class to which the model is related.
For example, if you were building a database of “places”, you would build pretty standard stuff such as address, phone number, etc. in the database. Then, if you wanted to build a database of restaurants on top of the places, instead of repeating yourself and replicating those fields in the Restaurant model, you could make Restaurant have a OneToOneField to Place (because a restaurant “is a” place; in fact, to handle this you’d typically use inheritance, which involves an implicit one-to-one relation).
As with ForeignKey, a recursive relationship can be defined and references to as-yet undefined models can be made.
OneToOneField fields also accept an optional parent_link argument.
OneToOneField classes used to automatically become the primary key on a model. This is no longer true (although you can manually pass in the primary_key argument if you like). Thus, it’s now possible to have multiple fields of type OneToOneField on a single model.
