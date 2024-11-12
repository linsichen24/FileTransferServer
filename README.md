# FileTransferServer

# to run
% node server.js

# to clean
% lsof -i :8080 

COMMAND   PID      USER   FD   TYPE            DEVICE SIZE/OFF NODE NAME
node    31981 linsichen   18u  IPv6 0x1eddd072b802529      0t0  TCP *:http-alt (LISTEN)

% kill -9 31981 
