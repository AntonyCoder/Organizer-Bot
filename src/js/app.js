import ChatBot from "./components/ChatBot/ChatBot";
import { qs } from "./helpers/dom";

const container = qs('#root');
const chatBot = new ChatBot(container);