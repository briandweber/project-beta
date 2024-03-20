from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from common.json import ModelEncoder
import json
from django.http import JsonResponse
from .models import Appointment, AutomobileVO, Technician

# Create your views here.


class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "vin",
        "sold",
        "href"
    ]

class TechnicianEncoder(ModelEncoder):
    model = Technician
    properties = [
        "first_name",
        "last_name",
        "employee_id",
        "id"
    ]


class AppointmentEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "id",
        "date_time",
        "vin",
        "customer",
        "technician",
        "reason",
        "vip",
        "status"
    ]
    encoders = {
        "technician": TechnicianEncoder(),
    }


@require_http_methods(["GET", "POST"])
def api_technicians(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse(
            {"technicians": technicians},
            encoder=TechnicianEncoder,
        )
    else:
        content = json.loads(request.body)
        technician = Technician.objects.create(**content)
        return JsonResponse(
            technician,
            encoder=TechnicianEncoder,
            safe=False,
        )
    
@require_http_methods(["GET", "DELETE"])
def api_show_technicians(request, pk):
    if request.method == "GET":
        technician = Technician.objects.get(id=pk)
        return JsonResponse(
            technician,
            encoder=TechnicianEncoder,
            safe=False
        )
    else:
        count, _ = Technician.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})
    

@require_http_methods(["GET", "POST"])
def api_appointments(request, automobile_vo_id=None):
    if request.method == "GET":
        if automobile_vo_id is not None:
            appointments = Appointment.objects.filter(automobile=automobile_vo_id)
        else:
            appointments = Appointment.objects.all()
        return JsonResponse(
            {"appointments": appointments},
            encoder=AppointmentEncoder,
        )

    else:
        content = json.loads(request.body)
        try:
            technician = Technician.objects.get(id=content["technician"])
            content["technician"] = technician
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "Technician does not exist"},
                status=400,
            )
        appointment = Appointment.objects.create(**content)
        return JsonResponse(
            appointment,
            encoder=AppointmentEncoder,
            safe=False
        )
    
@require_http_methods(["GET", "DELETE"])
def api_show_appointment(request, pk):
    if request.method == "GET":
        appointment = Appointment.objects.get(id=pk)
        return JsonResponse(
            appointment,
            encoder=AppointmentEncoder,
            safe=False,
        )
    else:
        count, _ = Appointment.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})

@require_http_methods(["PUT"])
def api_update_appointment(request, pk):
    try:
        appointment = Appointment.objects.get(id=pk)
    except Appointment.DoesNotExist:
        return JsonResponse(
            {"message": "Appointment does not exist"},
            status=404,
        )
    
    if appointment.status != 'created':
        return JsonResponse(
            {"message": "Appointment is already canceled/finished"},
            status=400,
        )
    content = json.loads(request.body)
    new_status = content.get("status")

    if new_status not in ['canceled', 'finished']:
        return JsonResponse(
            {"message": "Invalid status provided. Status must be either 'canceled' or 'finished'"},
            status=400
        )
    
    appointment.status = new_status
    appointment.save()

    return JsonResponse(
        {"message": f"Appointment status updated to {new_status}"},
        status=200
    )