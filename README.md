# ToDo App

This project was made using:

Java Spring Boot (BE)

JavaScript  React Bootstrap (FE)

PostgreSQL (DB)

Approx. working time :18h

## To run the app (FE)

To install all the required dependencies open FE folder location in terminal and type:

npm install

## To run the app (BE)

Connect to your postgreSQL DB and add details to application.properties

## Presentation

Add Task Validation

-Estimated working days can't be lower than 1
![Task Validation](/presentation-images/AddTaskValidation.png)



-Deadline of the task can't be in the past
![Task Validation](/presentation-images/AddTaskValidation1.png)





Different states of a task

-Task1 is finished

-Task2 is ongoing

![Task States](/presentation-images/DIfferentStates.png)


-Task3 is ongoing but must be finished today

-Task4 is due date

-Task5 is ongoing but must be finished tomorrow

![Task States](/presentation-images/DifferentStates1.png)




To finish a task we must provide the actual time(days) we spent doing it

![Finish Task](/presentation-images/FinishingATask.png)




Sorting

-default (by creation time)

![Sorting](/presentation-images/Sorting.png)


-ascending order (by remaining days untill deadline)

![Sorting](/presentation-images/SortingAsc.png)


-descending order (by remaining days untill deadline)

![Sorting](/presentation-images/SortingDesc.png)

