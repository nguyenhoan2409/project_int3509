import React from "react";
import { useParams } from "react-router-dom";
import { UserSidebar } from "~/components/UserProfile/UserSidebar";
import "./Profile.css";
import { AccountSetting } from "~/components/UserProfile/AccountSettings";
import { ChangePassword } from "~/components/UserProfile/ChangePassword";
import AvatarEditor from "react-avatar-editor";
import Layout from "../../../components/Layout/Layout";
import { useSelector } from "react-redux";

export const Profile = () => {
  const { activepage } = useParams();
  const {user} = useSelector((state) => state.auth); 
  return (
    <div className="userprofile">
      <Layout>
        <div className="userprofilein">
          <div className="left">
            <AvatarEditor
              image="https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-1024.png"
              width={250}
              height={250}
              color={[255, 255, 255, 0.6]} // RGBA
              scale={1}
              rotate={0}
            />
            <UserSidebar activepage={activepage} />
          </div>
          <div className="right">
            <div>
              {activepage === "accountsettings" && <AccountSetting />}
              {activepage === "changepassword" && <ChangePassword />}
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};
