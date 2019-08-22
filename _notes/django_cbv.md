---
layout: single
title: "Django Class Based Views"
excerpt: "Intro to Django Class Based Views"

sidebar:
  - title: "Django Class Based Views"
    text: "Python 3.x, Django 2.x, PythonAnywhere.com"
---


<!-- Django CBVs -->


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

This queryset result will be used by the get_context_data() method of this mixin to actually put it to the context by saving to a context variable named object_list. Notice that you can set the context_object_name attribute to add and extra another variable to the context with the queryset beyond object_list (for example if you have an ArticleLsitView you can set context_object_name = articles to be able to do {% raw %} {% for article in articles %} {% endraw %} in your context instead of  {% raw %} {% for article in object_list %}  {% endraw %}).

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
