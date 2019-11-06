"""
WSGI config for vkfriends project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/1.8/howto/deployment/wsgi/
"""

import os
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "vkfriends.settings.production")

from django.core.wsgi import get_wsgi_application
try:
    application = get_wsgi_application()
except Exception as ex:
    print(ex)
