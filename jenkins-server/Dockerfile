FROM jenkins/jenkins:lts-jdk17

USER root

# Docker CLI (talks to the host Docker via the mounted socket) + Node.js for build/test stages
RUN apt-get update && \
    apt-get install -y docker.io nodejs npm && \
    rm -rf /var/lib/apt/lists/*

USER root
