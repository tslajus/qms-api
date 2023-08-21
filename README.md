# Queue Management System (back-end part)

Queue Management System (QMS) is a back-end API designed to streamline the reservation process for customers and provide efficient queue management for specialists. This system enables customers to reserve visits, track time left for their reservations, and cancel reservations if necessary. Specialists can log in, view assigned patients, manage visits, and prioritize visits as needed.

## Requirements

- **Node.js:** Version 16.20.0
- **Framework:** Express.js
- **Database:** MongoDB

## Installation

Follow the steps below to install and run the Queue Management System:

1. **Clone the repository:** `git clone https://github.com/tslajus/qms-api.git`
2. **Navigate to the project directory:** `cd qms-api`
3. **Install the necessary dependencies:** `npm install`
4. **Configure the database:** Ensure MongoDB is installed and running. You can use the provided test database or configure your own.
5. **Update environmental variables:** Set the necessary environmental variables or use the test ones provided in the repository.
6. **Run the application:** `npm start`

Once the application is running, you can access the API endpoints as mentioned in the "Endpoints" section.

## Endpoints

### For Customers:

- **Reserve a Visit:** `POST /api/v1/reservations/reserve` - Allows customers to reserve a visit. When a customer hits this endpoint, the system looks for the earliest available time and reserves the spot for the customer. The response will include a reservation code, a visible code, and the time of the visit.
- **Check Time Left:** `GET /api/v1/reservations/time-left/:reservationCode` - Allows customers to view the time left for their reservation. The response will include the time left in days, hours, and minutes, and the status of the visit (ACTIVE, PENDING, COMPLETED, or CANCELED). If the visit is completed or canceled, the response will also include the time it was done.
- **Cancel Reservation:** `PATCH /api/v1/reservations/cancel/:reservationCode` - Allows customers to cancel their reservation. The response will confirm the successful cancellation of the visit.

### For Specialists:

- **Login:** `POST /api/v1/specialists/login` - Allows specialists to log in. The response will include a token that should be used for authentication in other endpoints, and the ID and name of the specialist.
- **Fetch Assigned Patients:** `GET /api/v1/specialists/:id/patients` - Allows specialists to fetch the patients assigned to them.
- **Fetch Specialists' Info:** `GET /api/v1/specialists/info` - Allows anyone to fetch the information of all the specialists. The response includes the name of the specialist, whether they have a day off, their working hours, and whether they are currently working.
- **Mark Visit:** `PATCH /api/v1/specialists/mark-visit/:reservationCode` - Allows specialists to update the status of a visit to ACTIVE, COMPLETED, or CANCELED.
- **Select Visit:** `PATCH /api/v1/specialists/:id/select-visit` - Allows specialists to select a visit out of order, setting its priority to true and saving the time it got priority.

### For Visit Display Board:

- **Fetch Visits:** `GET /api/v1/display-board/visits` - Fetches the visits to be displayed on the visit display board. The response will include the active visits, the pending visits, and the visits marked as priority.

## Front-end Integration and Application Deployment:

- **Front-end Repository:** The front-end part of the Queue Management System, designed to work with the back-end API, can be found at the following repository: [QMS UI Repository](https://github.com/tslajus/qms_ui)
- **Deployed System:** The fully functional Queue Management System is deployed and can be accessed at [https://qms.slajus.dev](https://qms.slajus.dev)
- **Deployed Display Board:** The visit display board, showcasing the active, pending, and priority visits, can be accessed at [https://qms.slajus.dev/display-board](https://qms.slajus.dev/display-board)
