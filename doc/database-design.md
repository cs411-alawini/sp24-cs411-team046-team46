# Database Design

## Assumptions
- User: Represents users information. Modeled as an entity because each user has various unique attributes such as name, age, sex, etc. Having access to this information will allow for a more personalized, tailored service for users. We will use user’s information to provide a personalized diagnosis and treatment. There will be one user to many diseases since we want to provide multiple diseases the user could be experiencing.

- Chatbot: Stores chat logs pertaining to each user. Modeled as an entity in order to store all the user’s past chat logs. We want user’s to be able to look at past chat queries at any time. There will be many chat logs for each user since users may make multiple chat queries, therefore creating a 1-many relationship between User and Chatbot. 

- Disease: Provides a variety of different diseases. Modeled as an entity because diseases have various attributes such as name, associated symptoms, treatments, etc. Having access to these attributes will allow us to match up diseases based on the symptoms experienced by the user. There will be many diseases for each user as we are planning to provide multiple diseases the user may be experiencing.

- Symptom: Represents different symptoms pertaining to the specific disease. Modeled as an entity because symptoms will have attributes such as the rarity, severity, and potential disease that is causing the symptom. There will be many symptoms to many diseases as each disease could cause multiple symptoms, creating a many-many relationship.

- Treatment: Represents the possible treatments or procedures for managing or curing the disease. Modeled as an entity since the treatment has multiple unique attributes such as the name, disease, quantity of the medicine, and advice. There will be many treatments to many diseases since diseases may have multiple treatments. 

- Medicine: Represents potential pharmaceutical substances for treating the disease. This is modeled as an entity since we want to store the name and website links to purchase the medicine. There will be many medicines for each treatment since there may be multiple medicines that will work as a treatment.

## Database Normalization
This schema adheres to 3NF, which we chose here over BCNF because lossless decomposition is comparatively much easier to achieve in the case of 3NF, even though there is higher possible redundancy.

First, for 1NF, we made sure that each table had a primary key, all attributes were simple and indivisible and that there were no multi valued attributes (which is why “Symptom” was removed from the Disease table)

Then, for 2NF, after ensuring that 1NF was satisfied, we made sure that all non-key attributes were dependent on the full primary key (Adding diagnosisID and messageID to make sure the ID’s were unique and all non-key attributes could be found from them).

Finally, for 3NF, after ensuring that 2NF was satisfied, we made sure that no attributes depended on those attributes, which were not primary keys (as all).


## Relational Schema
- User(userID:INT [PK], FirstName:VARCHAR(100), LastName:VARCHAR(100), Height:REAL, Weight:REAL, Sex:VARCHAR(1), Age:INT, Race:VARCHAR(30), Email:VARCHAR(100), Address:VARCHAR(100))

- Diagnosis(diagnosisID:INT [PK], userID:INT [FK to User.userID], diseaseID:INT [FK to Disease.diseaseID], State:VARCHAR(1))

- Disease(diseaseID:INT [PK], DiseaseName:VARCHAR(100),  Description:VARCHAR(1000))

- Symptoms(symptomID:INT [PK], symptomName:VARCHAR(100), diseaseID:INT [FK to Disease.diseaseID], Rarity:VARCHAR(20), Severity:VARCHAR(20))

- Treatment(MedicineID:INT [PK], diseaseID:INT [FK to Disease.diseaseID], Quantity:INT, Advice:VARCHAR(1000))

- Medicine(MedicineID:INT [PK], MedicineName:VARCHAR(255), Link:VARCHAR(1000))

- Chatbot(messageID:INT [PK], userID:INT [FK to User.userID], Message:VARCHAR(1000), MessageTime:TIMESTAMP)
