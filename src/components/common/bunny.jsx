import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function LottiePlayer() {
    return (
        <DotLottieReact
        src="/bunny.lottie"
        loop
        speed={0.85}
        autoplay />
    );
};