import React, { ReactNode, ReactElement } from 'react';

interface BodyProps {
    children: ReactNode;
    containerwidth?: boolean;
}

function Container({ children, containerwidth }: BodyProps) {
  // Assert that the children are React elements with the additional prop
  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child as ReactElement<{ containerwidth?: boolean }>, { containerwidth }); 
    }
    return child;
  });

  return (
    <>
      <div id="main-container" 
        className={`
          animate-fadeIn overflow-y-auto no-bar h-full max-w-[100vw] min-h-[100vh] flex flex-col fixed top-0 
          ${containerwidth ? 'z-50 w-full gradient-9 left-0' : 'mt-[50px] md:mt-0 right-0 w-full md:w-[calc(100vw-260px)] lg:w-[calc(100vw-290px)]'}
        `}
        >
        <div id="content-container-section" 
          className="flex-grow overflow-x-hidden"
          >
          {childrenWithProps}
        </div>  
      </div>
    </>
  );
}

export default Container;