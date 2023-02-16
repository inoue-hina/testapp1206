import "./App.css";
import React, { useEffect, useState, useCallback } from "react";
//functionからアロー関数に変換
const App = () => {
  return <Weather></Weather>;
};

const Weather = () => {
  const [data, setData] = useState([]); //JSONで返ってきたデータを保存するためのもの
  const [loading, setLoading] = useState(true); // ローディング中か否かのフラグを持たせる
  const [city, setcityCode] = useState(130000); //都市コード用、初期位置を東京に設定している
  const queryWeather = useCallback(async () => {
    //asyncが定義されているところじゃないとawaitが使えない
    //useCollback(第一引数、第二引数)
    //第二引数の値[city]の値が変化したときのみ、コールバック内の関数が再実行される。
    const url = `https://www.jma.go.jp/bosai/forecast/data/forecast/${city}.json`;
    const responce = await fetch(url);
    const jsondata = await responce.json();
    //必要な部分のデータを上から順に指定する。JSONは階層構造になっている
    //console.log(jsondata[0].timeSeries[0].areas[0].weathers[0]);
    setData(jsondata[0].timeSeries[0].areas[0]);
    setLoading(false);
  }, [city]);
  const handleChange = (event) => {
    setcityCode(event.target.value);
    setLoading(true);
  };

  useEffect(() => {
    //コンポーネントが描画されてから実行するためuseEfectを使用する
    queryWeather();
  }, [city, queryWeather]);
  
  let tommorow;
  let today = new Date();
  tommorow = (
    <p class ="asitaday">
    明日は{today.getFullYear()}年{today.getMonth()+1}月{today.getDate()+1}日です
    </p>
  )

  let weatherInfo;
  if (loading) {
    weatherInfo = <p>loading</p>;
  } else {
    weatherInfo = (
      <p class ="tomtenki">
        {data.area.name}の明日の天気{data.weathers[0]}
      </p>
      

    );
  }  

  return (
    <>
    <header>
      <h1>あしたの天気</h1>
      </header>

      <div class="asita">
      {tommorow}
      </div>
      
      {weatherInfo}

      <div class="btn">
      <label class="selectbox-002">
      <select onChange={handleChange}>
        <option value="130000">東京</option>
        <option value="270000">大阪</option>
        <option value="016000">札幌</option>
      </select>
      </label>
      </div>

    </>
  );
};

export default App;