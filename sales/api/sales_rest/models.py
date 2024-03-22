from django.db import models
from django.core.exceptions import ObjectDoesNotExist
from django.urls import reverse


# Create your models here.
class Salesperson(models.Model):
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    employee_id = models.PositiveSmallIntegerField()

    def __str__(self):
        return self.first_name

    def get_api_url(self):
        return reverse("api_salesperson", kwargs={"pk": self.id})


class Customer(models.Model):
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    address = models.CharField(max_length=200)
    phone_number = models.CharField(max_length=400)

    def __str__(self):
        return self.first_name

    def get_api_url(self):
        return reverse("api_customer", kwargs={"pk": self.pk})


class AutomobileVO(models.Model):
    vin = models.CharField(max_length=200, unique=True)
    sold = models.BooleanField(default=False)
    href = models.CharField(max_length=200, unique=True, null=True)

    def __str__(self):
        return self.vin

    def get_api_url(self):
        return reverse("api_automobile", kwargs={"vin": self.vin})


class Sale(models.Model):
    price = models.PositiveIntegerField()
    automobile = models.ForeignKey(
        AutomobileVO,
        related_name="sales",
        on_delete=models.CASCADE,
    )
    salesperson = models.ForeignKey(
        Salesperson,
        related_name="sales",
        on_delete=models.CASCADE,
    )
    customer = models.ForeignKey(
        Customer,
        related_name="sales",
        on_delete=models.CASCADE,
    )

    # def __str__(self):
    #     return self.price

    def get_api_url(self):
        return reverse("api_sale", kwargs={"pk": self.pk})


class Salesperson(models.Model):
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    employee_id = models.PositiveSmallIntegerField()

    def __str__(self):
        return self.first_name

    def get_api_url(self):
        return reverse("api_salesperson", kwargs={"pk": self.pk})


class Customer(models.Model):
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    address = models.CharField(max_length=200)
    phone_number = models.PositiveSmallIntegerField()

    def __str__(self):
        return self.first_name

    def get_api_url(self):
        return reverse("api_customer", kwargs={"pk": self.pk})


class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)
    sold = models.BooleanField(default=False)

    def __str__(self):
        return self.vin

    def get_api_url(self):
        return reverse("api_automobile", kwargs={"pk": self.pk})


class Sale(models.Model):
    price = models.PositiveIntegerField()
    automobile = models.ForeignKey(
        AutomobileVO,
        related_name="sales",
        on_delete=models.CASCADE,
    )
    salesperson = models.ForeignKey(
        Salesperson,
        related_name="sales",
        on_delete=models.CASCADE,
    )
    customer = models.ForeignKey(
        Customer,
        related_name="sales",
        on_delete=models.CASCADE,
    )

    def __str__(self):
        return self.price

    def get_api_url(self):
        return reverse("api_sale", kwargs={"pk": self.pk})
