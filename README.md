# E-Commerce Market Place

This application serves as a common platform for users to buy and sell items. The users registered as sellers can post a catalog of items they can sell, using which the buyers can place orders to the particular seller. Each seller can also view the orders they have received.

All the passwords are stored in an encrypted form in the database to protect against data breaches. When a registered user is authenticated, a JWT token is issued, which is used to authorize the user and check their category(buyer/seller) each time they access an API.     

## **The following functionalities were implemented using REST APIs:**

- Buyers and sellers can register as a new user 

- Registered users can login to the system 

- Sellers can build a catalog of items, with each item having a name and price

- Buyers can GET a list of sellers

- Buyers can GET a specific seller's catalog (list of items)

- Buyers can create an Order that contains a list of items from the seller's catalog

- Sellers can GET a list of all orders they've received

Database: mongoBD atlas

Backend: Node.JS (Express.JS framework)
