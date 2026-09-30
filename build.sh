read -p "Version (x.x.x): " version

docker build -t "ur-web:v$version" .
