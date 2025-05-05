import { useEffect, useState } from "react";
import axios, { BASE_URL } from "../api/axiosInstance";

const PostImage = ({ id, image }) => {
  const [url, setUrl] = useState("");

  useEffect(() => {
    async function fetchImage() {
      if (image) {
        setUrl(`${BASE_URL}/${image}`);
      } else {
        const res = await axios.get(`/posts/${id}/image`, {
          responseType: "blob",
        });
        if (res.data.size > 0) {
          const url = URL.createObjectURL(res.data);
          setUrl(url);
        }
      }
    }
    fetchImage();
  }, [id, image]);

  return (
    <>
      {url && (
        <img
          src={url}
          alt="Post content"
          className="w-full h-auto rounded-lg object-cover max-h-96"
        />
      )}
    </>
  );
};

export default PostImage;
