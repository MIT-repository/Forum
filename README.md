![logo](./docs/design_assets/logo.png)


# MIT
A minimal forum application built with the following technologies:
* [React](https://facebook.github.io/react/)
* [Redux](http://redux.js.org/)
* [Webpack](https://webpack.js.org/)
* [ExpressJS](https://expressjs.com/)
* [PassportJS](http://passportjs.org/)
* [MongoDB](https://www.mongodb.com/)

### Application Features
* Users can post a discussion
* Users can reply their opinions regarding discussion
* Users can favorite discussions
* Users have their own profile page
* Admin can create new forum categories
* Admin have a lot of power over every users discussions and opinions :-p

### Home View
![home view](./docs/design_assets/home_view.jpg)

### Admin View
![admin view](./docs/design_assets/admin_view.jpg)

To run the app in development environment:
```
$ npm run start:dev
```

To run the app in production environment:
```
$ npm run start
```

Now, if you visit [http://localhost:8080] you will see that the application is up and running. Congratulation! But, wait a minute, it's showing you `Sorry, couldn't find the forum`. That is because, we didn't create any forum yet. You can now sign up via github and then visit the admin panel with the url [http://localhost:8080/admin]. The application is currently configured in a way that, the first user will become the admin for the system.

Here we can create new forums and that forum will be displayed in the application. The first forum will be used as default forum.

Congratulation! You now have a clone of this application in your server. :-)

## License
[MIT License](https://github.com/shoumma/Mister-Poster/blob/master/LICENSE). Do whatever you want to do. :-)


## Conclusion
The application is created with lots of ♥. Any pull request, issues and contribution is very appreciated. It would be really great if we can take this application to the next level, where it can be used as a platform for forums.

[Provash Shoumma](https://twitter.com/proshoumma)
