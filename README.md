# Blog Post REST API Testing with Jest & Supertest

## Routes

-   `/post`
    -   `GET` - return all posts
    -   `POST` - create posts with title, description, votes, and author
-   `/post/:id`
    -   `GET` - return specific posts
    -   `DELETE` - delete a post
    -   `PUT` - update a post
-   `/user`
    -   `GET` - returns all users
    -   `POST` - create a user with `username`, `name`, `email`
-   `/user/:id`
    -   `GET` - returns user with `id`
    -   `DELETE` - delete a user with `id`
