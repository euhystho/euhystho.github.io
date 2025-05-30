import { lazy, Suspense } from 'react';

const DotLottieReact = lazy(() => 
  import('@lottiefiles/dotlottie-react').then(module => ({
    default: module.DotLottieReact
  }))
);

export default function LottiePlayer() {
  return (
    <Suspense fallback={<div className="w-full h-64 bg-gray-200 animate-pulse rounded"></div>}>
      <DotLottieReact
        src="/bunny.lottie"
        loop
        speed={0.85}
        autoplay 
      />
    </Suspense>
  );
}