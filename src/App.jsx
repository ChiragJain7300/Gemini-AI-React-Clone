import { useContext, useState } from "react";
import QueryCards from "./components/QueryCards";
import Sidebar from "./components/Sidebar";
import { queryArr } from "./data";
import { geminiContext } from "./context/geminiContext";
import Loader from "./components/Loader";
import AnimatedMarkdown from "./components/AnimatedMarkdown";

function App() {
  const {
    inputPrompt,
    setInputPrompt,
    onSend,
    showResult,
    recentPrompt,
    geminiResp,
    loading,
  } = useContext(geminiContext);

  return (
    <>
      <div className="w-full min-h-screen flex font-primary bg-gray-950">
        <aside>
          <Sidebar />
        </aside>
        <main className="h-full flex-1">
          {/* main header  */}
          <div className="px-7 py-5 flex items-center justify-between">
            <p className="text-xl text-white/80 ">Gemini</p>
            <span>
              <img
                src="/assets/user_icon.png"
                alt="user_icon.png"
                className="w-12 rounded-full"
              />
            </span>
          </div>

          {/* body */}
          <div className="flex flex-col mt-10 mx-auto max-w-2xl sm:max-w-4xl px-5">
            {showResult ? (
              <>
                <div className="h-[65vh] text-white overflow-y-scroll hide-scrollbar">
                  <div className="flex items-center gap-5 mb-5">
                    <img
                      src="/assets/user_icon.png"
                      alt="user_icon.png"
                      className="rounded-full w-10"
                    />
                    <h2>{recentPrompt}</h2>
                  </div>
                  <div className="flex items-start gap-5">
                    <img
                      src="/assets/gemini_icon.png"
                      alt="gemini_icon.png"
                      className="rounded-full w-10"
                    />
                    {loading ? (
                      <Loader />
                    ) : (
                      geminiResp && (
                        <p className="leading-8 text-white/80">
                          <AnimatedMarkdown
                            content={geminiResp.text}
                            speed={10}
                          />
                        </p>
                      )
                    )}
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="dark:text-white/70 text-3xl md:text-6xl ">
                  <h1 className="bg-gradient-to-r from-blue-400 via-fuchsia-400 to-rose-400 inline-block text-transparent bg-clip-text mb-4">
                    Hello, Dev.
                  </h1>
                  <p>How can I help you today?</p>
                </div>

                {/* Suggestions */}
                <div className="text-white grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-10 lg:mt-36 items-center justify-center lg:justify-normal">
                  {queryArr.map((query, index) => (
                    <QueryCards
                      query={query}
                      key={index}
                      handleSuggest={onSend}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* query input */}
          <div className="mx-auto max-w-2xl sm:max-w-4xl mt-8 relative mb-2 px-5">
            <input
              type="text"
              id="queryInput"
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              className="w-full bg-gray-700 rounded-full py-4 ps-5 pe-32 text-white placeholder:text-white/70 overflow-x-scroll"
              placeholder="Enter a prompt here"
            />

            <div className="flex gap-3 absolute right-9 bottom-4">
              <button>
                <img
                  src="/assets/gallery_icon.png"
                  alt="gallery_icon.png"
                  className="w-6 dark:filter dark:invert cursor-pointer"
                />
              </button>

              <button>
                <img
                  src="/assets/mic_icon.png"
                  alt="mic_icon.png"
                  className="w-6 dark:filter dark:invert cursor-pointer"
                />
              </button>

              <button onClick={() => onSend()}>
                <img
                  src="/assets/send_icon.png"
                  alt="send_icon.png"
                  className="w-6 dark:filter dark:invert cursor-pointer"
                />
              </button>
            </div>
          </div>
          <p className="dark:text-white/80 text-center text-xs">
            Gemini may display inaccurate info, including about people, so
            double-check its responses. Your privacy and Gemini Apps
          </p>
        </main>
      </div>
    </>
  );
}

export default App;
