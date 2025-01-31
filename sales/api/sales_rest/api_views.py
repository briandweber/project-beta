from django.shortcuts import render
from common.json import ModelEncoder
from .models import Salesperson, Customer, AutomobileVO, Sale
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse

import json

from .encoders import (
    AutomobileVO,
    SalespeopleListEncoder,
    SalespersonDetailEncoder,
    CustomerListEncoder,
    CustomerDetailEncoder,
    SalesListEncoder,
    SaleDetailEncoder,
)


@require_http_methods(["GET", "POST"])
def api_list_salespeople(request):
    try:
        if request.method == "GET":
            salespeople = Salesperson.objects.all()
            return JsonResponse(
                {"salespeople": salespeople},
                encoder=SalespeopleListEncoder,
                safe=False,
            )
    except:
        response = JsonResponse({"message": "Could not list the salespeople"})
        response.status_code = 400
        return response

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
    try:
        if request.method == "GET":
            customers = Customer.objects.all()
            return JsonResponse(
                {"customers": customers},
                encoder=CustomerListEncoder,
                safe=False,
            )
    except:
        response = JsonResponse({"message": "Could not list the customers"})
        response.status_code = 400
        return response

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
    try:
        if request.method == "GET":
            sales = Sale.objects.all()
            return JsonResponse(
                {"sales": sales},
                encoder=SalesListEncoder,
                safe=False,
            )
    except:
        response = JsonResponse({"message": "Could not list the sales"})
        response.status_code = 400
        return response

    else:
        try:
            content = json.loads(request.body)
            vin = content["automobile"]
            automobile = AutomobileVO.objects.get(vin=vin)
            content["automobile"] = automobile
            automobile.sold = True
        except:
            response = JsonResponse({"message": "Could not add the automobile"})
            response.status_code = 400
            return response

        try:
            salesperson_id = content["salesperson"]
            salesperson = Salesperson.objects.get(employee_id=salesperson_id)
            content["salesperson"] = salesperson
        except:
            response = JsonResponse({"message": "Could not add the salesperson"})
            response.status_code = 400
            return response

        try:
            customer_id = content["customer"]
            customer = Customer.objects.get(id=customer_id)
            content["customer"] = customer
        except:
            response = JsonResponse({"message": "Could not add the customer"})
            response.status_code = 400
            return response

        try:
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
