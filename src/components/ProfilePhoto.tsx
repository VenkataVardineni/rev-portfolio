import { useEffect } from "react";
import { useLoading } from "../context/LoadingProvider";
import "./styles/ProfilePhoto.css";

/**
 * Displays your photo in place of the 3D character on the landing section.
 * Add your image as: public/images/profile.jpg (or .png, .webp)
 */
const PROFILE_IMAGE = "/images/profile.jpg";

const ProfilePhoto = () => {
  const { setLoading } = useLoading();

  useEffect(() => {
    // Complete loading when using profile photo (no 3D model to wait for)
    setLoading(100);
  }, [setLoading]);

  return (
    <div className="character-container">
      <div className="character-model profile-photo-container">
        <div className="character-rim"></div>
        <img
          src={PROFILE_IMAGE}
          alt="Venkata Revanth Vardineni"
          className="profile-photo-img"
          onLoad={() => {
            document.querySelector(".profile-photo-placeholder")?.classList.add("profile-photo-placeholder-hidden");
          }}
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
            document.querySelector(".profile-photo-placeholder")?.classList.remove("profile-photo-placeholder-hidden");
          }}
        />
        <div className="profile-photo-placeholder profile-photo-placeholder-hidden">
          VRV
        </div>
      </div>
    </div>
  );
};

export default ProfilePhoto;
