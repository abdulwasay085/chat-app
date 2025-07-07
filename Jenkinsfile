pipeline {
    agent { label 'docker' }

    environment {
        // Docker image ka naam
        IMAGE_NAME = 'abdulwasay064/chat-app'
        IMAGE_TAG  = 'latest'

        // Jenkins me banaye gaye credentials ke IDs
        DOCKER_USERNAME = credentials('docker-username')
        DOCKER_PASSWORD = credentials('docker-password')
    }

    stages {
        stage('Checkout Code') {
            steps {
                git 'https://github.com/abdulwasay085/chat-app.git'
            }
        }

        stage('Install Dependencies & Build App') {
            steps {
                bat 'npm install'
                bat 'npm run build'
            }
        }

        stage('Build Docker Image') {
            steps {
                bat "docker build -t %IMAGE_NAME%:%IMAGE_TAG% ."
            }
        }

        stage('Login to Docker Hub') {
            steps {
                bat """
                    echo %DOCKER_PASSWORD% | docker login -u %DOCKER_USERNAME% --password-stdin
                """
            }
        }

        stage('Push Docker Image') {
            steps {
                bat "docker push %IMAGE_NAME%:%IMAGE_TAG%"
            }
        }
    }

    post {
        always {
            bat 'docker logout'
        }
    }
}
