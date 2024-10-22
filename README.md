# Sorting Visualization

Welcome to the Sorting Visualization project! This is a simple web application built with Node.js that visualizes various sorting algorithms. The primary focus of this repository is the CI/CD pipeline implemented using GitHub Actions, which automates the build, scan, and deployment processes.

## Table of Contents
Features
CI/CD Pipeline
Infrastructure Setup
Getting Started
Technologies Used
Contributing
License

## Features

Visual representation of various sorting algorithms, including:
 - Bubble Sort
 - Quick Sort
 - Merge Sort
 - And more!

Interactive UI for users to input their own data for sorting.
Responsive design for mobile and desktop views.

### CI/CD Pipeline

The CI/CD pipeline for this project is configured using GitHub Actions and consists of the following steps:

1 Checkout the code from the repository.
2 Build the Docker image and tag it using the GitHub Actions run number.
3 Push the Docker image to Docker Hub.
4 Run Trivy to scan the image for vulnerabilities.
5 Deploy the service to a Docker Swarm manager.

### GitHub Actions Workflow Example

Here's a simplified example of the CI/CD workflow configured in .github/workflows/ci.yml:

yaml
Copy code
name: Docker Image CI and Deploy

on:
  push:
    branches:
       - test

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      # Checkout the repository code
      - name: Checkout code
        uses: actions/checkout@v4
      
      # Log in to Docker Hub
      - name: Log in to Docker Hub
        run: |
          echo "${{ secrets.DOCKER_HUB_PASSWORD }}" | docker login -u "${{ secrets.DOCKER_HUB_USERNAME }}" --password-stdin

      # Build and push Docker image
      - name: Build and Push Docker image
        run: |
          docker build . --tag ${{ secrets.DOCKER_HUB_USERNAME }}/sorting-${{ github.run_number }}:latest
          docker push ${{ secrets.DOCKER_HUB_USERNAME }}/sorting-${{ github.run_number }}:latest

      # Run Trivy scan
      - name: Run Trivy scan
        run: |
          trivy image --severity HIGH,CRITICAL ${{ secrets.DOCKER_HUB_USERNAME }}/sorting-${{ github.run_number }}:latest

      # Deploy Docker service on Swarm Manager
      - name: Deploy Docker service on Swarm Manager
        run: |
          ssh -o StrictHostKeyChecking=no ${{ secrets.SSH_USERNAME }}@${{ secrets.SWARM_MANAGER_IP }} \
          "sudo docker service update --image ${{ secrets.DOCKER_HUB_USERNAME }}/sorting-${{ github.run_number }}:latest my-service || \
           sudo docker service create --name my-service --replicas 3 -p 3000:3000 ${{ secrets.DOCKER_HUB_USERNAME }}/sorting-${{ github.run_number }}:latest"

## Infrastructure Setup

The infrastructure for this project is managed using Terraform and Ansible, which streamline the provisioning and configuration of the underlying resources. You can find the related repository for infrastructure setup here: https://github.com/MaheshAneraye/iac-Docker-swarm.git

## Getting Started
To get a local copy of this project up and running, follow these simple steps:

### Clone the repository:

git clone https://github.com/MaheshAneraye/sorting-visualization.git
cd sorting-visualization

### Install dependencies:

npm install

### Run the application:

npm start

Open your browser and navigate to http://localhost:3000 to view the app.

### Contributing
Contributions are welcome! If you have suggestions for improvements or want to report issues, feel free to open an issue or submit a pull request.

### License
This project is licensed under the MIT License - see the LICENSE file for details.

