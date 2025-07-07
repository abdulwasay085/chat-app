pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git credentialsId: 'abdulwasay064', url: 'https://github.com/abdulwasay085/chat-app.git'
            }
        }

       stage('Build Docker Image') {
    steps {
        script {
            // Docker daemon check
            bat 'docker info'
            bat 'docker build -t abdulwasay085/chat-app:latest .'
        }
    }
}

        stage('Push Docker Image') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'abdulwasay064', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                        bat "docker login -u %DOCKER_USERNAME% -p %DOCKER_PASSWORD%"
                        bat "docker push abdulwasay085/chat-app:latest"
                    }
                }
            }
        }
    }
}
