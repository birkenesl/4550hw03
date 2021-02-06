server {
        listen 80;
        listen [::]:80;

        root /home/linus/www/hw03.skyflume.com;

        index index.html;

        server_name skyflume.com hw03.skyflume.com;

        location / {
                # First attempt to serve request as file, then
                # as directory, then fall back to displaying a 404.
                try_files $uri $uri/ =404;
        }
}
