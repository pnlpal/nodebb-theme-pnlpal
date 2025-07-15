#!/bin/bash

# Variables
SERVER="167.172.46.156"
PORT="4500"
USER="river"
PROJECT_DIR="/home/river/pnlpal/NodeBB"

# SSH and run commands
ssh ${USER}@${SERVER} -p${PORT} << EOF
  export NVM_DIR="$HOME/.nvm"
  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
  cd ${PROJECT_DIR}
  yarn upgrade nodebb-theme-pnlpal
  ./nodebb build
  ./nodebb restart
EOF