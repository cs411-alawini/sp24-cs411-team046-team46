# SickSense
## _We are your sixth sense._

# What is SickSense?



# What do we do and what are we trying to solve?

Have you ever been sick and browsed the internet in hopes of finding which illness you have, only to come across convoluted, vague, and unhelpful information? Well SickSense is the perfect solution! 
Our service provides users with the ability to simply input their symptoms and receive useful information on possible diseases or illnesses they may have. This result will be paired alongside more 
in-depth information detailing what each disease entails and graphs to help users visualize important data. Also, if users have any specific questions that happen to be unanswered, they can consult 
our HealthBot, an AI chatbot that will meet all your medical needs. SickSense aims to clear up any ambiguity related to personal healthcare and illnesses while providing a quick and intuitive way to 
get the help you need.

# Creativity

There are several websites out there that can help someone determine which illnesses they have or at least point them in the right direction. As that is one of our base functions of the web-app, our 
creative component is to implement a chatbot so help patients further answer their questions if needed. We were thinking of integrating OpenAI’s GPT 3.5 to allow for easy communication and neglecting 
incorrect grammar/punctuation, broadening the user base to those that maybe aren’t as familiar with english. Additionally, since we won’t be able to have a customer service representative attending 
to patients’ further needs, we feel that integrating GPT 3.5 to help answer questions and chat with patients is the way to go.

We feel that this will be on the more technically challenging side as none of us are too familiar with integrating any GPTs. We plan to access OpenAI’s API to start. Our main vision behind the chatbot 
will be a little window/box on the bottom-left corner (like most sites) that the user can click. We plan to add more features as the project progresses and implement any ideas that come to mind. 

# Usefulness

As mentioned in the point above, since healthcare is an important area of research, which has resulted in a lot of databases linking symptoms and various other factors to the potential diseases, there 
are several websites which allow you to search what diseases can certain symptoms signify. Eg- [http://www.diseasesdatabase.com/], which allows you to enter symptoms one by one in a search bar and shows 
you all potential diseases it can correlate to.

However, we plan to differentiate our website by allowing users to enter various symptoms (through either a search bar or through interacting with a chatbot), and try to find out the most likely disease 
that they may have, through a prediction algorithm that uses a variety of inputs. Since our website allows users to login and save their age, blood group, medical history and other such information, as 
well as the chatbot allowing users to specify their problems in higher detail, our aim is to be able to predict diseases with a high success rate. Finally, an additional differentiating factor is that 
we will also offer medical remedies and other solutions to alleviate their symptoms, making it easier for users to get both diagnoses and treatment from one place.

# Realness

There are a lot of datasets that correlate a lot of factors like symptoms, age, gender, blood pressure, cholesterol levels, fatigue etc with the probability of certain diseases which have been thoroughly 
documented by reliable researchers. Most of the datasets we were able to find in our initial research were from Kaggle and a few such databases are available in the links given below (all in csv format):

- https://www.kaggle.com/datasets/uom190346a/disease-symptoms-and-patient-profile-dataset/data
- https://www.kaggle.com/datasets/pjmathematician/diseases-and-symptoms (dataset of 134 rows and 408 columns with information gathered from patients admitted in the New York Presbyterian Hospital admitted during 2004)
- https://www.kaggle.com/datasets/itachi9604/disease-symptom-description-dataset (dataset which not only links diseases to symptoms but also their severity)

These are just a few of the available public datasets and for our disease prediction system, we will try to combine as many we will be able to find to both make it as extensive as possible covering a 
variety of diseases and also with a high success rate as outliers will surely be eliminated with multiple sources.

# Our Functionality

When users first open our web application, they will be met with a sleek login page. Here, users can create a secure account to save their data and register for our website. Once the user has created 
their account, they will be sent to the home page, welcoming them. Users can then fill out a form or questionnaire asking about the symptoms they have. Once filled out, our service will predict the 
disease or illness the user can potentially have, backed by statistics and trustworthy data.

Once the website has made a prediction, it will send the user to another page, showcasing the most probable disease based on their symptoms. Graphs containing data regarding disease severity and duration 
relating to the predicted diseases will be displayed, providing the user with more useful information. We will also inform users on possible next steps they should take (visiting a doctor, taking a 
certain medicine, etc.) based on their results and how severe their condition is.

If a user needs more information on a certain disease or any other health-related topic, we will have a chatbot available that can provide real-time assistance to users. These chats will be saved for a 
certain period of time so users can refer to them when needed.

User data such as medical records and previous form results will be saved to their respective accounts. This will allow for better predictions based on historical information, creating a more personalized service.

# Our Initial Design

Below is a sketch of what our web application may look like in the future:

![UIMockup](https://imgur.com/a/DFzhQMK)

# Project Work Distribution

All members will contribute to building the disease prediction algorithm and will help collect and analyze the necessary data required. Below are the more specific responsibilities of each group member:

- Luke: GPT chatbot integration, help with login system, UI/UX
- Pavitra: Help setting up main website, find usable datasets and creating database
- Nico: GPT chatbot integration, gather user chat data, account info/password management (hashing, salting), frontend development
- Caleb: 
