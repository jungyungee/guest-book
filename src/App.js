import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function Header(props){
  console.log('props',props, props.title);
  return <header>
    <h1><a href="/" onClick={(event) => {
      //이벤트 기능 부여
      event.preventDefault(); //클릭해도 리로드가 일어나지 않음
      props.onChangeMode(); //함수 호출
    }}>{props.title}</a></h1>
  </header>
}

function Nav(props){
  const lis = []
  for(let i=0; i<props.topics.length; i++){
    let t = props.topics[i];
    lis.push(<li key={t.id}>
      <a id={t.id}/* 태그의 속성은 문자로 설정된다 */ href={'/read'+t.id} onClick={(event) => {
        event.preventDefault();
        props.onChangeMode(Number(event.target.id)//이벤트를 유발시킨 태그(여기선 a 태그) 문자열 id 로 들어오기 때문에 숫자로 바꿔줘야함
        );
      }}>{t.title}</a>
      </li>)  //키: 자동 생성 태그의 경우 추적하는 근거가 됨!!
  }

  return <nav id="guest-list">
          <ol>
            {lis}
          </ol>
        </nav>
}

function Article(props){
  return <article>
    <h2>{props.title}</h2>
    {props.body}
    </article>
}

function Create(props){
  return <article>
    <h2>방명록 쓰기!</h2>
    <form onSubmit={event=>{
      event.preventDefault();
      const title = event.target.title.value; //title의 value 값 갸져옴
      const body = event.target.body.value;
      //event.target 은 form 태그가 됨
      props.onCreate(title, body);
    }}>
      <p><input type = "text" name="title" placeholder="제목"/></p>
      <p><textarea name = "body" placeholder="방명록을 써주세용..!"></textarea></p>
      <p><input type="submit" value="입력!🐾"></input></p>
    </form>
  </article>
}

function App() {
  //const _mode = useState('WELCOME');  //useState는 배열을 리턴. 0번째 원소는 상태의 값 읽을 때. 1번째: 상태 변경
  //const mode = _mode[0];  //0번 째 인자로 읽고
  //const setMode = _mode[1]; //1번 째 함수로 바꾼다
  const [mode, setMode] = useState('Welcome');  //위 3줄 대신 축약형으로
  const [id, setId] = useState(null);
  const [nextId, setNextId] = useState(4);
  const [topics, setTopics] = useState([
    {id:1, title:'도도가...', body:'안녕! 나는 도도야..만나서 반가워!'},
    {id:2, title:'삼색', body:'밥주라냥!'},
    {id:3, title:'동글동글', body:'이러케 동그란 고앵이 봐써????'}
  ]); //읽기 쓰기 가능하도록 useState 이용

  let content = null;
  if (mode ==='WELCOME'){
    content = <Article title="Welcome" body="방명록이에요!! 글을 남겨주세요!!"></Article>
  }
  else if (mode === 'READ'){
    //반복문을 이용해서 id 값과 일치하는 topics의 원소 찾기
    let title, body = null;
    for (let i =0 ; i <topics.length; i++){
      if (topics[i].id === id){
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Article title={title} body={body}></Article>
  }
  else if(mode==='CREATE'){
    content = <Create onCreate={(_title, _body)=>{
      const newTopic = {id:nextId, title: _title, body: _body}
      const newTopics = [...topics]//복제본
      newTopics.push(newTopic);
      setTopics(newTopics); //이후 새로 들어온 내용이 다르면 다시 컴퍼넌트 실행!
      setMode('READ');
      setId(nextId);
      setNextId(nextId+1); //다음 글 추가를 대비하여..
    }}></Create>
  }

  return (
    <div className="App">
        <Header title="😺방명록😺" onChangeMode={() => {
          //alert('Header'); //Header 라는 문구가 경고창으로 뜬다
          setMode('WELCOME'); //header 클릭 시 Welcome 관련 문구
        }}></Header>
        <Nav topics={topics} onChangeMode={(_id) => {
          // alert(id);
          setMode('READ'); //mode 값이 setMode 로 인하여 READ 로 바뀜
          setId(_id);
        }}></Nav>
        {content}
        <a href='/create' onClick={event=>{
          event.preventDefault();
          setMode('CREATE');
        }}>방명록 쓰기!</a>
    </div>
  );
}

export default App;
