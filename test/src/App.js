import {useState, useEffect} from "react"


class Queue{
  constructor(){
      this._arr = [
          <span key={1}><br/></span>,
          <span key={2}><br/></span>,
          <span key={3}><br/></span>,
          <span key={4}><br/></span>,
          <span key={5}><br/></span>
      ];
  }
  enqueue(item){
      this._arr.push(item);
  }
  dequeue(){
      this._arr.shift();
  }
  addChat(item){
      this.enqueue(item);
      this.dequeue();
  }
  getChat(){
      return this._arr;
  }
  
}

function App() {
  const [chat, setchat] = useState(new Queue()._arr);
  const [count, setcount] = useState(6)

  function addChat(){
    let Chat = chat;
    Chat.push(<span key={count}>바보병신노짱<br/></span>)
    Chat.shift();
    return Chat;
  }

  return (
    <div className="App">
      <ul>{chat}</ul>
      <button onClick={()=>{setcount(count+1); setchat(addChat())}}>
        click
      </button>
    </div>
  );
}

export default App;
