#!/bin/bash

ABI_PATH="lottery-sol/build/contracts/Lottery.json"
DEST_PATH="lottery-web/src/utils/contract_val.js"

if [ ! -f $ABI_PATH ]; then
    echo "Lottery.json 파일을 찾을 수 없습니다."
    exit 1
fi

ABI_CONTENT=$(cat $ABI_PATH | jq '.abi' | jq -c .)
if [ -z "$ABI_CONTENT" ]; then
    echo "ABI를 추출할 수 없습니다."
    exit 1
fi

# echo "export const abi = $abi;" > $DEST_PATH
escaped_abi=$(echo $ABI_CONTENT | sed 's/"/\\"/g' | tr '\n' ' ' | sed 's/\\n/\\\\n/g')


# abi 변수를 새 값으로 업데이트하기 위해 $DEST_PATH 파일 수정
sed -i '' "s|export const abi =.*|export const abi = $escaped_abi;|" $DEST_PATH



echo "ABI 업데이트가 완료되었습니다."
