#!/bin/bash
source ./sh/config.sh

if [ ! -f $ABI_PATH ]; then
    echo "Lottery.json 파일을 찾을 수 없습니다."
    exit 1
fi

ABI_CONTENT=$(cat $ABI_PATH | jq '.abi' | jq -c .)
if [ -z "$ABI_CONTENT" ]; then
    echo "ABI를 추출할 수 없습니다."
    exit 1
fi

# export const lottery_abi 이후 글 모두 지움
sed -i '' '/export const lottery_abi:Array<any>/,$d' $DEST_PATH

echo "====================="
# 맨 뒤에 새로운 export const lottery_abi:Array<any> = $ABI_CONTENT; 추가
echo "export const lottery_abi:Array<any> = $ABI_CONTENT;" >> "$DEST_PATH"
echo "ABI 변경 완료."
