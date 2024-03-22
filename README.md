# CarCar

CarCar is a dealership management application designed to assist in the handling of a dealership's inventory, sales, and services operations.

Team:

- Austin Hamilton - Services microservice
- Brian Weber - Sales microservice

## How to Run this App

This application uses multiple microservices. Docker was used in the development environment for containerization of the services, pollers, React, and database. Python and the framework Django version 4.0.3 is used on the backend. React was used for the frontend.

Install Docker with the terminal command:

MacOS - brew install --cask docker
Windows - winget install Docker.DockerDesktop

Docker Desktop can be found [here](https://www.docker.com/products/docker-desktop/)

Install Git
Windows - winget install Git.Git
MacOS - install via homebrew:
Go to [homebrew](https://brew.sh/) and follow the instructions to install. Then run "brew install git" in your terminal application.

Install Python [here](https://www.python.org/downloads/)

Install Django via pip: pip install django

Fork this repository

Copy the cloned repository to your clipboard and clone it to your local machine in your desired directory:
git clone <<your.repository.url.here>>

Build and run the project in their containers using the Docker commands:
docker volume create beta-data
docker-compose build
docker-compose up

When all your containers are running, you can view the project in your web browser at 'http://localhost:3000/'

Your browser should display a page like this:
![Img](/images/CarCarApp.png)

## Diagram

Domain Driven Design was used to design the application. The application consists of three microservices. Their contexts, relationships, and data flows are diagramed in the following image:
![Img](/images/DDDDiagram.png)

## API Documentation

The three microservices:

1. An inventory API that can track and store the dealership's inventory of automobiles, as well as the models and manufacturers of those automobiles.

2. A sales microservice that can store and track the sales of the dealership's automobile sales. It interacts with the inventory API to sync inventory information for the sales associates via a poller function. You can add sales associates, customers, and sales transactions using their respective forms. You can also view a list of sales, sales associates, customers, as well as an individual sales associate's sale history.

3. A services microservice that allows a dealership to schedule appointments and track the status of the appointment from creation to completion or cancellation. It interacts with the inventory API to sync information between inventory and the service department via a poller function. An appointment will store an automobile's VIN, customer, technician, date/time, VIP status, as well as the service status. You can add appointments and technicians using their respective forms. You can also view a list of service appointments as well as search for a specific automobile's service appointment(s).

## URLs and Ports

You can access the following API endpoints via the browser or with an API client. The development team used Insomnia as its API client.

## INVENTORY API ENDPOINTS

### Manufacturers

| Action                         | Method | URL                                          |
| ------------------------------ | ------ | -------------------------------------------- |
| List manufacturers             | GET    | http://localhost:8100/api/manufacturers/     |
| Create a manufacturer          | POST   | http://localhost:8100/api/manufacturers/     |
| Get a specific manufacturer    | GET    | http://localhost:8100/api/manufacturers/:id/ |
| Update a specific manufacturer | PUT    | http://localhost:8100/api/manufacturers/:id/ |
| Delete a specific manufacturer | DELETE | http://localhost:8100/api/manufacturers/:id/ |

To create a manufacturer, you can add the following JSON to the body:

```
{
    "name": "Chrysler"
}
```

Each manufacturer must have a unique name.
An example of the return value from creating, editing, or deleting a manufacturer:

```
{
	"href": "/api/manufacturers/2/",
	"id": 2,
	"name": "Honda"
}
```

A list of manufacturers returns an object with the name "manufacturers" as a key and an array of manufacturer objects as its value.

```
{
  "manufacturers": [
    {
      "href": "/api/manufacturers/1/",
      "id": 1,
      "name": "Daimler-Chrysler"
    }
  ]
}
```

Deleting a manufacturer will simply return the object:

```
{
	"delete": true
}
```

### Vehicle Models

| Action                   | Method | URL                                   |
| ------------------------ | ------ | ------------------------------------- |
| List models              | GET    | http://localhost:8100/api/models/     |
| Create a models          | POST   | http://localhost:8100/api/models/     |
| Get a specific models    | GET    | http://localhost:8100/api/models/:id/ |
| Update a specific models | PUT    | http://localhost:8100/api/models/:id/ |
| Delete a specific models | DELETE | http://localhost:8100/api/models/:id/ |

In order to create a vehicle model, you need the name, a picture URL, and a manufacturer ID.

```
{
  "name": "Sebring",
  "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
  "manufacturer_id": 1
}
```

In order to edit a model, you can change the name and/or picture URL. You cannot change the manufacturer ID.

```
{
  "name": "Sebring",
  "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg"
}
```

The return value from creating, editing, or viewing the details of a model returns the following:

```
{
  "href": "/api/models/1/",
  "id": 1,
  "name": "Sebring",
  "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
  "manufacturer": {
    "href": "/api/manufacturers/1/",
    "id": 1,
    "name": "Daimler-Chrysler"
  }
}
```

Getting a list of vehicle models returns an object with the name "models" as a key and an array of model objects as its value.

```
{
  "models": [
    {
      "href": "/api/models/1/",
      "id": 1,
      "name": "Sebring",
      "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
      "manufacturer": {
        "href": "/api/manufacturers/1/",
        "id": 1,
        "name": "Daimler-Chrysler"
      }
    }
  ]
}
```

Deleting a model will simply return the object:

```
{
	"delete": true
}
```

### Automobiles

| Action                        | Method | URL                                          |
| ----------------------------- | ------ | -------------------------------------------- |
| List automobiles              | GET    | http://localhost:8100/api/automobiles/       |
| Create a automobiles          | POST   | http://localhost:8100/api/automobiless/      |
| Get a specific automobiles    | GET    | http://localhost:8100/api/automobiless/:vin/ |
| Update a specific automobiles | PUT    | http://localhost:8100/api/automobiless/:vin/ |
| Delete a specific automobiles | DELETE | http://localhost:8100/api/automobiless/:vin/ |

To create an automobile, you need the color, year, vin, and model_id. An automobile's VIN number is the primary identifier to query a specific automobile. Notice `:vin` is appended to the URL for the detail, update, and delete endpoints above. An example URL and JSON body would be as follows:

http://localhost:8100/api/automobiles/1C3CC5FB2AN120174/

```
{
  "color": "red",
  "year": 2012,
  "vin": "1C3CC5FB2AN120174",
  "model_id": 1
}
```

You can update an automobile with the color, year, and sold status (true/yes, false/no) with the following JSON:

```
{
  "color": "red",
  "year": 2012,
  "sold": true
}
```

Getting the results of a detail, create, or delete view gives:

```
{
  "href": "/api/automobiles/1C3CC5FB2AN120174/",
  "id": 1,
  "color": "yellow",
  "year": 2013,
  "vin": "1C3CC5FB2AN120174",
  "model": {
    "href": "/api/models/1/",
    "id": 1,
    "name": "Sebring",
    "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
    "manufacturer": {
      "href": "/api/manufacturers/1/",
      "id": 1,
      "name": "Daimler-Chrysler"
    }
  },
  "sold": false
}
```

Getting a list of automobiles returns an object with the name "autos" as a key and an array of automobile objects as its value.

```
{
  "autos": [
    {
      "href": "/api/automobiles/1C3CC5FB2AN120174/",
      "id": 1,
      "color": "yellow",
      "year": 2013,
      "vin": "1C3CC5FB2AN120174",
      "model": {
        "href": "/api/models/1/",
        "id": 1,
        "name": "Sebring",
        "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
        "manufacturer": {
          "href": "/api/manufacturers/1/",
          "id": 1,
          "name": "Daimler-Chrysler"
        }
      },
      "sold": false
    }
  ]
}
```

Deleting an automobile will simply return the object:

```
{
	"delete": true
}
```

## Service Microservice

The services microservice enables a dealership to schedule appointments for customers to have their vehicles serviced. This is done with an easy to use appointment creation form. Each appointment can keep track of the appointment date/time, the status (created, finished, canceled), the assigned technician, the VIN of the vehicle, the customer name, and if the customer has VIP status. The list view of all appointments allows the user to change the service status of an appointment to 'Canceled' or 'Finished' with a single click. The VIN is taken from the Automobile Value Object (see value objects below). A user can also search for the service history of a specific vehicle by VIN.

A user can also view a list of all technicians employed by the dealership as well as add any number of technicians using a technician form as well.

### Services API Endpoints

| Action                       | Method | URL                                                |
| ---------------------------- | ------ | -------------------------------------------------- |
| List technicians             | GET    | http://localhost:8100/api/technicians/             |
| Create a technician          | POST   | http://localhost:8100/api/technicians/             |
| Delete a specific technician | DELETE | http://localhost:8100/api/technicians/id/          |
| List appointments            | GET    | http://localhost:8100/api/appointments/            |
| Create an appointment        | POST   | http://localhost:8100/api/appointments/            |
| Delete an appointment        | DELETE | http://localhost:8100/api/appointments/id/         |
| Set appt status to canceled  | PUT    | http://localhost:8100/api/manufacturers/id/cancel/ |
| Set appt status to finished  | PUT    | http://localhost:8100/api/manufacturers/id/finish/ |

### Technicians

Getting a list of technicians returns an object with the name "technicians" as a key and an array of technician objects as its value. All you need is the JSON for an employee ID, first name, and last name:

```
{
	"technicians": [
		{
			"first_name": "Elliott",
			"last_name": "Porter",
			"employee_id": 2
		},
	]
}
```

Creating a technician involves adding JSON for a first name, last name, and employee ID as follows:

```
{
    "first_name": "Wanda",
    "last_name": "Maximoff",
    "employee_id": 1
}
```

Deleting a technician will simply return the object:

```
{
	"delete": true
}
```

### Appointments

Getting a list of appointments returns an object with the name "appointments" as a key and an array of technician objects as its value. All you need is the JSON for an employee ID, first name, and last name:

```
{
  "appointments": [
		{
			"id": 2,
      "date_time": "2024-02-01T12:30:00Z",
      "reason": "Routine inspection",
      "status": "Scheduled",
      "vin": "15214",
      "customer": "Ronald McDonald",
      "technician_id": 1,
      "vip": false
		}
	]
}
```

Creating an appointment requires the date/time, reason, status, vin, customer, and technician_id:

```
{
    "date_time": "2024-02-17T12:30:00",
    "reason": "Car broken",
    "status": "Scheduled",
    "vin": "15214",
    "customer": "Carl Jung",
    "technician_id": 1
}
```

and will produce the output:

```
{
  "message": "Appointment created successfully",
  "appointment_id": 4
}
```

Changing the status of an appointment will produce the output:

```
{
  "status": "canceled"
}
```

and

```
{
  "status": "finished"
}

```

Deleting an appointment will simply return the object:

```
{
  "delete": true
}
```

### Sales Microservice

The sales microservice allows a dealership to manage its sales associates, customers, and sales transactions. Each one of those entities is defined in the models.py file. The microservice combines the abilities to track those entities along with automobile data from inventory (see value objects below). A dealership will be able to add as many associates, customers and sales records as it would like using the respective forms and then view a running list of those entities for reference at any point. Inventory is on a 60 second delay by way of a polling function in the microservice's poller.py file.

A sales microservice that can store and track the sales of the dealership's automobile sales. It interacts with the inventory API to sync inventory information for the sales associates via a poller function. You can add sales associates, customers, and sales transactions using their respective forms. You can also view a list of sales, sales associates, customers, as well as an individual sales associate's sale history.

### Sales API Endpoints

| Action                        | Method | URL                                       |
| ----------------------------- | ------ | ----------------------------------------- |
| List salespeople              | GET    | http://localhost:8100/api/salespeople/    |
| Create a salesperson          | POST   | http://localhost:8100/api/salespeople/    |
| Delete a specific salesperson | DELETE | http://localhost:8100/api/salespeople/id/ |
| List customers                | GET    | http://localhost:8100/api/customers/      |
| Create a customer             | POST   | http://localhost:8100/api/customers/      |
| Delete a customer             | DELETE | http://localhost:8100/api/customers/id/   |
| List sales                    | GET    | http://localhost:8100/api/sales/          |
| Create a sale                 | POST   | http://localhost:8100/api/sales/          |
| Delete a sale                 | DELETE | http://localhost:8100/api/sales/id/       |

### Salespeople

Getting a list of salespeople returns an object with the name "salespeople" as a key and an array of salespeople objects as its value.

```
{
  "salespeople": [
    {
      "first_name": "Brian",
      "last_name": "Weber",
      "employee_id": 1
    },
  ]
}
```

You can create a salesperson with a first name, last name and employee ID with JSON as follows:

```
{
  "first_name": "Weber",
  "last_name": "Brian",
  "employee_id": 4
}
```

Deleting a salesperson will simply return the object:

```
{
  "delete": true
}
```

### Customers

Getting a list of customers returns an object with the name "customers" as a key and an array of customer objects as its value.

```
{
  "customers": [
    {
      "first_name": "Brian",
      "last_name": "Weber",
      "address": "1234",
      "phone_number": "4023045267"
    },
  ]
}
```

Creating a customer simply takes a first name, last name, address, and phone number:

```
{
  "first_name": "porter",
  "last_name": "elliot",
  "address": "435 N Hubbard Ave",
  "phone_number": "4023045267"
}
```

Deleting a customer will simply return the object:

```
{
  "delete": true
}
```

### Sales

Getting a list of sales returns an object with the name "sales" as a key and an array of sales objects as its value.

```
{
  "sales": [
    {
      "price": 10000,
      "automobile": ,
      "salesperson": ,
      "customer": {
        "first_name": "Steve",
        "last_name": "Rogers",
        "address": "555 S 55th St",
        "phone_number": "867-530-9111"
      }
    }
  ]
}
```

Creating a sale takes a VIN, salesperson, customer, and price:

```
{
  "vin": "1C3CC5FB2AN120174",
  "salesperson": "Thor Odinson",
  "customer": "Tony Stark",
  "price": 10000
}
```

Deleting a sale will simply return the object:

```
{
  "delete": true
}
```

### Value Objects

The Sales microservice uses an Automobile Value Object to store data from the inventory's Automobile object. This value object only stores the VIN and Sold Status. Data between the inventory's automobile object and the sales microservice is synchronized every sixty seconds via the poll function in the sales microservice poller.py file. The AutomobileVO model is also used as a foreign key to the Sales object. This allows Sales to store specific automobile information for reference.

The Services microservice also uses an Automobile Value Object to store data from the inventory's Automobile object. This value object only stores the VIN and Sold Status. Data between the inventory's automobile object and the services microservice is synchronized every sixty seconds via the poll function in the services microservice poller.py file. The AutomobileVO is used to get the VIN number for use in making an appointment so the technician can see which automobile will be serviced.
