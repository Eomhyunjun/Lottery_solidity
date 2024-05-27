export function abbreviateString(str: string) {
  // 문자열이 충분히 길지 않으면 그대로 반환
  if (str.length <= 10) {
    return str;
  }

  console.log(str);

  const start = str.slice(0, 6);
  const end = str.slice(-5);

  return `${start}...${end}`;
}

export function setTimer(count: number) {
  const intervalId = setInterval(() => {
    console.log(`Console log at second: ${count}`);
    count--;
    if (count < 0) {
      clearInterval(intervalId);
      console.log("Logging completed.");
    }
  }, 1000);
}
