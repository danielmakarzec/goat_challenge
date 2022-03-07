# WELCOME TO THE INFLUENCERY API

This project serves as the back end API to the react.js frontend 'Influencery-client'. 
The project is only half done though... 

This repository will serve our front end with a list of influencers and the platforms they belong to and any tags to define the influencers niche's. At the moment, we can't seem to access the list of influencers... we think we must have missed some steps in the creation of the project 😬. 

Here you can see our schema which should help you diagnose what's missing. 

<img width="632" alt="Screenshot 2021-06-02 at 12 16 00" src="https://user-images.githubusercontent.com/22352499/121151101-fe4cbe00-c83b-11eb-87c4-d68a83671801.png">

Every influencer belongs to a platform and each influencer can have many tags. 

To send the data to our front end, we are using Active Model Serializers - details here <a> https://www.rubydoc.info/gems/active_model_serializers/0.9.1 </a>

Please help us fix the the API so our Influencery project will work.

Finaly please add a primary_tag field to the Influencer model. 
This should reference a Tag ID and every Influencer MUST have a primary_tag.
The influencer_serializer will have to be updated.

## To get started

```
# clone the project to your machine 
# then run 

> bundle install
> rails db:create
> rails db:migrate
> rails db:seed 

(rails db:seed will error out until the proper fixes are in place, if you continue to see errors try rails db:reset)
```

There is no testing framework on this project so you'll need to debug the code in your console. 

EXTRA CREDIT Add in relevent validations for our models.