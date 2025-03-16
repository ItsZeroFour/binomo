import { Route, Routes } from "react-router-dom";
import Main from "./screens/Main/Main";
import FirstChat from "./screens/FirstChat/FirstChat";
import SeasonPass from "./screens/SeasonPass/SeasonPass";
import GameStart from "./screens/game_start/GameStart";
import UploadImage from "./screens/upload_image/UploadImage";
import Camera from "./screens/camera/Camera";
import NeyroImageGenerate from "./screens/neyro_image_generate/NeyroImageGenerate";
import ImageGenerated from "./screens/image_generated/ImageGenerated";
import Final from "./screens/final/Final";
import Starter from "./screens/starter/Starter";
import "./utils/i18n";
import CallFriend from "./screens/call_friend/CallFriend";
import FriendChat from "./screens/friend_chat/FriendChat";
import AfterChat from "./screens/after_chat/AfterChat";
import Education1 from "./screens/education/Education1";
import Education2 from "./screens/education/Education2";
import Education3 from "./screens/education/Education3";
import { Suspense, useEffect } from "react";
import Education7 from "./screens/education/Education7";
import EducationGraphickUp from "./screens/education/EducationGraphickUp";
import EducationGraphickDown from "./screens/education/EducationGraphickDown";
import Education4 from "./screens/education/Education4";
import Education5 from "./screens/education/Education5";
import Education6 from "./screens/education/Education6";
import EducationGraphickThird from "./screens/education/EducationGraphichThird";
import GroupChat from "./screens/group_chat/GroupChat";
import Education8 from "./screens/education/Education8";
import afterChat1 from "./assets/images/after-chat-1.png";
import afterChat2 from "./assets/images/after-chat-2.png";
import afterChat3 from "./assets/images/after-chat-3.png";
import afterChat4 from "./assets/images/after-chat-4.png";
import afterChat5 from "./assets/images/after-chat-5.png";
import afterChat6 from "./assets/images/after-chat-6.png";
import Wrong from "./screens/wrong/Wrong";
import ConversionFirst from "./screens/conversion/Conversion";

function preloadImages(images) {
  images.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
}

function App() {
  useEffect(() => {
    preloadImages([
      afterChat1,
      afterChat2,
      afterChat3,
      afterChat4,
      afterChat5,
      afterChat6,
    ]);
  }, []);

  return (
    <div className="App">
      <Suspense fallback={() => <p>Loading...</p>}>
        <div className="page">
          <main>
            <Routes>
              <Route path="/" element={<Starter />} />
              <Route path="/main" element={<Main />} />
              <Route path="/sister-chat" element={<FirstChat />} />
              <Route path="/season-pass" element={<SeasonPass />} />
              <Route path="/call-friend" element={<CallFriend />} />
              <Route path="/friend-chat" element={<FriendChat />} />
              <Route path="/after-chat" element={<AfterChat />} />
              <Route path="/education-1" element={<Education1 />} />
              <Route path="/education-2" element={<Education2 />} />
              <Route path="/education-3" element={<Education3 />} />
              <Route path="/education-4" element={<Education4 />} />
              <Route path="/education-5" element={<Education5 />} />
              <Route path="/education-6" element={<Education6 />} />
              <Route path="/education-7" element={<Education7 />} />
              <Route path="/education-8" element={<Education8 />} />
              <Route path="/wrong" element={<Wrong />} />
              <Route
                path="/education-graphick-up"
                element={<EducationGraphickUp />}
              />
              <Route
                path="/education-graphick-down"
                element={<EducationGraphickDown />}
              />
              <Route
                path="/education-graphick-third"
                element={<EducationGraphickThird />}
              />
              <Route path="/group-chat" element={<GroupChat />} />
              <Route path="/game-start" element={<GameStart />} />
              <Route path="/upload-image" element={<UploadImage />} />
              <Route path="/upload-image/camera" element={<Camera />} />
              <Route
                path="/neyro-image-generate"
                element={<NeyroImageGenerate />}
              />
              <Route path="/image-generated" element={<ImageGenerated />} />
              <Route path="/final" element={<Final />} />
              <Route path="/conversion" element={<ConversionFirst />} />
            </Routes>
          </main>
        </div>
      </Suspense>
    </div>
  );
}

export default App;
