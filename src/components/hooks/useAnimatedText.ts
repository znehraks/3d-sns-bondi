import { useEffect, useState } from "react";

export const useAnimatedText = (text: string) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(displayText + text[currentIndex]);
        setCurrentIndex(currentIndex + 1);
      }, 200); // 한 글자씩 나타나는 속도를 조절할 수 있습니다.

      return () => clearTimeout(timeout);
    } else {
      // 텍스트가 모두 나타난 후에 currentIndex를 초기화하여 애니메이션을 반복합니다.
      setCurrentIndex(0);
      setDisplayText("");
    }
  }, [currentIndex, displayText, text]);

  return { displayText };
};
