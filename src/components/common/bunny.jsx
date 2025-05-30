
import { Suspense, lazy } from 'react';

const DotLottieReact = lazy(() => 
  import('@lottiefiles/dotlottie-react').then(module => ({ 
    default: module.DotLottieReact 
  }))
);

export default function LottiePlayer() {
  return (
    <Suspense fallback={<div>Loading animation...</div>}>
      <DotLottieReact
        src="bunny.lottie"
        loop
        speed={0.85}
        autoplay 
      />
    </Suspense>
  );
}
