#E-Commerce Market Place

This application serves as an common platform for users to buy and sell items.  

**The following functionalities were implemented using REST APIs:**

-> Buyers and sellers can register as a new user (The paswords were stored in a encrypted format to protect against data breaches) 

-> Registered users can login to the system ( JWS token authentication )

-> Sellers can build a catalog of items, with each item having a name and price

-> Buyers can GET a list of sellers

-> Buyers can GET a specific seller's catalog (list of items)

-> Buyers can create an Order that contains a list of items from the seller's catalog

-> Sellers can GET a list of all orders they've received

The database was implemented using mongoBD atlas 
