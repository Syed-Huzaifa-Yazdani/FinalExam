# Tourism Management System

## Overview

The **Tourism Management System** is a full-stack web application designed to efficiently manage tourist attractions, visitors, and reviews. It allows users to add, retrieve, and update information about attractions and visitors. It also provides functionality for posting reviews for attractions, calculating average ratings, and displaying visitor activity statistics.

This project is built using **Node.js**, **Express.js**, and **MongoDB** for the backend and data storage. The system includes several RESTful API endpoints that perform CRUD operations for managing attractions, visitors, and reviews.

## Features

- **Attractions Management**:
  - Add new attractions (name, location, entry fee).
  - Retrieve all attractions in the system.
  - Get the top-rated attractions based on reviews.
  
- **Visitors Management**:
  - Add new visitors (name and email).
  - Retrieve visitors' activity, including the count of attractions they have reviewed.

- **Reviews Management**:
  - Add reviews for attractions by visitors (including score and comments).
  - Automatically update attraction ratings when new reviews are added.
  
- **Top-rated Attractions**:
  - Display the top 5 attractions based on ratings from user reviews.

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **API**: RESTful API for CRUD operations
- **Request Body Parsing**: Body-parser middleware for handling JSON requests
- **Data Validation**: Validation for entry fields like attraction's entry fee and review score

