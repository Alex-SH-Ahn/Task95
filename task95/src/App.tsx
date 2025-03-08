import './index.css';
import githubIcon from './assets/icons/github.png';
import guideIcon from './assets/icons/guide-black.png';
import profileIcon from './assets/icons/profile.png';

function App() {
  
  return (
    <div className="h-screen w-screen m-0 p-0 bg-background-teal flex flex-col items-center justify-center">
      <div className="container">
        <div className="banner p-2 px-5 m-1 mb-0">
          <h1 className="text-text-light text-4xl">Task95</h1>
          <div className="flex items-center justify-center">
            <button className="button container flex items-center justify-center min-w-[40px] min-h-[40px] p-0 mr-4">
              <img 
                src={guideIcon} 
                alt="guide"
                className="object-contain w-[30px] h-[30px] pr-[2px]"
              />
            </button>
            <button className="button container flex items-center justify-center min-w-[40px] min-h-[40px] p-0 mr-4">
              <img 
                src={profileIcon} 
                alt="profile"
                className="object-contain w-[25px] h-[25px] pr-[2px]"
              />
            </button>
            <button className="button container flex items-center justify-center min-w-[40px] min-h-[40px] p-0">
              <img 
                src={githubIcon} 
                alt="github"
                className="object-contain w-[28px] h-[28px] pr-[3px]"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
