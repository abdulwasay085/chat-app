pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/abdulwasay085/chat-app.git', branch: 'master', credentialsId: 'abdulwasay064'
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
                    bat 'echo %DOCKER_PASSWORD% | docker login -u %DOCKER_USERNAME% --password-stdin'
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