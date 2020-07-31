# CI/CD

- A docker container registry would be needed to store the docker images with their specific versions used to build/execute the whole app. So let's suppose we have one of these on `docker.sensorium.com/docker-images`
- Also, we would need at least one machine to act as a runner for the CI/CD pipeline. Services like GitLab, Azure, AWS can offer this.
- For code quality inspection, let's suppose we have a SonarQube host on `sonarqube.sensorium.net`
- To store our containers in the cloud, let's suppose we have an AWS ECR registry on `xxx.dkr.ecr.us-east-1.amazonaws.com/sensorium`
- The pipeline would be executed on every push to `master`. Developers would stick to their specific branches and then make a PR to `master` once a task is done. A build and test script would be a good idea for developers to run before their commits in order to avoid an overloaded pipeline.
- Let's suppose we have these security variables in our CI/CD environment: `SONARQUBE_TOKEN` and `SONARQUBE_PK`
- The steps below were based on the GitLab CI/CD syntax, but it could be adjusted to fit in other services.

# `.gitlab-ci.yml`:

``` yaml
stages:
    - build-n-test
    - sonar
    - publish

variables:
    IMAGE_REPO: docker.sensorium.com/docker-images
    SONAR_HOST: sonarqube.sensorium.net
    AWS_REPO: xxx.dkr.ecr.us-east-1.amazonaws.com/sensorium

build-n-test:frontend:
    image: $IMAGE_REPO/node:current-alpine3.12
    stage: build-n-test
    script:
        - cd frontend/Sensorium
        - npm install
        - npm run build-prod
        - npm run test --code-coverage
    artifacts:
        - frontend/Sensorium/node_modules/
        - frontend/Sensorium/dist/
        - frontend/Sensorium/coverage/

build-n-test:backend:
    image: $IMAGE_REPO/mcr.microsoft.com/dotnet/core/sdk:3.1
    stage: build-n-test
    script:
        - cd backend/Sensorium
        - dotnet build
        # TODO: add unity tests
        # - dotnet test
    artifacts:
        # TODO: add coverage artifacts and builded files
        # - backend/Sensorium/bin/
        # - backend/Sensorium/coverage/

sonar:frontend:
    image: $IMAGE_REPO/node:current-alpine3.12
    stage: sonar
    script:
        - cd frontend/Sensorium
        - npm install -g sonarqube-scanner
        - sonar-scanner -X -Dsonar.login=$SONARQUBE_TOKEN -Dsonar.projectKey=$SONARQUBE_PK -Dsonar.host.url=$SONAR_HOST
    artifacts:
        - frontend/Sensorium/node_modules/
        - frontend/Sensorium/dist/
        - frontend/Sensorium/coverage/
    when: manual # Since it is a low priority and time-consuming process, is going to be manual

sonar:backend:
    image: $IMAGE_REPO/mcr.microsoft.com/dotnet/core/sdk:3.1
    stage: sonar
    script:
        - cd backend/Sensorium
        # TODO: How to sonarqube on dotnet core?
        # - dotnet sonarqube --sonar-login=$SONARQUBE_TOKEN --sonar-projectKey=$SONARQUBE_PK --sonar-host-url=$SONAR_HOST
    artifacts:
        # TODO: add coverage artifacts and builded files
        # - backend/Sensorium/bin/
        # - backend/Sensorium/coverage/

dockerize:to:aws:
    # TODO
```