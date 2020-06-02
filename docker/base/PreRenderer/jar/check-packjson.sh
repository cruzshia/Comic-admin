#!/bin/sh

if [ $# -ne 1 ]; then
	echo "Usage: $0 <directory path where configuration_pack.json exists>" 
	exit 1
fi

JARDIR=`dirname "$0"`
FILE_PATTERN='*_pack.json'
JSON_PATH="$1/$FILE_PATTERN"
IFS_BACKUP="$IFS"
IFS="
"
if ls $JSON_PATH > /dev/null 2>&1
then
    for file in `find $1 -maxdepth 1 -type f -name $FILE_PATTERN`; do
        java -Dfile.encoding=UTF-8 -jar "$JARDIR/check-packjson.jar" "$file"
        if [ $? -ne 0 ]; then
	        exit 1
        fi
    done
else
    echo "[Error] $JSON_PATH not found."
    exit 1
fi
IFS="$IFS_BACKUP"
