# This project is for Capstone Cloud Nanodegree in Udacity

## Pintar App

* is an backend of imaginary education company.
* user could capture a question an open a session with tutor.
* Session will be similar to udacity Mentor help session.


### How to run:
```
1. cd client
2. npm install && ionic serve
```

### Functionality:
1. when user signup, it will set to student account
2. user can create class 
    * to create Class:
        * user has to upload image
        * set starttime
        * set endtime

3. user can update profile: 
    * change avatar
    * change username
    * change phonenumber

4. user can get list of tutor

## Tables DynamoDB

### User Table

* name: string
* age
* school
* photo
* type: 1000 (student) | 1020 (tutor)
* createdAt
* has-many session

### Tutor Table

similar to User Table (with more information)
* has-many session
* has-many session-history

### Session Table

- has-1 image.
- studentID:
- tutorID:
- status: "0"(open) | "1"(Complete) | "2"(CLOSE)
- createdAt:
- chat-history: Chat[]
```
    Chat { 
        chatId:
        replyToID:
        author:
        content:
        createdAt:
    }
```
