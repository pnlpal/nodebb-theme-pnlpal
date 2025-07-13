#!/bin/bash

# Variables
SERVER="your.server.com"
USER="your_ssh_user"
PROJECT_DIR="/home/river/pnlpal/NodeBB"

# SSH and run commands
ssh ${USER}@${SERVER} << EOF
  cd ${PROJECT_DIR}
  yarn upgrade nodebb-theme-pnlpal
  ./nodebb build
  ./nodebb restart
EOF