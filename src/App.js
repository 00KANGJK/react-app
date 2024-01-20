import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function Header(props){
  console.log('props',props.title);
  return(
    <header>
        <h1>
            <a href="/" onClick ={
              (event)=>{
                event.preventDefault();
                props.onChangeMode();
              }
            }>{props.title}</a>
        </h1>
    </header>
  )
}

function Nav(props){
  const lis = []
  for(let i = 0; i < props.topics.length; i++){
    let t = props.topics[i];
    lis.push(<li key={t.id}>
      <a id={t.id} href={"/read/"+t.id} onClick ={event =>{
        event.preventDefault();
        props.onChangeMode(Number(event.target.id));
      }}>{t.title}</a></li>);
  }

  return(
    <nav>
        <ol>
            {lis}
        </ol>
    </nav>
  )
}

function Article(props){
  return(
    <article>
      <h2>{props.title}</h2>
      {props.body}
    </article>
  )
}

function Create(props){
  return(
    <article>
      <h2>Create</h2>
      <form onSubmit={event=>{
        event.preventDefault(); 
        const title = event.target.title.value; 
        const body = event.target.body.value;
        props.onCreate(title,body); 
      }}>
        <p><input type="text" name="title" placeholder="title"></input></p>
        <p><textarea name="body" placeholder="body"></textarea></p>
        <p><input type="submit" value="Create"></input></p>
      </form>
    </article>
  )
}

function App() {
  const  [mode,setMode] = useState('WELCOME');
  const [id,setId] = useState(null);
  const [nextId,setNextId] = useState(4); 
  const [topic,setTopic] = useState([ 
    {id:1, title:'HTML', body:'HTML is ...'},
    {id:2, title:'JS', body:'JS is ...'},
    {id:3, title:'React', body:'React is ...'}
  ]);
  let content = null;
  if(mode === 'WELCOME'){
    content = <Article title = "Welcome" body ="Hello, Web"></Article>
  }else if(mode === 'READ'){
    let title,body = null;
    for(let i = 0; i < topic.length; i++){
      console.log(topic[i].id, id)
      if(topic[i].id === id){
        title = topic[i].title;
        body = topic[i].body;
      }
    }
    content = <Article title = {title} body ={body}></Article>
  }
  else if (mode === 'CREATE'){
    content = <Create onCreate={(_title,_body)=>{ 
      const newTopic = {id:nextId, title:_title, body:_body};
      const newTopics = [...topic];
      newTopics.push(newTopic); 
      setTopic(newTopics); 
      setMode('READ'); // mode를 READ로 변경 상세보기 페이지로 이동
      setId(nextId); // id를 nextId로 변경
      setNextId(nextId+1); // 다음에 추가될 데이터를 위해 nextId를 1 증가
    }}></Create>
  }
  return (
    <div className="App">
      <Header title = "React" onChangeMode ={()=>{
        setMode('WELCOME');
      }}></Header>
      <Nav topics = {topic} onChangeMode={(_id)=>{
        setMode('READ');
        setId(_id);
      }}></Nav>
      <a href="/create" onClick ={(event)=>{
        event.preventDefault();
        setMode('CREATE');
      }}>Create</a>
      {content}

    </div>
  );
}

export default App;
