pipeline {
    agent any

    environment {
        NODEJS_VERSION = '18.x'
        NPM_INSTALL = 'npm install'
        VUE_BUILD = 'npm run build'
        VUE_TEST = 'npm run test'
        EXPRESS_START = 'npm run start'
        BACKEND_DIR = 'my-first-express-project'
        FRONTEND_DIR = 'my-first-vue-project'
    }

    stages {
        stage('Install Node.js') {
            steps {
                script {
                    if (!isUnix()) {
                        error 'This pipeline is intended to run on a Unix-based system'
                    }

                    sh '''
                        curl -sL https://deb.nodesource.com/setup_$NODEJS_VERSION | sudo -E bash -
                        sudo apt-get install -y nodejs
                    '''
                }
            }
        }

        stage('Install Dependencies') {
            parallel {
                stage('Install Backend Dependencies') {
                    steps {
                        dir(BACKEND_DIR) {
                            sh NPM_INSTALL
                        }
                    }
                }
                stage('Install Frontend Dependencies') {
                    steps {
                        dir(FRONTEND_DIR) {
                            sh NPM_INSTALL
                        }
                    }
                }
            }
        }

        stage('Run Tests') {
            parallel {
                stage('Run Backend Tests') {
                    steps {
                        dir(BACKEND_DIR) {
                            sh VUE_TEST
                        }
                    }
                }
                stage('Run Frontend Tests') {
                    steps {
                        dir(FRONTEND_DIR) {
                            sh VUE_TEST
                        }
                    }
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir(FRONTEND_DIR) {
                    sh VUE_BUILD
                }
            }
        }

        stage('Prepare Backend') {
            steps {
                dir(BACKEND_DIR) {
                    sh EXPRESS_START
                }
            }
        }
    }

    post {
        always {
            echo 'Cleaning up...'
            cleanWs()
        }
        success {
            echo 'Build succeeded!'
        }
        failure {
            echo 'Build failed!'
        }
    }
}
