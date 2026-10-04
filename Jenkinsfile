pipeline {
    agent any

    environment {
        IMAGE_NAME     = 'jenkins-cicd-demo'
        CONTAINER_NAME = 'jenkins-cicd-app'
        APP_PORT       = '3000'
    }

    triggers {
        // Checks the repo for new commits every minute.
        // For instant triggers, use a GitHub webhook instead (see below).
        pollSCM('* * * * *')
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build') {
            steps {
                echo 'Installing dependencies...'
                sh 'npm install'
            }
        }

        stage('Test') {
            steps {
                echo 'Running tests...'
                sh 'npm test'
            }
        }

        stage('Docker Build') {
            steps {
                echo 'Building Docker image...'
                sh 'docker build -t ${IMAGE_NAME}:${BUILD_NUMBER} -t ${IMAGE_NAME}:latest .'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying container...'
                sh '''
                    docker rm -f ${CONTAINER_NAME} || true
                    docker run -d --name ${CONTAINER_NAME} -p ${APP_PORT}:3000 ${IMAGE_NAME}:latest
                '''
            }
        }

        stage('Verify') {
            steps {
                sh '''
                    sleep 5
                    docker exec ${CONTAINER_NAME} wget -qO- http://localhost:3000/health
                '''
            }
        }
    }

    post {
        success {
            echo "Deployed successfully! App: http://localhost:${APP_PORT}"
        }
        failure {
            echo 'Pipeline failed. Check the console output.'
        }
    }
}
