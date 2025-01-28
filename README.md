# Treecipe

[![License Badge](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

Treecipe is an application designed to share your family recipes. Want to expand your culinary horizons? Connect with other families, and whip up one of their tried and true family favorites!

## Description
Treecipe is like the cloud for your family recipes:
- Safely secure your coveted family recipes for future generations.
- Engage with a community of food enthusiasts, share your family recipes, and try someone else's family favorite.  
The platform is designed with scalability in mind and provides an optimized user experience on both desktop and mobile devices.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Future Developement](#future-development)
- [Contributing](#contributing)
- [License](#license)
- [Tests](#tests)
- [Questions?](#questions)

## Features
1. User Profile
2. Recipe Box
3. Explore
- Search the database by profile, recipe name, process, or ingredient.
4. Responsive Design
- Mobile-friendly and accessible UI for all users.

## Technologies Used
- Front-End: React, Apollo Client
- Back-End: Node.js, Express.js, GraphQL, MongoDB (with Mongoose ODM)
- Authentication: JSON Web Tokens (JWT)
- Deployment: Render
- Other Tools: GitHub Actions for CI/CD

## Installation
To install the required dependencies, run the following command in your terminal:

```bash
npm install
```

Set up environment variables in a .env file in the server directory:

```bash
MONGO_URI=<your_mongodb_uri>
JWT_SECRET=<your_jwt_secret>
```

## Usage
After installation, run the development servers:

```bash
npm run start:dev
```

Or check out the [deployed application] on Render.

- Create your account, upload recipes, and manage your family recipe box.
![Signup page screenshot]()

## Future Development
1. image uploading
2. family discussion thread filter
3. like and follow

## Contributing
[cgroth06](https://github.com/cgroth06)

This project is a major rework of [ArtVine](https://github.com/EthanForrestCarr/ArtVine).

Contributions are welcome! Feel free to open issues or submit pull requests to improve this project.

## License
This project is licensed under the MIT License.  
For more details, visit the [MIT License page](https://opensource.org/licenses/MIT).

## Tests
This section will include details of the tests we plan to implement in future iterations of this project.

## Questions?
Find me on GitHub: [cgroth06](https://github.com/cgroth06)  
For any additional questions: cgrothwd@gmail.com
