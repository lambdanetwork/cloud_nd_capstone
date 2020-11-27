# This project is for Capstone Cloud Nanodegree in Udacity

## Pintar App

### is an backend of imaginary education company.

### user could capture a question an open a session with tutor.

### Session will be similar to udacity Mentor help session.

# Tables - auth0

## User

userId
username
email
password
tenant
emailVerified
"phoneNumber": "1-000-000-0000",
"phoneNumberVerified": true,

# Tables DynamoDB

## User Table

name
age
school
photo
type: 900 | 100 | 200
createdAt
has-many session

## Tutor Table

similar to User Table (with more information)
has-many session
has-many session-history

session-involved: MAP

- sessionId:
- student:
- ratingFromStudent:
- createdAt:
- completedAt:

## Session Table

has-1 image.
studentID:
tutorID:
status: open | end
createdAt:
chat-history:
List?<Chat>:
{ chatId:
replyToID:
author:
content:
createdAt:
}
