from django.shortcuts import render
from common.json import ModelEncoder
from .models import Salesperson, Customer, AutomobileVO, Sale
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse

# Create your views here.
import json


class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "vin",
        "sold",
    ]


class SalespeopleListEncoder(ModelEncoder):
    model = Salesperson
    properties = [
        "first_name",
        "last_name",
        "employee_id",
    ]


class SalespersonDetailEncoder(ModelEncoder):
    model = Salesperson
    properties = [
        "first_name",
        "last_name",
        "employee_id",
    ]


class CustomerListEncoder(ModelEncoder):
    model = Customer
    properties = [
        "first_name",
        "last_name",
        "address",
        "phone_number",
    ]


class CustomerDetailEncoder(ModelEncoder):
    model = Customer
    properties = [
        "first_name",
        "last_name",
        "address",
        "phone_number",
    ]


class SalesListEncoder(ModelEncoder):
    model = Sale
    properties = [
        "price",
        "automobile",
        "salesperson",
        "customer",
    ]
    encoders = {
        "automobile": AutomobileVOEncoder(),
        "salesperson": SalespersonDetailEncoder(),
        "customer": CustomerDetailEncoder(),
    }


class SaleDetailEncoder(ModelEncoder):
    model = Sale
    properties = [
        "price",
        "automobile",
        "salesperson",
        "customer",
        "id",
    ]
    encoders = {
        "automobile": AutomobileVOEncoder(),
    }


@require_http_methods(["GET", "POST"])
def api_list_salespeople(request):
    if request.method == "GET":
        salespeople = Salesperson.objects.all()
        return JsonResponse(
            {"salespeople": salespeople},
            encoder=SalespeopleListEncoder,
            safe=False,
        )
    else:
        try:
            content = json.loads(request.body)
            person = Salesperson.objects.create(**content)
            return JsonResponse(
                person,
                encoder=SalespersonDetailEncoder,
                safe=False,
            )
        except:
            response = JsonResponse({"message": "Could not create the salesperson"})
            response.status_code = 400
            return response


@require_http_methods(["DELETE"])
def api_delete_salesperson(request, pk):
    try:
        count, _ = Salesperson.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})
    except Salesperson.ObjectDoesNotExist:
        return JsonResponse({"message": "Does not exist"})


@require_http_methods(["GET", "POST"])
def api_list_customers(request):
    if request.method == "GET":
        customers = Customer.objects.all()
        return JsonResponse(
            {"customers": customers},
            encoder=CustomerListEncoder,
            safe=False,
        )
    else:
        try:
            content = json.loads(request.body)
            customer = Customer.objects.create(**content)
            return JsonResponse(
                customer,
                encoder=CustomerDetailEncoder,
                safe=False,
            )
        except:
            response = JsonResponse({"message": "Could not create the customer"})
            response.status_code = 400
            return response


@require_http_methods(["DELETE"])
def api_delete_customer(request, pk):
    try:
        count, _ = Customer.objects.filter(id=pk).delete()
        return JsonResponse({"delete": count > 0})
    except Customer.ObjectDoesNotExist:
        return JsonResponse({"message": "Does not exist"})


@require_http_methods(["GET", "POST"])
def api_list_sales(request):
    if request.method == "GET":
        sales = Sale.objects.all()
        return JsonResponse(
            {"sales": sales},
            encoder=SalesListEncoder,
            safe=False,
        )
    else:
        try:
            content = json.loads(request.body)
            vin = content["automobile"]
            automobile = AutomobileVO.objects.get(pk=vin)
            content["automobile"] = automobile
            # automobile = AutomobileVO.objects.get(id=content["automobile"])
            # content["automobile"] = automobile

            salesperson = Salesperson.objects.get(id=content["salesperson"])
            content["salesperson"] = salesperson

            customer = Customer.objects.get(id=content["customer"])
            content["customer"] = customer

            sale = Sale.objects.create(**content)
            return JsonResponse(
                sale,
                encoder=SaleDetailEncoder,
                safe=False,
            )
        except:
            response = JsonResponse({"message": "Could not create the sale"})
            response.status_code = 400
            return response


@require_http_methods(["DELETE"])
def api_delete_sale(request, pk):
    try:
        count, _ = Sale.objects.filter(id=pk).delete()
        return JsonResponse({"delete": count > 0})
    except Sale.ObjectDoesNotExist:
        return JsonResponse({"message": "Does not exist"})
