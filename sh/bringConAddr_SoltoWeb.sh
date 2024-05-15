#!/bin/bash
source ./sh/config.sh

# Contract compile & migrate
npm --prefix ./lottery-sol run tm > $SAVE_FILE

contract_address=$(grep 'contract address' $SAVE_FILE | awk '{print $4}')
sed -i '' "s|export const contract_addr =.*|export const contract_addr = \"$contract_address\";|" $DEST_PATH

echo "====================="
echo "Contract address 변경완료: $contract_address"