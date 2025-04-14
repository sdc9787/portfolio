import { useRef } from "react";

interface AlertText {
  text: string; //alert text
  state: boolean; //alert state
}

//useAlert 함수
export const useAlert = (setAlertText: React.Dispatch<React.SetStateAction<AlertText>>) => {
  const timerRef = useRef<number | null>(null); //타이머

  //alert 함수
  const triggerAlert = (text: string) => {
    setAlertText({ text, state: true }); //alert text state
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = window.setTimeout(() => {
      setAlertText({ text, state: false }); //alert text state
    }, 3000);
  };

  return triggerAlert;
};

//AlertText 컴포넌트
export function AlertText({ text, state }: AlertText) {
  return <div className={`bg-dark-bg border-2 border-solid  font-bold fixed top-24 left-1/2 transform -translate-x-1/2 transition-all ease-in-out duration-1000 px-5 py-2.5 whitespace-nowrap bg-opacity-70 ${state ? " translate-y-2 z-50 opacity-100" : " opacity-0"}`}>{text}</div>;
}
