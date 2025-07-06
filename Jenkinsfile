pipeline {
    agent { label 'docker' }

    environment {
        // 💡 Registry URL (Docker Hub ke liye blank ya docker.io/username likh do)
        REGISTRY = 'docker.io/abdulwasay064' // 👈️ Apni Docker Hub username se replace karo

        // 💡 Image name & tag
        IMAGE_NAME = 'chat-frontend'
        IMAGE_TAG = 'latest'

        // 💡 Jenkins credentials IDs
        DOCKER_USERNAME = credentials('docker-username')
        DOCKER_PASSWORD = credentials('docker-password')
    }

    stages {
        stage('Checkout Code') {
            steps {
                git 'https://github.com/your-username/your-react-repo.git'
            }
        }

        stage('Install Dependencies & Build App') {
            steps {
                sh 'npm install'
                sh 'npm run build'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh "docker build -t $REGISTRY/$IMAGE_NAME:$IMAGE_TAG ."
            }
        }

        stage('Login to Registry') {
            steps {
                script {
                    sh "echo $DOCKER_PASSWORD | docker login $REGISTRY -u $DOCKER_USERNAME --password-stdin"
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                sh "docker push $REGISTRY/$IMAGE_NAME:$IMAGE_TAG"
            }
        }
    }

    post {
        always {
            sh 'docker logout'
        }
    }
}
