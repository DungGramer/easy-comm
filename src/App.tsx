import { Button, Flex, Text } from "@radix-ui/themes";
import "./App.css";
import HandDetector from "./components/HandSignDetection";
import HandSignDetector from "./components/HandDetector";

function App() {
  return (
    <>
      <Flex direction='column' gap='2'>
        <Text>Hello from Radix Themes :)</Text>
        <Button>Let's go</Button>
        <HandSignDetector />
      </Flex>
    </>
  );
}

export default App;
