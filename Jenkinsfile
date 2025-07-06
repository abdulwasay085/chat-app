pipeline {
    agent { label 'docker' }

    environment {
        REGISTRY = 'docker.io/abdulwasay064'
        IMAGE_NAME = 'chat-frontend'
        IMAGE_TAG = 'latest'
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
                bat "docker build -t %REGISTRY%/%IMAGE_NAME%:%IMAGE_TAG% ."
            }
        }

        stage('Login and Push to Docker Hub') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-creds',
                        usernameVariable: 'DOCKER_USERNAME',
                        passwordVariable: 'DOCKER_PASSWORD'
                    )
                ]) {
                    bat '''
                        echo %DOCKER_PASSWORD% | docker login %REGISTRY% -u %DOCKER_USERNAME% --password-stdin
                        docker push %REGISTRY%/%IMAGE_NAME%:%IMAGE_TAG%
                        docker logout %REGISTRY%
                    '''
                }
            }
        }
    }
}
