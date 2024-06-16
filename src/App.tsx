import { Button, Flex, Text } from "@radix-ui/themes";
import "./App.css";
import HandDetector from "./components/HandSignDetection";

function App() {
  return (
    <>
      <Flex direction='column' gap='2'>
        <Text>Hello from Radix Themes :)</Text>
        <Button>Let's go</Button>
        <HandDetector />
      </Flex>
    </>
  );
}

export default App;
