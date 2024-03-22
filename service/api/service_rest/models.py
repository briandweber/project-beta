from django.db import models
from django.urls import reverse
# Create your models here.

class Technician(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    employee_id = models.CharField(max_length=50)

    def get_api_url(self):
        return reverse("api_technician_model", kwargs={"pk": self.id})
    

class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17)
    sold = models.BooleanField(default=False)
    href = models.CharField(max_length=200, unique=True, null=True)

    def get_api_url(self):
        return reverse("api_automobileVO", kwargs={"vin": self.vin})


class Appointment(models.Model):
    date_time = models.DateTimeField(auto_now_add=True)
    reason = models.TextField()
    status = models.CharField(max_length=100, default='created')
    vin = models.CharField(max_length=17)
    customer = models.CharField(max_length=100)
    vip = models.BooleanField(default=False)
    technician = models.ForeignKey(
        Technician,
        related_name="appointments",
        on_delete=models.PROTECT
    )

    def get_api_url(self):
        return reverse("api_appointment", kwargs={"pk": self.id})
    
    