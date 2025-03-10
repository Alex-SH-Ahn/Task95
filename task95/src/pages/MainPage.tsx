import IconButton from '../components/IconButton';
import Todo from './Todo';

function MainPage() {
  return (
    <div className="container h-[80vh] w-[80vw]">
      <div className="banner m-1 flex items-center justify-between sm:px-5 sm:py-3 px-2 py-1">
        <h1 className="text-3xl text-text-light md:text-4xl">Task95</h1>
        <div className="flex items-center justify-center">
          <IconButton
            iconName="guide-black"
            alt="guide"
            size={23}
            paddingRight={1}
            className="mr-2"
          />
          <IconButton
            iconName="profile"
            alt="profile"
            size={20}
            paddingRight={1}
            className="mr-2"
          />
          <IconButton
            iconName="github"
            alt="github"
            size={24}
            paddingRight={2}
            href="https://github.com/Alex-SH-Ahn/Task95"
          />
        </div>
      </div>

      <div className="flex h-[90%] w-[80vw] items-center justify-center">
        <Todo />
      </div>
    </div>
  );
}

export default MainPage;
