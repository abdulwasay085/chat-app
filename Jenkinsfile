pipeline {
    agent { label 'docker' }

    environment {
        IMAGE_NAME = 'chat-app'
    }

    stages {
        stage('Build') {
            steps {
                sh 'docker build -t $IMAGE_NAME .'
            }
        }

        stage('Push to Docker Hub') {
            steps {
                withCredentials([usernamePassword(
                  credentialsId: 'dockerhub-creds',
                  usernameVariable: 'DOCKER_USER',
                  passwordVariable: 'DOCKER_PASS')]) {
                  
                  sh '''
                    echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                    docker tag $IMAGE_NAME $DOCKER_USER/$IMAGE_NAME:latest
                    docker push $DOCKER_USER/$IMAGE_NAME:latest
                  '''
                }
            }
        }
    }
}
