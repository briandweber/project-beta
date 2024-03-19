from django.shortcuts import render
from common.json import ModelEncoder
from .models import Salesperson, Customer, AutomobileVO, Sale
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse

# Create your views here.
import json


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
        content = json.loads(request.body)
        person = Salesperson.objects.create(**content)
        return JsonResponse(
            person,
            encoder=SalespersonDetailEncoder,
            safe=False,
        )
