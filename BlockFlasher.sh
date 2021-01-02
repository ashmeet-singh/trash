blockSize=512;

blocksCount=$((($1 * 1048576) / $blockSize));
inputAdr=$2;
outputAdr=$3;

inputSize="$(stat --format=%s $inputAdr)";
outputSize=0;

while [ $inputSize -gt $outputSize ]

do

echo "$((($outputSize * 100) / $inputSize))%";
echo '---------------';

sleep 1s;

dd if=${inputAdr} of=${outputAdr} bs=${blockSize} skip=$(($outputSize / $blockSize)) seek=$(($outputSize / $blockSize)) count=${blocksCount} && sync;

outputSize=$(($outputSize + ($blockSize * $blocksCount)));
echo '---------------';

done

echo '100%';
echo '---------------';