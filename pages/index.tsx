import { GetServerSideProps, NextPage } from "next"
import { useEffect, useState } from "react";
import styles from "./index.module.css";

// getServerSidePropsから渡されるpropsの型
type Props = {
  initialImageUrl: string;
};

const IndexPage: NextPage<Props> = ({ initialImageUrl }) => {
  // useStateを使って状態を定義する
  const [imageUrl, setImageUrl] = useState(initialImageUrl);
  const [loading, setLoading] = useState(true);
  // ❷ マウント時に画像を読み込む宣言
  //useEffect(() => {
  //  fetchImage().then((newImage) => {
  //    setImageUrl(newImage.url);  // 画像URLの状態を更新する
  //    setLoading(false);  // ローディング状態を更新する
  //  });
  //}, []);

  // ボタンをクリックしたときに画像を読み込む処理
  const handleClick = async () => {
    setLoading(true); // 読込中フラグを立てる
    const newImage = await fetchImage();
    setImageUrl(newImage.url);  // 画像URLの状態を更新する
    setLoading(false);  // 読込中フラグを倒す
  };

  // ❸ ローディング中でなければ、画像を表示する
  //return (
  //  <div className={styles.page}>
  //    <button onClick={handleClick}>他のにゃんこも見る</button>
  //    <div className={styles.frame}>
  //      {loading || <img src={imageUrl} /> }
  //      </div>
  //  </div>
  //);

  return (
    <div>
      <button
        onClick={handleClick}
        style={{
          backgroundColor: "#319795",
          border: "none",
          borderRadius: "4px",
          color: "white",
          padding: "4px 8px",
        }}
      >
        きょうのにゃんこ🐱
      </button>
      <div className={styles.frame}>
        {loading || <img src={imageUrl} /> }
      </div>
    </div>
  );
};
export default IndexPage;

// サーバーサイドで実行する処理
export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const image = await fetchImage();
  return{
    props: {
      initialImageUrl: image.url,
    },
  };

};

type Image = {
  url: string
};

const fetchImage = async (): Promise<Image> => {
  const res = await fetch("https://api.thecatapi.com/v1/images/search");
  const images = await res.json();
  console.log(images);
  return images[0];
};
