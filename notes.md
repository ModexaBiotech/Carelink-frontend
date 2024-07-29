This is for all the text in the app. A little notes area for making it better
@tailwind base;
@tailwind components;
@tailwind utilities;

.sliding{
    animation: slide 40s linear infinite;
  
  }
  
  .sliding:hover{
    animation-play-state: paused;
  }
  
  @keyframes slide {
    0%{
      transform: translateX(0);
    }
    100% {
      transform: translate(-100%);
    }
  }
  
  

//OTP page 

