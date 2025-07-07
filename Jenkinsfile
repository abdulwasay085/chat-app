pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/abdulwasay085/chat-app.git', branch: 'master'
            }
        }
        stage('Build Docker Image') {
            steps {
                bat 'docker build -t abdulwasay085/chat-app:latest .'
            }
        }
        stage('Login to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                    bat 'docker login -u %DOCKER_USERNAME% -p %DOCKER_PASSWORD%'
                }
            }
        }
        stage('Push Docker Image') {
            steps {
                bat 'docker push abdulwasay085/chat-app:latest'
            }
        }
    }
}