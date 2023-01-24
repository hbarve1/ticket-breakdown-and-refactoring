# Ticket Breakdown

We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**

Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".

You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

Assumtions:

- we have 3 tables in our data base: 'agents', 'facilities', 'shifts'.
- we are using mongodb(NoSQL) database.

Ticket 1: Create a separate collection 'agentsInFacilities'

- Acceptance Criteria
  - create a unique key by combining 'agent_id' and 'facility_id'
  - add another column 'custom_id' here
  - if custom_id is not added, there will be no value saved here.
  - as one agent can work with multiple facilities, and any or all of facilities can assign custom_id to same agent they work with, so it has to be saved in separate table.
- Time estimates: 1 hr
- Implementation details:
  - create a table named "agentsInFacilities"
  - primary key or unique key a combination of two keys 'agent_id' from 'agents' table and 'facility_id' from facility table.
  - add another column named 'custom_id' with type string and char length 40(it can be increased if facilities make requirement).
  - deploy new schema to database.

Ticket 2: Make functionality so that facilities can add or update custom_id of agents they have worked with in 'agentsInFacilities' table

- Acceptance Criteria:
  - Facilities can edit the custom_id field of Agents they work with
  - Facilities can only edit the custom_id field of Agents they have worked with or will work with in the future
  - Facilities can only view the custom_id field of Agents they have worked with or will work with in the future
- Time/Effort Estimate: 4 hours
- Implementation Details:
  - Create a new view in the application that allows Facilities to edit the custom_id field of Agents they work with.
  - Implement authentication and authorization to ensure that only the Facility that worked with the Agent can edit the custom_id field
  - Implement another view for Facilities to view the custom_id field of Agents they have worked with or will work with in the future

Ticket 3: Use custom Agent ID when generating reports for Facilities

- Acceptance Criteria:
  - The custom_id field is used when generating reports for Facilities
  - If the custom_id field is empty, the internal database id will be used instead
- Time/Effort Estimate: 2 hour
- Implementation Details:
  - Update the generateReport function to use the custom_id field instead of the internal database id when generating reports.
  - If the custom_id field is empty, the internal database id will be used instead
  - Test the function with different scenarios (custom_id is empty and not empty) to make sure it's working as expected.

Ticket 4: unit testing, integration testing and E2E testing

- Acceptance Criteria:
  - Testing updated schema proply deploying to database
  - make sure it is not deleting any old data in migration
  - make sure any existing functions are not breaking as we updated the schema
  - make sure function is generating correct results with or without 'custom_id'
- Time estimates: 6 hrs
- Implementation details:
  - unit testing of all the existing function
  - schema deploy testing while mock schema deploy
  - integration testing with new functions and updated schema
  - e2e testing of whole application with existing feature and new feature
