from django.urls import path

from .views import api_technicians, api_show_technicians, api_appointments, api_show_appointment, api_update_appointment

urlpatterns = [
    # path("appointments/", api_list_appointments, name="api_list_appointments"),
    path("technicians/", api_technicians, name="list_technicians"),
    path("technicians/<int:pk>/", api_show_technicians, name="show_technician"),
    path("appointments/", api_appointments, name="api_appointments"),
    path("appointments/<int:pk>/", api_show_appointment, name="show_appointment"),
    path("appointments/<int:pk>/cancel/", api_update_appointment, name="cancel_appointment"),
    path("appointments/<int:pk>/finish/", api_update_appointment, name="finish_appointment"),
]