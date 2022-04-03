import React, { useCallback, useState } from "react";
import { View, Text, Button } from "react-native";

interface Movie {
  isDone: boolean;
  title: string;
  releaseDate: string;
  onPress: (title: string) => void;
}

function Movie({ isDone, title, releaseDate, onPress }: Movie) {
  console.log(title);
  const textColor = {
    color: isDone ? "red" : "black",
  };
  return (
    <View>
      <Text style={textColor}>Movie title: {title}</Text>
      <Text>Release date: {releaseDate}</Text>
      <Button title="Set" onPress={() => onPress(title)} />
    </View>
  );
}

function moviePropsAreEqual(prevMovie: Movie, nextMovie: Movie) {
  return prevMovie === nextMovie;
}

const MemoizedMovie = React.memo(Movie, moviePropsAreEqual);

export default function TodoMemo() {
  const [array, setArray] = useState([
    { title: "so 1", releaseDate: "20/20/2021", isDone: false },
    { title: "so 2", releaseDate: "20/20/2021", isDone: false },
    { title: "so 3", releaseDate: "20/20/2021", isDone: false },
    { title: "so 4", releaseDate: "20/20/2021", isDone: false },
    { title: "so 5", releaseDate: "20/20/2021", isDone: false },
    { title: "so 6", releaseDate: "20/20/2021", isDone: false },
    { title: "so 7", releaseDate: "20/20/2021", isDone: false },
    { title: "so 8", releaseDate: "20/20/2021", isDone: false },
  ]);

  // const [toggle, setToggle] = useState(false);
  //   useEffect(() => {
  //     const idTimeout = setInterval(() => {
  //       setToggle(togglePrev => !togglePrev);
  //     }, 1000);
  //     return () => {
  //       clearInterval(idTimeout);
  //     };
  //   }, []);

  const changeName = useCallback(
    (title) => {
      const newArr = [...array];
      const itemPress = newArr.find((item) => item.title === title);
      if (itemPress) {
        itemPress.releaseDate = new Date().getTime().toString();
        itemPress.isDone = !itemPress.isDone;
        setArray(newArr);
      }
    },
    [array]
  );

  return (
    <View>
      {array.map((item, index) => (
        <View key={item.title}>
          <MemoizedMovie title={item.title} releaseDate={item.releaseDate} isDone={item.isDone} onPress={changeName} />
          {/* <Movie
              key={`movie ${index}`}
              title={item.title}
              releaseDate={item.releaseDate}
            /> */}
        </View>
      ))}
    </View>
  );
}
