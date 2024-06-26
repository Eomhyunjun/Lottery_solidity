#!/bin/bash
source ./sh/config.sh

# Contract compile & migrate
npm --prefix ./lottery-sol run ta > $SAVE_FILE

contract_address=$(grep 'contract address' $SAVE_FILE | awk '{print $4}')
sed -i '' "s|export const contract_addr: string =.*|export const contract_addr: string = \"$contract_address\";|" $DEST_PATH

echo "====================="
echo "Contract address 변경완료: $contract_address"