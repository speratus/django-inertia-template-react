from django.shortcuts import render

from inertia import inertia

# Create your views here.

@inertia("Sample/Page")
def sample(request):
    return {
        'title': "Hello, Inertia", # The values in this dictionary must be Json serializable. By default, inertia uses the InertiaJsonEncoder class to do the serialization.
        'content': "This is a sample of how Inertia integrates with Django. Checkout \"app/views.py\" and \"frontend/src/Pages/Sample/Page.tsx\" for the details",
    }
